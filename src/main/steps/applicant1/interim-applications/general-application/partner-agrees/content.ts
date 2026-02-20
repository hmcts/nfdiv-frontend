import { GeneralApplicationHearingNotRequired } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Dealing with your application without a hearing',
  line1:
    "Generally, if the other party agrees (consents) with your application, the court may be able to deal with the application 'on paper' (without a hearing).",
  line2: `This will usually mean that your application is faster and less expensive. You will need to provide written evidence that your ${partner} consents.`,
  questionLabel: 'Do you think your application can be dealt with without a hearing?',
  partnerAgreesWithApplication: `Yes, because my ${partner} agrees with my application`,
  partnerAgreesWithNoHearing: `Yes, because my ${partner} agrees to this being dealt with without a hearing`,
  applicationDoesNotNeedConsent: 'Yes, because my application does not need consent',
  errors: {
    applicant1GenAppHearingNotRequired: {
      required: 'Select an option.',
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: 'Dealing with your application without a hearing',
  line1:
    "Generally, if the other party agrees (consents) with your application, the court may be able to deal with the application 'on paper' (without a hearing).",
  line2: `This will usually mean that your application is faster and less expensive. You will need to provide written evidence that your ${partner} consents.`,
  questionLabel: 'Do you think your application can be dealt with without a hearing?',
  partnerAgreesWithApplication: `Yes, because my ${partner} agrees with my application`,
  partnerAgreesWithNoHearing: `Yes, because my ${partner} agrees to this being dealt with without a hearing`,
  applicationDoesNotNeedConsent: 'Yes, because my application does not need consent',
  errors: {
    applicant1GenAppHearingNotRequired: {
      required: 'Select an option.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1GenAppHearingNotRequired: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.questionLabel,
      labelHidden: false,
      values: [
        {
          label: l => l.partnerAgreesWithApplication,
          id: 'yesPartnerAgreesWithApplication',
          value: GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_APPLICATION,
        },
        {
          label: l => l.partnerAgreesWithNoHearing,
          id: 'yesPartnerAgreesWithNoHearing',
          value: GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_NO_HEARING,
        },
        {
          label: l => l.applicationDoesNotNeedConsent,
          id: 'yesDoesNotNeedConsent',
          value: GeneralApplicationHearingNotRequired.YES_DOES_NOT_NEED_CONSENT,
        },
        {
          label: l => l.no,
          id: 'hearingRequired',
          value: GeneralApplicationHearingNotRequired.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
