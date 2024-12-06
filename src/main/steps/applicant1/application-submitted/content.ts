import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Applicant2Represented, DocumentType, State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { SupportedLanguages } from '../../../modules/i18n';
import { isCountryUk } from '../../applicant1Sequence';
import type { CommonContent } from '../../common/common.content';
import { formattedCaseId } from '../../common/content.utils';
import { currentStateFn } from '../../state-sequence';
import { HUB_PAGE } from '../../urls';
import { getProgressBarContent } from '../hub-page/progressBarLabels';

const en = ({
  isDivorce,
  userCase,
  partner,
  referenceNumber,
  isJointApplication,
  webChat,
  openingTimes,
  telephoneNumber,
  feedbackLink,
}: CommonContent) => ({
  title: `Application ${
    userCase.applicant1CannotUpload || userCase.applicant2CannotUpload || userCase.iWantToHavePapersServedAnotherWay
      ? 'saved'
      : 'submitted'
  }`,
  yourReferenceNumber: 'Your reference number',
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
    [DocumentType.NAME_CHANGE_EVIDENCE]:
      'Proof that you changed your name. For example, deed poll or statutory declaration.',
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
  subHeading3: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
  line3: {
    p1: `You need to apply to serve the ${
      isDivorce ? 'divorce' : 'ending your civil partnership'
    } papers to your ${partner} another way. This is because you did not provide their email and postal address. You could apply to serve them by email only, text message or social media.`,
    p2: 'You will need to fill out a separate paper D11 form and send it to the court. The form can be used to make different applications so only fill out the relevant sections.',
  },
  line4: {
    part1: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
    link: config.get('govukUrls.d11Form'),
  },
  subHeading4: 'What happens next',
  line5: `Your${isJointApplication ? ' joint' : ''} application${
    userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
    (!isJointApplication || userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES)
      ? ' and Help With Fees reference number'
      : ''
  } will be checked by court staff. You will receive an email notification by ${getFormattedDate(
    dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
  )} confirming whether it has been accepted. Check your junk or spam email folder.`,
  line6: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then you will be told what you can do next to progress the application.`,
  line7: `Your ${partner}’s solicitor will be contacted by the court, and asked to confirm they are representing them. They will be sent a copy of the application and asked to respond.`,
  line8: `If you want to ‘serve’ (send) the documents to your ${partner} yourself then phone ${telephoneNumber} to request it. Otherwise the court will do it.`,
  line9: `If you want the court to serve (send) the application by post instead of by email, then phone ${telephoneNumber}.`,
  line10: `The address you have provided for your ${partner} is outside of England and Wales. That means you are responsible for ‘serving’ (sending) the court documents, which notify your ${partner} about ${
    isDivorce ? 'the divorce' : 'ending the civil partnership'
  }.`,
  line11: `You will receive the documents that you need to send to your ${partner} by email and letter, after the application has been checked.`,
  subHeading5: 'Dividing your money and property',
  line12: {
    part1: `It’s usually easier and less expensive if you agree with your ${partner} on how to divide your money and property.`,
    part2: 'Get help agreeing.',
    link: config.get('govukUrls.mediation'),
  },
  line13: {
    part1:
      'If you do agree then you can make the agreement legally binding. This is known as asking the court to make a ',
    part2: '‘consent order’',
    link: config.get('govukUrls.consentOrder'),
  },
  line14: {
    part1: 'If you disagree then you can ask the court to decide for you. This is known as applying for a ',
    part2: '‘financial order’',
    link: config.get('govukUrls.financialOrder'),
  },
  line15: {
    part1: 'Read the guidance on ',
    part2: 'money and property when you divorce or separate',
    link: config.get('govukUrls.moneyAndProperty'),
  },
  subHeading6: 'If you need help',
  line16: {
    part1:
      'Court staff can give you help with your application. They cannot give you legal advice. If you need legal advice, you should speak to a ',
    linkText: 'solicitor or legal advisor',
    link: config.get('govukUrls.legalAdvisor'),
  },
  subHeading7: 'Visit your application hub',
  line17: {
    part1: `You can <a href=${HUB_PAGE} class="govuk-link">view the progress of your application</a> in the application hub.`,
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
    part1: 'Leave your feedback',
    link: feedbackLink,
  },
  useOurOnlineForm: 'Use our online form',
});

// @TODO Welsh
const cy: typeof en = ({
  isDivorce,
  userCase,
  partner,
  referenceNumber,
  isJointApplication,
  webChat,
  telephoneNumber,
  openingTimes,
  feedbackLink,
}: CommonContent) => ({
  title: `${
    userCase.applicant1CannotUpload || userCase.applicant2CannotUpload || userCase.iWantToHavePapersServedAnotherWay
      ? 'Cais wedi’i gadw'
      : 'Cyflwynwyd y cais'
  }`,
  yourReferenceNumber: 'Eich cyfeirnod yw',
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
    [DocumentType.NAME_CHANGE_EVIDENCE]:
      'Prawf eich bod wedi newid eich enw. Er enghraifft, gweithred newid enw neu ddatganiad statudol.',
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
  subHeading3: `Gwneud cais i gyflwyno papurau’r ${isDivorce ? 'ysgariad' : 'bartneriaeth sifil'} mewn ffordd arall`,
  line3: {
    p1: `Mae angen i chi wneud cais i gyflwyno papurau’r ${
      isDivorce ? 'ysgariad' : 'bartneriaeth sifil'
    } ar eich ${partner} mewn ffordd arall. Y rheswm dros hyn yw oherwydd ni wnaethoch ddarparu eu cyfeiriad e-bost neu gyfeiriad post. Gallwch wneud cais i’w cyflwyno arnynt drwy e-bost yn unig, drwy neges testun neu gyfryngau cymdeithasol.`,
    p2: 'Bydd angen i chi lenwi ffurflen bapur D11 a’i hanfon i’r llys. Gallwch ddefnyddio’r ffurflen i wneud ceisiadau gwahanol, felly dim ond yr adrannau perthnasol sydd angen i chi eu llenwi.',
  },
  line4: {
    part1: `Gwneud cais i gyflwyno papurau’r ${isDivorce ? 'ysgariad' : 'bartneriaeth sifil'} mewn ffordd arall`,
    link: config.get('govukUrls.d11Form'),
  },
  subHeading4: 'Beth fydd yn digwydd nesaf',
  line5: `Bydd staff y llys yn gwirio eich cais ${isJointApplication ? ' ar y cyd' : ''}${
    userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
    (!isJointApplication || userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES)
      ? ' a’ch cyfeirnod Help i Dalu Ffioedd'
      : ''
  }. Fe gewch neges e-bost erbyn ${getFormattedDate(
    dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day'),
    SupportedLanguages.Cy
  )} yn cadarnhau p’un a yw wedi’i dderbyn. Gwiriwch eich ffolder ‘junk’ neu ‘spam’.`,
  line6: `Yna fe anfonir copi o’r cais at eich ${partner}. Os na fyddant yn ymateb, fe ddywedir wrthych beth allwch ei wneud nesaf i symud y cais yn ei flaen.`,
  line7: `Bydd y llys yn cysylltu â chyfreithiwr eich ${partner} ac yn gofyn iddo gadarnhau ei fod yn cynrychioli eich ${partner}. Fe anfonir copi o’r cais ato ac fe ofynnir iddo ymateb.`,
  line8: `Os ydych eisiau ‘cyflwyno’ (anfon) y dogfennau ar eich ${partner} eich hun, yna ffoniwch ${telephoneNumber}. Fel arall, bydd y llys yn gwneud hyn ar eich rhan.`,
  line9: `Os ydych eisiau i’r llys gyflwyno (anfon) y cais drwy’r post yn hytrach na drwy e-bost, ffoniwch ${telephoneNumber}.`,
  line10: `Mae’r cyfeiriad rydych wedi’i ddarparu ar gyfer eich ${partner} y tu allan i Gymru a Lloegr. Mae hynny’n golygu eich bod chi’n gyfrifol am ‘gyflwyno’ (anfon) dogfennau’r llys, sydd yn hysbysu eich ${partner} am ${
    isDivorce ? 'yr ysgariad' : 'ddiweddu’r bartneriaeth sifil'
  }.`,
  line11: `Fe gewch y dogfennau y bydd angen i chi eu hanfon at eich ${partner} drwy e-bost a drwy’r post, ar ôl i’r cais gael ei wirio.`,
  subHeading5: 'Rhannu eich arian a’ch eiddo',
  line12: {
    part1: `Fel arfer, mae’n symlach ac yn costio llai os ydych yn cytuno gyda’ch ${partner} ar sut i rannu eich arian a’ch eiddo.`,
    part2: 'Cael cymorth i gytuno.',
    link: config.get('govukUrls.mediation'),
  },
  line13: {
    part1:
      'Os ydych yn cytuno, yna gallwch wneud y cytundeb yn rhwymol gyfreithiol. Gelwir hyn yn gais i’r llys wneud ',
    part2: '‘gorchymyn cydsynio’',
    link: config.get('govukUrls.consentOrder'),
  },
  line14: {
    part1: 'Os ydych yn anghytuno, yna gallwch ofyn i’r llys benderfynu ar eich rhan. Gelwir hyn yn gais am ',
    part2: '‘orchymyn ariannol’',
    link: config.get('govukUrls.financialOrder'),
  },
  line15: {
    part1: 'Darllenwch y cyfarwyddyd ar ',
    part2: 'arian ac eiddo pan fyddwch yn ysgaru neu’n gwahanu',
    link: config.get('govukUrls.moneyAndProperty'),
  },
  subHeading6: 'Os oes arnoch angen cymorth',
  line16: {
    part1:
      'Gall staff y llys eich helpu gyda’ch cais. Ni allant roi cyngor cyfreithiol i chi. Os oes angen cyngor cyfreithiol arnoch, dylech siarad â ',
    linkText: 'chyfreithiwr neu gynghorydd cyfreithiol',
    link: config.get('govukUrls.legalAdvisor'),
  },
  subHeading7: 'Ymweld â’ch gwasanaeth ceisiadau',
  line17: {
    part1: `Gallwch <a href=${HUB_PAGE} class="govuk-link">weld cynnydd eich cais</a> yn y gwasanaeth ceisiadau.`,
  },
  webChat,
  useOurOnlineForm: 'Defnyddio ein ffurflen ar-lein',
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
  feedbackLine1: 'Cwblhewch yr arolwg 5 munud hwn i helpu i wella ein gwasanaethau i chi ac eraill.',
  feedbackLine2: {
    part1: 'Rhoi adborth.',
    link: feedbackLink,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language, isJointApplication, isDivorce } = content;
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
