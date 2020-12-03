import { FirstPageForm } from './first-page.form';
import { FormContent } from '../../app/form/Form';
import { merge } from 'lodash';
import { HOME_URL } from '../urls';

const form: FormContent<FirstPageForm> = {
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
      label: 'Label for field 1'
    }
  }
};

const en = {
  text: 'Some text',
  form: form
};

const welshForm: FormContent<FirstPageForm> = {
  submit: {
    text: 'Next'
  },
  fields: {
    field1: {
      label: 'Label for field 1'
    },
    field2: {
      label: 'Label for field 1'
    }
  }
};

const cy: typeof en = {
  text: 'Some text',
  form: merge({}, form, welshForm)
};

const common = {
  backLink: HOME_URL
};

export const firstPageContent = { en, cy, common };
