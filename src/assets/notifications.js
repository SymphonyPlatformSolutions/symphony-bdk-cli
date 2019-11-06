/***
 * Templates
 */

/***************** Simple *******************/

export const simpleTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      title: 'Hello world!',
      content: 'this is a simple  card!',
    },
  },`;

export const simpleTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
            content: data.content,
          },
          SmsRenderer.smsTypes.SIMPLE,
        );
        break;
      default:`;

/***************** Information *******************/

export const informationTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      title: 'Hello world!',
      content: 'here is the content',
      description: 'here is the description',
    },
  },`;

export const informationTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
            content: data.content,
            description: data.message,
          },
          SmsRenderer.smsTypes.INFORMATION,
        );
        break;
      default:`;

/***************** List *******************/

export const listTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      title: 'List',
      content: [
        'Content A',
        'Content B',
        'Content C',
      ],
    },
  },`;

export const listTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
            content: data.content,
          },
          SmsRenderer.smsTypes.LIST,
        );
        break;
      default:`;

/***************** Table *******************/

export const tableTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      title: 'Hello world!',
      content: [
        'Option A',
        'Option B',
        'Option C',
      ],
    },
  },`;

export const tableTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
            content: data.content,
          },
          SmsRenderer.smsTypes.TABLE,
        );
        break;
      default:`;

/***************** Alert *******************/

export const alertTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      title: '<b>Hello</b> world!',
      content: 'Hey there folks!',
    },
  },`;

export const alertTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
            content: data.content,
          },
          SmsRenderer.smsTypes.ALERT,
        );
        break;
      default:`;

/***************** Notification *******************/

export const notificationTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      alert: false,
      title: 'Something Interesting occurred!',
      content: {
        header: 'this is an notification sample expand to learn more',
        body: 'it exemplifies the capabilities we have using the sdk',
      },
      showStatusBar: true,
      comment: {
        body: 'so interesting!',
      },
      description: 'this is a brief description',
      assignee: {
        displayName: 'John Doe',
      },
      type: {
        name: 'sample',
      },
      status: {
        name: 'Awesome',
      },
      priority: {
        name: 'normal',
      },
      labels: [
        { text: 'Example' },
        { text: 'SDK' },
        { text: 'MS' },
      ],
    },
  },`;

export const notificationTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            alert: data.alert,
            title: data.title,
            content: data.content,
            showStatusBar: data.showStatusBar,
            comment: data.comment,
            description: data.description,
            assignee: data.assignee,
            type: data.type,
            status: data.status,
            priority: data.priority,
            labels: data.labels,
          },
          SmsRenderer.smsTypes.NOTIFICATION,
        );
        break;
      default:`;

/***************************************************************************
 * Custom Templates
 */

export const customImport = (notificationName) => `/* global SYMPHONY */
import ${notificationName.toLowerCase()} from './templates/components/${notificationName.toLowerCase()}.hbs';`;

export const customNames = (notifcationName) => `const CUSTOM_TEMPLATE_NAMES = {
  ${notifcationName}: '${notifcationName}',`;

export const customTemplates = (notifcationName) => `const customTemplates = {
  [CUSTOM_TEMPLATE_NAMES.${notifcationName}]: ${notifcationName.toLowerCase()},`;


/***************** Information *******************/

export const customInformationTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      content: '<b>Hello world!</b>, this is a notification',
    },
  },`;

export const customInformationTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
           content: data.content,
          },
          CUSTOM_TEMPLATE_NAMES.${notificationName},
        );
        break;
      default:`;

export const customInformationTemplateHbs = `{{#> information}}
  {{#*inline "overrideHeader"}}
    {{{message.content}}}  
  {{/inline}}
{{/information}}
`;

/***************** Alert *******************/

export const customAlertTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      extraContent: 'This is an other content thats in the entities.js file',
      link: {
        url: 'https://google.com',
        content: 'Click here for google!',
      },
    },
  },`;

export const customAlertTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: 'My custom Template',
            link: data.link,
            extraContent: data.extraContent,
          },
          CUSTOM_TEMPLATE_NAMES.${notificationName},
        );
        break;
      default:`;

export const customAlertTemplateHbs = `{{#> alert}}
  {{#*inline "overrideBody"}}
      Click here: {{> link message.link}}
      <br />
      {{#if message.extraContent}}
        {{{message.extraContent}}}
      {{/if}}
  {{/inline}}
{{/alert}}
`;

/***************** New Template *******************/

export const customNewTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      title: '<b>Hello</b> <i>world!</i>',
    },
  },`;

export const customNewTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
          },
          CUSTOM_TEMPLATE_NAMES.${notificationName},
        );
        break;
      default:`;


export const customNewTemplateHbs = `<div>
  {{{message.title}}}
</div>`;
