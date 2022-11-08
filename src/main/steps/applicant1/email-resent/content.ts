import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';
import { THEIR_EMAIL_ADDRESS, YOU_CANNOT_UPDATE_THEIR_EMAIL } from '../../urls';

const en = ({ partner, userCase }: CommonContent) => ({
  title: 'The email has been resent',
  newAccessDetails: `Your ${partner} will only be able to access the application using the access details from the new email. The access details from the first email are now invalid.`,
  reviewApplicationDeadline: `They should review your application and provide some further information by ${getFormattedDate(
    userCase.dueDate
  )}.`,
  yourNotification:
    'You will receive a notification when they have reviewed. If they do not review then you will be told what you can do to progress the application.',
  updatePartnersEmailAddress: {
    part1: 'If you need to, you can ',
    part2: `update your ${partner}'s email address and resend the email`,
    part3: '.',
    link: isApplicant2EmailUpdatePossible(userCase) ? THEIR_EMAIL_ADDRESS : YOU_CANNOT_UPDATE_THEIR_EMAIL,
  },
});

const cy: typeof en = ({ partner, userCase }: CommonContent) => ({
  title: 'Mae’r neges e-bost wedi’i hail-anfon',
  newAccessDetails: `Bydd rhaid i’ch ${partner} ddefnyddio’r manylion mynediad sydd wedi’u cynnwys yn y neges e-bost newydd i gael mynediad i’r cais. Mae’r manylion mynediad sydd wedi’u cynnwys yn y neges e-bost gyntaf nawr yn annilys.`,
  reviewApplicationDeadline: `Dylent adolygu’ch cais a darparu’r wybodaeth y gofynnir amdani erbyn ${getFormattedDate(
    userCase.dueDate
  )}.`,
  yourNotification:
    'Byddwch yn cael hysbysiad pan fyddant wedi adolygu’r cais. Os na fyddant yn ei adolygu, fe gewch wybod beth allwch chi ei wneud i symud y cais yn ei flaen.',
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
