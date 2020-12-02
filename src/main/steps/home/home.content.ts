import { Steps } from '../steps';

const en = {
  linkText: 'Click to go next'
};

const cy: typeof en = {
  linkText: 'Welsh link text'
};

const common = {
  link: Steps.FIRST_PAGE
};

export const homeContent = { en, cy, common };
