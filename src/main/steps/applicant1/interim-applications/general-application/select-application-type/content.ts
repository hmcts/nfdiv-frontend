import { CaseWithId } from '../../../../../app/case/case';
import { ApplicationType, GeneralApplicationType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: 'What application are you making?',
  questionLabel: 'What application are you making?',
  withdraw: `Withdraw your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  delay: 'Delay or pause (or ‘put a stay on’) an application',
  extend: 'More time to serve an application (or ‘extend service’)',
  continueWithoutMarriageCertificate: `Continue without a ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  expedite: `${isDivorce ? 'Complete a divorce' : 'End a civil partnership'} more quickly (or ‘expedite’ an application)`,
  amend: 'Amend an existing application',
  somethingElse: 'Something else',
  specify: 'Please specify',
  errors: {
    applicant1GenAppType: {
      required: 'Select which application you want to make',
    },
    applicant1GenAppTypeOtherDetails: {
      required: 'You must explain which application you are making',
    },
    applicant2GenAppType: {
      required: 'Select which application you want to make',
    },
    applicant2GenAppTypeOtherDetails: {
      required: 'You must explain which application you are making',
    },
  },
});

// @TODO translations
const cy = ({ isDivorce }: CommonContent) => ({
  title: 'What application are you making?',
  questionLabel: 'What application are you making?',
  withdraw: `Withdraw your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  delay: 'Delay or pause (or ‘put a stay on’) an application',
  extend: 'More time to serve an application (or ‘extend service’)',
  continueWithoutMarriageCertificate: `Continue without a ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  expedite: `${isDivorce ? 'Complete a divorce' : 'End a civil partnership'} more quickly (or ‘expedite’ an application)`,
  amend: 'Amend an existing application',
  somethingElse: 'Something else',
  specify: 'Please specify',
  errors: {
    applicant1GenAppType: {
      required: 'Select which application you want to make',
    },
    applicant1GenAppTypeOtherDetails: {
      required: 'You must explain which application you are making',
    },
    applicant2GenAppType: {
      required: 'Select which application you want to make',
    },
    applicant2GenAppTypeOtherDetails: {
      required: 'You must explain which application you are making',
    },
  },
});

const languages = {
  en,
  cy,
};

const generalApplicationTypeField = (isApplicant2: boolean, userCase: Partial<CaseWithId>) => {
  const isSoleRespondent = isApplicant2 && userCase.applicationType === ApplicationType.SOLE_APPLICATION;
  const soleRespondentOptions = new Set([
    GeneralApplicationType.WITHDRAW_POST_ISSUE,
    GeneralApplicationType.DELAY,
    GeneralApplicationType.EXPEDITE,
    GeneralApplicationType.OTHER,
  ]);

  return {
    type: 'radios',
    classes: 'govuk-radios',
    label: l => l.questionLabel,
    labelHidden: true,
    values: [
      {
        label: l => l.withdraw,
        value: GeneralApplicationType.WITHDRAW_POST_ISSUE,
      },
      {
        label: l => l.delay,
        value: GeneralApplicationType.DELAY,
      },
      {
        label: l => l.extend,
        value: GeneralApplicationType.EXTEND,
      },
      {
        label: l => l.continueWithoutMarriageCertificate,
        value: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
      },
      {
        label: l => l.expedite,
        value: GeneralApplicationType.EXPEDITE,
      },
      {
        label: l => l.amend,
        value: GeneralApplicationType.AMEND_APPLICATION,
      },
      {
        label: l => l.somethingElse,
        value: GeneralApplicationType.OTHER,
        subFields: {
          [isApplicant2 ? 'applicant2GenAppTypeOtherDetails' : 'applicant1GenAppTypeOtherDetails']: {
            type: 'textarea',
            classes: 'govuk-input--width-40',
            labelSize: null,
            label: l => l.pleaseSpecify,
            validator: isFieldFilledIn,
          },
        },
      },
    ].filter(
      generalApplicationOption => !isSoleRespondent || soleRespondentOptions.has(generalApplicationOption.value)
    ),
    validator: value => isFieldFilledIn(value),
  };
};

export const applicant1Form: FormContent = {
  fields: userCase => {
    return {
      applicant1GenAppType: generalApplicationTypeField(false, userCase),
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...applicant1Form,
  fields: userCase => {
    return {
      applicant2GenAppType: generalApplicationTypeField(true, userCase),
    };
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const form = content.isApplicant2 ? applicant2Form : applicant1Form;

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
