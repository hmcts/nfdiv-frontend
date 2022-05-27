import { TranslationFn } from '../../../app/controller/GetController';
import { SWITCH_TO_SOLE_APPLICATION } from '../../urls';

const en = ({ partner }) => ({
  title: `Your ${partner} has not yet responded`,
  line1: `Your ${partner} has not yet responded. The quickest way to progress your application is to contact them and ask them to respond, if it’s safe to do so. They can still respond, even though the deadline has passed.`,
  readMore: 'If you do not think they will respond',
  line2: `If you think that your ${partner} will not respond then you can create a new ‘sole application’.`,
  line3: `This means that you will submit the application on your own, and your ${partner} will respond to it after it has been submitted and checked by the court.`,
  line4: `You can <a href="${SWITCH_TO_SOLE_APPLICATION}" class="govuk-link">create a new application here.</a>`,
});

const cy: typeof en = ({ partner }) => ({
  title: `Nid yw eich ${partner} wedi ymateb`,
  line1: `Nid yw eich ${partner} wedi ymateb. Os ydych eisiau gwneud cais ar y cyd yna mae’n rhaid iddynt ymuno a chadarnhau’r cais cyn iddo gael ei gyflwyno. Dylech gysylltu â nhw a gofyn iddynt wirio eu negeseuon e-bost a chadarnhau’r cais, os yw’n ddiogel i wneud hynny.`,
  readMore: 'Os ydych yn meddwl na fyddant yn ymateb',
  line2: `Os ydych yn meddwl na fydd eich ${partner} yn ymuno â’r cais yna gallwch greu ‘cais unigol’ newydd.`,
  line3: `Mae hyn yn golygu y byddwch yn cyflwyno’r cais ar eich pen eich hun, a bydd eich ${partner} yn ymateb iddo ar ôl iddo gael ei gyflwyno a’i wirio gan y llys.`,
  line4: `You can <a href="${SWITCH_TO_SOLE_APPLICATION}" class="govuk-link">create a new application here.</a>`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
