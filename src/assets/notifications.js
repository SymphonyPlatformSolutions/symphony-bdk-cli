const rfqColorHelper = function (code) {
    switch (code) {
        case 0:
            return '#EC407A';
        break;
        case 1:
            return '#880E4F';
        break;
        case 2:
            return '#AB47BC';
        break;
        case 3:
            return '#4A148C';
        break;
        case 4:
            return '#42A5F5';
        break;
        case 5:
            return '#006064';
        break;
        case 6:
            return '#00BFA5';
        break;
        case 7:
            return '#E17900';
        break;
        case 8:
            return '#8C513B';
        break;
        default:
            return '#00BFA5';
        break;
    }
};
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
      headers: [
        'Column A',
        'Column B',
        'Column C',
      ],
      rows: [
        ['<b>lorem</b>', '<i>ipsum</i>', 'liris'],
        ['<b>example</b>', 'sample', 'data'],
      ],
    },
  },`;

export const tableTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            headers: data.headers,
            rows: data.rows,
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
 ****************************************************************************/

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

/****************************************************************/
/***************** Custom Financial Templates *******************/
/****************************************************************/

/***************** Generic Elements *******************/

const rfqcardHbsTemplate = (body, colorIndex) => `{{#if message.shorthandMessage}}
    <p>{{message.shorthandMessage}}</p>
{{/if}}
<div style="display:flex">
    <div style="display: flex;
        color: white;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        background-color: ${rfqColorHelper(colorIndex)};
        border-radius: 4px 0px 0px 4px;
        padding: 5px 10px;
        border: 1px solid #E0E0E0;">
        <p style="font-size:12px;margin: 0;">RFQ</p>
        <p style="font-size: 16px;margin: 0;"><b>{{message.shortCode}}</b></p>
    </div>
    <div style="display: flex;
        flex-wrap: wrap;
        width:-webkit-fill-available;
        border: 1px solid #E0E0E0;
        align-items: center;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 5px;
        border-left: none;">
          ${body}
    </div>
</div>`;

export const rfqTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage(
          {
            ...data,
          },
          CUSTOM_TEMPLATE_NAMES.${notificationName},
        );
        break;
      default:`;


/***************** RFQ INITIATED *******************/

export const rfqInitiatedAknowledgedHbsTemplate = rfqcardHbsTemplate(`{{#with message.product}}
          {{#if product}}
            {{> badge suffix=product }}
          {{/if}}
  
          {{#if index}}
            {{> badge prefix=index suffix=currency }}
          {{/if}}
  
          {{#if clearingHouse}}
            {{> badge suffix=clearingHouse }}
          {{/if}}
  
          {{#if start}}
            {{> badge prefix="start" suffix=start.date }}
          {{/if}}
  
          {{#if tenor}}
            {{> badge prefix="tenor" suffix=tenor.date }}
          {{/if}}
  
          {{#if sizeType}}
            {{> badge prefix=sizeType suffix=size.size }}
          {{/if}}
  
          {{#if tenor}}
            {{> badge prefix="client" suffix=payDirection }}
          {{/if}}
        {{/with}}`,6);


/***************** RFQ Priced *******************/

export const rfqPricedHbsTemplate = rfqcardHbsTemplate(`<div style="display: flex;flex-direction: column">
    <p style="color:#979797;">{{message.dealerName}} pay / {{message.initiatorCompanyName}} rec {{message.dealerName}} rec/{{message.initiatorCompanyName}}</p>

   {{> rfq-value receives=message.state.receive.price pays=message.state.pay.price}}

    <br/>

    <b>Respond by typing: </b>

    <div style="display: flex;
        flex-direction: row;
        width:-webkit-fill-available;
        max-width: 500px;
    ">
        <div style="display: flex;
            width: 50%;
            align-items: center;">
            <span style=" border: 1px solid #EEEEEE;
            background-color: #FAFAFA;
            padding: 5px;
            color: #E01E5A;
            border-radius: 4px;">
                {{message.shortCode}} rec {{message.state.receive.price}}
            </span>
            <p style="margin: 0 0 0 5px;">Agree to Rec {{message.state.receive.price}}</p>
        </div>
        <div style="display: flex;
            width: 50%;
            border-radius: 4px;
            align-items: center;">
              <span style=" border: 1px solid #EEEEEE;
                background-color: #FAFAFA;
                color: #E01E5A;
                padding: 5px;
                border-radius: 4px;">
                {{message.shortCode}} pay {{message.state.pay.price}}
            </span>
            <p style="margin: 0 0 0 5px">Agree to Pay {{message.state.pay.price}}</p>
        </div>
    </div>
</div>`,6);


/***************** RFQ AGREED_PAY *******************/

export const rfqAgreedPayHbsTemplate = rfqcardHbsTemplate(`<div style="display: flex;flex-direction: column">
    <div style="display: flex">
        <p style="color:#979797;text-decoration: line-through;">{{message.dealerName}} pay / {{message.initiatorCompanyName}} </p>
        <p style="color:#979797;">rec {{message.dealerName}} rec/{{message.initiatorCompanyName}}</p>
    </div>
   {{> rfq-value receives='-' pays=message.state.pay.price agreed=true}}
</div>`,6);

/***************** RFQ CONFIRMED *******************/

export const rfqConfirmedHbsTemplate = rfqcardHbsTemplate(`<div style="display: flex; flex-direction: column">
    <div style="display: flex; flex-direction: row;flex-wrap:wrap;">
        {{> rfq-start-ack message=message.product}}
    </div>
    <br/>
    <div style="display: flex">
        <p style="margin: 0 0 0 5px">Agreed by {{message.state.userName}}</p>
        <div style="background-color: #7575753b;
            border: 1px solid #EEEEEE;
            margin-left: 10px;
            padding: 0px 5px;
            border-radius: 2px">
            <p style="margin: 0;">{{message.rfqId}}</p>
        </div>
    </div>
</div>`, 6);

/***************** RFQ PASSED *******************/

export const rfqPassedHbsTemplate = rfqcardHbsTemplate(`<div style="display: flex;align-items: center; flex-wrap: wrap">
        <p style="margin: 0;">RFQ with ID</p>
        <div style="background-color: #7575753b;
            border: 1px solid #EEEEEE;
            margin-left: 5px;
            padding: 0px 5px;
            border-radius: 2px">
            <p style="margin: 0;">{{message.rfqId}}</p>
        </div>
        <p style="margin: 0 0 0 5px">has ended.</p>
</div>`, 8);

/***************** RFQ Timeout *******************/

export const rfqTimeoutHbsTemplate = rfqcardHbsTemplate(`<div style="display: flex;align-items: center; flex-wrap: wrap">
        <p style="margin: 0;">RFQ with ID</p>
        <div style="background-color: #7575753b;
            border: 1px solid #EEEEEE;
            margin-left: 5px;
            padding: 0px 5px;
            border-radius: 2px">
            <p style="margin: 0;">{{message.rfqId}}</p>
        </div>
        <p style="margin: 0 0 0 5px">has ended.</p>
</div>`, 7);
