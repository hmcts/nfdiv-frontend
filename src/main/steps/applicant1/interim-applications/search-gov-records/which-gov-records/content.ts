import { Case, CaseDate } from '../../../../../app/case/case';
import { SearchGovRecordsWhichDepartment } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Which government departments do you need us to search for your ${partner}’s details?`,
  titleHint: `Which government departments do you need us to search for your ${partner}’s details?`,
  dwp: 'Department for Work and Pensions',
  dwpHint: 'for benefit, pay or pension records',
  hmrc: 'HM Revenue and Customs',
  hmrcHint: 'for tax records',
  other: 'Other',
  otherHint: 'for any other government departments',
  otherFieldText: 'Please specify',
  whyTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
  errors: {
    applicant1SearchGovRecordsWhichDepartments: {
      required: "Select which government departments' records you want the court to search",
      applicant1SearchGovRecordsOtherDepartmentNames: {
        required: 'Enter details of the government department',
      },
    },
    applicant1SearchGovRecordsWhyTheseDepartments: {
      required: 'Enter details about why the selected department is most suitable',
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
  otherFieldText: 'Please specify',
  whyTheseDepartments: `Why do you think these departments are most suited to getting the contact details of your ${partner}?`,
  errors: {
    applicant1SearchGovRecordsWhichDepartments: {
      required: "Select which government departments' records you want the court to search",
      applicant1SearchGovRecordsOtherDepartmentNames: {
        required: 'Enter details of the government department',
      },
    },
    applicant1SearchGovRecordsWhyTheseDepartments: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsWhichDepartments: {
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant1SearchGovRecordsWhichDepartments',
          label: l => l.dwp,
          hint: l => l.dwpHint,
          value: SearchGovRecordsWhichDepartment.DWP,
        },
        {
          name: 'applicant1SearchGovRecordsWhichDepartments',
          label: l => l.hmrc,
          hint: l => l.hmrcHint,
          value: SearchGovRecordsWhichDepartment.HMRC,
        },
        {
          name: 'applicant1SearchGovRecordsWhichDepartments',
          label: l => l.other,
          hint: l => l.otherHint,
          value: SearchGovRecordsWhichDepartment.OTHER,
          subFields: {
            applicant1SearchGovRecordsOtherDepartmentNames: {
              type: 'text',
              classes: 'govuk-input',
              label: l => l.otherFieldText,
              labelSize: 'normal',
            },
          },
          validator: (
            value: string | string[] | CaseDate | Partial<Case> | undefined,
            formData: Partial<Case>
          ): string | undefined => {
            if (
              (value as string[])?.includes(SearchGovRecordsWhichDepartment.OTHER) &&
              !formData['applicant1SearchGovRecordsOtherDepartmentNames']?.length
            ) {
              return 'required';
            }
          },
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
    form,
    ...translations,
  };
};
