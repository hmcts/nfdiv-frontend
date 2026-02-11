import { FinancialOrderFor } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Who is the financial order for?',
  line1: `The financial order will describe how to split you and your ${partner}'s money and property.
  Sometimes it can also describe whether any money or property will be transferred to one of you, for the benefit of any children you may have.
  For example, a property could be transferred to the parent who is looking after the child, until the child becomes an adult.`,
  line2: `The court needs to know now if you want the financial order to just describe your money and property,
  or to also include money and property transferred to one of you for the benefit of any children under the age of 18.`,
  inset: `If you say now that you want the financial order to be for your children then the financial order does not have to include them.
  It just gives you the option to include them on the financial order, should you need to.`,
  whoIsTheFinancialOrderFor: 'Who is the financial order for?',
  applicant: 'I need a financial order for myself ',
  applicantAndChildren: 'I need a financial order for myself and my child(ren)',
  errors: {
    applicant1WhoIsFinancialOrderFor: {
      required: 'You need to answer who the financial order is for.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Ar gyfer pwy y mae’r gorchymyn ariannol?',
  line1: `Bydd y gorchymyn ariannol yn disgrifio sut i rannu eich arian a’ch eiddo chi a’ch ${partner}.
  Weithiau gall hefyd ddisgrifio pa un a fydd unrhyw arian neu eiddo yn cael ei drosglwyddo i un ohonoch, er budd unrhyw blant sydd gennych.
  Er enghraifft, gallai eiddo fod wedi’i drosglwyddo i’r rhiant sy’n gofalu am y plentyn, nes bydd y plentyn yn oedolyn.`,
  line2: `Mae’r llys angen gwybod nawr os ydych eisiau i’r gorchymyn ariannol ddisgrifio eich arian neu eiddo yn unig,
  neu hefyd i gynnwys arian ac eiddo wedi’i drosglwyddo i un ohonoch er budd unrhyw blant o dan 18 oed.`,
  inset: `Os ydych yn dweud nawr eich bod eisiau i’r gorchymyn ariannol fod i’ch plant, yna nid yw’r gorchymyn ariannol angen eu cynnwys nhw.
  Mae’n rhoi’r dewis i chi eu cynnwys yn y gorchymyn ariannol, os byddwch angen.`,
  whoIsTheFinancialOrderFor: 'Ar gyfer pwy mae’r gorchymyn ariannol?',
  applicant: 'Rwyf angen gorchymyn ariannol i fi fy hun',
  applicantAndChildren: 'Rwyf angen gorchymyn ariannol i fi a fy mhlentyn/mhlant',
  errors: {
    applicant1WhoIsFinancialOrderFor: {
      required: 'Rydych angen ateb ar gyfer pwy mae’r gorchymyn ariannol.',
    },
  },
});

enum FinancialOrderForRadioOption {
  APPLICANT = 'applicant',
  APPLICANT_AND_CHILDREN = 'applicantAndChildren',
}

export class RadioButtons {
  private static RADIO_TO_CHECKBOX_MAPPING: Map<FinancialOrderForRadioOption, FinancialOrderFor[]> = new Map([
    [FinancialOrderForRadioOption.APPLICANT, [FinancialOrderFor.APPLICANT]],
    [FinancialOrderForRadioOption.APPLICANT_AND_CHILDREN, [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN]],
  ]);

  static getLabelledInputs = (previousValue?: FinancialOrderFor[]): FormInput[] =>
    Array.from(this.RADIO_TO_CHECKBOX_MAPPING, ([value, parsedValue]) => ({
      label: l => l[value],
      value,
      selected: parsedValue.length === previousValue?.length,
    }));

  static getParsedValue(formBody: Record<string, string>, property: string): [[string, FinancialOrderFor[] | string]] {
    const selectedValue = formBody[property] as FinancialOrderForRadioOption;
    const parsedValue = this.RADIO_TO_CHECKBOX_MAPPING.get(selectedValue) ?? selectedValue;

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
