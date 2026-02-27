import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ isDivorce, required }) => {
  const relationship = isDivorce ? 'marriage' : 'civil partnership';
  const endRelationship = isDivorce ? 'get a divorce' : 'end it';
  return {
    title: `Has your ${relationship} broken down irretrievably (it cannot be saved)?`,
    line1: `Your ${relationship} must have broken down irretrievably for you to
      ${endRelationship}. This means it cannot be saved.`,
    notBrokenDownSelected: `Your ${relationship}
      must have broken down irretrievably for you to ${endRelationship}.
      This is the law in England and Wales.`,
    errors: {
      applicant1ScreenHasUnionBroken: {
        required,
      },
    },
  };
};

const cy: typeof en = ({ isDivorce, required }) => {
  const relationship = isDivorce ? 'priodas' : 'perthynas';
  const endRelationship = isDivorce ? 'cael ysgariad' : 'dod â’ch partneriaeth sifil i ben';
  return {
    title: `A yw eich ${relationship} wedi chwalu'n gyfan gwbl (ni ellir ei hachub)?`,
    line1: `Rhaid bod eich ${relationship} wedi chwalu’n gyfan gwbl i chi allu
      ${endRelationship}. Mae hyn yn golygu ni ellir ei hachub.`,
    notBrokenDownSelected: `Rhaid bod eich ${relationship}
      wedi chwalu’n gyfan gwbl i chi allu ${endRelationship}.
      Dyma yw’r gyfraith yng Nghymru a Lloegr.`,
    errors: {
      applicant1ScreenHasUnionBroken: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1ScreenHasUnionBroken: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        {
          label: l => l[YesOrNo.NO],
          value: YesOrNo.NO,
          warning: l => l.notBrokenDownSelected,
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

export const radioButtonAnswers = (isDivorce: boolean): InputLabelsByLanguage<YesOrNo> => {
  const relationship = isDivorce ? 'marriage' : 'civil partnership';
  const relationshipCy = isDivorce ? 'mhriodas' : 'mherthynas';
  return {
    en: {
      [YesOrNo.YES]: `I confirm my ${relationship} has broken down irretrievably`,
      [YesOrNo.NO]: `My ${relationship} has not broken down irretrievably`,
    },
    cy: {
      [YesOrNo.YES]: `Ydy, mae fy ${relationshipCy} wedi chwalu'n gyfan gwbl`,
      [YesOrNo.NO]: `Nac ydy, nid yw fy ${relationshipCy} wedi chwalu'n gyfan gwbl`,
    },
  };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers(content.isDivorce)[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
