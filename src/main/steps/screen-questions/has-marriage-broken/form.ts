import { JSONSchemaType } from 'ajv';
import { FormBody } from '../../../app/form/Form';
import { hasMarriageBrokenForm } from './content';

export type HasMarriageBrokenForm = FormBody<typeof hasMarriageBrokenForm>;

export const hasMarriageBrokenSchema: JSONSchemaType<HasMarriageBrokenForm> = {
  type: 'object',
  properties: {
    _csrf: {
      type: 'string'
    },
    screenHasMarriageBroken: {
      type: 'string',
      enum: ['Yes', 'No']
    }
  },
  required: [/* '_csrf?',*/ 'screenHasMarriageBroken'],
  additionalProperties: false,
};
