import type { TranslationFn } from '../../app/controller/GetController';
import type { CommonContent } from '../common/common.content';

const en = ({ isDivorce, telephoneNumber, openingTimes }: CommonContent) => ({
  title: `Accessibility Statement for the ${isDivorce ? 'Apply for a divorce' : 'End a civil partnership'} service`,
  line1: {
    part1: 'This accessibility statement applies to the website available at ',
    link: isDivorce ? 'https://www.apply-divorce.service.gov.uk' : 'https://www.end-civil-partnership.service.gov.uk',
    part2: '.',
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
  call: `Call: ${telephoneNumber} (${openingTimes})`,
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

const cy: typeof en = ({ isDivorce, telephoneNumber, openingTimes }: CommonContent) => ({
  title: `Datganiad hygyrchedd ar gyfer y gwasanaeth ${
    isDivorce ? 'Gwneud cais am ysgariad' : 'Dod â phartneriaeth sifil i ben'
  } service`,
  line1: {
    part1: 'Mae’r datganiad hygyrchedd hwn yn berthnasol i’r wefan ',
    link: isDivorce ? 'https://www.apply-divorce.service.gov.uk' : 'https://www.end-civil-partnership.service.gov.uk',
    part2: '.',
  },
  line2: `Mae’r gwasanaeth hwn yn eich galluogi i ${
    isDivorce ? 'gwneud cais am ysgariad' : 'dod â phartneriaeth sifil i ben'
  }.`,
  line3:
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EM sy’n gyfrifol am y wefan hon. Rydym eisiau i gymaint o bobl â phosibl allu ei defnyddio, felly rydym wedi ceisio ei gwneud mor hygyrch â phosibl. Er enghraifft, dylech allu:',
  point1: 'newid y lliwiau, y lefelau cyferbyniad a’r ffontiau',
  point2: 'gwneud y testun hyd at 300% yn fwy heb iddo ddiflannu oddi ar y sgrin',
  point3: "mynd drwy'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
  point4: "mynd drwy'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
  point5:
    'gwrando ar y rhan fwyaf o’r wefan gan ddefnyddio darllenydd sgrin (gan gynnwys fersiynau diweddaraf JAWS, NVDA a VoiceOver).',
  line4: 'Rydym hefyd wedi sicrhau ein bod wedi defnyddio iaith syml ar y wefan.',
  line5: {
    part1: 'Mae gan AbilityNet',
    part2: "gyngor ar wneud eich dyfais yn haws i'w defnyddio os oes gennych anabledd.",
    ariaLabel: 'agor mewn ffenestr newydd',
    link: 'https://mcmw.abilitynet.org.uk',
  },
  subheading1: 'Pa mor hygyrch yw’r wefan hon',
  line6:
    'Gwyddwn nad yw rhai rhannau o’r wefan hon yn gwbl hygyrch. Mae’r materion canlynol wedi’u canfod mewn rhai rhannau o’r wefan:',
  line7:
    'Mae gan y dolenni neidio i’r gwall ar y dudalen briodoledd nhref nad yw’n cyfeirio at ddynodydd dilys. Bydd defnyddwyr sy’n clicio ar y dolenni gwall yn canfod bod y ddolen yn agor tudalen newydd yn hytrach na chyfeirio’r defnyddiwr at leoliad y gwall.',
  line8:
    'Mae gan bob un o’r elfennau testun ar gyfer ‘Creu cyfrif neu fewngofnodi’ briodoledd awtolenwi sydd â gwerth sydd wedi’i osod i ‘i ffwrdd’. Mae’r gwerth hwn yn diffodd y priodoledd awtolenwi. Mae’r nodwedd awtolenwi yn helpu defnyddwyr sydd â nam gwybyddol i ddeall pwrpas yr elfen benodol honno.',
  line9:
    'Ar ôl i ddefnyddiwr darllenydd sgrin dderbyn yr wybodaeth am gwcis, mae yna fotwm gyda’r label ‘Cuddio’r neges hon’ yn ymddangos. Efallai na fydd gan y label bwrpas amlwg i ddefnyddwyr darllenwyr sgrin sy’n llywio’r rhestr ffurflenni gan nad oes testun yn ymwneud â chynnwys y cwcis.',
  line10:
    'Mewn rhai achosion, pan fydd y dangosydd ffocws yn ymddangos ar gefndir gwyn, dim ond cyferbyniad o 1.6:1 sydd ganddo.',
  line11: {
    part1: 'Ni yw rhai tudalennau’n cynnwys y testun ‘',
    part2: '’ yn nheitl y dudalen. Mae cynnwys ',
    part3:
      ' yn nheitl y dudalen yn galluogi defnyddwyr darllenydd sgrin i adnabod yn gyflym ei bod yn wefan y llywodraeth.',
    govUk: 'GOV.UK',
    link: 'http://gov.uk',
  },
  line12:
    'Mae’r crynodebau gwallau yn cynnwys y testun ‘Mae gwybodaeth ar goll neu nid yw’n ddilys’ yn hytrach na ‘Mae yna broblem’.  Hefyd, nid yw’r negeseuon gwall yn cyfateb, ac nid yw’r ffocws bysellfwrdd yn cyfeirio’r defnyddiwr at grynodeb o’r gwall.   Yn ogystal â hyn, nid yw clicio ar wall sy’n ymwneud â thestun a fewnbynnwyd yn gosod y ffocws bysellfwrdd wrth y testun hwnnw.  Nid oes gan rai crynodebau gwallau briodoledd rôl=rhybudd.',
  line13: {
    part1: 'GOV.UK',
    part2:
      ' dylai gwasanaethau gynnwys y gair ‘Gwall:’ yn nheitl y dudalen os oes gwallau yn bresennol. Mae hyn yn helpu defnyddwyr darllenydd sgrin i adnabod bod gwall ar y dudalen.',
    link: 'http://gov.uk',
  },
  subHeading2: 'Dogfennau PDF a dogfennau eraill',
  line14:
    'Defnyddir dogfennau PDF i lwytho a chadw dogfennau cyfreithiol ond mae’n bosib nad ydynt wedi’u strwythuro fel eu bod yn hygyrch i ddarllenydd sgrin.',
  subHeading3: 'Adborth a gwybodaeth gyswllt',
  line15:
    'Os ydych angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddarllen, recordiad sain neu braille:',
  email: 'Anfonwch neges e-bost i:',
  call: `Ffoniwch: ${telephoneNumber} (${openingTimes})`,
  line16: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',
  subHeading4: "Riportio problemau hygyrchedd gyda'r wefan hon",
  line17:
    'Rydym wastad yn ceisio gwella hygyrchedd y wefan hon. Os byddwch yn cael unrhyw broblemau nad ydynt yn cael eu crybwyll ar y dudalen hon, neu os ydych yn credu nad ydym yn bodloni gofynion y rheoliadau hygyrchedd, cysylltwch â:',
  subHeading5: 'Y Weithdrefn Orfodi',
  line18: {
    part1: 'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am orfodi ',
    part2: 'Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018',
    part3: ' (y ‘rheoliadau hygyrchedd’). Os ydych chi’n anhapus gyda’r ffordd rydym yn ymateb i’ch cwyn, ',
    part4: 'cysylltwch â’r Gwasanaeth Cynghori a Chymorth Cydraddoldeb (EASS).',
    link1: 'https://www.legislation.gov.uk/uksi/2018/852/contents/made',
    link2: 'https://www.equalityadvisoryservice.com',
  },
  subHeading6: 'Cysylltu â ni dros y ffôn neu ymweld â ni’n bersonol',
  line19:
    'Rydym yn darparu gwasanaeth cyfnewid negeseuon testun ar gyfer pobl byddar, pobl sydd â nam ar eu clyw a phobl sydd â nam ar eu lleferydd.',
  line20:
    'Mae yna ddolenni sain yn ein swyddfeydd, neu os byddwch yn cysylltu â ni cyn eich ymweliad, gallwn drefnu cyfieithydd Iaith Arwyddion Prydain (BSL) ar eich cyfer.',
  line21: 'Gwybodaeth am sut i gysylltu â ni gan ddefnyddio’r manylion cyswllt uchod.',
  subHeading7: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  line22:
    'Mae GLlTEM wedi ymrwymo i sicrhau bod ei wefannau yn hygyrch, a hynny yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Gyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',
  subHeading8: 'Statws cydymffurfiaeth',
  line23:
    'Mae’r wefan hon yn cydymffurfio’n rhannol â safon AA Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1,, a hynny oherwydd yr enghreifftiau o beidio â chydymffurfio a restrir isod.',
  subHeading9: 'Cynnwys anhygyrch',
  line24: 'Mae’r cynnwys isod yn anhygyrch am y rhesymau canlynol.',
  line25:
    'Mae gan y dolenni neidio i’r gwall ar y dudalen briodoledd nhref nad yw’n cyfeirio at ddynodydd dilys. Bydd defnyddwyr sy’n clicio ar y dolenni gwall yn canfod bod y ddolen yn agor tudalen newydd yn hytrach na chyfeirio’r defnyddiwr at leoliad y gwall. 4.1.2 Enw, Rôl, Gwerth (Lefel A)',
  line26:
    'Mae rhai o’r cyfuniadau lliw a ddefnyddir ar y wefan o gyferbyniad isel ac yn debygol o fod yn anodd i bobl â golwg gwan eu darllen.  Nid yw hyn yn cydymffurfio â WCAG 2.1 Cyfeirnod 1.4.11 Cyferbyniad nad yw’n ymwneud â thestun.',
  subHeading10: 'Dogfennau PDF a dogfennau eraill',
  line27:
    'Defnyddir dogfennau PDF i lwytho a chadw dogfennau cyfreithiol ond mae’n bosib nad ydynt wedi’u strwythuro fel eu bod yn hygyrch i ddarllenydd sgrin.',
  subHeading11: 'Beth rydym yn ei wneud i wella hygyrchedd',
  line28:
    'TMae GLlTEM yn defnyddio meddalwedd hygyrchedd a phrofion awtomataidd i brofi’r wefan hon yn barhaus. Bydd unrhyw nodweddion newydd a gyflwynir hefyd yn cael eu profi. Mae hyn yn ein helpu i ddatrys problemau cyn i ni lansio tudalennau neu nodweddion newydd.',
  subHeading12: 'Paratoi’r datganiad hygyrchedd hwn',
  line29: 'Cafodd y datganiad hwn ei baratoi ar 29 Mawrth 2022.  Cafodd ei adolygu ddiwethaf ar 5 Ebrill 2022.',
  line30:
    'Profwyd y wefan hon ddiwethaf ar 28 Chwefror. Y Ganolfan Hygyrchedd Digidol (DAC) wnaeth brofi’r wefan yn erbyn Safonau WCAG 2.1 AA.',
  line31: 'Er mwyn rhoi adolygiad mwy cywir o’r gwasanaeth, mi wnaeth tîm DAC ddefnyddio dwy broses brofi wahanol:',
  point6: 'archwiliad technegol â llaw gan ddefnyddio offer awtomataidd',
  point7: 'tîm ymroddedig o ddefnyddwyr gydag anableddau gwahanol yn defnyddio ystod o dechnolegau addasu.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
