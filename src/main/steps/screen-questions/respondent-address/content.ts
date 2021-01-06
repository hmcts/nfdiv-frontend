import { FormBody } from '../../../app/form/Form';

const en = {
  question: 'Do you have an address for your husband/wife?',
  line1: 'You must provide either a residential address or their solicitor’s address. This can be a UK or international address.',
  line2: 'The court needs this so that it can send your husband/wife their divorce papers.',
  yes: 'Yes',
  no: 'No'
};

const cy: typeof en = {
  question: 'A oes gennych chi gyfeiriad ar gyfer eich gŵr/gwraig',
  line1: 'Rhaid ichi ddarparu naill ai gyfeiriad preswyl neu gyfeiriad ei gyfreithiwr/chyfreithiwr. Gall hwn fod yn gyfeiriad yn y DU neu’n gyfeiriad rhyngwladol.',
  line2: 'Mae’r llys angen hyn fel y gellir anfon y papurau ysgariad at eich gŵr/gwraig.',
  yes: 'Oes',
  no: 'Nac oes'
};

export const respondentAddressForm = {
  fields: {
    screenHasRespondentAddress: {
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
  form: respondentAddressForm
};

export const respondentAddressContent = { en, cy, common };

export type RespondentAddressForm = FormBody<typeof respondentAddressForm>;
