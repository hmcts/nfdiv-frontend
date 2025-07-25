import type { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  contactUs: 'Contact Us',
  chatWithUs: 'Chat with us',
  webchat: 'Webchat',
  webchatEnglandAndWales: 'Web chat (England and Wales)',
  webchatScotland: 'Web chat (Scotland only)',
  closedForTheDay: 'I’m sorry but our Webchat service is now closed for the day.',
  openHoursScotland: 'We are open Monday to Friday from 8:30 am to 5 pm – excluding public holidays.',
  phoneAgent: 'Talk to one of our agents now over the phone.',
  getHelp: 'Get some help by messaging an agent online.',
  startWebchat: 'Start web chat (opens in a new window)',
  busy: 'All out web chat agents are busy helping other people. Please try again later or contact us using one of the ways below.',
  noAgentsAvailable: 'No agents are available, please try again later.',
  sendUsAMessage: 'Send us a message',
  telephone: 'Telephone',
  phoneNumber: '0300 303 0642',
  openingTimes: 'Opening times (webchat and telephone)',
  openingHours: 'Monday to Friday, 10 am to 6 pm<br>Closed on bank holidays',
  checkingAvailability: 'Checking availability...',
  serviceUnavailable: 'Service unavailable',
  error: 'We’re currently unable to check the availability of our team. Please try again later or contact us by phone.',
  errorChecking: {
    line1: 'Sorry, we couldn’t check the availability of our team.',
    line2: 'Please try refreshing the page or contact us at',
    email: 'help@gov.uk',
  },
  popupBlocked: 'Popup blocked. Please allow pop‑ups for this site.',
});

const cy: typeof en = () => ({
  contactUs: 'Contact Us',
  chatWithUs: 'Chat with us',
  webchat: 'Sgwrsio dros y we',
  webchatEnglandAndWales: 'Web chat (England and Wales)',
  webchatScotland: 'Web chat (Scotland only)',
  closedForTheDay: 'I’m sorry but our Webchat service is now closed for the day.',
  openHoursScotland: 'We are open Monday to Friday from 8:30 am to 5 pm – excluding public holidays.',
  phoneAgent: 'Talk to one of our agents now over the phone.',
  getHelp: 'Get some help by messaging an agent online.',
  startWebchat: 'Start web chat (opens in a new window)',
  busy: 'All out web chat agents are busy helping other people. Please try again later or contact us using one of the ways below.',
  noAgentsAvailable: 'No agents are available, please try again later.',
  sendUsAMessage: 'Send us a message',
  telephone: 'Telephone',
  phoneNumber: '0300 303 0642',
  openingTimes: 'Opening times (webchat and telephone)',
  openingHours: 'Monday to Friday, 10 am to 6 pm<br>Closed on bank holidays',
  checkingAvailability: 'Checking availability...',
  serviceUnavailable: 'Service unavailable',
  error: 'We’re currently unable to check the availability of our team. Please try again later or contact us by phone.',
  errorChecking: {
    line1: 'Sorry, we couldn’t check the availability of our team.',
    line2: 'Please try refreshing the page or contact us at',
    email: 'help@gov.uk',
  },
  popupBlocked: 'Popup blocked. Please allow pop‑ups for this site.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
