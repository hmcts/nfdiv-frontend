import { FinancialOrderFor } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Who is the financial order for?',
  line1: `The financial order will describe how to split you and your ${partner}'s money and property.
  Sometimes it can also describe whether any money or property will be transferred to one of you, for the benefit of any children you may have.
  For example, a property could be transferred to the parent who is looking after the child, until the child becomes an adult.`,
  line2: `For legal reasons, the court needs to know now if you want the financial order to just describe your money and property,
  or to also include money and property transferred to one of you, for the benefit of any children under the age of 18.`,
  inset: `If you say now that you want the financial order to be for your children then the financial order does not have to include them.
  It just gives you the option to include them on the financial order, should you need to.`,
  whoIsTheFinancialOrderFor: 'Who is the financial order for?',
  applicant: 'I need a financial order for myself ',
  applicantAndChildren: 'I need a financial order for myself and my child(ren)',
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
  or to also include money and property transferred to one of you, for the benefit of any children under the age of 18.`,
  inset: `If you say now that you want the financial order to be for your children then the financial order does not have to include them.
  It just gives you the option to include them on the financial order, should you need to.`,
  whoIsTheFinancialOrderFor: 'Who is the financial order for?',
  applicant: 'I need a financial order for myself ',
  applicantAndChildren: 'I need a financial order for myself and my child(ren)',
  errors: {
    applicant1WhoIsFinancialOrderFor: {
      required,
    },
  },
});

export class RadioButtons {
  private static INPUT_VALUES: Map<string, FinancialOrderFor[]> = new Map([
    ['applicant', [FinancialOrderFor.APPLICANT]],
    ['applicantAndChildren', [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN]],
  ]);

  static getLabelledInputs = (previousValue?: FinancialOrderFor[]): FormInput[] =>
    Array.from(this.INPUT_VALUES, ([value, parsedValue]) => ({
      label: l => l[value],
      value,
      selected: parsedValue.length === previousValue?.length,
    }));

  static getParsedValue(formBody: Record<string, string>, property: string): [[string, FinancialOrderFor[] | string]] {
    const selectedValue = formBody[property];
    const parsedValue = this.INPUT_VALUES.get(selectedValue) ?? selectedValue;

    return [[property, parsedValue]];
  }
}

export const form: FormContent = {
  fields: userCase => {
    const inputValueSelectedPreviously = userCase.applicant1WhoIsFinancialOrderFor;

    return {
      applicant1WhoIsFinancialOrderFor: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.whoIsTheFinancialOrderFor,
        labelHidden: true,
        values: RadioButtons.getLabelledInputs(inputValueSelectedPreviously),
        parser: body => RadioButtons.getParsedValue(body as Record<string, string>, 'applicant1WhoIsFinancialOrderFor'),
        validator: isFieldFilledIn,
      },
    };
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
