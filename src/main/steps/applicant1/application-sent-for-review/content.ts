import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';

dayjs.extend(advancedFormat);

const en = ({ partner, hasAppliedForHWF }: CommonContent) => ({
  title: `Your ${partner} needs to confirm your joint application`,
  sentTo: `Your ${partner} needs to confirm your joint application. They have been sent an email inviting them to review your combined answers and confirm the application. They should do this by `,
  reviewDate: dayjs().add(2, 'weeks').format('MMMM Do YYYY'),
  line3: `When they have confirmed${hasAppliedForHWF ? '' : ' and paid'}, then the application will be submitted.`,
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
