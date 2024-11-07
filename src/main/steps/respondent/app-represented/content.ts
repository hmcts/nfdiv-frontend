import config from 'config';

import { Applicant2Represented, State } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { SupportedLanguages } from '../../../modules/i18n';
import { getProgressBarContent } from '../../applicant1/hub-page/progressBarLabels';
import { isCountryUk } from '../../applicant1Sequence';
import type { CommonContent } from '../../common/common.content';
import { formattedCaseId } from '../../common/content.utils';
import { currentStateFn } from '../../state-sequence';

const en = (
  { userCase, partner, isJointApplication, webChat, openingTimes, telephoneNumber, feedbackLink }: CommonContent
) => ({
  title: 'Application represented',
  appRepresentedText: `${
    userCase.applicant2SolicitorRepresented
      ? 'You no longer have access to this case due to informing the Court that you are represented. Please contact your Solicitor at your earliest convenience.'
      : ''
  }`,
  yourReferenceNumber: 'Your reference number is:',
  confirmationEmail: `You${isJointApplication ? ' and your ' + partner : ''} have been sent a confirmation${
    userCase.applicant1HelpWithFeesRefNo ? '' : ' and payment receipt'
  } by email.`,
  subHeading6: 'If you need help',
  line16: {
    part1:
      'Court staff can give you help with your application. They cannot give you legal advice. You should speak to a ',
    linkText: 'solicitor or legal adviser',
    link: config.get('govukUrls.legalAdvisor'),
  },
  webChat,
  sendUsAMessage: 'Send us a message',
  telephone: 'Telephone',
  telephoneNumber: `Telephone: ${telephoneNumber}`,
  openingTimes,
  telephoneCharges: {
    part1: 'Find out about call charges',
    link: config.get('govukUrls.callCharges'),
  },
  domesticAbuse: {
    part1: 'If you are experiencing domestic abuse or feel unsafe, then ',
    part2: 'support is available',
    link: config.get('govukUrls.domesticAbuse'),
  },
  feedback: "We'd like to hear your thoughts",
  feedbackLine1: 'Complete this short, 5-minute survey to help improve our services for you and others.',
  feedbackLine2: {
    part1: 'Please leave your feedback here',
    link: feedbackLink,
  },
});

const cy: typeof en = (
  { userCase, partner, isJointApplication, webChat, telephoneNumber, openingTimes, feedbackLink }: CommonContent
) => ({
  title: 'Cyflwynwyd y cais',
  appRepresentedText: `${
    userCase.applicant1SolicitorRepresented
      ? "Nid oes gennych chi fynediad i'r achos hwn bellach oherwydd eich bod wedi rhoi gwybod i'r Llys eich bod yn cael eich cynrychioli. Cysylltwch â'ch Cyfreithiwr cyn gynted â phosibl."
      : ''
  }`,
  yourReferenceNumber: 'Eich cyfeirnod yw:',
  confirmationEmail: `Mae cadarnhad${
    userCase.applicant1HelpWithFeesRefNo ? '' : ' a derbynneb am y taliad'
  } wedi’i anfon atoch chi${isJointApplication ? ' a’ch ' + partner : ''} drwy e-bost.`,
  subHeading6: 'Os oes arnoch angen cymorth',
  line16: {
    part1: 'Gall staff y llys eich helpu gyda’ch cais. Ni allant roi cyngor cyfreithiol i chi. Dylech siarad â ',
    linkText: 'chyfreithiwr neu gynghorydd cyfreithiol',
    link: config.get('govukUrls.legalAdvisor'),
  },
  webChat,
  sendUsAMessage: 'Anfonwch neges atom ',
  telephone: 'Ffoniwch',
  telephoneNumber: `Rhif ffôn: ${telephoneNumber}`,
  openingTimes,
  telephoneCharges: {
    part1: 'Gwybodaeth am brisiau galwadau',
    link: config.get('govukUrls.callCharges'),
  },
  domesticAbuse: {
    part1: 'Os ydych yn profi camdriniaeth ddomestig neu yn teimlo’n anniogel, yna ',
    part2: 'mae cefnogaeth ar gael',
    link: config.get('govukUrls.domesticAbuse'),
  },
  feedback: "Helpwch ni i wella'r gwasanaeth hwn",
  feedbackLine1: 'Complete this short, 5-minute survey to help improve our services for you and others.',
  feedbackLine2: {
    part1: 'Mae hwn yn wasanaeth newydd.',
    link: feedbackLink,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language, isJointApplication, isDivorce, isApplicant2 } = content;
  const displayState = currentStateFn(userCase.state).at(
    (userCase.state === State.OfflineDocumentReceived ? userCase.previousState : userCase.state) as State
  );
  const referenceNumber = formattedCaseId(userCase.id);
  const isRespondentRepresented = userCase.applicant1IsApplicant2Represented === Applicant2Represented.YES;
  const hasASolicitorContactForPartner =
    userCase.applicant2SolicitorEmail || userCase.applicant2SolicitorAddressPostcode;
  const isRespondentOverseas = !isCountryUk(userCase.applicant2AddressCountry);
  const applicationServedAnotherWay =
    !isJointApplication &&
    userCase.applicant2Email &&
    !isRespondentOverseas &&
    !userCase.iWantToHavePapersServedAnotherWay &&
    !hasASolicitorContactForPartner;
  const cannotUploadDocuments = new Set([
    ...(userCase.applicant1CannotUploadDocuments || []),
    ...(userCase.applicant2CannotUploadDocuments || []),
  ]);
  const progressBarContent = getProgressBarContent(isDivorce, displayState, language === SupportedLanguages.En);

  return {
    ...languages[language]({ ...content, referenceNumber }),
    displayState,
    isRespondentRepresented,
    hasASolicitorContactForPartner,
    isRespondentOverseas,
    applicationServedAnotherWay,
    referenceNumber,
    cannotUploadDocuments,
    ...progressBarContent,
  };
};
