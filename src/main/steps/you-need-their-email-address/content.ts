import { TranslationFn } from '../../app/controller/GetController';
import { HOW_DO_YOU_WANT_TO_APPLY, SAVE_AND_SIGN_OUT } from '../../steps/urls';

import type { CommonContent } from '../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'You need to get their email address',
  line1: `You need your ${partner}’s email address so they can join this online joint application. You should <a href="${SAVE_AND_SIGN_OUT}">save and sign out</a> and return when you have it.`,
  line2:
    'If you know you will not be able to get their email address and you want to do a joint application, then you need to apply using the <a href="https://www.gov.uk/government/publications/form-d8-application-for-a-divorce-dissolution-or-to-apply-for-a-judicial-separation-order">paper application form</a>.',
  line3: `If you know you will not be able to get their email address and you want to apply online, then you need to <a href="${HOW_DO_YOU_WANT_TO_APPLY}">apply as a sole applicant</a>.`,
});

// @TODO translations
const cy = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
