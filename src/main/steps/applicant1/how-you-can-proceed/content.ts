import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent as columnGenerateContent } from '../hub-page/right-column';

const en = ({ isDivorce, marriage, divorce, civilPartnership, partner, contactEmail }: CommonContent) => ({
  title: `How to proceed with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  line1: `The court usually needs to hear from both parties in a ${
    isDivorce ? marriage : civilPartnership
  } before it can
   ${
     isDivorce ? 'grant a divorce' : 'end a civil partnership'
   }. It’s therefore important that your ${partner} responds to your application.`,
  line2: `The simplest way to proceed is for you to contact your ${partner} and ask them to respond, if it’s safe to do so.
  They can still respond, even though the deadline has passed.`,
  line3:
    'If they still do not respond then you can choose one of the following options to progress your application, depending on your situation.',
  anotherEmailAddress: `I have another email address or postal address for my ${partner}`,
  anotherEmailAddressContent: `Provide their new email address or postal address to the court.
  You can phone, email or post it using the contact details in the ‘Getting help’ section at the top of this page. <br><br>
  Postal addresses can be UK or international. It can be their home address or their solicitor’s address.
  You should avoid using their work address but if you have to then you should ask their permission first. <br><br>
  You do not have to pay anything to update their email or postal address.`,
  emailButNotPostal: 'I have their email address but not their postal address',
  emailButNotPostalContent: `If you have their email address but not their postal address, then you can apply to the court to only send the application to their email address.
  This application costs an additional ${config.get(
    'fees.alternativeService'
  )}, unless you are eligible for Help With Fees.<br><br>
  <strong>How to apply:</strong> Download and complete <a href="http://hmctsformfinder.justice.gov.uk/HMCTS/GetForm.do?court_forms_id=98" class="govuk-link">form D11</a>.
  Send the form to the Courts and Tribunals Service Centre by email or post <br><br>
  Email: ${contactEmail} <br><br>
  <strong>Courts and Tribunals Service Centre</strong><br>
  HMCTS Divorce and Dissolution service<br>
  PO Box 12706<br>
  Harlow<br>
  CM20 9QT`,
  needToSearchForAddress: `I need to search government records for my ${partner}'s postal address`,
  needToSearchForAddressContent: `You can apply to search government records for your ${partner}'s address, for example the electoral register.
   They must live in England or Wales. The application costs an additional ${config.get(
     'fees.searchForAddress'
   )}, unless you are eligible for Help With Fees.<br><br>
  <strong>How to apply:</strong> Call the Courts and Tribunals Service Centre on 0300 303 0642 and ask for the form to be sent to you.<br><br>
  <strong>How to pay:</strong> Call the Courts and Tribunals Service Centre on 0300 303 0642 to make the ${config.get(
    'fees.searchForAddress'
  )} payment by card (between 8.30am and 5pm).
  If you're eligible for Help With Fees then you'll need to apply again and
  <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link">get a new reference number</a>.`,
  thinkPartnerChoosingNotToRespond: `I think my ${partner} is receiving the application but is choosing not to respond`,
  thinkPartnerChoosingNotToRespondContent: `If you think that your ${partner} is deliberately not responding
  then you can pay a professional to ‘serve’ (deliver) the ${
    isDivorce ? 'divorce papers' : 'papers to end the civil partnership'
  } to them.<br><br>
  If the application is delivered successfully, they will give you a letter as evidence that your ${partner} has received the application.
  This is known as an ‘certificate of service'.<br><br>
  If your ${partner} does not respond within 14 days of being ‘served’ the application, you can use this ‘certificate of service’
   to continue ${isDivorce ? 'your divorce' : 'ending your civil partnership'} without their response.<br><br>
  You can either hire a professional to ‘serve’ (deliver) the documents, or apply to use the court bailiffs.
  Using a privately-hired professional is usually quicker.<br><br>
  <strong>Serving using a privately-hired professional</strong><br>
  You can pay a professional to serve (deliver) the court documents to your ${partner}. These professionals are known as ‘process servers’.
  If the process server successfully delivers the documents then they will provide you with a document as evidence, called a ‘certificate of service’.
  You can use this certificate to continue with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}.<br><br>
  Search online for ‘process servers’ or contact a local solicitor who should be able to give you the contact details for a local company.
  Using a process server is usually quicker than using a court bailiff.<br><br>
  If you are going to use a process server then you need to contact the court. This is so the court knows that you are intending to arrange service yourself.
  When you have arranged service and you have your certificate of service then you can send it to the court by email or post.
  Make sure you quote your case number. <br><br>
  Email: ${contactEmail}<br><br>
  <strong>Courts and Tribunals Service Centre</strong><br>
  HMCTS Divorce and Dissolution service<br>
  PO Box 12706<br>
  Harlow<br>
  CM20 9QT<br><br>
  <strong>Serving using the court bailiffs</strong><br>
  The bailiff service can only be used at addresses in England and Wales where delivery by post has already failed.
  If you have a new address for your ${partner}, you’ll have to get it delivered by post to that address, before you can apply for the bailiff service.
  Using the court bailiff service costs an additional ${config.get(
    'fees.courtBailiffService'
  )}, unless you’re eligible for Help With Fees.<br><br>
  <strong>How to apply:</strong> Download and complete <a href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff" class="govuk-link">form D89</a>.
  You'll also need to send:
  <ul><li>a photo of your ${partner}</li><li>a copy of your ${
    isDivorce ? divorce : civilPartnership
  } application</li></ul>
  Send the completed form and other documents to the Courts and Tribunals Service Centre by email or post:<br><br>
  Email: ${contactEmail} <br><br>
  <strong>Courts and Tribunals Service Centre</strong><br>
  HMCTS Divorce and Dissolution service<br>
  PO Box 12706<br>
  Harlow<br>
  CM20 9QT<br><br>
  <strong>How to pay:</strong> Call the Courts and Tribunals Service Centre on 0300 303 0642 to make the ${config.get(
    'fees.courtBailiffService'
  )} payment by card (between 8.30am and 5pm).
  If you're eligible for Help With Fees then you'll need to apply again and <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link">get a new reference number</a>.`,
  evidencePartnerNotResponded: `I have evidence that my ${partner} has received the application, but will not or cannot respond`,
  evidencePartnerNotRespondedContent: `If you know your ${partner} has received the application, but will not or cannot respond, you can apply to the court for ‘deemed service’.
  This means that the court decides that your ${partner} has received the application, and that you can continue without their response.
  This application costs an additional ${config.get(
    'fees.deemedService'
  )}, unless you are eligible for Help With Fees.<br><br>
  You will need to be able to prove that your ${partner} received the application.
  For example, you have a text message from your ${partner} saying they have received it.<br><br>
  <strong>How to apply:</strong>  Download and complete <a href="http://hmctsformfinder.justice.gov.uk/HMCTS/GetForm.do?court_forms_id=98" class="govuk-link">form D11</a>.
  Send the form and evidence to the Courts and Tribunals Service Centre by email or post:<br>
  Email: ${contactEmail}<br><br>
  <strong>Courts and Tribunals Service Centre</strong><br>
  HMCTS Divorce and Dissolution service<br>
  PO Box 12706<br>
  Harlow<br>
  CM20 9QT<br><br>
 <strong>How to pay:</strong> Call the Courts and Tribunals Service Centre on 0300 303 0642 to make the ${config.get(
   'fees.deemedService'
 )} payment by card (between 8.30am and 5pm).
  If you're eligible for Help With Fees then you'll need to apply again and
  <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link">get a new reference number</a>.`,
  triedEveryWayToDeliver: "I've tried every possible way of delivering the application",
  triedEveryWayToDeliverContent: `Under exceptional circumstances, you can ask the court to ‘dispense with service’.
  This means the court decides the court documents do not have to be ‘served’ (delivered) to your ${partner} because it’s impossible to locate them.<br><br>
  You will have to show that you have done everything you can to find your ${partner} and ‘serve’ (deliver) the application to them.
  For example by contacting their relatives, friends and last-known employer and searching government databases for their address.
  This application costs an additional ${config.get(
    'fees.dispensedService'
  )}, unless you are eligible for Help With Fees.<br><br>
  <strong>How to apply:</strong>  Download and complete <a href="http://hmctsformfinder.justice.gov.uk/HMCTS/GetForm.do?court_forms_id=98" class="govuk-link">form D11</a>
  and <a href="https://hmctsformfinder.justice.gov.uk/HMCTS/GetForm.do?court_forms_id=1112" class="govuk-link">form D13b</a>.
  Send the forms to the Courts and Tribunals Service Centre by email or post:<br>
  Email: ${contactEmail}<br><br>
  <strong>Courts and Tribunals Service Centre</strong><br>
  HMCTS Divorce and Dissolution service<br>
  PO Box 12706<br>
  Harlow<br>
  CM20 9QT<br><br>
  <strong>How to pay:</strong> Call the Courts and Tribunals Service Centre on 0300 303 0642 to make the ${config.get(
    'fees.dispensedService'
  )} payment by card (between 8.30am and 5pm).
  If you're eligible for Help With Fees then you'll need to apply again and
  <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link">get a new reference number</a>.`,
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    ...columnGenerateContent(content),
    form,
  };
};
