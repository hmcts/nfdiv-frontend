import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { formattedCaseId } from '../../common/content.utils';

const en = ({
  userCase,
  partner,
  feedbackLink,
}: CommonContent) => ({
  title: `Your ${partner} needs to confirm your joint application`,
  yourReferenceNumber: 'Your reference number',
  subHeading1: 'What happens next',
  line1: `Your ${partner} needs to confirm your joint application. They have been sent an email inviting them to review your combined answers and confirm the application. They should do this by`,
  reviewDate: getFormattedDate(userCase.dueDate),
  subHeading2: 'Send your documents to the court',
  line2: 'When they have confirmed and paid, then the application will be submitted.',
  feedback: "We'd like to hear your thoughts",
  feedbackLine1: 'Complete this short, 5-minute survey to help improve our services for you and others.',
  feedbackLine2: {
    part1: 'Leave your feedback',
    link: feedbackLink,
  },
  useOurOnlineForm: 'Use our online form',
});

// @TODO Welsh
const cy: typeof en = ({
  userCase,
  partner,
  feedbackLink,
}: CommonContent) => ({
  title: `Your ${partner} needs to confirm your joint application`,
  yourReferenceNumber: 'Your reference number',
  subHeading1: 'What happens next',
  line1: `Your ${partner} needs to confirm your joint application. They have been sent an email inviting them to review your combined answers and confirm the application. They should do this by `,
  reviewDate: getFormattedDate(userCase.dueDate),
  subHeading2: 'Send your documents to the court',
  line2: 'When they have confirmed and paid, then the application will be submitted.',
  feedback: "We'd like to hear your thoughts",
  feedbackLine1: 'Complete this short, 5-minute survey to help improve our services for you and others.',
  feedbackLine2: {
    part1: 'Leave your feedback',
    link: feedbackLink,
  },
  useOurOnlineForm: 'Use our online form',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const referenceNumber = formattedCaseId(userCase.id);

  return {
    ...languages[language]({ ...content, referenceNumber }),
    referenceNumber
  };
};
