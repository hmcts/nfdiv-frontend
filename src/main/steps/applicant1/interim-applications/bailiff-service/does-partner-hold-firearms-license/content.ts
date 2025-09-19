import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Does your ${partner} hold a firearms license or have any firearms convictions?`,
  otherDetailsLabel: 'Provide as much information as you can',
  errors: {
    applicant1BailiffDoesPartnerHoldFirearmsLicense: {
      required: `Select "Yes" if your ${partner} has a firearms license or any firearms convictions.`,
    },
    applicant1BailiffPartnerFirearmsLicenseDetails: {
      required: 'Enter details of the firearms license or any firearms convictions',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `A yw eich ${partner} yn meddu ar drwydded drylliau tanio neu a oes ganddo/ganddi unrhyw euogfarnau drylliau tanio?`,
  otherDetailsLabel: 'Rhowch gymaint o wybodaeth ag y gallwch',
  yes: 'Oes',
  no: 'Nac Oes',
  errors: {
    applicant1BailiffDoesPartnerHoldFirearmsLicense: {
      required: `Dewiswch “Oes” os oes gan eich ${partner} drwydded drylliau tanio neu unrhyw euogfarnau drylliau tanio`,
    },
    applicant1BailiffPartnerFirearmsLicenseDetails: {
      required: 'Rhowch fanylion y drwydded drylliau tanio neu unrhyw euogfarnau drylliau tanio',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffDoesPartnerHoldFirearmsLicense: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNoOrNotKnown.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnerFirearmsLicenseDetails: {
              type: 'textarea',
              label: l => l.otherDetailsLabel,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        { label: l => l.no, value: YesOrNoOrNotKnown.NO, id: 'no' },
        { label: l => l.notKnown, value: YesOrNoOrNotKnown.NOT_KNOWN, id: 'notKnown' },
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
  return {
    ...translations,
    form,
  };
};
