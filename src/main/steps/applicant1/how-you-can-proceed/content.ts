import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent as columnGenerateContent } from '../hub-page/right-column/content';

const en = ({ isDivorce, marriage, civilPartnership, partner, userCase, telephoneNumber }: CommonContent) => ({
  title: `How to proceed with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  line1: `The court usually needs to hear from both parties in a ${
    isDivorce ? marriage : civilPartnership
  } before it can
   ${
     isDivorce ? 'grant a divorce' : 'end a civil partnership'
   }. It’s therefore important that your ${partner} responds to your application.`,
  line2: `The simplest way to proceed is for you to contact your ${partner} and ask them to respond, if it’s safe to do so.
  They can still respond, even though the deadline has passed.`,
  line3:
    'If they still do not respond then you can choose one of the following options to progress your application, depending on your situation.',
  anotherEmailAddress: `I have another email address or postal address for my ${partner}`,
  emailButNotPostal: 'I have their email address but not their postal address',
  needToSearchForAddress: `I need to search government records for my ${partner}'s postal address`,
  alternativeService: `${getFee(config.get('fees.alternativeService'))}`,
  searchForAddress: `${getFee(config.get('fees.searchForAddress'))}`,
  courtBailiffService: `${getFee(config.get('fees.courtBailiffService'))}`,
  deemedService: `${getFee(config.get('fees.deemedService'))}`,
  dispensedService: `${getFee(config.get('fees.dispensedService'))}`,
  thinkPartnerChoosingNotToRespond: `I think my ${partner} is receiving the application but is choosing not to respond`,
  evidencePartnerNotResponded: `I have evidence that my ${partner} has received the application, but will not or cannot respond`,
  triedEveryWayToDeliver: "I've tried every possible way of delivering the application",
  dueDate: `${getFormattedDate(dayjs(userCase.issueDate).add(config.get('dates.arrangeProcessServiceDays'), 'day'))}`,
  telephoneNumber,
});

// @TODO translations
const cy: typeof en = en;

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
  const translations = languages[content.language](content);
  return {
    ...translations,
    ...columnGenerateContent(content),
    form,
  };
};
