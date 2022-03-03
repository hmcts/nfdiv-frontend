import { TranslationFn } from '../../app/controller/GetController';
import { SWITCH_TO_SOLE_APPLICATION } from '../urls';

const en = ({ partner }) => ({
  title: `Your ${partner} has not yet responded`,
  line1: `Your ${partner} has not yet responded. The quickest way to progress your application is to contact them and ask them to respond, if it’s safe to do so. They can still respond, even though the deadline has passed.`,
  readMore: 'If you do not think they will respond',
  line2: `If you think that your ${partner} will not respond then you can create a new ‘sole application’.`,
  line3: `This means that you will submit the application on your own, and your ${partner} will respond to it after it has been submitted and checked by the court.`,
  switchToSoleLink: {
    part1: 'You can',
    part2: 'create a new application here.',
    link: SWITCH_TO_SOLE_APPLICATION,
  },
});

const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
