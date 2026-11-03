import { AlternativeServiceMethod } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isEmailFilledAndValid, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Sending the papers to your ${partner}`,
  line1: `If you can show that your ${partner} has an email address that they actively use, the court may be able to email the papers to that address.`,
  line2: `Evidence that the email address is active can include messages sent directly to you by your ${partner}, or messages where your ${partner} has been included by a third party — for example, a government department, employer, school, bank, solicitor or another organisation. `,
  line3: `If you rely on messages between your ${partner} and another person, you must:`,
  messageMustList: {
    item1: 'Provide the name of the person; and',
    item2: `Explain their relationship to both you and your ${partner}`,
  },
  line4:
    'If you do not have an email address, or would prefer to send them in a different way (for example text, WhatsApp or social media), you can do so but you will need to arrange this yourself. In these cases, we will email the papers to you so you can do so.',
  line5: `Your evidence must show that the contact method is currently in use and belongs to your ${partner}.`,
  line6: 'Make sure it:',
  makeSureList: {
    item1: 'shows the date of the conversation',
    item2: 'is from within the last 3 months',
    item3: `includes enough information to identify your ${partner}, such as their name, contact details or username`,
    item4: 'shows the phone number for text message or WhatsApp evidence',
    item5: 'shows the account username or profile name for social media messages',
  },
  line7:
    'The evidence should be clear and easy to read. Do not crop screenshots so that key details (such as dates, usernames or phone numbers) are missing.',
  wantToApplyChoiceHeader: 'How would you like to apply to send the papers?',
  email: 'By email',
  different: 'In a different way',
  emailAndDifferent: 'By both email and a different way',
  emailAddress: 'Email address',
  errors: {
    applicant1AltServiceMethod: {
      required: 'Select how you want to send the papers.',
    },
    applicant1AltServicePartnerEmail: {
      required: 'Email address cannot be blank.',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    applicant1AltServicePartnerEmailWhenDifferent: {
      required: 'Email address cannot be blank.',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Anfon y papurau at eich ${partner}`,
  line1: `Os gallwch ddangos bod gan eich ${partner} gyfeiriad e-bost a ddefnyddir ganddynt yn rheolaidd, efallai y gall y llys e-bostio’r papurau i’r cyfeiriad hwnnw.`,
  line2: `Gall tystiolaeth bod y cyfeiriad e-bost yn weithredol gynnwys negeseuon a anfonwyd yn uniongyrchol atoch gan eich ${partner}, neu negeseuon lle mae eich ${partner} wedi'i gynnwys/chynnwys gan drydydd parti — er enghraifft, adran o'r llywodraeth, cyflogwr, ysgol, banc, cyfreithiwr neu sefydliad arall.`,
  line3: `Os ydych yn dibynnu ar negeseuon rhwng eich ${partner} ac unigolyn arall, rhaid i chi wneud y canlynol:`,
  messageMustList: {
    item1: 'Darparu enw’r unigolyn; ac',
    item2: `Egluro eu perthynas â chi a'ch ${partner}`,
  },
  line4:
    'Os nad oes gennych gyfeiriad e-bost neu os byddai’n well gennych eu hanfon mewn ffordd wahanol (er enghraifft, neges destun, WhatsApp neu’r cyfryngau cymdeithasol), gallwch wneud hynny, ond byddwch angen trefnu hyn eich hun.  Yn yr achosion hyn, byddwn yn e-bostio’r papurau atoch fel y gallwch wneud hynny.',
  line5: `Rhaid i’ch tystiolaeth ddangos bod y dull cysylltu yn cael ei ddefnyddio ar hyn o bryd ac yn perthyn i’ch ${partner}.`,
  line6: 'Gwnewch yn siŵr ei fod:',
  makeSureList: {
    item1: 'yn dangos dyddiad y sgwrs',
    item2: 'o fewn y 3 mis diwethaf',
    item3: `yn cynnwys digon o wybodaeth i adnabod eich ${partner}, fel ei henw, manylion cyswllt neu enw defnyddiwr`,
    item4: 'yn dangos y rhif ffôn ar gyfer tystiolaeth neges destun neu WhatsApp',
    item5: 'yn dangos enw defnyddiwr y cyfrif neu enw proffil ar gyfer negeseuon cyfryngau cymdeithasol',
  },
  line7:
    'Dylai’r dystiolaeth fod yn glir ac yn hawdd ei darllen. Peidiwch â thorri sgrinluniau fel bod manylion allweddol (fel dyddiadau, enwau defnyddwyr neu rifau ffôn) ar goll.',
  wantToApplyChoiceHeader: 'Sut hoffech chi ymgeisio i anfon y papurau?',
  email: 'Trwy e-bost',
  different: 'Mewn ffordd wahanol',
  emailAndDifferent: 'Drwy e-bost ac mewn ffordd wahanol',
  emailAddress: 'Cyfeiriad e-bost',
  errors: {
    applicant1AltServiceMethod: {
      required: 'Dewiswch sut rydych eisiau anfon y papurau.',
    },
    applicant1AltServicePartnerEmail: {
      required: 'Ni all y blwch ar gyfer cyfeiriad e-bost fod yn wag.',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
    applicant1AltServicePartnerEmailWhenDifferent: {
      required: 'Ni all y blwch ar gyfer cyfeiriad e-bost fod yn wag.',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1AltServiceMethod: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.wantToApplyChoiceHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.email,
          id: 'byEmail',
          value: AlternativeServiceMethod.EMAIL,
          subFields: {
            applicant1AltServicePartnerEmail: {
              type: 'text',
              classes: 'govuk-input--width-20',
              labelSize: null,
              label: l => l.emailAddress,
              validator: isEmailFilledAndValid,
            },
          },
        },
        {
          label: l => l.different,
          id: 'inADifferentWay',
          value: AlternativeServiceMethod.DIFFERENT_WAY,
        },
        {
          label: l => l.emailAndDifferent,
          id: 'byEmailAndDifferent',
          value: AlternativeServiceMethod.EMAIL_AND_DIFFERENT,
          subFields: {
            applicant1AltServicePartnerEmailWhenDifferent: {
              type: 'text',
              classes: 'govuk-input--width-20',
              labelSize: null,
              label: l => l.emailAddress,
              validator: isEmailFilledAndValid,
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return {
    ...translations,
    form,
  };
};
