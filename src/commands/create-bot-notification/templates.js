import { NOTIFICATION_TEMPLATE_OPTIONS } from "./questions";

const messageBuilder = (basePackage, commandName, handleTemplate, imports = '') => `package ${basePackage}.command;

import ${basePackage}.internal.command.CommandHandler;
import ${basePackage}.internal.command.model.BotCommand;
import ${basePackage}.internal.symphony.model.SymphonyMessage;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Pattern;
${imports}

public class ${commandName}CommandHandler extends CommandHandler {

  @Override
  protected Predicate<String> getCommandMatcher() {
    return Pattern
        .compile("^@"+ getBotName() + " /${commandName.toLowerCase()}")
        .asPredicate();
  }

  ${handleTemplate}
}
`;

const SimpleAlertCommandHandler = (basePackage, commandName, templateName) =>
  messageBuilder(basePackage, commandName,`@Override
    public void handle(BotCommand command, SymphonyMessage commandResponse) {
      Map<String, String> message = new HashMap<>();
      message.put("title", "title");
      message.put("content", "content");
      Map<String, Map> templateParameter = new HashMap<>();
      templateParameter.put("message", message);
      commandResponse.setTemplateFile("${templateName}", templateParameter);
   }
`);

const InformationCommandHandler = (basePackage, commandName, templateName) =>
  messageBuilder(basePackage, commandName, `@Override
    public void handle(BotCommand command, SymphonyMessage commandResponse) {
      Map<String, String> message = new HashMap<>();
      message.put("title", "title");
      message.put("content", "content");
      message.put("description", "description");
      Map<String, Map> templateParameter = new HashMap<>();
      templateParameter.put("message", message);
      commandResponse.setTemplateFile("${templateName}", templateParameter);
    }
`);

const ListCommandHandler = (basePackage, commandName, templateName) =>
  messageBuilder(basePackage, commandName, `@Override
    public void handle(BotCommand command, SymphonyMessage commandResponse) {
      Map<String, Object> message = new HashMap<>();
      message.put("title", "title");
      List<Map<String, String>> content = new ArrayList<>();
      for(int i=1; i<=3; i++) {
        Map<String, String> contentElement = new HashMap<>();
        contentElement.put("header", "header" + i);
        contentElement.put("body", "body" + i);
        content.add(contentElement);
      }
      message.put("content", content);
      Map<String, Map> templateParameter = new HashMap<>();
      templateParameter.put("message", message);
      commandResponse.setTemplateFile("${templateName}", templateParameter);
    }
`,`import java.util.ArrayList;
import java.util.List;`);

const TableCommandHandler = (basePackage, commandName, templateName) =>
  messageBuilder(basePackage, commandName, `@Override
    public void handle(BotCommand command, SymphonyMessage commandResponse) {
      int COLUMNS = 3;
      int LINES = 5;
      List<Map<String, String>> message = new ArrayList<>();
      for (int i = 1; i <= LINES; i++) {
        Map<String, String> line = new HashMap<>();
        for (int j = 1; j <= COLUMNS; j++) {
          line.put("column" + j, "line" + i);
        }
        message.add(line);
      }
      Map<String, List> templateParameter = new HashMap<>();
      templateParameter.put("message", message);
      commandResponse.setTemplateFile("${templateName}", templateParameter);
    }
`,`import java.util.ArrayList;
import java.util.List;`);

