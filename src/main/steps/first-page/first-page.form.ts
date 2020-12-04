import { JSONSchemaType } from 'ajv';
import { CsrfField } from '../../app/form/Form';

export interface FirstPageForm {
  field1: string,
  field2: string
}

export const firstPageSchema: JSONSchemaType<FirstPageForm & CsrfField> = {
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
  required: [/* '_crsf?',*/ 'field1', 'field2'],
  additionalProperties: false,
};
