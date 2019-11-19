/***
 * Financial components
 */

/***************** RFQ Initiated *******************/

export const rfqInitiatedTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      dealerName: 'Hydra',
      state: {
        state: 'rfq_initiated',
      },
      action: 'sms-sparc/start-rfq',
      rfqId: 'f152f549-a2d9-4c92-9a60-f7dedc9f823c',
      product: {
        product: 'IRS',
        currency: 'USD',
        index: '3M-LIBOR',
        clearingHouse: 'EUREX',
        start: {
          date: 'spot',
          type: 'spot',
        },
        tenor: {
          date: '1y',
          type: 'single',
          value: {
            firstValue: 1,
          },
        },
        sizeType: 'DV01',
        size: {
          currency: 'USD',
          value: '3',
          sizeMultiplier: 'k',
          size: 'USD3k',
        },
        payDirection: 'PAY',
        rate: 'Rate',
      },
      colorIndex: 6,
      shortCode: 'w7',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568975971,
      shorthandMessage: 'Waiting for dealer to acknowledge',
    },
  },`;

export const rfqInitiatedTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;

/***************** RFQ Aknowledged *******************/

export const rfqAknowledgedTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      dealerName: 'Hydra',
      state: {
        messageId: '3x5S4lN27iH77E9nJ-k9kH___pKxvooAbQ',
        timestamp: 1568975975935,
        state: 'rfq_acknowledged',
        userId: 351775001411612,
      },
      action: 'sms-sparc/dealer-ack',
      rfqId: 'f152f549-a2d9-4c92-9a60-f7dedc9f823c',
      product: {
        product: 'IRS',
        currency: 'USD',
        index: '3M-LIBOR',
        clearingHouse: 'EUREX',
        start: { date: 'spot', type: 'spot' },
        tenor: {
          date: '1y',
          type: 'single',
          value: { firstValue: 1 },
        },
        sizeType: 'DV01',
        size: {
          currency: 'USD',
          value: '3',
          sizeMultiplier: 'k',
          size: 'USD3k',
        },
        payDirection: 'PAY',
        rate: 'Rate',
      },
      colorIndex: 6,
      shortCode: 'w7',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568975971,
      shorthandMessage: 'Hydra acknowledged. Waiting for price.',
    },
  },`;

export const rfqAknowledgedTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;


/***************** RFQ Priced *******************/

export const rfqPricedTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      dealerName: 'Hydra',
      state: {
        messageId: 'L_SVjfZGkjVbUp06rqVH_n___pKxvnNFbQ',
        timestamp: 1568975981754,
        state: 'rfq_priced',
        userId: 351775001411612,
        pay: { price: '8', active: true },
        receive: { price: '5', active: false },
      },
      action: 'sms-sparc/dealer-price',
      rfqId: 'f152f549-a2d9-4c92-9a60-f7dedc9f823c',
      product: {
        product: 'IRS',
        currency: 'USD',
        index: '3M-LIBOR',
        clearingHouse: 'EUREX',
        start: { date: 'spot', type: 'spot' },
        tenor: {
          date: '1y',
          type: 'single',
          value: { firstValue: 1 },
        },
        sizeType: 'DV01',
        size: {
          currency: 'USD',
          value: '3',
          sizeMultiplier: 'k',
          size: 'USD3k',
        },
        payDirection: 'PAY',
        rate: 'Rate',
      },
      colorIndex: 6,
      shortCode: 'w7',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568975971,
      shorthandMessage: 'Hydra Price received.',
    },
  },`;

export const rfqPricedTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;

/***************** RFQ Agreed pay *******************/

export const rfqAgreedPayTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      dealerName: 'Hydra',
      state: {
        messageId: 'F-nA1oeJwZGO5Psn1v95U3___pKxvmbVbQ',
        timestamp: 1568975984938,
        state: 'rfq_agreed_pay',
        userId: 351775001411610,
        pay: { price: '8' },
      },
      action: 'sms-sparc/buyer-agree-pay',
      rfqId: 'f152f549-a2d9-4c92-9a60-f7dedc9f823c',
      product: {
        product: 'IRS',
        currency: 'USD',
        index: '3M-LIBOR',
        clearingHouse: 'EUREX',
        start: { date: 'spot', type: 'spot' },
        tenor: {
          date: '1y',
          type: 'single',
          value: { firstValue: 1 },
        },
        sizeType: 'DV01',
        size: {
          currency: 'USD',
          value: '3',
          sizeMultiplier: 'k',
          size: 'USD3k',
        },
        payDirection: 'PAY',
        rate: 'Rate',
      },
      colorIndex: 6,
      shortCode: 'w7',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568975971,
      shorthandMessage: 'Stark Industries agrees to pay 8.',
    },
  },`;

