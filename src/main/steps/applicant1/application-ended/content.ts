import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = {
  title: 'This joint application has ended',
  line1:
    'You cannot access this joint application because it has been ended by either you or the other applicant.' +
    ' You can contact them and ask them why, if it’s safe to do so.',
  line2: 'Either of you can submit a new application, if you want to.',
  exitLink: 'Exit service',
};

const cy = {
  title: 'Mae’r cais ar y cyd hwn wedi dod i ben',
  line1:
    'Ni allwch gael mynediad at y cais ar y cyd hwn oherwydd mae wedi cael ei ddiweddu un ai gennych chi neu’r ceisydd arall. ' +
    'Gallwch gysylltu â nhw a gofyn pam, os yw’n ddiogel i chi wneud hynny.',
  line2: 'Gall y ddau ohonoch gyflwyno cais newydd, os ydych yn dymuno gwneud hynny.',
  exitLink: 'Gadael y gwasanaeth',
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
