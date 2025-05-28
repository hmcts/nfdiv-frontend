import { NoResponseOwnSearches } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Trying to find your ${partner}'s details`,
  line1: `In most cases the court needs to be satisfied that your ${partner} has been sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } in some way before your ${isDivorce ? 'divorce' : 'application to end your civil partnership'} can progress.`,
  line2: `You should try to find up to date contact details for your ${partner} if you are able to. If you can find them, the papers can be sent to them.`,
  line3: `If you've already tried to find your ${partner}'s contact details without success, or have not been able to look for them, you can try something else`,
  haveYouTriedToFindHeader: `Have you tried to find ${partner}'s contact details?`,
  yes: 'Yes',
  no: 'No',
  notFound: "I've not been able to",
  errors: {
    applicant1NoResponseOwnSearches: {
      required: 'You must select an option before continuing',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `Trying to find your ${partner}'s details`,
  line1: `In most cases the court needs to be satisfied that your ${partner} has been sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } in some way before your ${isDivorce ? 'divorce' : 'application to end your civil partnership'} can progress.`,
  line2: `You should try to find up to date contact details for your ${partner} if you are able to. If you can find them, the papers can be sent to them.`,
  line3: `If you've already tried to find your ${partner}'s contact details without success, or have not been able to look for them, you can try something else`,
  haveYouTriedToFindHeader: `Have you tried to find ${partner}'s contact details?`,
  yes: 'Yes',
  no: 'No',
  notFound: "I've not been able to",
  errors: {
    applicant1NoResponseOwnSearches: {
      required: 'You must select an option before continuing',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseOwnSearches: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.haveYouTriedToFindHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: NoResponseOwnSearches.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: NoResponseOwnSearches.NO,
        },
        {
          label: l => l.notFound,
          id: 'notFound',
          value: NoResponseOwnSearches.NOT_FOUND,
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

  return {
    ...translations,
    form,
  };
};
