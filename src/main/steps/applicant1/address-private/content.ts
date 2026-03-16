import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { InputLabelsByLanguage, ydwOrNacYdwRadioAnswers } from '../../common/input-labels.content';

const en = ({ partner, required }: CommonContent) => ({
  title: `Do you need your contact details kept private from your ${partner}?`,
  line1: `The court can keep your address, email address and phone number private from your ${partner}.`,
  detailsPrivateMoreDetails: 'If you think you might be experiencing domestic abuse or you feel unsafe, then',
  supportAvailable: 'support is available',
  errors: {
    applicant1AddressPrivate: { required },
    applicant1InRefuge: { required },
  },
  inRefugeLabel: 'Are you currently in a refuge?', // Label for the 'inRefuge' question
});

const cy: typeof en = ({ partner, required }: CommonContent) => ({
  title: `A oes arnoch angen cadw eich manylion cyswllt yn breifat oddi wrth eich ${partner}?`,
  line1: `Gall y llys gadw eich cyfeiriad, eich cyfeiriad e-bost a'ch rhif ffôn yn breifat oddi wrth eich ${partner}.`,
  detailsPrivateMoreDetails:
    "Os credwch eich bod efallai'n profi cam-drin domestig neu os nad ydych yn teimlo'n ddiogel, yna",
  supportAvailable: 'mae cymorth ar gael',
  errors: {
    applicant1AddressPrivate: { required },
    applicant1InRefuge: { required },
  },
  inRefugeLabel: 'Ydych chi’n preswylio mewn lloches ar hyn o bryd?',
});

export const form: FormContent = {
  fields: {
    applicant1AddressPrivate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.detailsPrivate,
          value: YesOrNo.YES,
          conditionalText: l =>
            `<p class="govuk-label">${l.detailsPrivateMoreDetails} <a class="govuk-link" href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help">${l.supportAvailable}</a></p>`,
          subFields: {
            applicant1InRefuge: {
              id: 'inRefuge',
              type: 'radios',
              classes: 'govuk-radios--inline',
              label: l => l.inRefugeLabel,
              values: [
                { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
                { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
              ],
              validator: value => isFieldFilledIn(value), // Only validate if this field is shown
            },
          },
        },
        {
          label: l => l.detailsNotPrivate,
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

const languages = {
  en,
  cy,
};

export const radioButtonAnswersRefuge = ydwOrNacYdwRadioAnswers;

export const radioButtonAnswersPrivate: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: 'Keep my contact details private',
    [YesOrNo.NO]: 'I do not need my contact details kept private',
  },
  cy: {
    [YesOrNo.YES]: 'Cadwch fy manylion cyswllt yn breifat',
    [YesOrNo.NO]: 'Nid oes arnaf angen cadw fy manylion cyswllt yn breifat',
  },
};

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  const radioAnswersRefuge = radioButtonAnswersRefuge[content.language];
  const radioAnswersPrivate = radioButtonAnswersPrivate[content.language];
  return {
    ...translations,
    ...radioAnswersRefuge,
    detailsPrivate: radioAnswersPrivate[YesOrNo.YES],
    detailsNotPrivate: radioAnswersPrivate[YesOrNo.NO],
    form,
  };
};
