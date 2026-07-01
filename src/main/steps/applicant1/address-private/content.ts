import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ partner, required }: CommonContent) => ({
  title: `Do you need your contact details kept private from your ${partner}?`,
  line1: `The court can keep your address, email address and phone number private from your ${partner}.`,
  errors: {
    applicant1AddressPrivate: { required },
  },
});

const cy: typeof en = ({ partner, required }: CommonContent) => ({
  title: `A oes arnoch angen cadw eich manylion cyswllt yn breifat oddi wrth eich ${partner}?`,
  line1: `Gall y llys gadw eich cyfeiriad, eich cyfeiriad e-bost a'ch rhif ffôn yn breifat oddi wrth eich ${partner}.`,
  errors: {
    applicant1AddressPrivate: { required },
  },
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
  const radioAnswersPrivate = radioButtonAnswersPrivate[content.language];
  return {
    ...translations,
    detailsPrivate: radioAnswersPrivate[YesOrNo.YES],
    detailsNotPrivate: radioAnswersPrivate[YesOrNo.NO],
    form,
  };
};
