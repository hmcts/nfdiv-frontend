import type { TranslationFn } from '../../app/controller/GetController';
import type { CommonContent } from '../common/common.content';

const en = ({ isDivorce, telephoneNumber, openingTimes }: CommonContent) => ({
  title: 'Accessibility statement',
  line1: `This accessibility statement applies to the  ${isDivorce ? 'Apply for a divorce' : 'End a civil partnership'} service.`,
  line2:
    'This website is run by HM Courts & Tribunals Service (HMCTS). We want as many people as possible to be able to use this website. For example, that means you should be able to:',
  point1: 'change colours, contrast levels and fonts',
  point2: 'zoom in up to 400% without the text spilling off the screen',
  point3: 'navigate most of the website using just a keyboard',
  point4: 'navigate most of the website using speech recognition software',
  point5:
    'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver).',
  line3: 'We’ve also made the website text as simple as possible to understand.',
  line4: {
    part1: 'AbilityNet (opens in new tab)',
    part2: ' has advice on making your device easier to use if you have a disability.',
    link: 'https://mcmw.abilitynet.org.uk',
  },
  subheading1: 'How accessible this website is',
  line5: 'We know some parts of this website are not fully accessible:',
  point6: 'the progress bar is not correctly marked by a valid role attribute for screen reader users',
  point7: 'a group of related form controls does not have a legend that describes their purpose',
  point8: 'some non-interactive content receives keyboard focus',
  point9: 'some progress information shown visually is not communicated correctly to screen reader users',
  point10:
    'the accessible name of a form field does not match its visible label, which can make the field difficult to identify using a screen reader or speech recognition software.',

  line6:
    'We also know about some usability issues that do not fail the Web Content Accessibility Guidelines (WCAG) 2.2 AA standard:',
  point11: 'some date error messages do not identify which part of the date is missing or incorrect',
  point12:
    'after changing an answer from a check-answers page, users may have to navigate through subsequent pages again to return to the check-answers page',
  point13:
    'some error summary links do not move focus to the relevant field, and some error messages are not sufficiently distinct.',

  subHeading2: 'Feedback and contact information',
  line7:
    'If you find any problems not listed on this page, think we’re not meeting accessibility requirements, or need information on this website in a different format such as an accessible PDF, large print, easy read, audio recording or braille, contact:',
  email: 'Email:',
  call: `Call: ${telephoneNumber} (${openingTimes})`,
  line8: 'We’ll consider your request and get back to you within 10 working days.',

  subHeading3: 'Enforcement procedure',
  line9: {
    part1:
      'The Equality and Human Rights Commission is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, contact the ',
    part2: 'Equality Advisory and Support Service (opens in a new tab)',
    link: 'https://www.equalityadvisoryservice.com',
  },

  subHeading4: 'Technical information about this website’s accessibility',
  line10:
    'HM Courts & Tribunals Service is committed to making its websites accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',

  subHeading5: 'Compliance status',
  line11:
    'This website is partially compliant with the Web Content Accessibility Guidelines (WCAG) version 2.2 AA standard, due to the non-compliances listed below.',

  subHeading6: 'Non-accessible content',
  line12: 'The content is non-accessible for the following reasons.',

  subHeading7: 'Non-compliance with the accessibility regulations',
  line13:
    'Some progress information has an accessible label applied to an element that does not have an appropriate role. This means screen readers may not correctly identify or announce the information. This fails WCAG 2.2 success criterion 4.1.2, Name, Role, Value.',
  line14:
    'A group of related form controls are contained within a fieldset but do not have a legend describing the purpose of the group. This means screen reader users may find it difficult to understand how the controls relate to one another or what information they are being asked to provide. This fails WCAG 2.2 success criterion 1.3.1, Info and Relationships.',
  line15:
    'On some document-upload pages, non-interactive content is included in the keyboard tab order. This creates unnecessary focus points and may make navigating the page more difficult or confusing for keyboard users. This fails WCAG 2.2 success criterion 2.4.3, Focus Order.',
  line16:
    'In some instances, a completed stage is shown visually as complete but is announced to screen reader users as not completed. This means screen reader users receive inaccurate information about the progress of their application. This fails WCAG 2.2 success criterion 1.3.1, Info and Relationships.',
  line17:
    'The accessible name of a form field does not match the label displayed on the page. This means screen reader users may not receive an accurate description of a field, and speech-recognition users may be unable to select it using its visible label. This fails WCAG 2.2 success criteria 1.3.1, Info and Relationships, and 2.5.3, Label in Name.',

  subHeading8: 'What we’re doing to improve accessibility',
  line18: 'We are actively working to review and improve accessibility on our service.',
  line19: 'We continually run automated accessibility tests as part of our development practices.',
  line20: 'We carry out accessibility checks using assistive technology and semi-automated testing tools.',
  line21:
    'We work with HM Courts and Tribunals accessibility team and independent accessibility specialists to review the service and arrange accessibility audits.',
  line22:
    'We are working to fix the non-compliances identified in the most recent Digital Accessibility Centre audit. We’ll update this statement when these issues are fixed or when new accessibility issues are identified.',

  subHeading9: 'Preparation of this accessibility statement',
  line23: 'This statement was prepared on 24 November 2026. It was last reviewed on 26 November 2026.',
  line24:
    'This website was last tested on 4 November 2026. The test was carried out by the Digital Accessibility Centre against the WCAG 2.2 AA standard. The final report was issued on 18 November 2026.',
});

