export const addNewCommandToHelp = (commandName) => `  <li><b>{{bot_mention}}</b> /${commandName.toLowerCase()} - auto generated command, please insert description</li>
</ul>`;

export const genericCommandHandler = (basePackage, commandName) => `package ${basePackage}.command;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import ${basePackage}.internal.command.CommandHandler;
import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.symphony.model.SymphonyMessage;

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
import ${basePackage}.internal.symphony.model.SymphonyMessage;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;

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
    data.put("form_id", FORM_ID);
    elementsResponse.setTemplateFile("${commandNameKebabCased}", data);
  }

  /**
   * Invoked when elements form is submitted
   */
  @Override
  public void handleAction(SymphonyElementsEvent event,
      SymphonyMessage elementsResponse) {
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
