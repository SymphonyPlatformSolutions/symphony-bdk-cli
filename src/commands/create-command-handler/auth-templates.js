import {AUTHENTICATION_TYPES} from "./questions";

const genericAuthHandlerTemplate = (type) => (basePackage, commandName) => `
package ${basePackage}.command;

import java.util.function.Predicate;
import java.util.regex.Pattern;


import com.symphony.bdk.bot.sdk.command.AuthenticatedCommandHandler;
import com.symphony.bdk.bot.sdk.command.config.CommandAuthenticationProvider;
import com.symphony.bdk.bot.sdk.command.model.AuthenticationContext;
import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;


/**
 * {@link AuthenticatedCommandHandler} sample using {@link ${type}AuthenticationProvider}
 */
@CommandAuthenticationProvider(name = "${commandName}${type}AuthenticationProvider")
public class ${commandName}CommandHandler extends AuthenticatedCommandHandler {

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  /**
   * Invoked when command matches
   */
  @Override
  public void handle(BotCommand command, SymphonyMessage commandResponse,
      AuthenticationContext authenticationContext) {

     commandResponse.setMessage("<b>User authenticated</b>. "
        + "Please add the following HTTP header to your requests:<br /><br />"
        + "<code>Authorization: "
        + authenticationContext.getAuthScheme() + " "
        + authenticationContext.getAuthToken() + "</code>");

  }

}
`;

const BasicAuthProviderTemplate = (basePackage, commandName) => `
package ${basePackage}.command.auth;

import java.util.Base64;

import com.symphony.bdk.bot.sdk.command.AuthenticationProvider;
import com.symphony.bdk.bot.sdk.command.model.AuthenticationContext;
import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;

/**
 * Sample code. Implementation of {@link AuthenticationProvider} to offer basic authentication.
 */
public class ${commandName}BasicAuthenticationProvider implements AuthenticationProvider {

  private String username = "john.doe@symphony.com";
  private String password = "strongpass";

   @Override
  public AuthenticationContext getAuthenticationContext(Long userId) {
    AuthenticationContext authContext = new AuthenticationContext();
    authContext.setAuthScheme("Basic");
    authContext.setAuthToken(findCredentialsByUserId(userId));

    return authContext;
  }

  @Override
  public void handleUnauthenticated(BotCommand command,
      SymphonyMessage commandResponse) {
    commandResponse.setMessage("Sorry, you are not authorized to perform this"
        + " action using Basic Authentication");
  }

  // Just a simple example. Ideally, implement a service to handle credentials
  // retrieval.
  private String findCredentialsByUserId(Long userId) {
    String credential = username + ":" + password;
    return new String(Base64.getEncoder().encode(
        credential.getBytes()));
  }
}`;


