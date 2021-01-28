import { merge } from 'lodash';

import { FormBody, FormContent } from '../../app/form/Form';
import { HOME_URL } from '../urls';

const en = {
  text: 'Some text',
  form: {
    submit: {
      text: 'Next',
      class: 'extra-important',
    },
    fields: {
      field1: {
        label: 'Label for field 1',
        class: 'derp',
      },
      field2: {
        label: 'Label for field 2',
      },
    },
  },
};

const cy: typeof en = {
  text: 'Some text',
  form: merge({}, en.form, {
    submit: {
      text: 'Next',
    },
    fields: {
      field1: {
        label: 'Label for field 1',
      },
      field2: {
        label: 'Label for field 2',
      },
    },
  }),
};

export const firstPageForm: FormContent = {
  fields: {
    exampleRadio: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      values: [
        { label: l => l.yes, value: 'Yes' },
        { label: l => l.no, value: 'No' },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const common = {
  backLink: HOME_URL,
};

export const firstPageContent = { en, cy, common };

export type FirstPageForm = FormBody<typeof firstPageForm>;
