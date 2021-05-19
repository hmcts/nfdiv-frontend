import { capitalize } from 'lodash';

import { Case } from '../../app/case/case';
import { ApplicationType, Gender } from '../../app/case/definition';
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
  contactUsForHelp: 'Contact us for help',
  webChat: 'Web chat',
  webChatDetails:
    'All our web chat agents are busy helping other people. Please try again later or contact us using one of the ways below.',
  sendUsAMessage: 'Send us a message',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0642',
  telephoneDetails: 'Monday to Friday, 8am to 8pm, Saturday 8am to 2pm.',
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
  download: 'Llwytho i lawr',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
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
  english: 'Saesneg',
  welsh: 'Cymraeg',
  contactUsForHelp: 'Cysylltwch â ni am gymorth',
  webChat: 'Sgwrsio dros y we',
  webChatDetails:
    "Mae ein holl asiantau sgwrsio dros y we yn brysur yn helpu pobl eraill. Dewch yn ôl nes ymlaen neu cysylltwch â ni trwy un o'r dulliau uchod.",
  sendUsAMessage: 'Anfonwch neges atom',
  sendUsAMessageDetails: 'Byddwn yn ymdrechu i ymateb o fewn 5 diwrnod.',
  telephone: 'Ffoniwch',
  telephoneNumber: '0300 303 5171',
  telephoneDetails: 'Dydd Llun i Ddydd Gwener, 8.30am - 5pm.',
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
  const contactEmail = isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk';
  const isJointApplication = formState?.applicationType === ApplicationType.JOINT_APPLICATION;

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    selectedGender,
    partner,
    language,
    isDivorce,
    formState,
    userEmail,
    contactEmail,
    isJointApplication,
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
  contactEmail?: string;
  selectedGender: Gender;
  isJointApplication: boolean;
};

export type Language = 'en' | 'cy';
