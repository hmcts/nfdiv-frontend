import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as applyForHwfForm,
  generateContent as applyForHwfGenerateContent,
} from '../../common/apply-for-hwf/content';

export const form: FormContent = applyForHwfForm;

export const generateContent: TranslationFn = content => {
  const applyForHwfContent = applyForHwfGenerateContent(content);

  return {
    ...applyForHwfContent,
    form,
  };
};
