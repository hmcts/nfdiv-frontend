import { Case } from '../../../../../app/case/case';
import { ApplicationType, GeneralApplicationType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce }: CommonContent) => {
  const genAppTypeErrors = {
    required: 'Select which application you want to make',
  };

  const genAppTypeOtherDetailsErrors = {
    required: 'You must explain which application you are making',
  };

  return {
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
      applicant1GenAppType: genAppTypeErrors,
      applicant1GenAppTypeOtherDetails: genAppTypeOtherDetailsErrors,
      applicant2GenAppType: genAppTypeErrors,
      applicant2GenAppTypeOtherDetails: genAppTypeOtherDetailsErrors,
    },
  };
};

// @TODO translations
const cy = ({ isDivorce }: CommonContent) => {
  const genAppTypeErrors = {
    required: 'Select which application you want to make',
  };

  const genAppTypeOtherDetailsErrors = {
    required: 'You must explain which application you are making',
  };

  return {
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
      applicant1GenAppType: genAppTypeErrors,
      applicant1GenAppTypeOtherDetails: genAppTypeOtherDetailsErrors,
      applicant2GenAppType: genAppTypeErrors,
      applicant2GenAppTypeOtherDetails: genAppTypeOtherDetailsErrors,
    },
  };
};

const languages = {
  en,
  cy,
};

const generalApplicationTypeField = (
  isApplicant2: boolean,
  isJointApplication: boolean,
  caseIssued: boolean,
  coGranted: boolean,
  otherDetailsFieldName: keyof Case
) => {
  const genAppOptions = new Set([
    GeneralApplicationType.WITHDRAW_POST_ISSUE,
    GeneralApplicationType.EXPEDITE,
    GeneralApplicationType.OTHER,
  ]);

  const isSoleRespondent = isApplicant2 && !isJointApplication;
  const isSoleApplicant = !isApplicant2 && !isJointApplication;

  [
    [caseIssued, GeneralApplicationType.DELAY],
    [!isSoleRespondent && coGranted, GeneralApplicationType.AMEND_APPLICATION],
    [isSoleApplicant, GeneralApplicationType.EXTEND],
    [!caseIssued && !isSoleRespondent, GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT],
  ].forEach(([condition, value]) => {
    if (condition) {
      genAppOptions.add(value as GeneralApplicationType);
    }
  });

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
          [otherDetailsFieldName]: {
            type: 'textarea',
            classes: 'govuk-input--width-40',
            labelSize: null,
            label: l => l.pleaseSpecify,
            validator: isFieldFilledIn,
          },
        },
      },
    ].filter(generalApplicationOption => genAppOptions.has(generalApplicationOption.value)),
    validator: value => isFieldFilledIn(value),
  };
};

export const form: FormContent = {
  fields: userCase => {
    const isApplicant2 = false;
    const isJointApplication = userCase.applicationType === ApplicationType.JOINT_APPLICATION;
    const caseIssued = !!userCase.issueDate;
    const coGranted = !!userCase.coGrantedDate;

    return {
      applicant1GenAppType: generalApplicationTypeField(
        isApplicant2,
        isJointApplication,
        caseIssued,
        coGranted,
        'applicant1GenAppTypeOtherDetails'
      ),
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...form,
  fields: userCase => {
    const isApplicant2 = true;
    const isJointApplication = userCase.applicationType === ApplicationType.JOINT_APPLICATION;
    const caseIssued = !!userCase.issueDate;
    const coGranted = !!userCase.coGrantedDate;

    return {
      applicant2GenAppType: generalApplicationTypeField(
        isApplicant2,
        isJointApplication,
        caseIssued,
        coGranted,
        'applicant2GenAppTypeOtherDetails'
      ),
    };
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const contentForm = content.isApplicant2 ? applicant2Form : form;

  return {
    ...translations,
    form: { ...contentForm, fields: (contentForm.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
