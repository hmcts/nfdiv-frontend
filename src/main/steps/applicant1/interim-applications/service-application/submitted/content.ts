import { AlternativeServiceType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import type { CommonContent } from '../../../../common/common.content';

const en = ({
  serviceApplicationResponseDate,
  serviceApplicationFeeRequired,
  serviceApplicationDocsAllProvided,
  serviceApplicationType,
  referenceNumber,
  isDivorce,
  partner,
  userCase,
}: CommonContent) => ({
  title: 'Application submitted',
  introLine1: `You have submitted your application for ${serviceApplicationType}.`,
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
    !serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
      ? 'If your help with fees reference number is accepted, the'
      : 'The'
  } court will review your application and any evidence you have submitted.${
    ![AlternativeServiceType.ALTERNATIVE_SERVICE, AlternativeServiceType.DISPENSED].includes(
      userCase?.alternativeServiceType as AlternativeServiceType
    )
      ? ` If your application is successful, your ${
          isDivorce ? 'divorce' : 'dissolution'
        } will proceed without a response from your ${partner}. We will then tell you when you can apply for your conditional order.`
      : ''
  }`,
  happensNextLine2: `We will email you ${
    serviceApplicationFeeRequired && serviceApplicationDocsAllProvided ? `by ${serviceApplicationResponseDate} ` : ''
  }to let you know whether your application has been successful.`,
  returnToHub: 'Return to hub screen',

  // Application type specific content overrides:
  contentOverrides: {
    alternativeService: {
      happensNextLine1: `${
        !serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? 'If your help with fees reference number is accepted, the'
          : 'The'
      } court will review your request and any evidence you have submitted.`,
      happensNextLine2: `We will email you ${
        serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? `by ${serviceApplicationResponseDate} `
          : ''
      }to let you know whether your request has been successful.`,
      happensNextLine3:
        'If your application is successful, we will email you detailed information about what to do next.',
    },
    dispensed: {
      introLine1: 'You have applied to dispense with service.',
    },
    bailiff: {
      title: 'Request submitted',
      introLine1: 'You have submitted your request for bailiff service.',
      happensNextLine1: `${
        !serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? 'If your help with fees reference number is accepted, the'
          : 'The'
      } court will review your request and any evidence you have submitted.`,
      happensNextLine2: `We will email you ${
        serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? `by ${serviceApplicationResponseDate} `
          : ''
      }to let you know whether your request has been successful.`,
      happensNextLine3:
        'If the judge approves your request for bailiff service, it will be passed to the bailiff for review.',
      sendDocumentsHeading: `Send your ${partner}'s photo to the court`,
      sendDocumentsLine1: `You can send us your ${partner}'s photo in the following ways:`,
      uploadGuidance: 'Make sure your picture:',
      uploadGuidanceBulletOne: `Clearly shows your ${partner}'s face`,
      uploadGuidanceBulletTwo: 'Does not include any other people, to avoid confusion',
      uploadGuidanceBulletThree: 'Does not include any children',
    },
  },
});

// @TODO Welsh
const cy: typeof en = ({
  serviceApplicationResponseDate,
  serviceApplicationFeeRequired,
  serviceApplicationDocsAllProvided,
  serviceApplicationType,
  referenceNumber,
  isDivorce,
  partner,
  userCase,
}: CommonContent) => ({
  title: "Cais wedi'i gyflwyno",
  introLine1: `Rydych wedi cyflwyno eich cais am ${serviceApplicationType}.`,
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
    !serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
      ? 'Os derbynnir eich cyfeirnod help i dalu ffioedd, bydd'
      : 'Bydd'
  } y llys yn adolygu’ch cais ac unrhyw dystiolaeth rydych wedi’i chyflwyno.${
    ![AlternativeServiceType.ALTERNATIVE_SERVICE, AlternativeServiceType.DISPENSED].includes(
      userCase?.alternativeServiceType as AlternativeServiceType
    )
      ? ` Os bydd eich cais yn llwyddiannus, bydd eich ${
          isDivorce ? 'ysgariad' : 'diddymiad'
        } yn mynd yn ei flaen heb ymateb gan eich ${partner}. Yna byddwn yn dweud wrthych pryd gallwch wneud cais am eich gorchymyn amodol.`
      : ''
  }`,
  happensNextLine2: `Byddwn yn anfon e-bost atoch ${
    serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
      ? `erbyn ${serviceApplicationResponseDate} i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus`
      : 'i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus'
  }.`,
  returnToHub: 'Dychwelyd i sgrin yr hyb',
  // Application type specific content overrides:
  contentOverrides: {
    alternativeService: {
      happensNextLine1: `${
        !serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? 'Os derbynnir eich cyfeirnod help i dalu ffioedd, bydd'
          : 'Bydd'
      } y llys yn adolygu’ch cais ac unrhyw dystiolaeth rydych wedi’i chyflwyno.`,
      happensNextLine2: `Byddwn yn anfon e-bost atoch ${
        serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? `erbyn ${serviceApplicationResponseDate} i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus`
          : 'i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus'
      }.`,
      happensNextLine3:
        'Os bydd eich cais yn llwyddiannus, byddwn yn anfon e-bost atoch i ddweud wrthych am beth i’w wneud nesaf.',
    },
    dispensed: {
      introLine1: 'Rydych wedi gwneud cais i hepgor cyflwyno.',
    },
    bailiff: {
      title: 'Cais wedi’i gyflwyno',
      introLine1: 'Rydych wedi cyflwyno eich cais am wasanaeth cyflwyno gan feili.',
      happensNextLine1: `${
        !serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? 'Os derbynnir eich cyfeirnod help i dalu ffioedd, bydd'
          : 'Bydd'
      } y llys yn adolygu’ch cais ac unrhyw dystiolaeth rydych wedi’i chyflwyno.`,
      happensNextLine2: `Byddwn yn anfon e-bost atoch ${
        serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
          ? `erbyn ${serviceApplicationResponseDate} `
          : ''
      }i roi gwybod i chi p’un a yw eich cais wedi bod yn llwyddiannus.`,
      happensNextLine3:
        'Os bydd y barnwr yn cymeradwyo eich cais am wasanaeth cyflwyno gan feili, bydd yn cael ei drosglwyddo i’r beili ar gyfer adolygu.',
      sendDocumentsHeading: `Anfonwch lun o’ch ${partner} i’r llys`,
      sendDocumentsLine1: `Gallwch anfon llun o’ch ${partner} atom yn y ffyrdd canlynol:`,
      uploadGuidance: 'Gwnewch yn siŵr bod eich llun:',
      uploadGuidanceBulletOne: `yn dangos llun eich ${partner} yn glir.`,
      uploadGuidanceBulletTwo: 'ddim yn cynnwys unrhyw bobl eraill, i osgoi dryswch',
      uploadGuidanceBulletThree: 'ddim yn cynnwys unrhyw blant',
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const defaultTranslations = languages[content.language](content);
  const serviceType = content.userCase?.alternativeServiceType as AlternativeServiceType;

  const contentOverrides = defaultTranslations.contentOverrides[serviceType] || {};

  return {
    ...defaultTranslations,
    ...contentOverrides,
  };
};
