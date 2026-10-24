import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as applyForHwfForm,
  generateContent as applyForHwfGenerateContent,
} from '../../common/apply-for-hwf/content';

const en = applyForHwfContent => ({
  steps: {
    enterCode: 'Enter D11 when you are asked to enter a court or tribunal number',
    applyHwf: applyForHwfContent.steps.applyHwf,
    completeHwf: applyForHwfContent.steps.completeHwf,
    returnCode: 'Return to complete your D11 application',
    enterHwfRefNo: applyForHwfContent.steps.enterHwfRefNo,
  },
});

const cy = applyForHwfContent => ({
  steps: {
    enterCode: 'Enter D11 when you are asked to enter a court or tribunal number',
    applyHwf: applyForHwfContent.steps.applyHwf,
    completeHwf: applyForHwfContent.steps.completeHwf,
    returnCode: 'Return to complete your D11 application',
    enterHwfRefNo: applyForHwfContent.steps.enterHwfRefNo,
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = applyForHwfForm;

export const generateContent: TranslationFn = content => {
  const applyForHwfContent = applyForHwfGenerateContent(content);
  const translations = languages[content.language](applyForHwfContent);
  return {
    ...applyForHwfContent,
    ...translations,
    form,
  };
};
