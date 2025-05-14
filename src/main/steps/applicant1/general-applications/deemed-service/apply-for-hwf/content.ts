import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { generateContent as applyForHwfGenerateContent } from '../../common/apply-for-hwf/content';

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const applyForHwfContent = applyForHwfGenerateContent(content);
  return {
    ...applyForHwfContent,
    form,
  };
};