const Oauth2AuthProviderTemplate = (basePackage, commandName) => `package ${basePackage}.command.auth;

import ${basePackage}.internal.command.AuthenticationProvider;
import ${basePackage}.internal.command.model.AuthenticationContext;
import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.lib.restclient.RestClient;
import ${basePackage}.internal.lib.restclient.RestClientConnectionException;
import ${basePackage}.internal.lib.restclient.model.RestResponse;
import ${basePackage}.internal.symphony.model.SymphonyMessage;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.Map;

/**
 * Sample code. Implementation of {@link AuthenticationProvider} to offer OAuth authentication.
 * NOTICE: it is required to change oauth properties with valid ones that match what has been
 * configured in a OAuth server.
 */
public class ${commandName}OAuthAuthenticationProvider implements AuthenticationProvider {

  private static final String AUTHORIZE_URL =
      "https://OAUTH-SERVER.URL.COM/oauth2/default/v1/authorize";
  private static final String TOKEN_URL = "https://OAUTH-SERVER.URL.COM/oauth2/default/v1/token";
  private static final String REDIRECT_URI = "https://localhost:8080/myproject/${commandName}/oauth";
  private static final String CLIENT_ID = "CLIENT-ID";
  private static final String CLIENT_SECRET = "CLIENT-SECRET";
  private static final String RESPONSE_TYPE = "code";
  private static final String SCOPE = "read-write";
  private static final String GRANT_TYPE = "authorization_code";

  private Map<String, String> userAccessTokenMap = new HashMap<>();
  private Map<String, BotCommand> commandCache = new HashMap<>();

  private RestClient restClient;

  public ${commandName}OAuthAuthenticationProvider(RestClient restClient) {
    this.restClient = restClient;
  }

  @Override
  public AuthenticationContext getAuthenticationContext(String userId) {
    AuthenticationContext authContext = new AuthenticationContext();
    authContext.setAuthScheme("Bearer");
    authContext.setAuthToken(findCredentialsByUserId(userId));

    return authContext;
  }

  @Override
  public void handleUnauthenticated(BotCommand command, SymphonyMessage commandResponse) {
    // Cache command to retry it once user gets authenticated
    commandCache.put(command.getMessageEvent().getUserId(), command);

    commandResponse.setMessage("Hi <b>" + command.getUser().getDisplayName()
        + "</b>.  You still don't have linked your account.<br/><br/>"
        + getLinkAccountUrl(command.getMessageEvent().getUserId()));
  }

  public void authorizeCode(String code, String userId) {
    MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
    requestBody.add("grant_type", GRANT_TYPE);
    requestBody.add("client_id", CLIENT_ID);
    requestBody.add("client_secret", CLIENT_SECRET);
    requestBody.add("redirect_uri", REDIRECT_URI);
    requestBody.add("code", code);

    RestResponse<String> response = new RestResponse<>(null, 0);
    try {
      response = restClient.postRequest(TOKEN_URL, requestBody, String.class);
    } catch (RestClientConnectionException rcce) {
      // Handle connection error
    }

    userAccessTokenMap.put(userId, getToken(response.getBody()));

    // User is now authenticated. Retry original command.
    commandCache.get(userId).retry();

  }

  // Just a simple example. Ideally, implement a service to handle credentials
  // retrieval.
  private String findCredentialsByUserId(String userId) {
    return userAccessTokenMap.get(userId);
  }

  private String getLinkAccountUrl(String userId) {
    String linkAccount = AUTHORIZE_URL + "?"
        + "response_type=" + RESPONSE_TYPE + "&amp;"
        + "client_id=" + CLIENT_ID + "&amp;"
        + "redirect_uri=" + REDIRECT_URI + "&amp;"
        + "scope=" + SCOPE + "&amp;"
        + "state=" + userId;

    return "<a href='" + linkAccount + "' style='"
        + "border: 1px solid #767676;"
        + "padding: 7px 14px;"
        + "border-radius: 4px;"
        + "color: #767676;"
        + "font-size: 13px;"
        + "font-weight: bold;'>Link Account</a>";

  }

  private String getToken(String response) {
    // Add logic to pull OAuth access code off OAuth server response
    return "SOME_TOKEN";
  }

}
`;

const Oauth2ControllerTemplate = (basePackage, commandName) => `package ${basePackage}.command.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Sample code. Implementation of an endpoint for the OAuth protocol.
 *
 */
@RestController
@RequestMapping("/${commandName}/oauth")
public class ${commandName}OAuthController {
  private OAuthAuthenticationProvider authProvider;

  public ${commandName}OAuthController(OAuthAuthenticationProvider authProvider) {
    this.authProvider = authProvider;
  }

  @GetMapping
  public ResponseEntity<String> receiveCode(
      @RequestParam(value="code") String code,
      @RequestParam(value="state") String userId) {

    authProvider.authorizeCode(code, userId);

    return ResponseEntity.ok().build();
  }

}
`;

export default {
  [AUTHENTICATION_TYPES.BASIC]: {
    command: genericAuthHandlerTemplate('Basic'),
    provider: BasicAuthProviderTemplate,
    controller: null,
  },
  [AUTHENTICATION_TYPES.OAUTH_V2]: {
    command: genericAuthHandlerTemplate('OAuth'),
    provider: Oauth2AuthProviderTemplate,
    controller: Oauth2ControllerTemplate,
  },
}
