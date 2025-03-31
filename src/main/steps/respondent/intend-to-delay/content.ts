import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, required }: CommonContent) => ({
  title: 'Do you intend to delay the application',
  intendToDelay: `Do you intend to ask the court to delay the ${isDivorce ? 'divorce' : 'dissolution'}
  until it is satisfied with your financial situation?`,
  no: 'No',
  yes: 'Yes',
  delaySelected:
    'You will need to complete ‘Form B – Notice of an application to consider the financial position of the respondent after the divorce/dissolution’. The court will need to receive it before the final order is granted.',
  errors: {
    intendToDelay: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, required }: CommonContent) => ({
  title: 'A ydych yn bwriadu oedi’r cais',
  intendToDelay: `A ydych yn bwriadu gofyn i’r llys ohirio’r ${isDivorce ? 'ysgariad' : 'diddymiad'}
  nes ei fod yn fodlon â’ch sefyllfa ariannol?`,
  yes: 'Ydw',
  no: 'Nac ydw',
  delaySelected:
    "Bydd angen i chi lenwi ‘Ffurflen B – Hysbysiad o gais i ystyried sefyllfa ariannol yr atebydd ar ôl yr ysgariad/diddymiad’. Bydd angen i'r llys ei dderbyn cyn i'r gorchymyn terfynol gael ei roi.",
  errors: {
    intendToDelay: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    intendToDelay: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label">${l.delaySelected}</p>`,
        },
        { label: l => l.no, value: YesOrNo.NO },
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
