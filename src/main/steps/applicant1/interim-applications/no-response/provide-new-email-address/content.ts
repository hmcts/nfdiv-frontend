import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { hasValueChanged, isApplicant2EmailValid, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Enter your ${partner}'s new email address`,
  providePersonalEmail:
    'You should provide a personal email address that they actively use. Avoid using their work email address if possible as this may not be private.',
  provideNewEmailHeader: 'Enter the new email address',
  errors: {
    applicant1NoResponsePartnerEmailAddress: {
      required: 'You have not entered an email address. Enter an email address before continuing.',
      invalid: 'Enter an email address in the correct format, like name@example.com',
      sameEmail: `You have entered your own email address. You need to enter your ${partner}'s email address before continuing.`,
      valueUnchanged: `You have entered the same email address as the one you previously provided for your ${partner}. Please enter a new email address to continue.`,
    },
  },
});

// @TODO translations should be verified once provided
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Rhowch gyfeiriad e-bost newydd eich ${partner}`,
  providePersonalEmail:
    'Dylech ddarparu cyfeiriad e-bost personol y maent yn ei ddefnyddio’n rheolaidd. Dylech osgoi defnyddio eu cyfeiriad e-bost gwaith os yw’n bosibl oherwydd efallai nad yw hwn yn breifat.',
  provideNewEmailHeader: 'Rhowch y cyfeiriad e-bost newydd',
  errors: {
    applicant1NoResponsePartnerEmailAddress: {
      required: 'Nid ydych wedi nodi cyfeiriad e-bost. Nodwch gyfeiriad e-bost cyn parhau.',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com.',
      sameEmail: `Rydych wedi nodi’ch cyfeiriad e-bost eich hun. Mae angen i chi nodi cyfeiriad e-bost eich ${partner} cyn parhau.`,
      valueUnchanged: `You have entered the same email address as the one you previously provided for your ${partner}. Please enter a new email address to continue.`,
    },
  },
});

export const form: FormContent = {
  fields: userCase => ({
    applicant1NoResponsePartnerEmailAddress: {
      type: 'text',
      value: '',
      label: l => l.provideNewEmailHeader,
      labelSize: null,
      validator: value => {
        return (
          isFieldFilledIn(value) ||
          isApplicant2EmailValid(value as string, userCase.applicant1Email) ||
          hasValueChanged(value as string, userCase?.applicant2Email)
        );
      },
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  const userCase = content.userCase;

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(userCase || {}) },
  };
};
