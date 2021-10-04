import { TranslationFn } from '../../../app/controller/GetController';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/hub-page/content';
import { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  awaitingAos: {
    line1: `Your ${partner} has submitted an application for divorce.`,
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const form = applicant1Form;

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...languages[content.language](content),
  };
};
