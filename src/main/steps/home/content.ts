import { LANGUAGE_PREFERENCE_URL } from '../urls';

const en = {
  linkText: 'Click to go next'
};

const cy: typeof en = {
  linkText: 'Welsh link text'
};

const common = {
  link: LANGUAGE_PREFERENCE_URL
};

export const homeContent = { en, cy, common };
