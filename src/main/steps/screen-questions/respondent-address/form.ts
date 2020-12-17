import { JSONSchemaType } from 'ajv';
import { FormBody } from '../../../app/form/Form';
import { respondentAddressForm } from './content';

export type RespondentAddressForm = FormBody<typeof respondentAddressForm>;

export const respondentAddressSchema: JSONSchemaType<RespondentAddressForm> = {
  type: 'object',
  properties: {
    _csrf: {
      type: 'string'
    },
    screenHasRespondentAddress: {
      type: 'string',
      enum: ['Yes', 'No']
    }
  },
  required: [/* '_csrf?',*/ 'screenHasRespondentAddress'],
  additionalProperties: false,
};
