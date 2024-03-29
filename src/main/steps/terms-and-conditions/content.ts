import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Terms and conditions',
  thisPage:
    'This page explains this service’s terms of use. They include this website’s <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a> and <a class="govuk-link" href="https://www.gov.uk/help/terms-conditions" target="_blank">terms and conditions</a>. By using this service you’re agreeing to the privacy policy and terms and conditions.',
  whoWeAre: 'Who we are',
  managedBy:
    'This service is managed by Her Majesty’s Courts and Tribunals Service and will be referred to as ‘we’ from now on.',
  update: 'We may update these terms and conditions if there is a change in the law or to the way the service works.',
  info: 'Information provided by this service',
  service: 'This service provides information to support you. We can’t give legal advice on individual cases.',
  answer:
    'You should answer the questions in the service based on your  circumstances, and seek legal advice if you need it.',
  stored: 'Where your data is stored',
  data: 'Your data will be stored in data centres in the UK.',
  notifyEmails:
    'We use GOV.UK Notify to send emails. Until the point where emails are handed over to your email provider, they are processed within the EEA. Your data is stored for 1 month, and is deleted after this.',
  applicationLaw: 'Applicable law',
  dispute:
    'Your use of this service and any dispute arising from its use will be  governed by and construed in accordance with the laws of England and Wales, including but not limited to the:',
  dispute1: 'Computer Misuse Act 1990',
  dispute2: 'Data Protection Act 1998',
  dispute3: 'Mental Capacity Act 2005',
  responsible: 'Responsible use of this service',
  designedForPeople:
    'The service is designed for people who need to use it or by others on their behalf and only with their consent.',
  risks:
    'There are risks in using a shared computer (for example in an internet café) to access this service. It’s your responsibility to be aware of these risks and to avoid using any computer which may leave your personal information accessible to others. You’re responsible if you choose to leave a computer unprotected while using this service.',
  precautions:
    'You must take your own precautions to ensure that the way you access this service does not expose you to the risk of:',
  precautions1: 'viruses',
  precautions2: 'malicious computer code',
  precautions3: 'other forms of interference which may damage your computer system',
  knowinglyIntroducing:
    'You must not misuse this service by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to this service, the system on which it is stored or any server, computer or database connected to it. You must not attack this site via a denial-of-service attack or a distributed denial-of-service attack.',
  containsSeveral:
    'This online service contains several free-text fields in which you will need to enter certain types of information. You should not enter sensitive information into these free-text fields. Sensitive information may include, but is not limited to, details of religious beliefs and financial information. Entering sensitive information is done so at your own risk.',
  changes: 'Changes to these terms and conditions',
  checkTermsAndConditions:
    'Please check these terms and conditions regularly. We can update them at any time without notice.',
  agreeToChanges:
    'You’ll agree to any changes if you continue to use this service after the terms and conditions have been updated.',
  contactUs: 'Contact us',
  address: {
    line1: 'CTSC (Courts and Tribunal Service Centre)',
    line2: 'C/o HMCTS Digital Divorce Services',
    line3: 'PO Box 13226',
    town: 'Harlow',
    county: '',
    postcode: 'CM20 9UG',
  },
};

