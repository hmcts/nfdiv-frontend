import { AlternativeServiceMethod } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isEmailFilledAndValid, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Sending the papers to your ${partner}`,
  line1: `If you can show that your ${partner} has an email address that they actively use, the court may be able to email the papers to that address.`,
  line2:
    'If you do not have an email address, or would prefer to send them in a different way (for example text, WhatsApp or social media), you can do so but you will need to arrange this yourself. In these cases, we will email the papers to you so you can do so.',
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
  line2:
    'Os nad oes gennych gyfeiriad e-bost neu os byddai’n well gennych eu hanfon mewn ffordd wahanol (er enghraifft, neges destun, WhatsApp neu’r cyfryngau cymdeithasol), gallwch wneud hynny, ond byddwch angen trefnu hyn eich hun.  Yn yr achosion hyn, byddwn yn e-bostio’r papurau atoch fel y gallwch wneud hynny.',
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
