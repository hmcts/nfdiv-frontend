import { NoResponseNoNewContactDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'In person service and alternative service',
  line1: `You can try another way to deliver the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line2:
    'If you need to send the documents to an international address, you may need to seek legal advice to check what types of service are valid in that country.',
  inPerson: {
    header: 'In person service',
    details: `If you are confident the postal address is correct, you could consider in person service by a court bailiff or an independent process server. This means having the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } delivered by hand to your ${partner} on your behalf, by someone professionally trained in delivering court documents.`,
  },
  alternative: {
    header: 'Alternative service',
    details: `Alternative service means sending your ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } to your ${partner} in a way other than by post. This could be by sending them by email only (without posting them), including to an email address you've already tried. You could also try sending the papers by text, or through a private message on social media.`,
  },
  noContactDetails: {
    header: `No contact details for your ${partner}`,
    details: `If you do not have any other contact details for your ${partner}, you can try another way to progress your application.`,
  },
  wantToApplyChoiceHeader: 'Do you want to apply for in person service, alternative service, or try something else?',
  inPersonService: 'I want to arrange for in person service',
  alternativeService: 'I want to apply for alternative service',
  somethingElse: 'I do not have any other way to contact them',
  errors: {
    noResponseNoNewContactDetails: {
      required: 'You must choose an option to progress your application.',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'In person service and alternative service',
  line1: `You can try another way to deliver the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line2:
    'If you need to send the documents to an international address, you may need to seek legal advice to check what types of service are valid in that country.',
  inPerson: {
    header: 'In person service',
    details: `If you are confident the postal address is correct, you could consider in person service by a court bailiff or an independent process server. This means having the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } delivered by hand to your ${partner} on your behalf, by someone professionally trained in delivering court documents.`,
  },
  alternative: {
    header: 'Alternative service',
    details: `Alternative service means sending your ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } to your ${partner} in a way other than by post. This could be by sending them by email only (without posting them), including to an email address you've already tried. You could also try sending the papers by text, or through a private message on social media.`,
  },
  noContact: {
    header: `No contact details for your ${partner}`,
    details: `If you do not have any other contact details for your ${partner}, you can try another way to progress your application.`,
  },
  wantToApplyChoiceHeader: 'Do you want to apply for in person service, alternative service, or try something else?',
  inPersonService: 'I want to arrange for in person service',
  alternativeService: 'I want to apply for alternative service',
  somethingElse: 'I do not have any other way to contact them',
  errors: {
    noResponseNoNewContactDetails: {
      required: 'You must choose an option to progress your application.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseNoNewContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.wantToApplyChoiceHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.inPersonService,
          id: 'inPersonService',
          value: NoResponseNoNewContactDetails.IN_PERSON_SERVICE,
        },
        {
          label: l => l.alternativeService,
          id: 'alternativeService',
          value: NoResponseNoNewContactDetails.ALTERNATIVE_SERVICE,
        },
        {
          label: l => l.somethingElse,
          id: 'noContactDetails',
          value: NoResponseNoNewContactDetails.NO_CONTACT_DETAILS,
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