const NotificationCommandHandler = (basePackage, commandName, templateName) =>
  messageBuilder(basePackage, commandName, `@Override
    public void handle(BotCommand command, SymphonyMessage commandResponse) {
      Map<String, Object> message = new HashMap<>();
      message.put("title", "title");
      message.put("alert", false);
      Map<String, String> content = new HashMap<>();
      content.put("header", "header");
      content.put("body", "body");
      message.put("content", content);
      Map<String, String> comment = new HashMap<>();
      comment.put("body", "comment");
      message.put("comment", comment);
      message.put("description", "description");
      Map<String, String> displayName = new HashMap<>();
      displayName.put("displayName", "assignee");
      message.put("assignee", displayName);
      message.put("showStatusBar", true);
      Map<String, String> type = new HashMap<>();
      type.put("name", "type");
      message.put("type", type);
      Map<String, String> priority = new HashMap<>();
      priority.put("name", "priority");
      message.put("priority", priority);
      Map<String, String> status = new HashMap<>();
      status.put("name", "status");
      message.put("status", status);
      List<Map<String, String>> labels = new ArrayList<>();
      for(int i=1; i<=3; i++) {
        Map<String, String> text = new HashMap<>();
        text.put("text", "label" + i);
        labels.add(text);
      }
      message.put("labels", labels);
      Map<String, Map> templateParameter = new HashMap<>();
      templateParameter.put("message", message);
      commandResponse.setTemplateFile("${templateName}", templateParameter);
    }
`,`import java.util.ArrayList;
import java.util.List;`);

const alertTemplate = `<div>
    <card data-accent-color="tempo-bg-color--red" data-icon-src="
        {{#if message.icon}}
            {{message.icon}}
        {{else}}
            https://symphony.com/wp-content/uploads/2019/08/favicon.png
        {{/if}}
    ">
        {{#if message.title}}
            <header>
                <b>{{message.title}}</b>
            </header>
        {{/if}}
        {{#if message.content}}
            <body>
            {{message.content}}
            </body>
        {{/if}}
    </card>
</div>
`;

const informationTemplate = `<div>
    <card data-accent-color="tempo-bg-color--cyan" data-icon-src="
        {{#if message.icon}}
            {{message.icon}}
        {{else}}
            https://symphony.com/wp-content/uploads/2019/08/favicon.png
        {{/if}}
    ">
        <header>
            {{#if message.title}}
                <h2>{{message.title}}</h2>
                <hr/>
            {{/if}}
            {{#if message.content}}
                <b class="tempo-text-color--green">{{message.content}}</b>
            {{/if}}
            {{#if message.description}}
                :
                <i>{{message.description}}</i>
                <br/>
            {{/if}}
        </header>
    </card>
</div>
`;

const listTemplate = `<div>
    <card data-accent-color="tempo-bg-color--gray" data-icon-src="
        {{#if message.icon}}
            {{message.icon}}
        {{else}}
            https://symphony.com/wp-content/uploads/2019/08/favicon.png
        {{/if}}
    ">
        <header>
            {{#if message.title}}
                <span class="tempo-text-color--secondary">{{message.title}}</span>
            {{/if}}
            <ul>
                {{#each message.content}}
                    <li>
                        {{#if this.header}}
                            <b>{{this.header}}</b>{{this.body}}
                        {{else}}
                            {{this}}
                        {{/if}}
                    </li>
                {{/each}}
            </ul>
        </header>
    </card>
</div>
`;

