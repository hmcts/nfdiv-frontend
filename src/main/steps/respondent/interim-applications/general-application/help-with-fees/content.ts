import { TranslationFn } from '../../../../../app/controller/GetController';
import { generateContent as applicant1GenerateContent } from '../../../../applicant1/interim-applications/general-application/help-with-fees/content';

const en = () => ({
  errors: {
    applicant2InterimAppsUseHelpWithFees: {
      required: "Select 'Yes' if you are using help with fees for this application.",
    },
  },
});

const cy = () => ({
  errors: {
    applicant2InterimAppsUseHelpWithFees: {
      required: "Dewiswch 'Byddaf' os ydych yn defnyddio’r gwasanaeth help i dalu ffioedd ar gyfer y cais hwn.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  const translations = languages[content.language]();

  return {
    ...applicant1Content,
    ...translations,
  };
};
