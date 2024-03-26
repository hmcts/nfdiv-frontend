import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid } from '../../../app/form/validation';

const en = ({ partner, isDivorce }) => ({
  title: 'Enter their solicitor’s details',
  line1: `The court will contact the solicitor below to confirm they are representing your ${partner}. Then the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } will then be ‘served’ (sent) to them.`,
  line2: `If you need to get their solicitor’s details then you can save and sign out and return to this application when you have them. It’s particularly important to get their details if your ${partner} has asked you to provide them to the court.`,
  line3:
    'If it’s too difficult or unsafe to get their solicitor’s details then you can continue without providing them.',
  solicitorName: 'Solicitor name',
  solicitorNameHint: 'The name of the individual solicitor who will be dealing with the case',
  solicitorEmailAddress: 'Solicitor email address',
  solicitorEmailAddressHint: 'The email address, where this application will be ‘served’ (sent)',
  solicitorFirmName: 'Solicitor firm name',
  solicitorFirmNameHint: 'The name of the organisation or firm',
  solicitorAddress: 'Solicitor address',
  solicitorAddressHint: 'The postal address of the solicitor’s firm',
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Town or city',
  county: 'County, district, state or province',
  postcode: 'Postal code, zip code or area code',
  country: 'Country',
  solicitorAddressOverseas: 'Is this an international address?',
  errors: {
    applicant2SolicitorEmail: {
      invalid: 'You have entered the email address in the wrong format. Check it and enter it again.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce }) => ({
  title: 'Nodwch fanylion ei gyfreithiwr',
  line1: `Bydd y llys yn cysylltu â’r cyfreithiwr isod i gadarnhau eu bod yn cynrychioli eich ${partner}. Yna bydd y ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } yn cael ei ‘gyflwyno’ (ei anfon) atynt. `,
  line2: `Os oes arnoch angen cael manylion ei gyfreithiwr, yna gallwch gadw’r cais hwn, allgofnodi a dychwelyd i’r cais pan fydd y manylion gennych.
  Mae’n bwysig eich bod yn cael eu manylion os yw eich ${partner} wedi gofyn i chi eu darparu i’r llys.`,
  line3:
    'Os yw’n rhy anodd neu os nad yw’n ddiogel i gael manylion eu cyfreithiwr, yna gallwch barhau heb eu darparu. ',
  solicitorName: 'Enw’r cyfreithiwr',
  solicitorNameHint: 'Enw’r cyfreithiwr unigol a fydd yn delio â’r achos ',
  solicitorEmailAddress: 'Cyfeiriad e-bost y cyfreithiwr',
  solicitorEmailAddressHint: 'Y cyfeiriad e-bost y bydd y cais yn cael ei ‘gyflwyno’ (ei anfon) iddo ',
  solicitorFirmName: 'Enw cwmni’r cyfreithiwr',
  solicitorFirmNameHint: 'Enw’r sefydliad neu gwmni',
  solicitorAddress: 'Cyfeiriad y cyfreithiwr',
  solicitorAddressHint: 'Cyfeiriad post cwmni’r cyfreithiwr',
  addressLine1: 'Llinell cyfeiriad 1',
  addressLine2: 'Llinell cyfeiriad 2',
  addressLine3: 'Llinell cyfeiriad 3',
  town: 'Tref neu ddinas',
  county: 'Sir, rhanbarth,  gwladwriaeth neu dalaith',
  postcode: 'Cod post, cod zip neu god rhanbarth',
  country: 'Gwlad',
  solicitorAddressOverseas: 'A yw hwn yn gyfeiriad rhyngwladol?',
  errors: {
    applicant2SolicitorEmail: {
      invalid:
        'Rydych wedi nodi’r cyfeiriad e-bost yn y fformat anghywir. Gwiriwch y cyfeiriad e-bost a theipiwch ef eto.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2SolicitorName: {
      type: 'text',
      label: l => l.solicitorName,
      hint: l => l.solicitorNameHint,
      classes: 'govuk-input--width-20',
    },
    applicant2SolicitorEmail: {
      type: 'text',
      label: l => l.solicitorEmailAddress,
      hint: l => l.solicitorEmailAddressHint,
      classes: 'govuk-input--width-20',
      validator: value => {
        if (value) {
          return isEmailValid(value);
        }
      },
    },
    applicant2SolicitorFirmName: {
      type: 'text',
      label: l => l.solicitorFirmName,
      hint: l => l.solicitorFirmNameHint,
      classes: 'govuk-input--width-20',
    },
    applicant2SolicitorAddress1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine1,
    },
    applicant2SolicitorAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine2,
    },
    applicant2SolicitorAddress3: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine3,
    },
    applicant2SolicitorAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
    },
    applicant2SolicitorAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
    },
    applicant2SolicitorAddressPostcode: {
      id: 'addressPostcode',
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      attributes: {
        maxLength: 14,
      },
    },
    applicant2SolicitorAddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
    },
    applicant2SolicitorAddressOverseas: {
      id: 'solicitorAddressOverseas',
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.solicitorAddressOverseas,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
