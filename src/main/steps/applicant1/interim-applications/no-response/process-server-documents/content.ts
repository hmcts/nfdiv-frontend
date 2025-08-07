import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: 'Documents to give to your process server',
  applicationDownload: {
    reference: 'Divorce-Application',
    link: `/downloads/${isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'}`,
    text: `View the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} (PDF)`,
  },
  applicant2NopDownload: {
    reference: 'Notice of Proceedings',
    link: '/downloads/applicant2-notice-of-proceedings',
    text: 'View the respondent notice of proceedings (PDF)',
  },
  d10Download: {
    reference: 'D10',
    link: '/downloads/d10',
    text: 'View the D10 document (PDF)',
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce }: CommonContent) => ({
  title: 'Documents to give to your process server',
  applicationDownload: {
    reference: 'Divorce-Application',
    link: `/downloads/${isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'}`,
    text: `View the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} (PDF)`,
  },
  applicant2NopDownload: {
    reference: 'Notice of Proceedings',
    link: '/downloads/applicant2-notice-of-proceedings',
    text: 'View the respondent notice of proceedings (PDF)',
  },
  d10Download: {
    reference: 'D10',
    link: '/downloads/d10',
    text: 'View the D10 document (PDF)',
  },
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
