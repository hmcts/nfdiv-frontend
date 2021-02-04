import { FormBody, FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = {
  question: 'What language do you want us to use when we contact you?',
  line1: 'We’ll send you emails and documents as we progress your case.',
  line2: 'Choose which language you’d like these in.',
  yes: 'English and Welsh',
  no: 'English only',
  errors: {
    languagePreferenceWelsh: {
      required: 'Choose the languages you want your documents and correspondence in.',
    },
  },
};

const cy: typeof en = {
  question: 'Pa iaith yr hoffech inni ei defnyddio wrth gysylltu efo chi?',
  line1: 'Byddwn yn anfon ebyst a dogfennau atoch wrth i ni ddelio gyda’ch achos.',
  line2: 'Dewisiwch pa iaith yr hoffech eu cael.',
  yes: 'Cymraeg a Saesneg',
  no: 'Saesneg yn unig',
  errors: {
    languagePreferenceWelsh: {
      required: 'Dewisiwch yr iaith yr hoffech gael eich dogfennau a’ch gohebiaeth.',
    },
  },
};

export const languagePreferenceForm: FormContent = {
  fields: {
    languagePreferenceWelsh: {
      type: 'radios',
      label: l => l.question,
      values: [
        { label: l => l.no, value: 'No' },
        { label: l => l.yes, value: 'Yes' },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const common = {
  form: languagePreferenceForm,
};

//TODO civil partnership translations
export const languagePreferenceContent = {
  divorce: {
    en,
    cy,
  },
  civil: {
    en,
    cy,
  },
  common,
};

export type LanguagePreferenceForm = FormBody<typeof languagePreferenceForm>;
