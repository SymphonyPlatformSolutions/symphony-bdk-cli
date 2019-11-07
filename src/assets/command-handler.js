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

export const addNewCommandToHelp = (commandName) => `/login - returns the HTTP authorization header required to talk to external system",
        botMention + " /${commandName.toLowerCase()} - auto generated command, please insert description",`;
