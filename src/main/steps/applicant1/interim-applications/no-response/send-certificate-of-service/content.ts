import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ isDivorce, partner, referenceNumber }: CommonContent) => ({
  title: 'You need to send the certificate of service to the court',
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
  whatHappensNextHeader: 'What happens next',
  whatHappensNextLine1: `The court will review the certificate of service once received and decide whether your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } can proceed without a response from your ${partner}.`,
  hubUrl: {
    text: 'Return to your account',
    url: HUB_PAGE,
  },
});

const cy = ({ isDivorce, partner, referenceNumber }: CommonContent) => ({
  title: 'You need to send the certificate of service to the court',
  documentsByOnlineForm: 'Anfon dogfennau drwy ddefnyddio ein ffurflen ar-lein',
  documentsByOnlineFormSteps: {
    line1: 'Gallwch anfon lluniau neu sganiau o’ch dogfennau atom trwy ',
    line2: 'llwytho gan ddefnyddio ein ffurflen ar-lein.',
    line3:
      "Gwnewch yn siŵr eich bod yn dilyn y cyfarwyddiadau ar sut i lwytho eich dogfennau'n ofalus neu gellid eu gwrthod, gan arwain at oedi pellach.",
  },
  documentsByPost: 'Anfon eich dogfennau drwy’r post',
  documentsByPostSteps: {
    step1: `Ysgrifennwch eich cyfeirnod ar bob dogfen: ${referenceNumber}`,
    step2: 'Postiwch y dogfennau gwreiddiol i:',
  },
  happensNextHeading: 'Beth fydd yn digwydd nesaf',
  whatHappensNextLine1: `The court will review the certificate of service once received and decide whether your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } can proceed without a response from your ${partner}.`,
  hubUrl: {
    text: 'Dychwelyd i’ch cyfrif',
    url: HUB_PAGE,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return {
    ...translations,
  };
};
