import { JSONSchemaType } from 'ajv';
import { FormBody } from '../../../app/form/Form';
import { marriageCertificateForm } from './content';

export type MarriageCertificateForm = FormBody<typeof marriageCertificateForm>;

export const marriageCertificateSchema: JSONSchemaType<MarriageCertificateForm> = {
  type: 'object',
  properties: {
    _csrf: {
      type: 'string'
    },
    screenHasMarriageCert: {
      type: 'string',
      enum: ['Yes', 'No']
    }
  },
  required: [/* '_csrf?',*/ 'screenHasMarriageCert'],
  additionalProperties: false,
};
