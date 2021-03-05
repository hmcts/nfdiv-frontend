import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { commonContent } from '../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const relationship = isDivorce ? 'marriage' : 'relationship';
  const endRelationship = isDivorce ? 'get a divorce' : 'end your civil partnership';
  const en = {
    title: `Has your ${relationship} irretrievably broken down (it cannot be saved)?`,
    line1: `Your ${relationship} must have irretrievably broken down for you to
      ${endRelationship}. This means it cannot be saved.`,
    yes: `Yes, my ${relationship} has irretrievably broken down`,
    no: `No, my ${relationship} has not irretrievably broken down`,
    notBrokenDownSelected: `Your ${relationship}
      must have irretrievably broken down for you to ${endRelationship}.
      This is the law in England and Wales.`,
    errors: {
      screenHasUnionBroken: {
        required: commonContent.en.required,
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
        required: commonContent.cy.required,
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
        { label: l => l.yes, value: YesOrNo.Yes },
        {
          label: l => l.no,
          value: YesOrNo.No,
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
