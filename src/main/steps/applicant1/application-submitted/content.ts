import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { DocumentType, State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { StateSequence } from '../../state-sequence';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, userCase, partner, referenceNumber, isJointApplication }: CommonContent) => ({
  title: 'Application submitted',
  referenceNumber: `Your reference number is:
    <div class="govuk-panel__body">
      <strong>${referenceNumber}</strong>
    </div>
  `,
  confirmationEmail: `You${isJointApplication ? ' and your ' + partner : ''} have been sent a confirmation${
    userCase.applicant1HelpWithFeesRefNo ? '' : ' and payment receipt'
  } by email.`,
  partnerResponse: `Your ${partner} responds`,
  conditionalOrderGranted: 'Conditional order granted',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
  subHeading1: 'What you need to do now',
  line1: 'You need to do the following in order to progress your application:',
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
    step5: `Email the documents to: <a class="govuk-link" href="mailto:${
      isDivorce ? 'divorcecase@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
    }">${isDivorce ? 'divorcecase@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
  },
  documentsByPost: 'Sending your documents by post',
  documentsByPostSteps: {
    step1: `Write your reference number on each document: ${referenceNumber}`,
    step2: 'Post the original documents to:',
  },
  address: `
    Courts and Tribunals Service Centre<br>
    HMCTS Divorce and Dissolution service<br>
    PO Box 13226<br>
    Harlow<br>
    CM20 9UG
  `,
  documentsByPostMoreDetails:
    'You must post the original documents or certified copies. Your marriage certificate will be returned to you, if you are posting it in. Other documents will not be returned.',
  subHeading3: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
  line3: `You need to apply to serve the ${
    isDivorce ? 'divorce' : 'ending your civil partnership'
  } papers to your ${partner} another way. For example, by email, text message or social media. This is because you did not provide their address in the application.`,
  line4: `<a class="govuk-link" href="https://www.gov.uk/government/publications/form-d11-application-notice">Apply to serve the ${
    isDivorce ? 'divorce' : 'civil partnership'
  } papers another way</a>`,
  subHeading4: 'What happens next',
  line5: `Your${isJointApplication ? ' joint' : ''} application${
    userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES ? ' and Help With Fees reference number' : ''
  } will be checked by court staff. You will receive an email notification by ${dayjs(userCase.dateSubmitted)
    .add(2, 'weeks')
    .format('D MMMM YYYY')} confirming whether it has been accepted. Check your junk or spam email folder.`,
  line6: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then you will be told what you can do next to progress the application.`,
  line6Solicitor: `Your ${partner}’s solicitor will be contacted by the court, and asked to confirm they are representing them. They will be sent a copy of the application and asked to respond.`,
  line7: `If you want the application to be served (sent) to your ${partner} by post instead of email, then phone 0300 303 0642.`,
  subHeading5: 'Dividing your money and property',
  line8: `It’s usually more straightforward and less expensive if you agree with your ${partner} on how to divide your money and property. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends/mediation">Get help agreeing.</a>`,
  line9:
    'If you do agree then you can make the agreement legally binding. This is known as asking the court to make a <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends/apply-for-consent-order">‘consent order’</a>.',
  line10:
    'If you disagree then you can ask the court to decide for you. This is known as applying for a <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends/get-court-to-decide">‘financial order’</a>.',
  line11:
    'Read the guidance on <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends">money and property when you divorce or separate</a>.',
  subHeading6: 'If you need help',
  line12:
    'Court staff can give you help with your application. They cannot give you legal advice. You should speak to a <a class="govuk-link" href="https://www.gov.uk/find-a-legal-adviser">solicitor or legal adviser</a>.',
  webChat: 'Web chat',
  webChatDetails: 'No agents are available, please try again later.',
  sendUsAMessage: 'Send us a message',
  email: `<a class="govuk-link" href="mailto:${
    isDivorce ? 'divorcecase@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
  }">${isDivorce ? 'divorcecase@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
  telephone: 'Telephone',
  telephoneNumber: 'Telephone: 0300 303 0642',
  telephoneDetails: 'Monday to Friday 8am to 5pm',
  telephoneCharges: '<a class="govuk-link" href="https://www.gov.uk/call-charges">Find out about call charges</a>',
  domesticAbuse:
    'If you are experiencing domestic abuse or feel unsafe, then <a class="govuk-link" href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help">support is available</a>',
  feedback: 'Help improve this service',
  feedbackDetails:
    'This is a new service. <a class="govuk-link" href="https://www.smartsurvey.co.uk/s/Divorce_ExitSurvey_Applicant?pageurl=/done">Your feedback</a> helps to improve it for others.',
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
  const hasASolicitorContactForPartner =
    userCase.applicant2SolicitorEmail || userCase.applicant2SolicitorAddressPostcode;
  const applicationServedAnotherWay =
    !isJointApplication &&
    userCase.applicant2Email &&
    userCase.applicant2AddressCountry === 'UK' &&
    !userCase.iWantToHavePapersServedAnotherWay &&
    !hasASolicitorContactForPartner;
  return {
    ...languages[language]({ ...content, referenceNumber }),
    currentState,
    hasASolicitorContactForPartner,
    applicationServedAnotherWay,
  };
};
