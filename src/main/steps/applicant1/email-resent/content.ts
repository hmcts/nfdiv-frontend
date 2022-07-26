import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';
import { THEIR_EMAIL_ADDRESS } from '../../urls';

const en = ({ partner, userCase }: CommonContent) => ({
  title: 'The email has been resent',
  newAccessDetails: `Your ${partner} will only be able to access the application using the access details from the new email. The access details from the first email are now invalid.`,
  reviewApplicationDeadline: `They should review your application and provide some further information by ${userCase.dueDate}.`,
  yourNotification:
    'You will receive a notification when they have reviewed. If they do not review then you will be told what you can do to progress the application.',
  updatePartnersEmailAddress: {
    part1: 'If you need to, you can ',
    part2: `update your ${partner}'s email address and resend the email`,
    part3: '.',
    link: THEIR_EMAIL_ADDRESS,
  },
});

const cy: typeof en = ({ partner, userCase }: CommonContent) => ({
  title: 'The email has been resent',
  newAccessDetails: `Your ${partner} will only be able to access the application using the access details from the new email. The access details from the first email are now invalid.`,
  reviewApplicationDeadline: `They should review your application and provide some further information by ${userCase.dueDate}.`,
  yourNotification:
    'You will receive a notification when they have reviewed. If they do not review then you will be told what you can do to progress the application.',
  updatePartnersEmailAddress: {
    part1: 'If you need to, you can ',
    part2: `update your ${partner}'s email address and resend the email`,
    part3: '.',
    link: THEIR_EMAIL_ADDRESS,
  }, //todo
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  const isApplicant2EmailUpdatePossibleAnswer = isApplicant2EmailUpdatePossible(content.userCase);
  return {
    ...translation,
    isApplicant2EmailUpdatePossibleAnswer,
  };
};
