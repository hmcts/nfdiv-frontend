import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Your Help With Fees Application has been refused',
  line1: `Your joint application has been agreed by you and your ${partner}.`,
  line2:
    'The Help With Fees application has been refused and the court will contact you on what you need to do to progress your application.',
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Mae eich cais am Help i Dalu Ffioedd wedi cael ei wrthod',
  line1: `Mae eich cais ar y cyd wedi'i gytuno gennych chi a'ch ${partner} sifil.`,
  line2:
    'Mae’r cais am Help i Dalu Ffioedd wedi’i wrthod a bydd y llys yn cysylltu â chi ynghylch beth sydd angen i chi ei wneud i barhau â’ch cais.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