export const rfqAgreedPayTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;

/***************** RFQ Confirmed *******************/

export const rfqConfirmedTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      dealerName: 'Hydra',
      state: {
        messageId: 'XsouTQ6gEoJ0vLMonkR1-X___pKxvkFZbQ',
        timestamp: 1568975994534,
        state: 'rfq_confirmed',
        userId: 351775001411612,
        userName: 'Clark Kent',
      },
      action: 'sms-sparc/dealer-done',
      rfqId: 'f152f549-a2d9-4c92-9a60-f7dedc9f823c',
      product: {
        product: 'IRS',
        currency: 'USD',
        index: '3M-LIBOR',
        clearingHouse: 'EUREX',
        start: { date: 'spot', type: 'spot' },
        tenor: {
          date: '1y',
          type: 'single',
          value: { firstValue: 1 },
        },
        sizeType: 'DV01',
        size: {
          currency: 'USD',
          value: '3',
          sizeMultiplier: 'k',
          size: 'USD3k',
        },
        payDirection: 'PAY',
        rate: 'Rate',
      },
      colorIndex: 6,
      shortCode: 'w7',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568975971,
      shorthandMessage: 'Done @ 8. Hydra agrees to receive, Stark Industries agrees to pay.',
    },
  },`;

export const rfqConfirmedTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;

/***************** RFQ Timeout *******************/

export const rfqTimeoutTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      state: { state: 'rfq_passed' },
      action: 'sms-sparc/dealer-timeout',
      rfqId: '58e0704a-ca59-4c01-a2e2-c3212622458a',
      product: {
        product: 'OTC Option',
        rawText: 'Buy SPX US 07/31/19 P2425 European CASH 1',
      },
      colorIndex: 7,
      shortCode: 'y9',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568984171,
      shorthandMessage: 'RFQ has ended.',
    },
  },`;

export const rfqTimeoutTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;

/***************** RFQ Passed *******************/

export const rfqPassedTemplateEntity = (notificationName) =>`export const ENRICHER_EVENTS = {
  ${notificationName}: {
    type: 'com.symphony.ms.${notificationName}',
    json: {
      state: {
        messageId: '5Mtui0pnyBSj1WWResDvFH___pKxNeeEbQ',
        timestamp: 1568984930427,
        state: 'rfq_passed',
        userId: 351775001411612,
      },
      action: 'sms-sparc/dealer-pass',
      rfqId: '79191c6d-5b99-402b-ba4b-5d92ebc7f8aa',
      product: {
        product: 'OTC Option',
        rawText: 'Buy SPX US 07/31/19 P2425 European CASH 1',
      },
      colorIndex: 8,
      shortCode: 'e2',
      initiatorUserId: 351775001411610,
      initiatorCompanyName: 'Stark Industries',
      startTime: 1568984917,
      shorthandMessage: 'RFQ has ended.',
    },
  },`;

export const rfqPassedTemplateEnricher = (notificationName) =>`case ENRICHER_EVENTS.${notificationName}.type:
        template = SmsRenderer.renderAppMessage({
            ...data,
          },
          SmsRenderer.smsTypes.RFQ_QUOTE,
        );
        break;
      default:`;
