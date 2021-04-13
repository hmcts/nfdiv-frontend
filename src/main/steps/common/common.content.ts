import { capitalize } from 'lodash';

import { Case, Checkbox } from '../../app/case/case';
import { Gender } from '../../app/case/definition';
import { PageContent, TranslationFn } from '../../app/controller/GetController';

const en = {
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
  download: 'Download',
  warning: 'Warning',
  required: 'You have not answered the question. You need to select an answer before continuing.',
  notAnswered: 'You have not answered the question.',
  errorSaving: 'Sorry, we’re having technical problems saving your application. Please try again in a few minutes.',
  ogl:
    'All content is available under the <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated',
  cookieText:
    'GOV.UK uses cookies to make the site simpler. <a class="govuk-link" href="#" title="Find out more about cookies">Find out more about cookies</a>',
  errorSummaryHeading: 'There was a problem',
  problemWithThisPage: 'Contact us for help',
  phoneTitle: 'Telephone',
  phoneToCallIfProblems: '{{courtPhoneNumberEn}}<br>{{courtOpeningHourEn}}.',
  emailTitle: 'Send us a message',
  emailIfProblems:
    '<a class="govuk-link" href="mailto:{{ courtEmail }}" aria-label="Send us a message at at {{ courtEmail }}, this link opens a new email.">Send us a message</a>',
  responseTime: 'We aim to get back to you within 5 days',
  webChatTitle: 'Web chat',
  chatDown: 'The web chat service is temporarily unavailable, please try again later.',
  chatWithAnAgent: 'Chat online with an agent',
  noAgentsAvailable: 'No agents are available, please try again later.',
  allAgentsBusy:
    'All our web chat agents are busy helping other people. Please try again later or contact us using one of the ways above.',
  chatClosed: 'Web chat is now closed.\\nOpening hours are {{courtOpeningHour}}.',
  chatAlreadyOpen: 'A web chat window is already open.',
  chatOpeningHours: '{{courtOpeningHour}}.',
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
  partner: 'partner',
  civilPartner: 'civil partner',
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
  contactUs: 'Contact us for help',
  webChat: 'Web chat',
  webChatDetails:
    'All our web chat agents are busy helping other people. Please try again later or contact us using one of the ways above.',
  sendUsAMessage: 'Send us a message',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0642',
  telephoneDetails: 'Monday to Friday, 8am to 8pm, Saturday 8am to 2pm.',
};

const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  phase: 'Beta',
  applyForDivorce: 'gwneud cais am ysgariad',
  applyForDissolution: 'gwneud cais am ddiddymu partneriaeth sifil',
  feedback:
    'Mae hwn yn wasanaeth newydd - <a class="govuk-link" aria-label="Dolen adborth, Bydd hyn yn agor tab newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r gwaith yr ydych wedi ei wneud yn barod." href="https://www.smartsurvey.co.uk/s/Divorce_Feedback" target="_blank">bydd eich sylwadau</a> yn ein helpu i wella’r gwasanaeth.',
  languageToggle: '<a href="?lng=en" class="govuk-link language">English</a>',
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Parhau',
  download: 'Llwytho i lawr',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
  ogl:
    'Mae’r holl gynnwys ar gael o dan <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license" >Drwydded Agored y Llywodraeth f3.0</a>, oni nodir fel arall',
  cookieText:
    'Mae GOV.UK yn defnyddio cwcis i wneud y safle’n symlach. <a class="govuk-link" href="#" title="Find out more about cookies" >Rhagor o wybodaeth am gwcis</a>',
  errorSummaryHeading: 'Roedd yna broblem',
  problemWithThisPage: 'Cysylltwch â ni am gymorth',
  phoneTitle: 'Rhif ffôn',
  phoneToCallIfProblems: '{{courtPhoneNumberCy}}<br>{{courtOpeningHourCy}}.',
  emailTitle: 'Anfonwch neges atom:',
  emailIfProblems:
    '<a class="govuk-link" href="mailto:divorcecase@justice.gov.uk" aria-label="Anfonwch neges atom i ymholiadaucymraeg@justice.gov.uk, mae’r ddolen hon yn agor neges e-bost newydd." >Anfonwch neges atom</a>',
  responseTime: 'Rydym yn amcanu ymateb o fewn 5 diwrnod gwaith',
  webChatTitle: 'Sgwrsio dros y we',
  chatDown: 'Nid yw’r gwasanaeth sgwrsio dros y we ar gael ar hyn o bryd; rhowch gynnig arall arni yn nes ymlaen.',
  chatWithAnAgent: 'Sgwrsio dros y we gydag asiant',
  noAgentsAvailable: 'Nid oes asiant ar gael ar hyn o bryd; rhowch gynnig arall arni yn nes ymlaen.',
  allAgentsBusy:
    'Mae ein gwasanaeth sgwrsio dros y we i gyd yn brysur yn helpu eraill. Rhowch gynnig arall arni hwyrach ymlaen neu cysylltwch â ni gan ddefnyddio un o’r dulliau uchod.',
  chatClosed: 'Mae’r gwasanaeth sgwrsio dros y we yn awr wedi cau.\\n Dyma’r oriau agor {{courtOpeningHour}}.',
  chatAlreadyOpen: 'Mae ffenestr sgwrsio dros y we ar agor yn barod.',
  chatOpeningHours: '{{courtOpeningHour}}.',
  saveAndSignOut: 'Cadw ac allgofnodi',
  signOut: 'Allgofnodi',
  signIn: 'Mewngofnodi',
  accessibility: 'Datganiad Hygyrchedd',
  cookies: 'Cwcis',
  privacyPolicy: 'Polisi Preifatrwydd',
  termsAndConditions: 'Telerau ac Amodau',
  marriage: 'priodas',
  civilPartnership: 'partneriaeth sifil',
  husband: 'gŵr',
  wife: 'gwraig',
  partner: 'partner',
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
};

export const generatePageContent = ({
  language,
  pageContent,
  isDivorce = true,
  formState,
  userEmail,
}: {
  language: Language;
  pageContent?: TranslationFn;
  isDivorce?: boolean;
  formState?: Partial<Case>;
  userEmail?: string;
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const serviceName = getServiceName(commonTranslations, isDivorce);
  const selectedGender = formState?.gender as Gender;
  const partner = getPartnerContent(commonTranslations, selectedGender, isDivorce);
  const partnerEmailProvided = formState?.doNotKnowRespondentEmailAddress !== Checkbox.Checked;

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    selectedGender,
    partner,
    language,
    isDivorce,
    formState,
    userEmail,
    partnerEmailProvided,
  };

  if (pageContent) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (translations: typeof en, isDivorce: boolean): string => {
  const serviceName = isDivorce ? translations.applyForDivorce : translations.applyForDissolution;
  return capitalize(serviceName);
};

const getPartnerContent = (translations: typeof en, selectedGender: Gender, isDivorce: boolean): string => {
  if (!isDivorce) {
    return translations.civilPartner;
  }
  if (selectedGender === Gender.MALE) {
    return translations.husband;
  }
  if (selectedGender === Gender.FEMALE) {
    return translations.wife;
  }
  return translations.partner;
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  isDivorce: boolean;
  formState?: Partial<Case>;
  partner: string;
  userEmail?: string;
  selectedGender: Gender;
  partnerEmailProvided: boolean;
};

export type Language = 'en' | 'cy';
