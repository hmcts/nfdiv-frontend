import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';
import { THEIR_EMAIL_ADDRESS, YOU_CANNOT_UPDATE_THEIR_EMAIL } from '../../urls';

const en = ({ partner, userCase }: CommonContent) => ({
  title: `Your answers have been sent to your ${partner} to review`,
  sentTo: `Your answers have been sent to your ${partner} at the following email address:`,
  theyShouldReviewBy: 'They should review them and provide some further information by:',
  reviewDate: userCase.dueDate,
  line3:
    'You will receive an email notification to confirm when they have reviewed. If they do not review then you will be told what you can do to progress the application.',
  updatePartnersEmailAddress: {
    part1: 'If you need to, you can ',
    part2: `update your ${partner}'s email address and resend the email`,
    part3: '.',
    link: isApplicant2EmailUpdatePossible(userCase) ? THEIR_EMAIL_ADDRESS : YOU_CANNOT_UPDATE_THEIR_EMAIL,
  },
});

const cy: typeof en = ({ partner, userCase }: CommonContent) => ({
  title: `Mae eich atebion wedi cael eu hanfon at eich ${partner} i’w hadolygu`,
  sentTo: `Mae eich atebion wedi cael eu hanfon at eich ${partner} gan ddefnyddio’r cyfeiriad e-bost canlynol:`,
  theyShouldReviewBy: 'Dylent eu hadolygu a darparu gwybodaeth bellach erbyn',
  reviewDate: userCase.dueDate,
  line3:
    'Byddwch yn cael hysbysiad pan fyddant wedi adolygu’ch atebion. Os na fyddant yn eu hadolygu, rhoddir wybod i chi beth allwch ei wneud i symud y cais yn ei flaen.',
  updatePartnersEmailAddress: {
    part1: 'Os oes arnoch angen, gallwch ',
    part2: `ddiweddaru cyfeiriad e-bost eich ${partner} ac ail-anfon y neges e-bost`,
    part3: '.',
    link: isApplicant2EmailUpdatePossible(userCase) ? THEIR_EMAIL_ADDRESS : YOU_CANNOT_UPDATE_THEIR_EMAIL,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
