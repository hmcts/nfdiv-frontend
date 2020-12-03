import { JSONSchemaType } from 'ajv';

export interface FirstPageForm {
  field1: string
}

export const firstPageSchema: JSONSchemaType<FirstPageForm> = {
  type: 'object',
  properties: {
    field1: {
      type: 'string',
      minLength: 3,
      maxLength: 255
    }
  },
  required: ['field1'],
  additionalProperties: false,
};
