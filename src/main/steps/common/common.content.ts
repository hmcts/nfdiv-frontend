import { CaseWithId } from '../../app/case/case';
import { ApplicationType, State } from '../../app/case/definition';
import { PageContent, TranslationFn } from '../../app/controller/GetController';

import { getPartner, getSelectedGender, getServiceName } from './content.utils';

export const en = {
  phase: 'Beta',
  applyForDivorce: 'apply for a divorce',
  applyForDissolution: 'apply to end a civil partnership',
  feedback:
    'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/Divorce_Feedback" target="_blank">feedback</a> will help us to improve it.',
  languageToggle: '<a href="?lng=cy" class="govuk-link language">Cymraeg</a>',
  govUk: 'GOV.UK',
  back: 'Back',
  continue: 'Continue',
  change: 'Change',
  upload: 'Upload',
  download: 'Download',
  delete: 'Delete',
  warning: 'Warning',
  required: 'You have not answered the question. You need to select an answer before continuing.',
  notAnswered: 'You have not answered the question.',
  errorSaving: 'Sorry, we’re having technical problems saving your application. Please try again in a few minutes.',
  errorSendingInvite:
    'Sorry, we’re having technical problems sending your application for review. Please try again in a few minutes.',
  ogl: 'All content is available under the <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated',
  errorSummaryHeading: 'There was a problem',
  saveAndSignOut: 'Save and sign out',
  signOut: 'Sign out',
  signIn: 'Sign in',
  accessibility: 'Accessibility statement',
  cookies: 'Cookies',
  privacyPolicy: 'Privacy policy',
  termsAndConditions: 'Terms and conditions',
  marriage: 'marriage',
  divorce: 'divorce',
  civilPartnership: 'civil partnership',
  endingCivilPartnership: 'ending a civil partnership',
  husband: 'husband',
  wife: 'wife',
  partner: 'spouse',
  civilPartner: 'civil partner',
  checkTheirAnswersPartner: 'partner for check their answers',
  applicant1Partner: 'applicant 1 partner',
  withHim: 'with him',
  withHer: 'with her',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
  yes: 'Yes',
  no: 'No',
  english: 'English',
  welsh: 'Welsh',
  contactUsForHelp: 'Contact us for help',
  webChat: 'Web chat',
  sendUsAMessage: 'Send us a message',
  sendUsAMessageDetails: 'We aim to get back to you within 5 working days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0642',
  telephoneDetails: 'Monday to Friday, 8am to 6pm.',
  cookiesHeading: 'Cookies on',
  cookiesLine1: 'We use some essential cookies to make this service work.',
  cookiesLine2:
    'We’d also like to use analytics cookies so we can understand how you use the service and make improvements.',
  acceptAnalyticsCookies: 'Accept analytics cookies',
  rejectAnalyticsCookies: 'Reject analytics cookies',
  viewCookies: 'View cookies',
  hideMessage: 'Hide this message',
  cookiesConfirmationMessage:
    '<p>You can <a class="govuk-link" href="/cookies">change your cookie settings</a> at any time.</p>',
  changeCookiesHeading: 'Change your cookie settings',
  allowAnalyticsCookies: 'Allow cookies that measure website use?',
  useAnalyticsCookies: 'Use cookies that measure my website use',
  doNotUseAnalyticsCookies: 'Do not use cookies that measure my website use',
  save: 'Save',
  cookiesSaved: 'Your cookie settings were saved',
  additionalCookies:
    'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
  goToHomepage: 'Go to homepage',
  apmCookiesHeadings: 'Allow cookies that measure website application performance monitoring?',
  useApmCookies: 'Use cookies that measure website application performance monitoring',
  doNotUseApmCookies: 'Do not use cookies that measure website application performance monitoring',
  helpChatWithAnAgent: 'Speak to an advisor online (opens in a new window)',
  helpAllAgentsBusy: 'All our advisors are busy. Try again in a few minutes.',
  helpChatClosed: 'Our online advice service is currently closed. It reopens at 8am.',
  helpChatOpeningHours: 'Monday to Friday, 8:00am to 8:00pm. Saturday, 8:00am to 4:00pm.',
  helpChatMaintenance: 'Sorry, we’re having technical difficulties. Try email or telephone instead.',
  serviceAddress: {
    line1: 'Courts and Tribunals Service Centre',
    line2: 'HMCTS Divorce and Dissolution service',
    poBox: 'PO Box 13226',
    town: 'Harlow',
    postcode: 'CM20 9UG',
  },
};

