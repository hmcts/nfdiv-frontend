import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, referenceNumber }: CommonContent) => ({
  title: 'Making an application to the court',
  makeAnApplication: {
    header: 'Making an application to the court',
    line1: `If you need to make an application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}, you can do so by completing a paper form.`,
    line2: 'To make a general application, complete Form D11',
    line3: 'You can download the form from GOV.UK:',
    d11Text:
      'Apply for an interim order as part of divorce, dissolution or separation court proceedings: Form D11 - GOV.UK',
    d11Link: config.get('govukUrls.d11Form'),
    line4: 'You can send the completed form to the court in the following ways:',
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

const cy = ({ isDivorce, referenceNumber }: CommonContent) => ({
  title: 'Making an application to the court',
  makeAnApplication: {
    header: 'Making an application to the court',
    line1: `If you need to make an application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}, you can do so by completing a paper form.`,
    line2: 'To make a general application, complete Form D11',
    line3: 'You can download the form from GOV.UK:',
    d11Text:
      'Apply for an interim order as part of divorce, dissolution or separation court proceedings: Form D11 - GOV.UK',
    d11Link: config.get('govukUrls.d11Form'),
    line4: 'You can send the completed form to the court in the following ways:',
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