const cy: typeof en = ({ isDivorce, telephoneNumber, openingTimes }: CommonContent) => ({
  title: 'Datganiad hygyrchedd',
  line1: `Mae'r datganiad hygyrchedd hwn yn berthnasol i'r gwasanaeth ${isDivorce ? 'Gwneud cais am ysgariad' : 'Dod â phartneriaeth sifil i ben'}.`,
  line2:
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EF (GLlTEF) sy’n gyfrifol am y wefan hon. Rydym eisiau i gymaint o bobl â phosibl allu defnyddio’r wefan hon. Er enghraifft, mae hynny’n golygu y dylech allu:',
  point1: 'newid y lliwiau, y lefelau cyferbyniad a’r ffontiau',
  point2: 'gwneud y testun hyd at 400% yn fwy heb iddo ddiflannu oddi ar y sgrin',
  point3: "llywio drwy'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
  point4: "llywio drwy'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
  point5:
    'gwrando ar y rhan fwyaf o’r wefan gan ddefnyddio darllenydd sgrin (gan gynnwys fersiynau diweddaraf JAWS, NVDA a VoiceOver).',
  line3: 'Rydym hefyd wedi sicrhau ein bod wedi defnyddio iaith syml ar y wefan.',
  line4: {
    part1: 'Mae gan AbilityNet (yn agor mewn tab newydd)',
    part2: ' gyngor ynghylch gwneud eich dyfais yn haws i’w defnyddio os oes gennych anabledd.',
    link: 'https://mcmw.abilitynet.org.uk',
  },
  subheading1: "Pa mor hygyrch yw'r wefan hon",
  line5: 'Gwyddwn nad yw rhai rhannau o’r wefan hon yn gwbl hygyrch:',
  point6: "nid yw'r bar cynnydd wedi'i farcio'n gywir gan briodwedd rôl ddilys ar gyfer defnyddwyr darllenydd sgrin",
  point7: "nid oes gan grŵp o reolyddion ffurflen cysylltiedig adnodd sy'n disgrifio eu pwrpas",
  point8: "mae rhai cynnwys nad yw'n rhyngweithiol yn cael ffocws ar y bysellfwrdd",
  point9:
    "nid yw rhywfaint o wybodaeth cynnydd a ddangosir yn weledol yn cael ei chyfleu'n gywir i ddefnyddwyr darllenydd sgrin",
  point10:
    "nid yw enw hygyrch ar ffurflen yn cyfateb i'w label gweladwy, a all wneud yn anodd ei adnabod gan ddefnyddio darllenydd sgrin neu feddalwedd adnabod lleferydd.",

  line6:
    'Rydym hefyd yn gwybod am rai problemau defnyddioldeb nad ydynt yn methu safon Canllawiau Hygyrchedd Cynnwys Gwe (WCAG) 2.2 AA:',
  point11: "nid yw rhai negeseuon gwall am ddyddiadau yn nodi pa ran o'r dyddiad sydd ar goll neu'n anghywir",
  point12:
    "ar ôl newid ateb o'r dudalen gwirio atebion, efallai y bydd yn rhaid i ddefnyddwyr lywio drwy dudalennau dilynol eto i ddychwelyd i'r dudalen gwirio atebion",
  point13:
    "nid yw rhai dolenni crynodeb gwallau yn symud y ffocws i'r maes perthnasol, ac nid yw rhai negeseuon gwall yn ddigon gwahaniaethol.",

  subHeading2: 'Adborth a gwybodaeth gyswllt',
  line7:
    "Os cewch unrhyw broblem sydd heb ei rhestru ar y dudalen hon, os ydych chi'n meddwl nad ydym yn bodloni'r gofynion hygyrchedd, neu os ydych angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddeall, recordiad sain neu braille, cysylltwch â:",
  email: 'E-bost:',
  call: `Galw: ${telephoneNumber} (${openingTimes})`,
  line8: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',

  subHeading3: 'Y Weithdrefn Orfodi',
  line9: {
    part1:
      'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am orfodi Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018 (y ‘rheoliadau hygyrchedd’). Os nad ydych chi’n fodlon â’r ffordd rydym yn ymateb i’ch cwyn, cysylltwch â’r ',
    part2: 'Gwasanaeth Cynghori a Chymorth Cydraddoldeb (EASS) (yn agor mewn tab newydd)',
    link: 'https://www.equalityadvisoryservice.com',
  },

  subHeading4: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  line10:
    'Mae Gwasanaeth Llysoedd a Thribiwnlysoedd EF wedi ymrwymo i sicrhau bod ei wefan yn hygyrch, yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',

  subHeading5: 'Statws cydymffurfiaeth',
  line11:
    'Mae’r wefan hon yn cydymffurfio’n rhannol â safon AA Canllawiau Hygyrchedd Cynnwys Gwe (WCAG) fersiwn 2.2 a hynny oherwydd yr enghreifftiau o beidio â chydymffurfio a restrir isod.',

  subHeading6: "Cynnwys nad yw'n hygyrch",
  line12: 'Mae’r cynnwys yn anhygyrch am y rhesymau canlynol.',

  subHeading7: 'Anghydymffurfio â’r rheoliadau hygyrchedd',
  line13:
    "Mae gan rywfaint o wybodaeth gynnydd label hygyrch wedi'i gymhwyso i elfen nad oes ganddi rôl briodol.  Mae hyn yn golygu efallai na fydd darllenwyr sgrin yn adnabod nac yn cyhoeddi'r wybodaeth. Nid yw hyn yn bodloni WCAG 2.2 maen prawf llwyddiant 4.1.2 (enw, rôl, gwerth).",
  line14:
    "Mae grŵp o reolyddion ffurflen gysylltiedig wedi'u cynnwys o fewn set ond nid oes ganddynt adnodd sy'n disgrifio pwrpas y grŵp.  Mae hyn yn golygu y gall defnyddwyr darllenydd sgrin ei chael hi'n anodd deall sut mae'r rheolyddion yn perthyn i'w gilydd neu pa wybodaeth y gofynnir iddynt ei darparu. Nid yw hyn yn bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 (gwybodaeth a pherthnasau).",
  line15:
    "Ar rai tudalennau uwchlwytho dogfennau, mae cynnwys nad yw'n rhyngweithiol wedi'i gynnwys yn nhrefn tabiau bysellfwrdd.  Mae hyn yn creu pwyntiau ffocws diangen a gall wneud llywio'r dudalen yn anoddach neu'n ddryslyd i ddefnyddwyr bysellfwrdd. Nid yw hyn yn bodloni WCAG 2.2 maen prawf llwyddiant 2.4.3 (Gorchymyn Ffocws).",
  line16:
    "Mewn rhai achosion, dangosir cam wedi'i gwblhau yn weledol fel un wedi'i gwblhau ond caiff ei gyhoeddi i ddefnyddwyr darllenydd sgrin fel nad yw wedi'i gwblhau.  Mae hyn yn golygu bod defnyddwyr darllenydd sgrin yn derbyn gwybodaeth anghywir am gynnydd eu cais. Nid yw hyn yn bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 (gwybodaeth a pherthnasau).",
  line17:
    "Nid yw enw hygyrch ffurflen yn cyfateb i'r label a ddangosir ar y dudalen. Mae hyn yn golygu efallai na fydd defnyddwyr darllenydd sgrin yn cael disgrifiad cywir o faes, ac efallai na fydd defnyddwyr adnabod lleferydd yn gallu ei ddewis gan ddefnyddio ei label gweladwy. Nid yw hyn yn bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 (gwybodaeth a pherthnasau), a 2.5.3 (Label yn yr Enw).",

  subHeading8: 'Beth rydym yn ei wneud i wella hygyrchedd',
  line18: 'Rydym wrthi’n adolygu ac yn gwella hygyrchedd ein gwasanaeth.',
  line19: "Rydym yn cynnal profion hygyrchedd awtomataidd yn barhaus fel rhan o'n harferion datblygu.",
  line20: 'Rydym yn cynnal gwiriadau hygyrchedd gan ddefnyddio technoleg gynorthwyol ac offer profi lled-awtomataidd.',
  line21:
    "Rydym yn gweithio gyda thîm hygyrchedd Gwasanaeth Llysoedd a Tribiwnlysoedd EF ac arbenigwyr hygyrchedd annibynnol i adolygu'r gwasanaeth a threfnu archwiliadau hygyrchedd.",
  line22:
    "Rydym yn gweithio i ddatrys y diffyg cydymffurfiaeth a nodwyd yn yr archwiliad diweddaraf gan y Ganolfan Hygyrchedd Digidol.  Byddwn yn diweddaru'r datganiad hwn pan fydd y problemau hyn wedi'u datrys neu pan fydd materion hygyrchedd newydd yn cael eu nodi.",

  subHeading9: 'Paratoi’r datganiad hygyrchedd hwn',
  line23: 'Cafodd y datganiad hwn ei baratoi ar 24 Tachwedd 2026. Cafodd ei adolygu ddiwethaf ar 26 Tachwedd 2026.',
  line24:
    'Profwyd y wefan hon ddiwethaf ar 4 Tachwedd 2026. Y Ganolfan Hygyrchedd Digidol (DAC) wnaeth brofi’r wefan yn erbyn Safon WCAG 2.2 AA. Cyhoeddwyd yr adroddiad terfynol ar 18 Tachwedd 2026.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
