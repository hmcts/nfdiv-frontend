
const en = {
  question: 'What language do you want us to use when we contact you?',
  line1: 'We’ll send you emails and documents as we progress your case.',
  line2: 'Choose which language you’d like these in.',
  yes: 'English and Welsh',
  no: 'English only',
  errors: {
    languagePreferenceWelsh: {
      required: 'Choose the languages you want your documents and correspondence in.'
    }
  }
};

const cy: typeof en = {
  question: 'Pa iaith yr hoffech inni ei defnyddio wrth gysylltu efo chi?',
  line1: 'Byddwn yn anfon ebyst a dogfennau atoch wrth i ni ddelio gyda’ch achos.',
  line2: 'Dewisiwch pa iaith yr hoffech eu cael.',
  yes: 'Cymraeg a Saesneg',
  no: 'Saesneg yn unig',
  errors: {
    languagePreferenceWelsh: {
      required: 'Dewisiwch yr iaith yr hoffech gael eich dogfennau a’ch gohebiaeth.'
    }
  }
};

export const languagePreferenceForm = {
  fields: {
    languagePreferenceWelsh: {
      type: 'radios',
      values: [
        { label: l => l.no, value: 'No' },
        { label: l => l.yes, value: 'Yes' }
      ]
    }
  },
  submit: {
    text: l => l.continue
  }
};

const common = {
  form: languagePreferenceForm
};

export const languagePreferenceContent = { en, cy, common };
