export const addNewCommandToHelp = (commandName) => `/login - returns the HTTP authorization header required to talk to external system",
        botMention + " /${commandName.toLowerCase()} - auto generated command, please insert description",`;

export const genericCommandHandler = (basePackage, commandName) => `package ${basePackage}.command;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import ${basePackage}.internal.command.CommandHandler;
import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.message.model.SymphonyMessage;

public class ${commandName}CommandHandler extends CommandHandler {

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  @Override
  public void handle(BotCommand command, SymphonyMessage response) {

    String myMessage = "<p style='margin-bottom:6px;'>Hey there my new command!</p>";

    Map<String, Object> data = new HashMap<>();
    data.put("content", "this is data that came from the bot");

    response.setEnrichedMessage(myMessage, "${basePackage}.${commandName.toLowerCase()}", data, "1.0");
  }
}
`;


export const customSymphonyElementsHandler = (basePackage, commandName, commandNameKebabCased) => `package ${basePackage}.elements;

import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.elements.ElementsHandler;
import ${basePackage}.internal.event.model.SymphonyElementsEvent;
import ${basePackage}.internal.message.model.SymphonyMessage;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

/**
 * Sample code. Implementation of {@link ElementsHandler} which renders a Symphony elements form and
 * handles its submission.
 */
public class ${commandName}Handler extends ElementsHandler {
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
    data.put("form_id", FORM_ID);
    elementsResponse.setTemplateFile("${commandNameKebabCased}", data);
  }

  /**
   * Invoked when elements form is submitted
   */
  @Override
  public void handleAction(SymphonyElementsEvent event,
      SymphonyMessage elementsResponse) {
    elementsResponse.setMessage("Form registered successfully");
  }

}`;

export const customSymphonyElementsTemplate = `<form id="{{form_id}}">
  <h3>Quote Registration</h3>
  <h6>From currency</h6>
  <text-field minlength="3" maxlength="3" masked="false" name="fromCurrency" required="true"></text-field>
  <h6>To currency</h6>
  <text-field minlength="3" maxlength="3" masked="false" name="toCurrency" required="true"></text-field>
  <h6>Amount</h6>
  <text-field minlength="1" maxlength="9" masked="false" name="amount" required="true"></text-field>
  <h6>Assigned To:</h6>
  <person-selector name="assignedTo" placeholder="Assign to.." required="false" />
  <h6>Quote Status:</h6>
  <radio name="status" checked="true" value="pending">Pending</radio>
  <radio name="status" checked="false" value="confirmed">Confirmed</radio>
  <radio name="status" checked="false" value="settled">Settled</radio>
  <h6>Remarks:</h6>
  <textarea name="remarks" placeholder="Enter your remarks.." required="false"></textarea>
  <button name="confirm" type="action">Confirm</button>
  <button name="reset" type="reset">Reset</button>
</form>
`;

