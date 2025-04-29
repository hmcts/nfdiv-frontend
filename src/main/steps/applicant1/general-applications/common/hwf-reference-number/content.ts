import { GeneralApplicationType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { generateCommonContent } from '../../../../common/common.content';

const en = (serviceType: string) => ({
  title: 'Do you have a help with fees reference number?',
  line1: `Your reference number must be unique to this ${serviceType} application. You cannot use a reference number you've used for a previous application.`,
});

// @TODO translations
const cy = (serviceType: string) => ({
  title: 'Do you have a help with fees reference number?',
  line1: `Your reference number must be unique to this ${serviceType} application. You cannot use a reference number you've used for a previous application.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  let serviceType;

  switch (content.userCase.applicant1GeneralApplicationType) {
    case GeneralApplicationType.DEEMED_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.deemed;
      break;
    }
    default: {
      serviceType = '';
    }
  }

  const translations = languages[content.language](serviceType);
  return {
    ...translations,
  };
};