const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  phase: 'Beta',
  applyForDivorce: 'gwneud cais am ysgariad',
  applyForDissolution: 'gwneud cais i ddod â phartneriaeth sifil i ben',
  feedback:
    'Mae hwn yn wasanaeth newydd - <a class="govuk-link" aria-label="Dolen adborth, Bydd hyn yn agor tab newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r gwaith yr ydych wedi ei wneud yn barod." href="https://www.smartsurvey.co.uk/s/Divorce_Feedback" target="_blank">bydd eich sylwadau</a> yn ein helpu i wella’r gwasanaeth.',
  languageToggle: '<a href="?lng=en" class="govuk-link language">English</a>',
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Parhau',
  change: 'Newid',
  upload: 'Uwchlwytho',
  download: 'Llwytho i lawr',
  delete: 'Dileu',
  warning: 'Rhybudd',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
  notAnswered: 'Nid ydych wedi ateb y cwestiwn.',
  errorSaving:
    "Mae'n ddrwg gennym, rydym yn cael problemau technegol wrth geisio cadw eich cais. Rhowch gynnig arall arni mewn ychydig funudau.",
  ogl: 'Mae’r holl gynnwys ar gael o dan <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license" >Drwydded Agored y Llywodraeth f3.0</a>, oni nodir fel arall',
  errorSummaryHeading: 'Roedd yna broblem',
  saveAndSignOut: 'Cadw ac allgofnodi',
  signOut: 'Allgofnodi',
  signIn: 'Mewngofnodi',
  accessibility: 'Datganiad Hygyrchedd',
  cookies: 'Cwcis',
  privacyPolicy: 'Polisi Preifatrwydd',
  termsAndConditions: 'Telerau ac Amodau',
  marriage: 'priodas',
  divorce: 'ysgariad',
  endingCivilPartnership: 'dod â phartneriaeth sifil i ben',
  civilPartnership: 'partneriaeth sifil',
  husband: 'gŵr',
  wife: 'gwraig',
  partner: 'priod',
  civilPartner: 'partner sifil',
  withHim: 'gydag ef',
  withHer: 'gyda hi',
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  dateFormat: {
    day: 'Diwrnod',
    month: 'Mis',
    year: 'Blwyddyn',
  },
  yes: 'Do',
  no: 'Naddo',
  english: 'Saesneg',
  welsh: 'Cymraeg',
  contactUsForHelp: 'Cysylltwch â ni am gymorth',
  webChat: 'Sgwrsio dros y we',
  sendUsAMessage: 'Anfonwch neges atom',
  sendUsAMessageDetails: 'Byddwn yn ymdrechu i ymateb o fewn 5 diwrnod.',
  telephone: 'Ffoniwch',
  telephoneNumber: '0300 303 5171',
  telephoneDetails: 'Dydd Llun i Ddydd Gwener, 8.30am - 5pm.',
};

export const generatePageContent = ({
  language,
  userCase,
  pageContent,
  isDivorce = true,
  isApplicant2 = false,
  userEmail,
}: {
  language: Language;
  userCase: Partial<CaseWithId>;
  pageContent?: TranslationFn;
  isDivorce?: boolean;
  isApplicant2?: boolean;
  userEmail?: string;
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const serviceName = getServiceName(commonTranslations, isDivorce);
  const selectedGender = getSelectedGender(userCase as Partial<CaseWithId>, isApplicant2);
  const partner = getPartner(commonTranslations, selectedGender, isDivorce);
  const contactEmail = 'divorcecase@justice.gov.uk';
  const isJointApplication = userCase?.applicationType === ApplicationType.JOINT_APPLICATION;
  const isAmendableStates =
    userCase &&
    [State.Draft, State.AwaitingApplicant1Response, State.AwaitingApplicant2Response].includes(userCase.state!);
  const isClarificationAmendableState = userCase && userCase.state === State.AwaitingClarification;

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    partner,
    language,
    isDivorce,
    isApplicant2,
    userCase,
    userEmail,
    contactEmail,
    isJointApplication,
    isAmendableStates,
    isClarificationAmendableState,
  };

  if (pageContent) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  isDivorce: boolean;
  isApplicant2: boolean;
  userCase: Partial<CaseWithId>;
  partner: string;
  userEmail?: string;
  contactEmail?: string;
  isJointApplication: boolean;
  referenceNumber?: string;
  isAmendableStates: boolean;
  isClarificationAmendableState: boolean;
};

export type Language = 'en' | 'cy';
