import config from 'config';
import dayjs from 'dayjs';

import { Applicant2Represented, DocumentType, State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { isCountryUk } from '../../applicant1Sequence';
import type { CommonContent } from '../../common/common.content';
import { StateSequence } from '../../state-sequence';

const en = ({ isDivorce, userCase, partner, referenceNumber, isJointApplication }: CommonContent) => ({
  title: 'Application submitted',
  yourReferenceNumber: 'Your reference number is:',
  confirmationEmail: `You${isJointApplication ? ' and your ' + partner : ''} have been sent a confirmation${
    userCase.applicant1HelpWithFeesRefNo ? '' : ' and payment receipt'
  } by email.`,
  partnerResponse: `Your ${partner} responds`,
  conditionalOrderGranted: 'Conditional order granted',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
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
  documentsByEmail: 'Sending documents by email',
  documentsByEmailSteps: {
    step1: 'Take a photo or scan of the document',
    step2: 'Check the image shows the whole document and all the text is readable',
    step3: 'Attach it to an email',
    step4: `Include your reference number in the subject line: ${referenceNumber}`,
    step5: 'Email the documents to:',
  },
  documentsByPost: 'Sending your documents by post',
  documentsByPostSteps: {
    step1: `Write your reference number on each document: ${referenceNumber}`,
    step2: 'Post the original documents to:',
  },
  address: {
    line1: `${config.get('serviceAddress.line1')}`,
    line2: `${config.get('serviceAddress.line2')}`,
    poBox: `${config.get('serviceAddress.poBox')}`,
    town: `${config.get('serviceAddress.town')}`,
    postcode: `${config.get('serviceAddress.postcode')}`,
  },
  documentsByPostMoreDetails:
    'You must post the original documents or certified copies. Your marriage certificate will be returned to you, if you are posting it in. Other documents will not be returned.',
  subHeading3: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
  line3: {
    p1: `You need to apply to serve the ${
      isDivorce ? 'divorce' : 'ending your civil partnership'
    } papers to your ${partner} another way. This is because you did not provide their email and postal address in the application. You could apply to serve them by email only, text message or social media.`,
    p2: 'You will need to fill out a separate paper D11 form and send it to the court. The form can be used to make different applications so only fill out the relevant sections.',
  },
  line4: {
    part1: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
    link: `${config.get('govukUrls.d11Form')}`,
  },
  subHeading4: 'What happens next',
  line5: `Your${isJointApplication ? ' joint' : ''} application${
    userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
    (!isJointApplication || userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES)
      ? ' and Help With Fees reference number'
      : ''
  } will be checked by court staff. You will receive an email notification by${dayjs(userCase.dateSubmitted)
    .add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
    .format('D MMMM YYYY')} confirming whether it has been accepted. Check your junk or spam email folder.`,
  line6: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then you will be told what you can do next to progress the application.`,
  line7: `Your ${partner}’s solicitor will be contacted by the court, and asked to confirm they are representing them. They will be sent a copy of the application and asked to respond.`,
  line8: `If you want to ‘serve’ (send) the documents to your ${partner} yourself then phone ${config.get(
    'servicePhoneNo'
  )} to request it. Otherwise the court will do it.`,
  line9: `If you want the court to serve (send) the application to be served by post instead of by email, then phone ${config.get(
    'servicePhoneNo'
  )}.`,
  line10: `The address you have provided for your ${partner} is outside of England and Wales. That means you are responsible for ‘serving’ (sending) the court documents, which notify your ${partner} about ${
    isDivorce ? 'the divorce' : 'ending the civil partnership'
  }.`,
  line11: `You will receive the documents that you need to send to your ${partner} by email and letter, after the application has been checked.`,
  subHeading5: 'Dividing your money and property',
  line12: {
    part1: `It’s usually more straightforward and less expensive if you agree with your ${partner} on how to divide your money and property.`,
    part2: 'Get help agreeing.',
    link: `${config.get('govukUrls.mediation')}`,
  },
  line13: {
    part1:
      'If you do agree then you can make the agreement legally binding. This is known as asking the court to make a ',
    part2: '‘consent order’',
    link: `${config.get('govukUrls.consentOrder')}`,
  },
  line14: {
    part1: 'If you disagree then you can ask the court to decide for you. This is known as applying for a ',
    part2: '‘financial order’',
    link: `${config.get('govukUrls.financialOrder')}`,
  },
  line15: {
    part1: 'Read the guidance on ',
    part2: 'money and property when you divorce or separate',
    link: `${config.get('govukUrls.moneyAndProperty')}`,
  },
  subHeading6: 'If you need help',
  line16: {
    part1:
      'Court staff can give you help with your application. They cannot give you legal advice. You should speak to a ',
    linkText: 'solicitor or legal adviser',
    link: `${config.get('govukUrls.legalAdvisor')}`,
  },
  webChat: 'Web chat',
  webChatDetails: 'No agents are available, please try again later.',
  sendUsAMessage: 'Send us a message',
  telephone: 'Telephone',
  telephoneNumber: `Telephone: ${config.get('servicePhoneNo')}`,
  telephoneDetails: 'Monday to Friday 8am to 5pm',
  telephoneCharges: {
    part1: 'Find out about call charges',
    link: `${config.get('govukUrls.callCharges')}`,
  },
  domesticAbuse: {
    part1: 'If you are experiencing domestic abuse or feel unsafe, then ',
    part2: 'support is available',
    link: `${config.get('govukUrls.domesticAbuse')}`,
  },
  feedback: 'Help improve this service',
  feedbackDetails: {
    part1: 'This is a new service. ',
    part2: 'Your feedback',
    part3: ' helps to improve it for others.',
    link: `${config.get('govukUrls.feedbackSurvey')}`,
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language, isJointApplication } = content;
  const currentState = new StateSequence([
    State.Submitted,
    State.AwaitingApplicant2Response,
    State.AwaitingLegalAdvisorReferral,
    State.FinalOrderComplete,
  ]).at(content.userCase.state as State);
  const referenceNumber = userCase.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
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
  return {
    ...languages[language]({ ...content, referenceNumber }),
    currentState,
    isRespondentRepresented,
    hasASolicitorContactForPartner,
    isRespondentOverseas,
    applicationServedAnotherWay,
    referenceNumber,
  };
};
