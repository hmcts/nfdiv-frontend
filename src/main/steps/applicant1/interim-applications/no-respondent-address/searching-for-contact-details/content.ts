import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Searching for your ${partner}'s contact details`,
  line1: `Before you proceed, you should try to find any contact details for your ${partner}. You will be asked to show evidence of any searches you've carried out in any applications you make from this point.`,
  line2: `You can try many different ways to find your ${partner}'s contact details, including:`,
  bullet1: 'asking their friends and other relatives if safe to do so',
  bullet2: 'asking their employer, if you know where they work',
  bullet3: 'looking for them on social media',
  bullet4: 'using online people finder services like 192.com',
  bullet5: 'employing a tracing agent to try to find their contact details',
  line3: `If you need to employ a tracing agent, you should expect to pay between £35-£70 for a basic search. They will search for your ${partner}'s contact details and should provide you with a report on any searches they carry out.`,
  line4:
    'Keep a record of the results of any searches you do as this will be useful evidence that you’ve tried to contact them.',
});

const cy = ({ partner }: CommonContent) => ({
  title: `Searching for your ${partner}'s contact details`,
  line1: `Before you proceed, you should try to find any contact details for your ${partner}. You will be asked to show evidence of any searches you've carried out in any applications you make from this point.`,
  line2: `You can try many different ways to find your ${partner}'s contact details, including:`,
  bullet1: 'asking their friends and other relatives if safe to do so',
  bullet2: 'asking their employer, if you know where they work',
  bullet3: 'looking for them on social media',
  bullet4: 'using online people finder services like 192.com',
  bullet5: 'employing a tracing agent to try to find their contact details',
  line3: `If you need to employ a tracing agent, you should expect to pay between £35-£70 for a basic search. They will search for your ${partner}'s contact details and should provide you with a report on any searches they carry out.`,
  line4:
    'Keep a record of the results of any searches you do as this will be useful evidence that you’ve tried to contact them.',
});

export const form: FormContent = {
  fields: {},
  submit: { text: l => l.continue },
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
