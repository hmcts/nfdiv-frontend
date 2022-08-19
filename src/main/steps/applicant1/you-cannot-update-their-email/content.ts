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
  title: 'Ni allwch ddiweddaru eu cyfeiriad e-bost',
  alreadyAccessed: `Mae eich  ${partner} eisoes wedi edrych ar y cais ar-lein felly ni allwch ddiweddaru eu cyfeiriad e-bost.`,
  anotherNotification: 'Fe gewch hysbysiad arall pan fyddant wedi adolygu a chadarnhau’r cais ar y cyd.',
  wrongPerson:
    'Os ydych yn credu bod yr unigolyn anghywir wedi cael y neges e-bost ac wedi edrych ar y cais, cysylltwch â’r gwasanaeth gan ddefnyddio’r manylion isod.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
