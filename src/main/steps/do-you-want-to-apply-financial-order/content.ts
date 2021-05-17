import { FinancialOrderFor, YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../../steps/common/common.content';

const en = ({ applicant2, required }: CommonContent) => ({
  title: 'Do you want to apply for a financial order?',
  line1: 'You’ll need to apply for a financial order if you:',
  point1:
    'agree on dividing your money and property and want to make your agreement legally binding (this is also known as a consent order).',
  point2: 'disagree on dividing your money and property and want the court to decide.',
  point3: 'have nothing to split but want to make your financial separation final.',
  line2:
    'Applying to the court for a consent order costs an additional £50. Asking the court to decide for you and make a financial order costs an additional £255. The court needs to know now if you want to apply.',
  selectYes: 'If you select yes:',
  yesPoint1: 'you do not have to proceed with the application.',
  yesPoint2: `you can proceed with the application at any time, so long as your ${applicant2} is still alive.`,
  selectNo: 'If you select no:',
  noPoint1: 'you can still apply in the future.',
  noPoint2:
    'you’ll only be able to apply until you remarry or form a new civil partnership (this does not apply to pension sharing or pension compensation orders, which can be applied at any time).',
  hint: 'The application is done separately, using another form.',
  subField: 'Who is the financial for?',
  subFieldHint: 'Select all that apply',
  me: 'Me',
  children: 'Our children',
  errors: {
    applyForFinancialOrder: {
      required,
    },
    whoIsFinancialOrderFor: {
      required: 'You need to select who the financial order is for. Select an option and then continue.',
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            whoIsFinancialOrderFor: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'whoIsFinancialOrderFor',
                  label: l => l.me,
                  value: FinancialOrderFor.APPLICANT_1,
                },
                {
                  name: 'whoIsFinancialOrderFor',
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
