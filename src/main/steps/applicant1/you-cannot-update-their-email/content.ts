import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'You cannot update their email address',
  alreadyAccessed: `Your ${partner} has already accessed the case online so you cannot update their email address.`,
  anotherNotification:
    'You will receive another notification when they have reviewed and confirmed the joint application.',
  wrongPerson:
    'If you think the wrong person received the email and accessed the case, please contact the service using the details below.',
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'You cannot update their email address',
  alreadyAccessed: `Your ${partner} has already accessed the case online so you cannot update their email address.`,
  anotherNotification:
    'You will receive another notification when they have reviewed and confirmed the joint application.',
  wrongPerson:
    'If you think the wrong person received the email and accessed the case, please contact the service using the details below.',
}); //todo

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  return {
    ...translation,
  };
};
