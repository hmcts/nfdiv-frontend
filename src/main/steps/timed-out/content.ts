const en = {
  title: 'You were signed out to protect your privacy',
  line1: 'Your application was inactive for more than 20 minutes so you were signed out.',
  line2: 'Your progress was saved.',
  signBackInAndContinue: 'Sign back in and continue',
  pageHeader: {
    divorce: 'Apply for a divorce',
    dissolution: 'Apply to end a civil partnership',
  },
};

const cy: typeof en = {
  ...en,
};

export const timedOutContent = { en, cy, common: {} };
