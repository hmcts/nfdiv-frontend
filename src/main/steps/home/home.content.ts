import { FirstPageGet } from '../first-page/first-page.get';

const en = {
  linkText: 'Click to go next'
};

const cy: typeof en = {
  linkText: 'Welsh link text'
};

const common = {
  link: FirstPageGet.URL
};

export const homeContent = { en, cy, common };
