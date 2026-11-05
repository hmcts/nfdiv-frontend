import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../../../app/case/answers/formatDate';
import { DocumentType, State, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({
  partner,
  telephoneNumber,
  userCase,
  isDivorce,
  referenceNumber,
  applicationHasBeenPaidFor,
}: CommonContent) => ({
  title: 'Details updated',
  line1: `You have successfully updated your ${partner}’s address`,
  whatHappensNext: 'What happens next',
  line2:
    userCase.state === State.AwaitingHWFEvidence
      ? 'Your application will be checked by court staff. You will receive an email notification confirming whether it has been accepted. Check your junk or spam email folder.'
      : `Your application ${
          userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES && !applicationHasBeenPaidFor
            ? 'and help with fees reference number '
            : ''
        } will be checked by court staff. You will receive an email notification by ${getFormattedDate(
          dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
        )} confirming whether it has been accepted. Check your junk or spam email folder.`,
  line3: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then we’ll tell you what you can do next to progress your application.`,
  line4: `The court will send (serve) the documents to your ${partner}. If you want to do this yourself you can call ${telephoneNumber} to request it.`,
  line5: `You will need to send your ${partner} a copy of the application. They will need to check the information and respond. If they do not respond then we'll tell you what you can do next to progress your application.`,
  line6:
    'Further information concerning service out of the United Kingdom can be obtained from the <a class="govuk-link" target="_blank" href="https://www.gov.uk/guidance/service-of-documents-and-taking-of-evidence">Foreign Process Section (opens in a new tab)</a>.',
  returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,
  awaitingDocuments: {
    subHeading1: 'What you need to do now',
    line1: 'Your application will not be processed until you have done the following:',
    subHeading2: 'Send your documents to the court',
    line2: 'You need to send the following documents to the court because you did not upload them earlier:',
    documents: {
      [DocumentType.MARRIAGE_CERTIFICATE]:
        userCase.inTheUk === YesOrNo.NO
          ? `Your original foreign ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
          : `Your original ${isDivorce ? 'marriage' : 'civil partnership'} certificate or a certified copy`,
      [DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION]: `A certified translation of your foreign ${
        isDivorce ? 'marriage' : 'civil partnership'
      } certificate`,
      [DocumentType.NAME_CHANGE_EVIDENCE]: `Proof showing why your name or your ${partner}'s name is written differently on your ${isDivorce ? 'marriage' : 'civil partnership'} certificate. For example, a government issued ID, a passport, driving license, birth certificate, deed poll or 'statutory declaration'`,
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
  },
});

const cy: typeof en = ({
  partner,
  telephoneNumber,
  userCase,
  isDivorce,
  referenceNumber,
  applicationHasBeenPaidFor,
}: CommonContent) => ({
  title: 'Details updated',
  line1: `You have successfully updated your ${partner}’s address`,
  whatHappensNext: 'What happens next',
  line2:
    userCase.state === State.AwaitingHWFEvidence
      ? 'Your application will be checked by court staff. You will receive an email notification confirming whether it has been accepted. Check your junk or spam email folder.'
      : `Your application ${
          userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES && !applicationHasBeenPaidFor
            ? 'and help with fees reference number '
            : ''
        } will be checked by court staff. You will receive an email notification by ${getFormattedDate(
          dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
        )} confirming whether it has been accepted. Check your junk or spam email folder.`,
  line3: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then we’ll tell you what you can do next to progress your application.`,
  line4: `The court will send (serve) the documents to your ${partner}. If you want to do this yourself you can call ${telephoneNumber} to request it.`,
  line5: `You will need to send your ${partner} a copy of the application. They will need to check the information and respond. If they do not respond then we'll tell you what you can do next to progress your application.`,
  line6:
    'Further information concerning service out of the United Kingdom can be obtained from the <a class="govuk-link" target="_blank" href="https://www.gov.uk/guidance/service-of-documents-and-taking-of-evidence">Foreign Process Section (opens in a new tab)</a>.',
  returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,

  awaitingDocuments: {
    subHeading1: 'Beth sydd angen i chi ei wneud nawr',
    line1: 'Ni fydd eich cais yn cael ei brosesu hyd nes y byddwch wedi gwneud y canlynol:',
    subHeading2: 'Anfon eich dogfennau i’r llys',
    line2: 'Mae angen i chi anfon y dogfennau canlynol i’r llys gan na wnaethoch eu llwytho yn gynharach:',
    documents: {
      [DocumentType.MARRIAGE_CERTIFICATE]:
        userCase.inTheUk === YesOrNo.NO
          ? `Eich tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'} dramor wreiddiol`
          : `Eich tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'} wreiddiol neu gopi ardystiedig ohoni`,
      [DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION]: `Cyfieithiad ardystiedig o’ch tystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      } dramor`,
      [DocumentType.NAME_CHANGE_EVIDENCE]: `Tystiolaeth yn dangos pam bod eich enw neu enw eich ${partner} wedi'i ysgrifennu'n wahanol ar eich ${
        isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'
      }. Er enghraifft, cerdyn adnabod a gyhoeddwyd gan y llywodraeth, pasbort, trwydded yrru, tystysgrif geni, gweithred newid enw neu 'ddatganiad statudol'.`,
    },
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
    documentsByPostMoreDetails:
      'Gwnewch yn siŵr eich bod hefyd yn cynnwys cyfeiriad dychwelyd yn eich ymateb. Bydd unrhyw ddogfennau y byddwch yn eu hanfon, fel tystysgrifau priodas, tystysgrifau geni, pasbortau neu weithred newid enw yn cael eu dychwelyd atoch. Ni fydd y dogfennau eraill yn cael eu dychwelyd.',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  const overseasAddressForRespondent = content.userCase.applicant2AddressOverseas === YesOrNo.YES;
  const cannotUploadDocuments = new Set([...(content.userCase.applicant1CannotUploadDocuments || [])]);
  const awaitingHWFDecision =
    content.userCase.state === State.AwaitingHWFDecision || content.userCase.state === State.AwaitingHWFEvidence;
  return {
    ...translation,
    overseasAddressForRespondent,
    cannotUploadDocuments,
    awaitingHWFDecision,
  };
};
