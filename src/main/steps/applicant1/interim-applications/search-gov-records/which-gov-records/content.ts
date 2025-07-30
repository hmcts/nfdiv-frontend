//import { SearchGovRecordsWhichDepartment } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: `Which government departments do you need us to search for your ${partner}’s details?`,
  titleHint: `Which government departments do you need us to search for your ${partner}’s details?`,
  dwp: 'Department for Work and Pensions',
  dwpHint: 'for benefit, pay or pension records',
  hmrc: 'HM Revenue and Customs',
  hmrcHint: 'for tax records',
  other: 'Other',
  otherHint: 'for any other government departments',
  whyTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
  errors: {
    applicant1SearchGovRecordsWhichDepartments: {
      required,
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner, required }: CommonContent) => ({
  title: `Which government departments do you need us to search for your ${partner}’s details?`,
  titleHint: `Which government departments do you need us to search for your ${partner}’s details?`,
  dwp: 'Department for Work and Pensions',
  dwpHint: 'for benefit, pay or pension records',
  hmrc: 'HM Revenue and Customs',
  hmrcHint: 'for tax records',
  other: 'Other',
  otherHint: 'for any other government departments',
  whyTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
  errors: {
    applicant1SearchGovRecordsWhichDepartments: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsWhichDepartments: {
      type: 'checkboxes',
      label: l => l.title,
      hint: l => l.titleHint,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant1SearchGovRecordsDwp',
          label: l => l.dwp,
          hint: l => l.dwpHint,
          // value: SearchGovRecordsWhichDepartment.DWP,
        },
        {
          name: 'applicant1SearchGovRecordsHmrc',
          label: l => l.hmrc,
          hint: l => l.hmrcHint,
          //  value: SearchGovRecordsWhichDepartment.HMRC,
        },
        {
          name: 'applicant1SearchGovRecordsOther',
          label: l => l.other,
          hint: l => l.otherHint,
          //  value: SearchGovRecordsWhichDepartment.OTHER,
        },
      ],
    },
    applicant1SearchGovRecordsWhyTheseDepartments: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.whyTheseDepartments,
      validator: isFieldFilledIn,
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
  };
};
