import config from 'config';

import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Applying for a financial order',
  line1: 'You’ll need to apply for a financial order if you:',
  point1:
    'agree on dividing your money and property and want to make your agreement legally binding (this is known as a financial order by consent)',
  point2:
    'disagree on dividing your money and property and want the court to decide (this is known as a contested financial order)',
  point3: 'have nothing to split but want to make your financial separation final',
  line2: `Applying to the court for a ‘financial order by consent’ costs an additional ${config.get(
    'fees.consentOrder'
  )}. Asking the court to decide for you and make a ‘contested financial order’ costs an additional ${config.get(
    'fees.financialOrder'
  )}. The court needs to know now if you want to apply for either.`,
  selectYes: 'If you select yes:',
  yesPoint1: 'you do not have to proceed with the application',
  yesPoint2: `you can proceed with the application at any time, so long as your ${partner} is still alive`,
  selectNo: 'If you select no:',
  noPoint1:
    'you’ll only be able to apply until you remarry or form a new civil partnership (this does not apply to pension sharing or pension compensation orders, which can be applied at any time)',
  hint: ' If you want to apply for either a ‘financial order by consent’ or a ‘contested financial order’ then select yes',
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes, I want to apply for a financial order',
  no: 'No, I do not want to apply for a financial order',
  subField: 'Who is the financial order for?',
  subFieldHint: 'Select all that apply',
  me: 'Myself',
  children: 'My children',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required,
    },
    applicant1WhoIsFinancialOrderFor: {
      required,
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1ApplyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouWantToApplyForFinancialOrder,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1WhoIsFinancialOrderFor: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant1WhoIsFinancialOrderFor',
                  label: l => l.me,
                  value: FinancialOrderFor.APPLICANT,
                },
                {
                  name: 'applicant1WhoIsFinancialOrderFor',
                  label: l => l.children,
                  value: FinancialOrderFor.CHILDREN,
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
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
    form,
  };
};
