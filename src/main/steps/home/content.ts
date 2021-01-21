import { LANGUAGE_PREFERENCE_URL } from '../urls';

const en = {
  mainText: {
    divorce: 'Let\'s get our divorce on!',
    civil: 'Time to end that civil partnership!'
  },
  linkText: 'Click to go next'
};

const cy: typeof en = {
  mainText: {
    divorce: 'Let\'s get our divorce on!',
    civil: 'Time to end that civil partnership!'
  },
  linkText: 'Welsh link text'
};

const common = {
  link: LANGUAGE_PREFERENCE_URL
};

export const homeContent = { en, cy, common };
