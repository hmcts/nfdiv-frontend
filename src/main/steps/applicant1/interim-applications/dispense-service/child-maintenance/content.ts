import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Is there a court order or Child Maintenance Service calculation in place for child maintenance?',
  childMaintenanceResultsHeader: `Explain the results of any enquiries made to the court or to the Child Maintenance Service about your ${partner}'s wherabouts`,
  errors: {
    applicant1DispenseChildMaintenanceOrder: {
      required:
        'Select yes if there is a court order or a Child Maintenance Service calculation in place for child maintenance',
    },
    applicant1DispenseChildMaintenanceResults: {
      required: `Select yes if you know any email addresses for your ${partner}`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: 'Is there a court order or Child Maintenance Service calculation in place for child maintenance?',
  childMaintenanceResultsHeader: `Explain the results of any enquiries made to the court or to the Child Maintenance Service about your ${partner}'s wherabouts`,
  errors: {
    applicant1DispenseChildMaintenanceOrder: {
      required:
        'Select yes if there is a court order or a Child Maintenance Service calculation in place for child maintenance',
    },
    applicant1DispenseChildMaintenanceResults: {
      required: `Select yes if you know any email addresses for your ${partner}`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseChildMaintenanceOrder: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
          subFields: {
            applicant1DispenseChildMaintenanceResults: {
              type: 'textarea',
              label: l => l.childMaintenanceResultsHeader,
              labelHidden: true,
              hint: l => l.childMaintenanceResultsHeader,
              validator: isFieldFilledIn,
            },
          },
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
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
