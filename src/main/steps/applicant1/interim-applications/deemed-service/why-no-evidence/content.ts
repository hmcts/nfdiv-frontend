import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Provide a statement',
  line1: `Tell us how you know your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  line2: 'You should also explain why you have been unable to upload evidence.',
  line3: `Give as much detail as you can. The judge needs to be satisfied that your ${partner} has received the papers before they can grant your application.`,
  errors: {
    applicant1DeemedNoEvidenceStatement: {
      required: 'Enter details about how you know your partner has received the papers.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Darparu datganiad',
  line1: `Dywedwch wrthym sut rydych yn gwybod bod eich ${partner} wedi derbyn y ${
    isDivorce ? 'papurau ysgaru' : "papurau i ddod â'ch partneriaeth sifil i ben"
  }.`,
  line2: 'Dylech hefyd esbonio pam nad ydych wedi gallu uwchlwytho tystiolaeth.',
  line3: `Rhowch gymaint o fanylion â phosib. Mae’r barnwr angen bod yn fodlon bod eich ${partner} wedi cael y papurau cyn y gallant ganiatáu eich cais.`,
  errors: {
    applicant1DeemedNoEvidenceStatement: {
      required: 'Eglurwch sut rydych yn gwybod bod eich partner wedi derbyn y papurau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DeemedNoEvidenceStatement: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.title,
      labelHidden: true,
      validator: value => {
        const hasEnteredDetails = !isEmpty(value);
        if (!hasEnteredDetails) {
          return 'required';
        }
      },
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
