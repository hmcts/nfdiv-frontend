import { GeneralApplicationType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { findOnlineGeneralApplicationsForUser } from '../../../../app/utils/general-application-utils';
import type { CommonContent } from '../../../common/common.content';

const en = ({
  generalApplicationResponseDate,
  generalApplicationFeeRequired,
  generalApplicationDocsAllProvided,
  generalApplicationType,
  referenceNumber,
}: CommonContent) => ({
  title: 'Application submitted',
  introLine1: `You have submitted your application to ${generalApplicationType}.`,
  introLine2:
    'Your application and help with fees reference number will be checked by court staff. You will receive an email notification confirming whether it has been accepted. Check your junk or spam email folder.',
  sendDocumentsHeading: 'Send your evidence to the court',
  sendDocumentsLine1: 'You now need to send us your documents. You can do this in the following ways:',
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
  happensNextHeading: 'What happens next',
  happensNextLine1: `${
    !generalApplicationFeeRequired && generalApplicationDocsAllProvided
      ? 'If your help with fees reference number is accepted, the court will'
      : 'The court will now'
  } review your application. We will email you ${
    generalApplicationFeeRequired && generalApplicationDocsAllProvided ? `by ${generalApplicationResponseDate} ` : ''
  }to let you know whether your application has been successful.`,
  happensNextLine2: 'If your application is approved, it normally takes 6-8 weeks to complete a search.',
  returnToHub: 'Return to your account',

  // Application type specific content overrides:
  contentOverrides: {
    disclosureViaDwp: {
      title: 'Application submitted',
      introLine1: 'You have submitted your application to search government records.',
    },
  },
});

// @TODO Welsh
const cy: typeof en = ({
  generalApplicationResponseDate,
  generalApplicationFeeRequired,
  generalApplicationDocsAllProvided,
  generalApplicationType,
  referenceNumber,
  isDivorce,
  partner,
}: CommonContent) => ({
  title: "Cais wedi'i gyflwyno",
  introLine1: `Rydych wedi cyflwyno eich cais i ${generalApplicationType}.`,
  introLine2:
    "Bydd eich cais a'ch cyfeirnod help i dalu ffioedd yn cael eu gwirio gan staff y llys. Byddwch yn cael hysbysiad e-bost yn cadarnhau a yw wedi’i dderbyn. Gwiriwch eich ffolder junk neu spam.",
  sendDocumentsHeading: 'Anfon eich tystiolaeth i’r llys',
  sendDocumentsLine1: 'Nawr mae arnoch angen anfon eich dogfennau atom. Gallwch wneud hyn trwy un o’r ffyrdd canlynol:',
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
  happensNextLine1: `${
    !generalApplicationFeeRequired && generalApplicationDocsAllProvided
      ? 'Os derbynnir eich cyfeirnod help i dalu ffioedd, bydd y llys yn'
      : 'Bydd y llys yn awr'
  } adolygu eich cais. Byddwn yn anfon e-bost atoch i roi ${
    generalApplicationFeeRequired && generalApplicationDocsAllProvided ? `erbyn ${generalApplicationResponseDate} ` : ''
  }gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus.`,
  happensNextLine2: `Byddwn yn anfon e-bost atoch ${
    generalApplicationFeeRequired && generalApplicationDocsAllProvided
      ? `erbyn ${generalApplicationResponseDate} i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus`
      : 'i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus'
  }.`,
  returnToHub: 'Dychwelyd i sgrin yr hyb',
  // Application type specific content overrides:
  contentOverrides: {
    disclosureViaDwp: {
      title: 'Application submitted',
      introLine1: 'You have submitted your application to search government records.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const defaultTranslations = languages[content.language](content);
  const generalApplications = findOnlineGeneralApplicationsForUser(content.userCase, content.isApplicant2);
  const mostRecentApplication = generalApplications?.[generalApplications.length - 1];
  const applicationType = mostRecentApplication?.generalApplicationType as GeneralApplicationType;

  const contentOverrides = defaultTranslations.contentOverrides[applicationType] || {};

  return {
    ...defaultTranslations,
    ...contentOverrides,
  };
};
