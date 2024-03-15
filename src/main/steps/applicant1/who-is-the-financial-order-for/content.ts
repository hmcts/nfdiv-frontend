import { FinancialOrderFor } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Who is the financial order for?',
  line1: `The financial order will describe how to split you and your ${partner}'s money and property.
  Sometimes it can also describe whether any money or property will be transferred to one of you, for the benefit of any children you may have.
  For example, a property could be transferred to the parent who is looking after the child, until the child becomes an adult.`,
  line2: `For legal reasons, the court needs to know now if you want the financial order to just describe your money and property,
  or to also include money and property transferred to one of you, for the benefit of any children.`,
  inset: `If you say now that you want the financial order to be for your children then the financial order does not have to include them.
  It just gives you the option to include them on the financial order, should you need to.`,
  me: 'I need a financial order for myself ',
  children: 'I need a financial order for myself and my child(ren)',
  errors: {
    applicant1WhoIsFinancialOrderFor: {
      required,
    },
  },
});

const cy: typeof en = ({ partner, required }: CommonContent) => ({
  title: 'Who is the financial order for?',
  line1: `The financial order will describe how to split you and your ${partner}'s money and property.
  Sometimes it can also describe whether any money or property will be transferred to one of you, for the benefit of any children you may have.
  For example, a property could be transferred to the parent who is looking after the child, until the child becomes an adult.`,
  line2: `For legal reasons, the court needs to know now if you want the financial order to just describe your money and property,
  or to also include money and property transferred to one of you, for the benefit of any children.`,
  inset: `If you say now that you want the financial order to be for your children then the financial order does not have to include them.
  It just gives you the option to include them on the financial order, should you need to.`,
  me: 'I need a financial order for myself ',
  children: 'I need a financial order for myself and my child(ren)',
  errors: {
    applicant1WhoIsFinancialOrderFor: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1WhoIsFinancialOrderFor: {
      type: 'checkboxes',
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
