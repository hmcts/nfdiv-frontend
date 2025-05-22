import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Arrange service by a process server',
  line1: `You can arrange for an independent process server to hand deliver your ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. You must not deliver them yourself.`,
  howItWorks: {
    header: 'How it works',
    steps: {
      one: 'Once you confirm that this is what you want to do, we will send you the papers by email.',
      two: 'You will need to find and employ a process server. You may wish to consider how many times they will attempt to serve, over what period of time, and at what times of the day.',
      three: `They will attempt to serve the papers on your ${partner}.`,
      four: 'If they serve successfully, they will complete the certificate of service (form FP6) and send it to you.',
      five: 'You will then need to send the certificate of service to the court.',
      six: `If the papers have been correctly served and your ${partner} still hasn't responded, your ${
        isDivorce ? 'divorce' : 'application to end your civil partnership'
      } can continue without their response.`,
    },
  },
  buttonText: 'Check details',
});

// @TODO translations should be verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Arrange service by a process server',
  line1: `You can arrange for an independent process server to hand deliver your ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. You must not deliver them yourself.`,
  howItWorks: {
    header: 'How it works',
    steps: {
      one: 'Once you confirm that this is what you want to do, we will send you the papers by email.',
      two: 'You will need to find and employ a process server. You may wish to consider how many times they will attempt to serve, over what period of time, and at what times of the day.',
      three: `They will attempt to serve the papers on your ${partner}.`,
      four: 'If they serve successfully, they will complete the certificate of service (form FP6) and send it to you.',
      five: 'You will then need to send the certificate of service to the court.',
      six: `If the papers have been correctly served and your ${partner} still hasn't responded, your ${
        isDivorce ? 'divorce' : 'application to end your civil partnership'
      } can continue without their response.`,
    },
  },
  buttonText: 'Check details',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.buttonText,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const alsoTry = alsoTryGenerateContent(content);
  return {
    ...translations,
    ...alsoTry,
    form,
  };
};
