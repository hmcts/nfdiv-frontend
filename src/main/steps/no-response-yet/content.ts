import { TranslationFn } from '../../app/controller/GetController';
import { SWITCH_TO_SOLE_APPLICATION } from '../urls';

const en = ({ partner }) => ({
  title: `Your ${partner} has not responded`,
  line1: `Your ${partner} has still not responded. If you want to do a joint application then they have to join and confirm the application before it’s submitted. You should contact them and ask them to check their emails and confirm the application, if it’s safe to do so.`,
  readMore: 'If you do not think they will respond',
  switchToSoleLink: {
    part1: `If you do not think that your ${partner} will join the application then you can`,
    part2: 'create a new ‘sole application’.',
    link: SWITCH_TO_SOLE_APPLICATION,
  },
  line2: `This means that you will submit the application on your own, and your ${partner} will respond to it after it has been submitted and checked by the court.`,
});

const cy: typeof en = ({ partner }) => ({
  title: `Nid yw eich ${partner} wedi ymateb`,
  line1: `Nid yw eich ${partner} wedi ymateb. Os ydych eisiau gwneud cais ar y cyd yna mae’n rhaid iddynt ymuno a chadarnhau’r cais cyn iddo gael ei gyflwyno. Dylech gysylltu â nhw a gofyn iddynt wirio eu negeseuon e-bost a chadarnhau’r cais, os yw’n ddiogel i wneud hynny.`,
  readMore: 'Os ydych yn meddwl na fyddant yn ymateb',
  switchToSoleLink: {
    part1: 'Os ydych yn meddwl na fydd eich ${partner} yn ymuno â’r cais yna gallwch',
    part2: 'greu ‘cais unigol’ newydd.',
    link: SWITCH_TO_SOLE_APPLICATION,
  },
  line2: `Mae hyn yn golygu y byddwch yn cyflwyno’r cais ar eich pen eich hun, a bydd eich ${partner} yn ymateb iddo ar ôl iddo gael ei gyflwyno a’i wirio gan y llys.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
