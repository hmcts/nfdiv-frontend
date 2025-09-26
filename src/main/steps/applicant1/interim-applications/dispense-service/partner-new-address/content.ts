import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Where did your ${partner} live after you parted?`,
  line1: `Include all addresses you know of that your ${partner} has lived at since you parted.`,
  address1: 'Address 1',
  address2: 'Address 2',
  addressEnquiries: 'Results of any enquiries made about this address',
  optional: ' (optional)',
  errors: {
    applicant1DispensePartnerPastAddress1: {
      required: 'You must provide address details before continuing.',
    },
    applicant1DispensePartnerPastAddressEnquiries1: {
      required: 'Enter details about the results of your enquiries.',
    },
    applicant1DispensePartnerPastAddress2: {
      required:
        'You have provided a statement about a second address, so you must provide address details before continuing.',
    },
    applicant1DispensePartnerPastAddressEnquiries2: {
      required: 'Enter details about the results of your enquiries at the second address.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Ble wnaeth eich ${partner} fyw ar ôl i chi wahanu?`,
  line1: `Rhowch pob cyfeiriad rydych yn gwybod lle mae eich  ${partner} wedi byw ers i chi wahanu.`,
  address1: 'Cyfeiriad 1',
  address2: 'Cyfeiriad 2',
  addressEnquiries: 'Canlyniadau unrhyw ymholiadau a wnaed am y cyfeiriad hwn',
  optional: '(dewisol)',
  errors: {
    applicant1DispensePartnerPastAddress1: {
      required: 'Rhaid i chi ddarparu manylion y cyfeiriad cyn parhau.',
    },
    applicant1DispensePartnerPastAddressEnquiries1: {
      required: 'Rhowch fanylion canlyniad eich ymholiadau.',
    },
    applicant1DispensePartnerPastAddress2: {
      required:
        "Rydych wedi darparu datganiad am ail gyfeiriad, felly mae'n rhaid i chi ddarparu manylion y cyfeiriad cyn parhau.",
    },
    applicant1DispensePartnerPastAddressEnquiries2: {
      required: "Rydych wedi darparu ail gyfeiriad, felly mae'n rhaid i chi ddarparu datganiad cyn parhau.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DispensePartnerPastAddress1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address1,
      labelHidden: true,
      hint: l => `<div class='govuk-label'>${l.address1}</div>`,
      validator: value => isFieldFilledIn(value),
    },
    applicant1DispensePartnerPastAddressEnquiries1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.addressEnquiries,
      labelHidden: true,
      hint: l => `<div class='govuk-label'>${l.addressEnquiries}</div>`,
      validator: value => isFieldFilledIn(value),
    },
    applicant1DispensePartnerPastAddress2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address2,
      labelHidden: true,
      hint: l => `<div class='govuk-label'>${l.address2 + l.optional}</div>`,
      validator: (value, formData) => {
        if (!isFieldFilledIn(formData.applicant1DispensePartnerPastAddressEnquiries2) && isFieldFilledIn(value)) {
          return 'required';
        }
      },
    },
    applicant1DispensePartnerPastAddressEnquiries2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.addressEnquiries,
      labelHidden: true,
      hint: l => `<div class='govuk-label'>${l.addressEnquiries + l.optional}</div>`,
      validator: (value, formData) => {
        if (!isFieldFilledIn(formData.applicant1DispensePartnerPastAddress2) && isFieldFilledIn(value)) {
          return 'required';
        }
      },
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
