import type { TranslationFn } from '../../app/controller/GetController';
import type { CommonContent } from '../common/common.content';

const en = ({ isDivorce, telephoneNumber }: CommonContent) => ({
  title: `Accessibility Statement for the ${isDivorce ? 'Apply for a divorce' : 'End a civil partnership'} service`,
  line1: {
    part1: 'This accessibility statement applies to the website available at ',
    link: isDivorce ? 'https://www.apply-divorce.service.gov.uk' : 'https://www.end-civil-partnership.service.gov.uk',
  },
  line2: `This service allows you to ${isDivorce ? 'apply for a divorce' : 'end a civil partnership'}.`,
  line3:
    'This website is run by HM Courts & Tribunals Service (HMCTS). We want as many people as possible to be able to use it, so we’ve designed it to be accessible. For example you should be able to:',
  point1: 'change colours, contrast levels and fonts',
  point2: 'zoom in up to 300% without the text spilling off the screen',
  point3: 'navigate most of the website using just a keyboard',
  point4: 'navigate most of the website using speech recognition software',
  point5:
    'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
  line4: 'We’ve also made the website text as simple as possible to understand.',
  line5: {
    part1: 'AbilityNet',
    part2: ' has advice on making your device easier to use if you have a disability.',
    ariaLabel: 'This link will open in a new tab for AbilityNet',
    link: 'https://mcmw.abilitynet.org.uk',
  },
  subheading1: 'How accessible this website is',
  line6:
    'We know some parts of this website are not fully accessible. The following issues have been identified in some parts of the website:',
  line7:
    'Error skip links on the page have an href attribute that does not reference a valid ID. Users that click the error links will find that the link opens a new page and does not move the user to the error location.',
  line8:
    'Each of the text elements for ‘Create an account or sign in’ have an autocomplete attribute that has the value set to off. This value disables the autocomplete. Autocomplete helps cognitive users understand the purpose of the element.',
  line9:
    'After a screen reader user accepts the cookies information, a button is provided with the label ‘Hide this message’. The label may not provide an obvious purpose to screen reader users navigating forms list as there is no text relating to the cookies content.',
  line10: 'In some instances where the focus indicator is on a white background, it only has a contrast of 1.6:1.',
  line11: {
    part1: 'Some pages do not contain the text ‘',
    part2: '’ within the page title. Including ',
    part3: ' within the page title allows screen reader users to quickly identify that it is a government site.',
    govUk: 'GOV.UK',
    link: 'http://gov.uk',
  },
  line12:
    'Error summaries include the text ‘Information is missing or invalid’ and not ‘There is a problem’. Additionally, the error messages do not match, and keyboard focus is not taken to the error summary. Clicking an error that is part of a text input also does not position keyboard focus in the text input element. Some error summaries do not have a role=alert attribute.',
  line13: {
    part1: 'GOV.UK',
    part2:
      ' services should include the word ‘Error:’ within the title of the page if error handling is present. This helps screen reader users identify that an error is present.',
    link: 'http://gov.uk',
  },
  subHeading2: 'PDFs and other documents',
  line14:
    'PDFs are used to download and keep legal documents but they may not be structured so they’re accessible to a screen reader.',
  subHeading3: 'Feedback and contact information',
  line15:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  email: 'Email:',
  call: `Call: ${telephoneNumber} (Monday to Friday 8am to 8pm, Saturday 8am to 2pm)`,
  line16: 'We’ll consider your request and get back to you within 10 working days.',
  subHeading4: 'Reporting accessibility problems with this website',
  line17:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t listed on this page or think we’re not meeting the requirements of the accessibility regulations contact:',
  subHeading5: 'Enforcement procedure',
  line18: {
    part1: 'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the ',
    part2: 'Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018',
    part3: ' (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint contact the ',
    part4: 'Equality Advisory and Support Service (EASS).',
    link1: 'https://www.legislation.gov.uk/uksi/2018/852/contents/made',
    link2: 'https://www.equalityadvisoryservice.com',
  },
  subHeading6: 'Contacting us by phone or visiting us in person',
  line19: 'We provide a text relay service for people who are deaf, hearing impaired or have a speech impediment.',
  line20:
    'Our offices have audio induction loops, or if you contact us before your visit we can arrange a British Sign Language (BSL) interpreter.',
  line21: 'Find out how to contact us using the contact details above.',
  subHeading7: 'Technical information about this website’s accessibility',
  line22:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  subHeading8: 'Compliance status',
  line23:
    'This website is partially compliant with the Web Content Accessibility Guidelines version 2.1 AA standard, due to the non-compliances listed below.',
  subHeading9: 'Non-accessible content',
  line24: 'The content listed below is non-accessible for the following reasons.',
  line25:
    'Error skip links on the page have a href attribute that does not reference a valid ID. Users that click the error links will find that the link opens a new page and does not move the user to the error location. 4.1.2 Name, Role, Value (Level A)',
  line26:
    'Some of the colour combinations found on the site are low contrast and are likely to be difficult for people with low vision to read.  This fails on WCAG 2.1 Reference 1.4.11 Non-text Contrast.',
  subHeading10: 'PDFs and other documents',
  line27:
    'PDFs are used to download and keep legal documents but they may not be structured so they’re accessible to a screen reader.',
  subHeading11: 'What we’re doing to improve accessibility',
  line28:
    'This website is continually tested by HMCTS using automated tests and with accessibility software. Any new features which are introduced are also tested. This helps us to resolve issues before we launch new pages or features.',
  subHeading12: 'Preparation of this accessibility statement',
  line29: 'This statement was prepared on 29 March 2022.  It was last reviewed on 5 April 2022.',
  line30:
    'This website was last tested on 28 February. The test was carried out by the Digital Accessibility Centre (DAC) against WCAG 2.1 AA Standards.',
  line31: 'To give a more accurate review of the service the DAC team employed two differing testing processes:',
  point6: 'a manual technical audit using automated tools',
  point7:
    'a dedicated team of users with differing disabilities testing the service using a range of adaptive technologies.',
});

const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
