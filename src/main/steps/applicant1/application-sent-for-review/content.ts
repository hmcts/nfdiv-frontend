import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';

dayjs.extend(advancedFormat);

const en = ({ partner, formState }: CommonContent) => ({
  title: `Your answers have been sent to your ${partner} to review`,
  sentTo: `Your answers have been sent to your ${partner} at the following email address:`,
  theyShouldReviewBy: 'They should review them and provide some of their own information by',
  reviewDate: formState?.dueDate || dayjs().add(2, 'weeks').format('MMMM Do YYYY'),
  line3:
    'You will receive a notification when they have reviewed. If they do not review then you will be told what you can do to progress the application.',
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
