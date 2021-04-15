import { Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import type { CommonContent } from '../../steps/common/common.content';

const en = ({ isDivorce, divorce, endingCivilPartnership }: CommonContent) => {
  const dissolution = isDivorce ? divorce : endingCivilPartnership;
  return {
    title: 'You need to get their address',
    line1:
      'Save your application and try to find their address. It can be their postal address or their solicitor’s address. It can be UK or international. If you use their work address, you need to ask their permission.',
    line2: 'To find their address you could try contacting their:',
    bullet1: 'relatives',
    bullet2: 'friends',
    bullet3: 'last-known employer',
    bullet4: 'trade union or professional organisation',
    cannotGetAddressTitle: 'If you cannot get their address',
    cannotGetAddressLine1: `If you know you cannot get their address then you can apply to have the ${dissolution} papers ‘served’ (delivered) to them another way. For example by email, text message or social media. This is a separate application which will be reviewed by a judge and costs an additional £50.`,
    iWantToHavePapersServedAnotherWay: `I want to apply to have the ${dissolution} papers ‘served’ (delivered) to them another way.`,
  };
};

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    iWantToHavePapersServedAnotherWay: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'iWantToHavePapersServedAnotherWay',
          label: l => l.iWantToHavePapersServedAnotherWay,
          value: Checkbox.Checked,
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
