import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `What have you already done to try to find your ${partner}’s details?`,
  whatIsAlreadyDone: `Tell us about anything you’ve already done to try to find your ${partner}’s contact details, and the results of these actions.`,
  errors: {
    applicant1SearchGovRecordsReasonForApplying: {
      required: 'Enter details about what you have already tried.',
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Beth ydych chi eisoes wedi'i wneud i geisio dod o hyd i fanylion eich ${partner}?`,
  whatIsAlreadyDone: `Dywedwch wrthym am unrhyw beth rydych chi eisoes wedi’i wneud i geisio dod o hyd i fanylion cyswllt eich ${partner}, a chanlyniadau'r camau gweithredu hyn.`,
  errors: {
    applicant1SearchGovRecordsReasonForApplying: {
      required: 'Rhowch fanylion am yr hyn rydych chi eisoes wedi rhoi cynnig arni.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsReasonForApplying: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.whatIsAlreadyDone,
      labelSize: 'normal',
      validator: isFieldFilledIn,
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
    form,
    ...translations,
  };
};
