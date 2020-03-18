export const addNewCommandToHelp = (commandName) => `  private static final String[] DESCRIPTIONS = {
      "/${commandName.toLowerCase()} - auto generated help message",`;

export const genericCommandHandler = (basePackage, commandName) => `package ${basePackage}.command;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import com.symphony.bdk.bot.sdk.command.CommandHandler;
import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;

public class ${commandName}CommandHandler extends CommandHandler {

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
  public void handle(BotCommand command, SymphonyMessage response) {
    Map<String, String> variables = new HashMap<>();
    variables.put("user", command.getUser().getDisplayName());

    response.setTemplateMessage("Auto generated command ${commandName.toLowerCase()}, Hello, <b>{{user}}</b>", variables);
  }
}
`;


export const customSymphonyElementsHandler = (basePackage, commandName, commandNameKebabCased) => `package ${basePackage}.elements;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import com.symphony.bdk.bot.sdk.command.model.BotCommand;
import com.symphony.bdk.bot.sdk.elements.ElementsHandler;
import com.symphony.bdk.bot.sdk.event.model.SymphonyElementsEvent;
import com.symphony.bdk.bot.sdk.symphony.model.SymphonyMessage;

/**
 * Sample code. Implementation of {@link ElementsHandler} which renders a Symphony elements form and
 * handles its submission.
 */
public class ${commandName}Handler extends ElementsHandler {
  private static final String SAMPLE_INPUT_ID = "sampleInput";
  private static final String FORM_ID = "${commandNameKebabCased}";

  /**
   * Used by CommandFilter to filter Symphony chat messages
   */
  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  @Override
  protected String getElementsFormId() {
    return FORM_ID;
  }

  /**
   * Invoked when command matches
   */
  @Override
  public void displayElements(BotCommand command,
      SymphonyMessage elementsResponse) {
    Map<String, String> data = new HashMap<>();
    data.put("form_id", getElementsFormId());
    elementsResponse.setTemplateFile("${commandNameKebabCased}", data);
  }

  /**
   * Invoked when elements form is submitted
   */
  @Override
  public void handleAction(SymphonyElementsEvent event, SymphonyMessage elementsResponse) {
    Map<String, Object> formValues = event.getFormValues();
    String response = formValues.get(SAMPLE_INPUT_ID).toString();
    elementsResponse.setMessage("Form registered successfully, here's what you've typed: "+ response);
  }

}`;

export const customSymphonyElementsTemplate = `<form id="{{form_id}}">
  <h3>Symphony Elements</h3>
  <h6>This is a sample form using Symphony Elements. Fill in the field and click Confirm, the Bot will receive the data and will reply to you.</h6>
  <text-field minlength="3" maxlength="100" masked="false" name="sampleInput" required="true"></text-field>
  <button name="confirm" type="action">Confirm</button>
</form>
`;
