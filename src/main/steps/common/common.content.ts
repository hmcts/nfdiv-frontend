import { CaseWithId } from '../../app/case/case';
import { ApplicationType, State } from '../../app/case/definition';
import { SupportedLanguages } from '../../modules/i18n';
import { SAVE_AND_SIGN_OUT } from '../urls';

import { getPartner, getSelectedGender, getServiceName } from './content.utils';

export const en = {
  phase: 'Beta',
  applyForDivorce: 'apply for a divorce',
  applyForDissolution: 'apply to end a civil partnership',
  feedback: {
    part1: 'This is a new service – your ',
    part2: 'feedback',
    part3: ' will help us to improve it.',
    ariaLabel:
      'Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress.',
    link: 'https://www.smartsurvey.co.uk/s/NFD_Feedback/?pageurl=',
  },
  languageToggle: {
    text: 'Cymraeg',
    link: '?lng=cy',
  },
  govUk: 'GOV.UK',
  back: 'Back',
  continue: 'Continue',
  submit: 'Submit',
  confirm: 'Confirm',
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
  exitService: 'Exit this service',
  signOut: 'Sign out',
  signIn: 'Sign in',
  accessibility: 'Accessibility statement',
  cookies: 'Cookies',
  privacyPolicy: 'Privacy policy',
  termsAndConditions: 'Terms and conditions',
  contactUs: 'Contact us',
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
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0642',
  openingTimesHeading: 'Opening times (webchat and telephone)',
  openingTimes: 'Monday to Friday, 8am to 6pm',
  closingTimes: 'Closed on Saturdays, Sundays and bank holidays',
  cookiesBanner: {
    cookiesHeading: 'Cookies on',
    cookiesLine1: 'We use some essential cookies to make this service work.',
    cookiesLine2:
      'We’d also like to use analytics cookies so we can understand how you use the service and make improvements.',
    acceptAnalyticsCookies: 'Accept analytics cookies',
    rejectAnalyticsCookies: 'Reject analytics cookies',
    viewCookies: 'View cookies',
    hideMessage: 'Hide this message',
    acceptCookiesConfirmationMessage: {
      part1: 'You’ve accepted additional cookies. You can ',
      link: '/cookies',
      part2: 'change your cookie settings',
      part3: ' at any time.',
    },
    rejectCookiesConfirmationMessage: {
      part1: 'You’ve rejected additional cookies. You can ',
      link: '/cookies',
      part2: 'change your cookie settings',
      part3: ' at any time.',
    },
  },
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
  helpChatClosed: 'Our online advice service is currently closed.',
  helpChatMaintenance: 'Sorry, we’re having technical difficulties. Try email or telephone instead.',
  timeout: {
    title: 'You are about to be signed out',
    part1: 'You are going to be signed out of your application in',
    part2: 'because of inactivity. This is to protect your personal information.',
    buttonText: 'Continue with your application',
    twoMinutes: '2 minutes',
    minutes: 'minute',
    seconds: 'seconds',
  },
  serviceAddress: {
    line1: 'Courts and Tribunals Service Centre',
    line2: 'HMCTS Divorce and Dissolution service',
    poBox: 'PO Box 13226',
    town: 'Harlow',
    postcode: 'CM20 9UG',
  },
  contactEmail: 'contactdivorce@justice.gov.uk',
  saveAndSignOutLink: SAVE_AND_SIGN_OUT,
};

