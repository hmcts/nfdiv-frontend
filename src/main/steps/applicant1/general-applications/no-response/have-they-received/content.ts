import { NoResponseCheckContactDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Check your ${partner}'s contact details`,
  detailsProvided: `These are the details you previously provided and is where we have sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  noDetailsProvided: `You did not provide any contact details for your ${partner}.`,
  detailsUpToDateHeader: `Are these details for your ${partner} correct and up to date?`,
  doYouKnowYourPartnersDetailsHeader: `Do you know your ${partner}'s contact details?`,
  upToDate: 'Yes, these details are up to date',
  newAddress: `I have a new address for my ${partner}`,
  newAddressOrEmailAddress: `I have a new postal or email address for my ${partner}`,
  notKnown: 'Not known',
  errors: {
    noResponseCheckContactDetails: {
      required: `You must confirm whether or not your ${partner}'s contact details are correct.`,
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export let form: FormContent = {
  fields: {
    noResponseCheckContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.detailsUpToDateHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.upToDate,
          value: NoResponseCheckContactDetails.UP_TO_DATE,
        },
        {
          label: l => l.newAddress,
          value: NoResponseCheckContactDetails.NEW_ADDRESS,
        },
        {
          label: l => l.notKnown,
          value: NoResponseCheckContactDetails.NOT_KNOWN,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const formNoDetails: FormContent = {
  fields: {
    noResponseCheckContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouKnowYourPartnersDetailsHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.newAddressOrEmailAddress,
          value: NoResponseCheckContactDetails.NEW_ADDRESS,
        },
        {
          label: l => l.notKnown,
          value: NoResponseCheckContactDetails.NOT_KNOWN,
        },
      ],
      validator: value => isFieldFilledIn(value),
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
  const checkAddressString = address => {
    return address !== null && address !== undefined && address.length > 0 ? address + ', ' : '';
  };
  const app1Address = () => {
    const userCase = content.userCase;
    let address = checkAddressString(userCase.applicant2Address1);
    address += checkAddressString(userCase.applicant2Address2);
    address += checkAddressString(userCase.applicant2Address3);
    address += checkAddressString(userCase.applicant2AddressTown);
    address += checkAddressString(userCase.applicant2AddressCounty);
    address += checkAddressString(userCase.applicant2AddressCountry);
    address += checkAddressString(userCase.applicant2AddressPostcode);
    return address;
  };
  const applicant2Address = app1Address();
  const applicant2Email = content.userCase.applicant2Email;
  const contactDetailsProvided =
    app1Address().length > 0 ||
    (applicant2Email !== null && applicant2Email !== undefined && applicant2Email.length > 0);
  form = contactDetailsProvided ? form : formNoDetails;
  return {
    ...translations,
    form,
    applicant2Address,
    applicant2Email,
    contactDetailsProvided,
  };
};
