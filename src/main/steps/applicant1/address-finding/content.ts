import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ partner, required }) => ({
  title: 'It’s easier to proceed with a postal address',
  line1:
    'It’s usually faster and less expensive if you can provide us with a postal address. If you wish to proceed without an address, you will need to complete and pay for an additional application once you have submitted this one.',
  line2: `If you cannot find your ${partner}’s address, you may also provide your ${partner}’s:`,
  solicitorAddress: 'solicitor’s address, if they have one',
  workAddress: `work address, if you have your ${partner}’s permission`,
  line3:
    'You could also try looking for them on social media, or contacting their friends or relatives if you feel safe doing so.',
  line4: 'You can save your application here and try to find an address if you need to.',
  foundTheirAddress: `Have you been able to find your ${partner}’s address?`,
  errors: {
    applicant1FoundApplicant2Address: {
      required,
    },
  },
});

//TODO Welsh translation required
const cy: typeof en = ({ partner, required }) => ({
  title: 'It’s easier to proceed with a postal address',
  line1:
    'It’s usually faster and less expensive if you can provide us with a postal address. If you wish to proceed without an address, you will need to complete and pay for an additional application once you have submitted this one.',
  line2: `If you cannot find your ${partner}’s address, you may also provide your partner’s:}`,
  solicitorAddress: 'solicitor’s address, if they have one',
  workAddress: `work address, if you have your ${partner}’s permission`,
  line3:
    'You could also try looking for them on social media, or contacting their friends or relatives if you feel safe doing so.',
  line4: 'You can save your application here and try to find an address if you need to.',
  foundTheirAddress: `Have you been able to find your ${partner}’s address?`,
  errors: {
    applicant1FoundApplicant2Address: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1FoundApplicant2Address: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.foundTheirAddress,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
