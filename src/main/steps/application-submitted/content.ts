import { TranslationFn } from '../../app/controller/GetController';

const en = { title: 'Application submitted...' };

const cy: typeof en = en;

const languages = { en, cy };

export const generateContent: TranslationFn = content => languages[content.language];