const cy: typeof en = {
  title: 'Telerau ac Amodau',
  thisPage:
    'Mae’r dudalen hon yn egluro telerau defnyddio’r gwasanaeth hwn. Ar y wefan hon maent yn cynnwys y <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">polisi preifatrwydd</a> a’r <a class="govuk-link" href="https://www.gov.uk/help/terms-conditions" target="_blank">telerau ac amodau</a>. Trwy ddefnyddio’r gwasanaeth hwn rydych yn cytuno i’r polisi preifatrwydd a’r telerau ac amodau.',
  whoWeAre: 'Pwy ydym ni?',
  managedBy:
    'Rheolir y gwasanaeth hwn gan Wasanaeth Llysoedd a Thribiwnlysoedd Ei Mawrhydi a chyfeirir at y gwasanaeth o hyn ymlaen fel ‘ni’.',
  update:
    'Efallai y byddwn yn diweddaru’r telerau ac amodau hyn os bydd newid yn y gyfraith neu newid i’r ffordd mae’r gwasanaeth yn gweithio.',
  info: 'Gwybodaeth a ddarperir gan y gwasanaeth hwn',
  service:
    'Mae’r gwasanaeth hwn yn darparu gwybodaeth i’ch cefnogi. Ni allwn roi cyngor cyfreithiol ar achosion unigol.',
  answer:
    'Dylech ateb y cwestiynau yn seiliedig ar eich amgylchiadau a cheisio cyngor cyfreithiol os oes arnoch angen hynny.',
  stored: 'Ble mae eich data’n cael ei storio?',
  data: 'Bydd eich data yn cael ei storio mewn canolfannau data yn y DU.',
  notifyEmails:
    'Rydym yn defnyddio GOV.UK Notify i anfon e-byst. Nes y trosglwyddir e-byst i’ch darparwr e-bost, fe’u prosesir yn yr AEE. Cedwir eich data am 1 mis, ac yna bydd yn cael ei ddileu.',
  applicationLaw: 'Y gyfraith sy’n berthnasol',
  dispute:
    'Bydd y defnydd a wnewch o’r gwasanaeth hwn ac unrhyw anghydfod sy’n codi o’i ddefnyddio yn cael eu rheoli a’u dehongli yn unol â chyfreithiau Cymru a Lloegr, gan gynnwys, ond heb fod yn gyfyngedig i’r canlynol:',
  dispute1: 'Deddf Camddefnyddio Cyfrifiaduron 1990',
  dispute2: 'Deddf Diogelu Data 1998',
  dispute3: 'Deddf Galluedd Meddyliol 2005',
  responsible: 'Defnyddio’r gwasanaeth hwn yn gyfrifol',
  designedForPeople:
    'Cynlluniwyd y gwasanaeth ar gyfer pobl sydd angen ei ddefnyddio neu bobl sy’n ei ddefnyddio ar ran eraill gyda’u cydsyniad.',
  risks:
    'Mae peryglon yn gysylltiedig â defnyddio cyfrifiadur sy’n cael ei rannu (er enghraifft, mewn caffi rhyngrwyd) i gael mynediad at y gwasanaeth hwn. Eich cyfrifoldeb chi yw bod yn ymwybodol o’r peryglon hyn ac osgoi defnyddio unrhyw gyfrifiadur lle mae posibilrwydd y gallai eraill weld eich gwybodaeth bersonol. Chi sy’n gyfrifol os ydych chi’n dewis gadael cyfrifiadur heb ei ddiogelu tra rydych wedi mewngofnodi i’r gwasanaeth hwn.',
  precautions:
    'Mae’n rhaid ichi gymryd camau priodol eich hun i sicrhau nad yw’r ffordd rydych yn cael mynediad at y gwasanaeth hwn yn eich gadael yn agored i’r peryglon hyn:',
  precautions1: 'firysau',
  precautions2: 'cod cyfrifiadur maleisus',
  precautions3: 'niwed o fath arall a allai achosi difrod i’ch system gyfrifiadurol',
  knowinglyIntroducing:
    'Ni ddylech gamddefnyddio’r gwasanaeth hwn drwy fynd ati’n fwriadol i gyflwyno firysau, ymwelwyr diwahoddiad, mwydod, bomiau rhesymeg neu ddeunydd arall sy’n faleisus neu’n niweidiol i dechnoleg. Ni ddylech geisio cael mynediad heb awdurdod at y gwasanaeth hwn, y system lle caiff ei storio nac unrhyw weinydd, cyfrifiadur neu gronfa ddata sy’n gysylltiedig â’r gwasanaeth. Ni ddylech ymosod ar y wefan hon drwy ymosodiad gwrthod gwasanaeth neu ymosodiad gwrthod gwasanaeth a ddosbarthwyd.',
  containsSeveral:
    'Mae’r gwasanaeth ar-lein hwn yn cynnwys meysydd testun rhydd lle bydd gofyn ichi nodi mathau penodol o wybodaeth. Ni ddylid rhoi gwybodaeth sensitif yn y rhannau hyn. Gall data sensitif gynnwys manylion credoau crefyddol a data ariannol ymysg pethau eraill. Chi sy’n gyfrifol am unrhyw ddata sensitif yr ydych yn ei ddarparu.',
  changes: 'Newidiadau i’r telerau ac amodau hyn',
  checkTermsAndConditions:
    'Dylech wirio’r telerau ac amodau hyn yn rheolaidd. Efallai y byddwn yn eu diweddaru ar unrhyw adeg heb rybudd.',
  agreeToChanges:
    'Byddwch yn cytuno i unrhyw newidiadau drwy barhau i ddefnyddio’r gwasanaeth hwn ar ôl i’r telerau ac amodau gael eu diweddaru.',
  contactUs: 'Cysylltu â ni',
  address: {
    line1: 'CTSC (Courts and Tribunal Service Centre)',
    line2: 'C/o HMCTS Digital Divorce Services',
    line3: 'PO Box 13226',
    town: 'Harlow',
    county: '',
    postcode: 'CM20 9UG',
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
