import { FirstPageForm } from './first-page.form';
import { FormContent } from '../../app/form/Form';

const en = {
  text: 'Some text',
  form: {
    submit: {
      text: 'Next'
    },
    fields: {
      field1: {
        label: 'Label for field 1'
      }
    }
  } as FormContent<FirstPageForm>
};

const cy: typeof en = {
  text: 'Some text',
  form: {
    submit: {
      text: 'Next'
    },
    fields: {
      field1: {
        label: 'Label for field 1'
      }
    }
  }
};

const common = {

};

export const firstPageContent = { en, cy, common };
