
const en = {
  question: 'Do you have your marriage certificate with you now?',
  originalCertificate: 'You’ll be asked to upload a digital photo of the certificate. You can use your phone to do this if it has a camera.',
  camera: 'If you don’t have your certificate you should save and close your application and return later.',
  certificateTranslation: 'You must have the original certificate or a <a class="govuk-link" href="https://www.gov.uk/certifying-a-document"target="_blank" aria-label="certifying a document link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress.">certified copy</a>. If it isn’t in English, you’ll also need to provide a <a class="govuk-link" href="https://www.gov.uk/order-copy-birth-death-marriage-certificate"target="_blank">certified translation</a>.',
  yes: 'Yes',
  no: 'No',
};

const cy: typeof en = {
  question: 'A yw eich tystysgrif priodas gennych yn awr?',
  originalCertificate: 'Gofynnir ichi lwytho llun digidol o’r dystysgrif. Gallwch ddefnyddio’ch ffôn i wneud hyn os oes ganddo gamera.',
  camera: 'Os nad yw eich tystysgrif gennych, dylech arbed a chau eich cais a dychwelyd ato yn hwyrach ymlaen.',
  certificateTranslation: 'Mae’n rhaid ichi feddu ar y dystysgrif wreiddiol neu <a class="govuk-link" href="https://www.gov.uk/certifying-a-document"target="_blank" aria-label="Dolen i wybodaeth am ardystio tystysgrif, Bydd hon yn agor ffenestr newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r gwaith yr ydych wedi ei wneud eisoes.">copi ardystiedig</a>. Os nad yw yn Saesneg, bydd angen ichi ddarparu <a class="govuk-link" href="https://www.gov.uk/order-copy-birth-death-marriage-certificate"target="_blank">cyfieithiad ardystiedig</a>.',
  yes: 'Ydi',
  no: 'Nac ydi'
};

export const marriageCertificateForm = {
  fields: {
    screenHasMarriageCert: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      values: [
        { label: l => l.yes, value: 'Yes' },
        { label: l => l.no, value: 'No' }
      ]
    }
  },
  submit: {
    text: l => l.continue
  }
};

const common = {
  form: marriageCertificateForm
};

export const marriageCertificateContent = { en, cy, common };
