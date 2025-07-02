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
  newAddressOrEmailAddress: `I have a new postal or email address for my ${partner}`,
  notKnown: 'Not known',
  homeAddress: 'Home address',
  emailAddress: 'Email address',
  errors: {
    applicant1NoResponseCheckContactDetails: {
      required: `You must confirm whether or not your ${partner}'s contact details are correct.`,
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `Gwirio manylion cyswllt eich ${partner}`,
  detailsProvided: `Dyma’r manylion a ddarparwyd gennych yn flaenorol ac i ble rydym wedi anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }.`,
  noDetailsProvided: `Ni wnaethoch ddarparu unrhyw fanylion cyswllt ar gyfer eich ${partner}.`,
  detailsUpToDateHeader: `A yw’r manylion hyn ar gyfer eich ${partner} yn gywir ac yn gyfredol?`,
  doYouKnowYourPartnersDetailsHeader: `Ydych chi’n gwybod manylion eich ${partner}?`,
  upToDate: 'Ydy, mae’r manylion hyn yn gyfredol',
  newAddressOrEmailAddress: `Mae gennyf gyfeiriad post neu gyfeiriad e-bost newydd ar gyfer fy ${partner}`,
  notKnown: 'Ddim yn hysbys',
  homeAddress: 'Cyfeiriad cartref',
  emailAddress: 'Cyfeiriad e-bost',
  errors: {
    applicant1NoResponseCheckContactDetails: {
      required: `You must confirm whether or not your ${partner}'s contact details are correct.`,
    },
  },
});

export let form: FormContent = {
  fields: {
    applicant1NoResponseCheckContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.detailsUpToDateHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.upToDate,
          id: 'upToDate',
          value: NoResponseCheckContactDetails.UP_TO_DATE,
        },
        {
          label: l => l.newAddressOrEmailAddress,
          id: 'newAddress',
          value: NoResponseCheckContactDetails.NEW_ADDRESS,
        },
        {
          label: l => l.notKnown,
          id: 'notKnown',
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
    applicant1NoResponseCheckContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouKnowYourPartnersDetailsHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.newAddressOrEmailAddress,
          id: 'newAddress',
          value: NoResponseCheckContactDetails.NEW_ADDRESS,
        },
        {
          label: l => l.notKnown,
          id: 'notKnown',
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
  const app2Address = () => {
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
  const applicant2Address = app2Address();
  const applicant2Email = content.userCase.applicant2Email;
  const contactDetailsProvided =
    applicant2Address.length > 0 ||
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
