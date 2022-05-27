import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ partner }) => ({
  title: `Your comments have been sent to your ${partner}`,
  line1: `Your ${partner} has been sent an email telling them you believe some of the information in the joint application is incorrect. They will be able to see your comments. When they have changed the information then it will be sent back to you for review.`,
  line2: 'Your joint application cannot be submitted until you both agree on the information.',
});

const cy = ({ partner }) => ({
  title: `Mae eich sylwadau wedi cael eu hanfon at eich ${partner}`,
  line1: `Mae eich ${partner} wedi cael neges e-bost yn dweud wrthynt eich bod yn credu bod rhywfaint o’r wybodaeth yn y cais ar y cyd yn anghywir. Byddant yn gallu gweld eich sylwadau. Pan fyddant wedi newid yr wybodaeth, bydd y cais yn cael ei anfon yn ôl atoch i’w adolygu.`,
  line2: 'Ni ellir cyflwyno eich cais ar y cyd nes bydd y ddau ohonoch yn cytuno ar yr wybodaeth.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
