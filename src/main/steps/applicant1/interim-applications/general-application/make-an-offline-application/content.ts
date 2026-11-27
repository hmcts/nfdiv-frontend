import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';

const en = ({ referenceNumber }: CommonContent) => ({
  title: 'Making an application to the court',
  makeAnApplication: {
    header: 'Making an application to the court',
    line1Part1: 'If you need to submit a general application to the court, then you can ',
    line1Part2: 'apply by completing a paper D11 form (opens in a new tab).',
    d11Link: config.get('govukUrls.d11Form'),
    line2: 'You can send the completed form to the court in the following ways:',
  },
  documentsByOnlineForm: 'Sending documents using our online form',
  documentsByOnlineFormSteps: {
    line1: 'You can send photographs or scans of your documents to us by',
    line2: 'uploading them using our online form.',
    line3:
      'Make sure you follow the instructions on how to upload your documents carefully or they could be rejected, resulting in further delays.',
  },
  documentsByPost: 'Sending your documents by post',
  documentsByPostSteps: {
    step1: `Write your reference number on each document: ${referenceNumber}`,
    step2: 'Post the original documents to:',
  },
  documentsByPostMoreDetails:
    'Make sure you also include in your response a return address. Any cherished documents you send, such as marriage certificates, birth certificates, passports or deed polls will be returned to you. Other documents will not be returned.',
  whatHappensNext: {
    header: 'What happens next',
    line1:
      'Once the court receives your general application, we will review it and contact you to let you know the next steps.',
  },
  returnToHub: 'Return to hub screen',
});

const cy = ({ referenceNumber }: CommonContent) => ({
  title: 'Making an application to the court',
  makeAnApplication: {
    header: 'Making an application to the court',
    line1Part1: 'If you need to submit a general application to the court, then you can ',
    line1Part2: 'apply by completing a paper D11 form (opens in a new tab).',
    d11Link: config.get('govukUrls.d11Form'),
    line2: 'You can send the completed form to the court in the following ways:',
  },
  documentsByOnlineForm: 'Sending documents using our online form',
  documentsByOnlineFormSteps: {
    line1: 'You can send photographs or scans of your documents to us by',
    line2: 'uploading them using our online form.',
    line3:
      'Make sure you follow the instructions on how to upload your documents carefully or they could be rejected, resulting in further delays.',
  },
  documentsByPost: 'Sending your documents by post',
  documentsByPostSteps: {
    step1: `Write your reference number on each document: ${referenceNumber}`,
    step2: 'Post the original documents to:',
  },
  documentsByPostMoreDetails:
    'Make sure you also include in your response a return address. Any cherished documents you send, such as marriage certificates, birth certificates, passports or deed polls will be returned to you. Other documents will not be returned.',
  whatHappensNext: {
    header: 'What happens next',
    line1:
      'Once the court receives your general application, we will review it and contact you to let you know the next steps.',
  },
  returnToHub: 'Return to hub screen',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isRespondent = content.isApplicant2 && !content.isJointApplication;
  const isSoleApplicant = !content.isApplicant2 && !content.isJointApplication;
  const hasCOBeenGranted = !!content.userCase.coGrantedDate;
  return {
    ...translations,
    caseHasBeenIssued: content.caseHasBeenIssued,
    isRespondent,
    isSoleApplicant,
    hasCOBeenGranted,
  };
};
