import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Search for your ${partner}'s contact details`,
  tryToFind: {
    title: 'You should try to find either:',
    options: {
      postal: `an up-to-date postal address for your ${partner}`,
      social: `a social media account, phone number or email address that ou can prove your ${partner} actively uses`,
    },
  },
  manyWays: {
    title: `You can try many ways to find your ${partner}'s contact details, for example:`,
    options: {
      friends: 'asking their friends or other relatives',
      employer: 'asking their employer, if you know where they work',
      social: 'looking for them on social media',
      tracingAgent: 'employing a tracing agent to try to find their contact details',
    },
  },
  line1: `If you need to employ a tracing agent, you should expect to pay between £35-£70 for a basic search. They will search for your ${partner}’s contact details and should provide you with a report on any searches they carry out.`,
  line2:
    'Keep a record of the results of any searches you do as this will be useful evidence that you’ve tried to contact them.',
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Search for your ${partner}'s contact details`,
  tryToFind: {
    title: 'You should try to find either:',
    options: {
      postal: `an up-to-date postal address for your ${partner}`,
      social: `a social media account, phone number or email address that ou can prove your ${partner} actively uses`,
    },
  },
  manyWays: {
    title: `You can try many ways to find your ${partner}'s contact details, for example:`,
    options: {
      friends: 'asking their friends or other relatives',
      employer: 'asking their employer, if you know where they work',
      social: 'looking for them on social media',
      tracingAgent: 'employing a tracing agent to try to find their contact details',
    },
  },
  line1: `If you need to employ a tracing agent, you should expect to pay between £35-£70 for a basic search. They will search for your ${partner}’s contact details and should provide you with a report on any searches they carry out.`,
  line2:
    'Keep a record of the results of any searches you do as this will be useful evidence that you’ve tried to contact them.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
