import { Translations } from '../../app/controller/GetController';

export const generateContent = ({ isDivorce }: { isDivorce: boolean }): Translations => {
  const en = {
    title: 'Privacy policy',
    info:
      'This privacy policy explains why we collect your personal data and what we do with it. It also explains your rights and how to enforce them.',
    whoManages: 'Who manages this service',
    managedBy:
      'This service is managed by HM Courts and Tribunals Service (HMCTS), which is an executive agency of the Ministry of Justice (MoJ).',
    moj:
      "The MoJ is known as the data controller for data protection purposes. <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter' target='_blank'>The MoJ personal information charter</a> explains how the MoJ processes personal data.",
    responsibleForDeciding:
      'As part of the MoJ, HMCTS is responsible for deciding how your personal data is used and for protecting the personal data you provide.',
    moreInformation:
      "More information about using this service is in the <a class='govuk-link' href='/terms-and-conditions'>terms and conditions</a>.",
    thePersonal: 'The personal data we need',
    whenYouUseDivorceService: 'We need the following personal data for this service:',
    applicantName: 'the applicant’s name',
    respondentName: `the name of the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    }`,
    changedApplicantName: `proof of the applicant’s name change if they’ve changed it since they ${
      isDivorce ? 'got married' : 'formed their civil partnership'
    }`,
    changedRespondentName: `proof of the name change of the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    } (if they changed it)`,
    marriageCert: `a copy of the ${
      isDivorce ? 'marriage certificate' : 'civil partnership certificate'
    } and the details from it`,
    countryApplicantMarried: 'the country in which the applicant is habitually resident',
    countryRespondentMarried: `the country in which the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    } is habitually resident`,
    applicantHabitualResidence: 'whether the applicant is habitually resident in England or Wales',
    respondentHabitualResidence: `whether the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    } is habitually resident in England or Wales`,
    applicantDomicile: 'whether the applicant is domiciled in England or Wales',
    respondentDomicile: `whether the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    } is domiciled in England or Wales`,
    applicantEmailAndPhone: 'the applicant’s addresses, email addresses and phone numbers',
    respondentEmailAndPhone: `the address, email address and phone number of the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    }`,
    applicantAddressAndNames:
      'the address, email address and phone number of the applicant’s solicitors (if they have one)',
    respondentAddressAndNames: `the address, email address and phone number of the solicitor of the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    } (if they have one)`,
    applicantOtherCourtCases: 'details of other court cases the applicant has been involved in',
    respondentOtherCourtCases: `details of any other court cases the person the applicant is ${
      isDivorce ? 'divorcing' : 'ending their civil partnership with'
    } has been involved in (if there are any)`,
    receivingNotifications: 'Receiving notifications',
    youNeedSignUp: `You need to sign up to receive notifications to use the ${
      isDivorce ? 'divorce' : 'end a civil partnership'
    } service. This is a legal requirement so that the application can proceed.`,
    storingYourData: 'Storing your data',
    askedForEmailAddress:
      'When you use this service you’ll be asked to use your email address to set up an account. You will be able to use this email and password to sign into other HMCTS services.',
    holdYourData: `While you’re filling out or responding to a ${
      isDivorce ? 'divorce' : 'ending a civil partnership'
    } application we will hold your data for up to 6 months. If you do not complete the application during this time you’ll have to start again.`,
    whenADivorceIsFinalised: `When ${
      isDivorce ? 'your divorce' : 'ending a civil partnership'
    } is finalised the case is stored for 18 years. After this time, some data (from the conditional order and the final order) is deleted.`,
    theRemainder:
      'The remainder of the case information is stored for an additional 82 years. After a total of 100 years this data will be deleted.',

    whyWeCollect: 'Why we collect your personal data',
    personalData: 'We collect your personal data to:',
    processApplication: 'process your application',
    legalRequirements: 'meet legal requirements',
    improveService: 'make improvements to this service',
    staffUse:
      'Our staff use your personal data to process your application. They work in the UK and your data is stored in the UK.',
    usingYourData: 'Using your data',
    asPart:
      'As part of your application you’ll be asked to use your email address to set up an account. You will be able to use this email and password to sign into other HMCTS services.',
    weMayAskForPermission:
      'We will ask for your permission to use your email address to send you emails using GOV.UK Notify. This system processes emails only within the European Economic Area until the point where emails are handed over to the email provider you use.',
    weUseCookies:
      "We use <a class='govuk-link' href='cookie'>cookies</a> to collect data that tells us about how you’re using this service, including:",
    ifYouOpenEmail: 'if you open an email from us or click on a link in an email',
    yourComputer: 'your computer, phone or tablet’s IP address',
    theRegion: 'the region or town where you’re using your computer, phone or tablet',
    theWeb: 'the web browser you use',
    sharingYourData: 'Sharing your data',
    ifAnother:
      'While processing your claim or application, another government department, agency or organisation might be involved and we may share your data with them.',
    dataSharedWithPrintingServiceProvider: `Any data you provide which needs to be printed will be shared with Xerox (UK) Ltd. For example, the ${
      isDivorce ? 'divorce' : 'ending a civil partnership'
    } application will be printed so that it can be sent to the respondent by post.`,
    ifYouContactUs:
      'If you contact us and ask for help with the service you’re using, your personal data may be shared with the Good Things Foundation. This is a company who we have partnered with to offer face to face support.',
    crime:
      'In some circumstances we may share your data for example, to prevent or detect crime, or to produce anonymised statistics.',
    weUse:
      "We use Google Analytics to collect data about how a website is used. This anonymous data is shared with Google. Find out about this in our <a class='govuk-link' href='terms-and-conditions'>terms and conditions</a>.",
    storeAndShare: 'Storing and sharing your data internationally',
    personalInformation:
      'Sometimes we need to send your personal information outside of the UK. When we do this we comply with data protection law.',
    yourRights: 'Your rights',
    youCanAsk: 'You can ask:',
    toSeePersonal: 'to see the personal data that we hold on you',
    toHavePersonal: 'to have the personal data corrected',
    toHaveDataRemoved:
      'to have the personal data removed or deleted (this will depend on the circumstances, for example if you decide not to continue your application)',
    thatAccessIsRestricted:
      'that access to the personal data is restricted (for example, you can ask to have your data stored for longer and not automatically deleted)',
    ifYouWantToSeePersonal: 'If you want to see the personal data that we hold on you, you can:',
    completeForm:
      "complete a form to make a <a class='govuk-link' href='https://www.gov.uk/government/publications/request-your-personal-data-from-moj' target='_blank'>subject access request</a> - your request goes to the MoJ as data controller",
    writeToUs: 'write to us: Disclosure Team, Post point 10.38, 102 Petty France, London, SW1H 9AJ',
    askMoreInformation: 'You can ask for more information about:',
    agreementsWeHave: 'agreements we have on sharing information with other organisations',
    withoutTellingYou: 'when we are allowed to pass on personal information without telling you',
    ourInstructions: 'our instructions to staff on how to collect, use or delete your personal information',
    howWeCheck: 'how we check that the information we hold is accurate and up-to-date',
    mojProtection: 'You can contact the MoJ data protection officer, by:',
    pettyFrance: 'writing to us: Post point 10.38, 102 Petty France, London, SW1H 9AJ',
    emailing:
      'emailing: <a href="mailto:data.compliance@justice.gov.uk" class="govuk-link">data.compliance@justice.gov.uk</a>',
    howToComplain: 'How to complain',
    seeOurComplaints:
      "See our <a class='govuk-link' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure' target='_blank'>complaints procedure</a> if you want to complain about how we've handled your personal data.",
    writeTo: 'Write to: Post point 10.38, 102 Petty France, London, SW1H 9AJ',
    email:
      'Email: <a href="mailto:data.compliance@justice.gov.uk" class="govuk-link">data.compliance@justice.gov.uk</a>',
    youCanAlsoComplain:
      "You can also complain to the <a class='govuk-link' href='https://ico.org.uk/global/contact-us' target='_blank'>Information Commissioner’s Office</a> if you’re not satisfied with our response or believe we are not processing your personal data lawfully.",
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
