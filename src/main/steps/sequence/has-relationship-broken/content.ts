import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  const en = {
    title: isDivorce ? title : 'Has your relationship irretrievably broken down (it cannot be saved)?',
    line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have irretrievably broken down for you to
      ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This means it cannot be saved.`,
    yes: `Yes, my ${isDivorce ? 'marriage' : 'relationship'} has irretrievably broken down`,
    no: `No, my ${isDivorce ? 'marriage' : 'relationship'} has not irretrievably broken down`,
    notBrokenDownSelected: `Your ${isDivorce ? 'marriage' : 'relationship'}
      must have irretrievably broken down for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}.
      This is the law in England and Wales.`,
    errors: {
      screenHasUnionBroken: {
        required: 'You have not answered the question. You need to select an answer before continuing.',
      },
    },
  };

  const cy: typeof en = {
    title: `A yw eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu'n gyfan gwbl (ni ellir ei hachub)?`,
    line1: `Rhaid bod eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu’n gyfan gwbl i chi allu ${
      isDivorce ? 'cael ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    }. Mae hyn yn golygu ni ellir ei hachub.`,
    yes: `Ydy, mae fy ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`,
    no: `Nac ydy, nid yw fy  ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`,
    notBrokenDownSelected: `Rhaid bod eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu’n gyfan gwbl i chi allu ${
      isDivorce ? 'cael ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    }. Dyma yw’r gyfraith yng Nghymru a Lloegr.`,
    errors: {
      screenHasUnionBroken: {
        required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn y gallwch barhau.',
      },
    },
  };

  const common = {
    form,
  };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {
    screenHasUnionBroken: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        { label: l => l.yes, value: 'Yes' },
        {
          label: l => l.no,
          value: 'No',
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
