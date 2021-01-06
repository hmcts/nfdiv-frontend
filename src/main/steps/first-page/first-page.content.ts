import { merge } from 'lodash';
import { HOME_URL } from '../urls';
import { FormBody } from '../../app/form/Form';

const en = {
  text: 'Some text',
  form: {
    submit: {
      text: 'Next',
      class: 'extra-important'
    },
    fields: {
      field1: {
        label: 'Label for field 1',
        class: 'derp'
      },
      field2: {
        label: 'Label for field 2'
      }
    }
  }
};

const cy: typeof en = {
  text: 'Some text',
  form: merge({}, en.form, {
    submit: {
      text: 'Next'
    },
    fields: {
      field1: {
        label: 'Label for field 1'
      },
      field2: {
        label: 'Label for field 2'
      }
    }
  })
};

const common = {
  backLink: HOME_URL
};

export const firstPageContent = { en, cy, common };

export type FirstPageForm = FormBody<typeof firstPageContent['en']['form']>;