const notificationTemplate = `<div>
    <card data-accent-color="
        {{#if message.alert}}
            tempo-bg-color--red
        {{else}}
            tempo-bg-color--blue
        {{/if}}"
          data-icon-src="
        {{#if message.icon}}
              {{message.icon}}
          {{else}}
            https://symphony.com/wp-content/uploads/2019/08/favicon.png'
        {{/if}}
    ">
        <header>
            {{#if message.title}}
                <h2>{{message.title}}</h2>
                <hr/>
            {{/if}}
            <div>
                {{#if message.content}}
                    {{#if message.content.header}}
                        <card data-accent-color="tempo-bg-color--background">
                            <header>
                                {{message.content.header}}
                            </header>
                            <body>
                            {{message.content.body}}
                            </body>
                        </card>
                    {{else}}
                        <span class="tempo-text-color--normal">{{message.content}}</span>
                    {{/if}}
                {{/if}}
            </div>
            <div class="labelBackground badge">
                {{#if message.comment}}
                    <div>
                        <span class="tempo-text-color--secondary">Comments:</span>
                        <br/>
                        <span class="tempo-text-color--normal">{{message.comment.body}}</span>
                        <br/>
                    </div>
                {{/if}}
                <div>
                    {{#if message.description}}
                        <span class="tempo-text-color--secondary">Description:</span>
                        <span class="tempo-text-color--normal">{{message.description}}</span>
                    {{/if}}
                    {{#if message.assignee}}
                        <br/>
                        <span class="tempo-text-color--secondary">Assignee:</span>
                        <span class="tempo-text-color--normal">{{message.assignee.displayName}}</span>
                    {{/if}}
                </div>
                {{#if message.showStatusBar}}
                    <hr/>
                    <div>
                        {{#if message.type}}
                            <span class="tempo-text-color--secondary">Type:</span>
                            <span class="tempo-text-color--normal"
                                  style="margin-right:24px">{{message.type.name}}</span>
                        {{/if}}
                        {{#if message.priority}}
                            <span class="tempo-text-color--secondary">Priority:</span>
                            <span class="tempo-text-color--normal"
                                  style="margin-right:24px">{{message.priority.name}}</span>
                        {{/if}}
                        {{#if message.status}}
                            <span class="tempo-text-color--secondary">Status:</span>
                            {{#if message.alert}}
                            <span class="tempo-bg-color--red tempo-text-color--white tempo-token"
                                  style="margin-right:24px">
                            {{else}}
                            <span class="tempo-bg-color--green tempo-text-color--white tempo-token"
                                  style="margin-right:24px">
                            {{/if}}
                            {{message.status.name}}
                        </span>
                        {{/if}}
                        {{#if message.labels}}
                            <span class="tempo-text-color--secondary">Labels:</span>
                            {{#each message.labels}}
                                <span class="hashTag" style="margin-right:24px">{{this.text}}</span>
                            {{/each}}
                        {{/if}}
                    </div>
                {{/if}}
            </div>
        </header>
    </card>
</div>
`;

const simpleTemplate = `<div>
    <card data-accent-color="tempo-bg-color--green" data-icon-src="
        {{#if message.icon}}
            {{message.icon}}
        {{else}}
            https://symphony.com/wp-content/uploads/2019/08/favicon.png
        {{/if}}
    ">
        {{#if message.title}}
            <header>
                <b>{{message.title}}</b>
            </header>
        {{/if}}
        {{#if message.content}}
            <body>
            {{message.content}}
            </body>
        {{/if}}
    </card>
</div>
`;

const tableTemplate = `<table>
    <thead>
    <tr>
        {{#each message.[0]}}
            <th>{{@key}}</th>
        {{/each}}
    </tr>
    </thead>
    <tbody>
    {{#each message}}
        <tr>
            {{#each this}}
                <td>{{this}}</td>
            {{/each}}
        </tr>
    {{/each}}
    </tbody>
</table>
`;


export default {
  [NOTIFICATION_TEMPLATE_OPTIONS.ALERT]: {
    handler: SimpleAlertCommandHandler,
    template: alertTemplate,
  },
  [NOTIFICATION_TEMPLATE_OPTIONS.SIMPLE]: {
    handler: SimpleAlertCommandHandler,
    template: simpleTemplate,
  },
  [NOTIFICATION_TEMPLATE_OPTIONS.INFORMATION]: {
    handler: InformationCommandHandler,
    template: informationTemplate,
  },
  [NOTIFICATION_TEMPLATE_OPTIONS.NOTIFICATION]: {
    handler: NotificationCommandHandler,
    template: notificationTemplate,
  },
  [NOTIFICATION_TEMPLATE_OPTIONS.LIST]: {
    handler: ListCommandHandler,
    template: listTemplate,
  },
  [NOTIFICATION_TEMPLATE_OPTIONS.TABLE]: {
    handler: TableCommandHandler,
    template: tableTemplate,
  },
}
