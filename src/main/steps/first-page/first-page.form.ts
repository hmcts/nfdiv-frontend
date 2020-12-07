import { JSONSchemaType } from 'ajv';
import { firstPageContent } from './first-page.content';
import { FormBody } from '../../app/form/Form';

export type FirstPageForm = FormBody<typeof firstPageContent['en']['form']>;

export const firstPageSchema: JSONSchemaType<FirstPageForm> = {
  type: 'object',
  properties: {
    _csrf: {
      type: 'string'
    },
    field1: {
      type: 'string',
      minLength: 3,
      maxLength: 255
    },
    field2: {
      type: 'string',
      minLength: 3,
      maxLength: 255
    }
  },
  required: [/* '_csrf?',*/ 'field1', 'field2'],
  additionalProperties: false,
};
