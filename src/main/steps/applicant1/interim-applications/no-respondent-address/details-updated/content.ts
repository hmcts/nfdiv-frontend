import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../../../app/case/answers/formatDate';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner, telephoneNumber, userCase }: CommonContent) => ({
  title: 'Details updated',
  line1: `You have successfully updated your ${partner}’s address`,
  whatHappensNext: 'What happens next',
  line2: `Your application will be checked by court staff. We will email you by ${getFormattedDate(
    dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
  )} confirming whether it has been accepted. Check your junk or spam email folders.`,
  line3: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then we’ll tell you what you can do next to progress your application.`,
  line4: `The court will send (serve) the documents to your ${partner}. If you want to do this yourself you can call ${telephoneNumber} to request it.`,
  line5: `You will need to send your ${partner} a copy of the application. They will need to check the information and respond. If they do not respond then we'll tell you what you can do next to progress your application.`,
  line6:
    'Further information concerning service out of the United Kingdom can be obtained from the <a class="govuk-link" target="_blank" href="https://www.gov.uk/guidance/service-of-documents-and-taking-of-evidence">Foreign Process Section (opens in a new tab)</a>.',
  returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,
});

const cy: typeof en = ({ partner, telephoneNumber, userCase }: CommonContent) => ({
  title: 'Details updated',
  line1: `You have successfully updated your ${partner}’s address`,
  whatHappensNext: 'What happens next',
  line2: `Your application will be checked by court staff. We will email you by ${getFormattedDate(
    dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
  )} confirming whether it has been accepted. Check your junk or spam email folders.`,
  line3: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then we’ll tell you what you can do next to progress your application.`,
  line4: `The court will send (serve) the documents to your ${partner}. If you want to do this yourself you can call ${telephoneNumber} to request it.`,
  line5: `You will need to send your ${partner} a copy of the application. They will need to check the information and respond. If they do not respond then we'll tell you what you can do next to progress your application.`,
  line6:
    'Further information concerning service out of the United Kingdom can be obtained from the <a class="govuk-link" target="_blank" href="https://www.gov.uk/guidance/service-of-documents-and-taking-of-evidence">Foreign Process Section (opens in a new tab)</a>.',
  returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  const overseasAddress = content.userCase.applicant2AddressOverseas === YesOrNo.YES;
  return {
    ...translation,
    overseasAddress,
  };
};