const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  phase: 'Beta',
  applyForDivorce: 'Gwneud cais am ysgariad',
  applyForDissolution: 'gwneud cais i ddod â phartneriaeth sifil i ben',
  feedback: {
    part1: 'Mae hwn yn wasanaeth newydd - ',
    part2: 'bydd eich sylwadau',
    part3: ' yn ein helpu i wella’r gwasanaeth.',
    ariaLabel:
      'Dolen adborth, Bydd hyn yn agor tab newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r gwaith yr ydych wedi ei wneud yn barod.',
    link: 'https://www.smartsurvey.co.uk/s/NFD_Feedback/?pageurl=',
  },
  languageToggle: {
    text: 'English',
    link: '?lng=en',
  },
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Parhau',
  submit: 'Cyflwyno',
  confirm: 'Cadarnhau',
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
  exitService: 'Gadael y gwasanaeth hwn',
  signOut: 'Allgofnodi',
  signIn: 'Mewngofnodi',
  save: 'Cadw',
  accessibility: 'Datganiad Hygyrchedd',
  cookies: 'Cwcis',
  privacyPolicy: 'Polisi Preifatrwydd',
  termsAndConditions: 'Telerau ac Amodau',
  contactUs: 'Cysylltu â ni',
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
  contactUsForHelp: 'Cysylltu â ni am gymorth',
  webChat: 'Sgwrsio dros y we',
  sendUsAMessage: 'Anfonwch neges atom',
  telephone: 'Ffoniwch',
  telephoneNumber: '0300 303 5171',
  openingTimesHeading: 'Oriau agor',
  openingTimes: 'Dydd Llun i ddydd Iau 9am-5pm, dydd Gwener 9am-4.30pm',
  closingTimes: 'Ar gau ar ddydd Sadwrn, Sul a Gwyliau Banc',
  helpChatMaintenance: 'Yn anffodus, rydym yn cael problemau technegol. Cysylltwch â ni dros y ffôn neu e-bost.',
  allowAnalyticsCookies: 'Caniatáu cwcis sy’n mesur defnydd o’r wefan?',
  useAnalyticsCookies: 'Defnyddio cwcis sy’n mesur fy nefnydd o’r wefan',
  doNotUseAnalyticsCookies: 'Peidio â defnyddio cwcis sy’n mesur fy nefnydd o’r wefan',
  apmCookiesHeadings: 'Caniatáu cwcis sy’n mesur y broses o fonitro perfformiad gwefannau?',
  useApmCookies: 'Defnyddio cwcis sy’n mesur y broses o fonitro perfformiad gwefannau',
  doNotUseApmCookies: 'Peidio â defnyddio cwcis sy’n mesur y broses o fonitro perfformiad gwefannau',
  cookiesBanner: {
    cookiesHeading: 'Cwcis ar',
    cookiesLine1: "Rydym yn defnyddio cwcis hanfodol i wneud i'r gwasanaeth hwn weithio.",
    cookiesLine2:
      "Rydym hefyd yn defnyddio cwcis dadansoddol fel y gallwn ddeall sut rydych yn defnyddio'r gwasanaeth a pha welliannau y gallwn eu gwneud.",
    acceptAnalyticsCookies: 'Derbyn cwcis ychwanegol',
    rejectAnalyticsCookies: 'Gwrthod cwcis ychwanegol',
    viewCookies: 'Gweld cwcis',
    hideMessage: "Cuddio'r neges cwcihon",
    acceptCookiesConfirmationMessage: {
      part1: 'Rydych wedi derbyn cwcis ychwanegol. Gallwch ',
      link: '/cookies',
      part2: 'newid gosodiadau eich cwcis ar',
      part3: ' unrhyw adeg.',
    },
    rejectCookiesConfirmationMessage: {
      part1: 'Rydych chi wedi gwrthod cwcis ychwanegol. Gallwch ',
      link: '/cookies',
      part2: 'newid gosodiadau eich cwcis ar',
      part3: ' unrhyw adeg.',
    },
  },
  changeCookiesHeading: 'Newid eich gosodiadau cwcis',
  contactEmail: 'contactdivorce@justice.gov.uk',
};

export const generateCommonContent = ({
  language,
  userCase,
  isDivorce = true,
  isApplicant2 = false,
  userEmail,
}: {
  language: SupportedLanguages;
  userCase: Partial<CaseWithId>;
  isDivorce?: boolean;
  isApplicant2?: boolean;
  userEmail?: string;
}): CommonContent => {
  const commonTranslations: typeof en = language === SupportedLanguages.En ? en : cy;
  const serviceName = getServiceName(commonTranslations, isDivorce);
  const selectedGender = getSelectedGender(userCase as Partial<CaseWithId>, isApplicant2);
  const partner = getPartner(commonTranslations, selectedGender, isDivorce);
  const isJointApplication = userCase?.applicationType === ApplicationType.JOINT_APPLICATION;
  const isAmendableStates =
    userCase &&
    [State.Draft, State.AwaitingApplicant1Response, State.AwaitingApplicant2Response].includes(userCase.state!);
  const isClarificationAmendableState = userCase && userCase.state === State.AwaitingClarification;

  return {
    ...commonTranslations,
    serviceName,
    partner,
    language,
    isDivorce,
    isApplicant2,
    userCase,
    userEmail,
    isJointApplication,
    isAmendableStates,
    isClarificationAmendableState,
  };
};

export type CommonContent = typeof en & {
  language: SupportedLanguages;
  serviceName: string;
  isDivorce: boolean;
  isApplicant2: boolean;
  userCase: Partial<CaseWithId>;
  partner: string;
  userEmail?: string;
  isJointApplication: boolean;
  referenceNumber?: string;
  isAmendableStates: boolean;
  isClarificationAmendableState: boolean;
};
