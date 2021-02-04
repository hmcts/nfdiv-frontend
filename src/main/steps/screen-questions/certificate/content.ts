import { FormBody, FormContent } from '../../../app/form/Form';

const divorceEn = {
  question: 'Do you have your marriage certificate with you?',
  originalCertificate:
    'You’ll be asked to upload a digital photo of the certificate later in this application. You can use your phone to take the picture, if it has a camera.',
  camera:
    'It must be a photo of the original marriage certificate or a certified copy. You can <a class="govuk-link" href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" target="_blank">order a certified copy online (opens in a new tab)</a>, if you got married in England or Wales.',
  certificateTranslation:
    'If the original certificate is not in English, you’ll need to provide a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document#certifying-a-translation">certified translation</a>.',
  yes: 'Yes, I have my marriage certificate',
  no: 'No, I do not have my marriage certificate',
  errors: {
    screenHasCertificate: {
      required: 'Select yes if you have your marriage certificate',
      invalid: 'Select yes if you have your marriage certificate',
    },
  },
};

const divorceCy: typeof divorceEn = {
  question: 'A yw eich tystysgrif priodas gennych yn awr?',
  originalCertificate:
    'Gofynnir ichi lwytho llun digidol o’r dystysgrif. Gallwch ddefnyddio’ch ffôn i wneud hyn os oes ganddo gamera.',
  camera: 'Os nad yw eich tystysgrif gennych, dylech arbed a chau eich cais a dychwelyd ato yn hwyrach ymlaen.',
  certificateTranslation:
    'Mae’n rhaid ichi feddu ar y dystysgrif wreiddiol neu <a class="govuk-link" href="https://www.gov.uk/certifying-a-document"target="_blank" aria-label="Dolen i wybodaeth am ardystio tystysgrif, Bydd hon yn agor ffenestr newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r gwaith yr ydych wedi ei wneud eisoes.">copi ardystiedig</a>. Os nad yw yn Saesneg, bydd angen ichi ddarparu <a class="govuk-link" href="https://www.gov.uk/order-copy-birth-death-marriage-certificate"target="_blank">cyfieithiad ardystiedig</a>.',
  yes: 'Ydi',
  no: 'Nac ydi',
  errors: {
    screenHasCertificate: {
      required: 'Dewiswch oes os yw eich tystysgrif priodas gennych',
      invalid: 'Dewiswch oes os yw eich tystysgrif priodas gennych',
    },
  },
};

const civilEn = {
  question: 'Do you have your civil partnership certificate with you?',
  originalCertificate:
    'You’ll be asked to upload a digital photo of the certificate later in this application. You can use your phone to take the picture, if it has a camera.',
  camera:
    'It must be a photo of the original civil partnership certificate or a certified copy. You can <a class="govuk-link" href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" target="_blank">order a certified copy online (opens in a new tab)</a>, if you formed your civil partnership in England or Wales.',
  certificateTranslation:
    'If the original certificate is not in English, you’ll need to provide a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document#certifying-a-translation">certified translation</a>.',
  yes: 'Yes, I have my civil partnership certificate',
  no: 'No, I do not have my civil partnership certificate',
  errors: {
    screenHasCertificate: {
      required: 'Select yes if you have your civil partnership certificate',
      invalid: 'Select yes if you have your civil partnership certificate',
    },
  },
};

const civilCy: typeof civilEn = {
  question: 'A yw eich tystysgrif priodas gennych yn awr?',
  originalCertificate:
    'Gofynnir ichi lwytho llun digidol o’r dystysgrif. Gallwch ddefnyddio’ch ffôn i wneud hyn os oes ganddo gamera.',
  camera: 'Os nad yw eich tystysgrif gennych, dylech arbed a chau eich cais a dychwelyd ato yn hwyrach ymlaen.',
  certificateTranslation:
    'Mae’n rhaid ichi feddu ar y dystysgrif wreiddiol neu <a class="govuk-link" href="https://www.gov.uk/certifying-a-document"target="_blank" aria-label="Dolen i wybodaeth am ardystio tystysgrif, Bydd hon yn agor ffenestr newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r gwaith yr ydych wedi ei wneud eisoes.">copi ardystiedig</a>. Os nad yw yn Saesneg, bydd angen ichi ddarparu <a class="govuk-link" href="https://www.gov.uk/order-copy-birth-death-marriage-certificate"target="_blank">cyfieithiad ardystiedig</a>.',
  yes: 'Ydi',
  no: 'Nac ydi',
  errors: {
    screenHasCertificate: {
      required: 'Dewiswch oes os yw eich tystysgrif priodas gennych',
      invalid: 'Dewiswch oes os yw eich tystysgrif priodas gennych',
    },
  },
};

export const certificateForm: FormContent = {
  fields: {
    screenHasCertificate: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.question,
      values: [
        { label: l => l.yes, value: 'Yes' },
        { label: l => l.no, value: 'No' },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const common = {
  form: certificateForm,
};

//TODO civil partnership translations
export const certificateContent = {
  divorce: {
    en: divorceEn,
    cy: divorceCy,
  },
  civil: {
    en: civilEn,
    cy: civilCy,
  },
  common,
};

export type CertificateForm = FormBody<typeof certificateForm>;
