import { JSONSchemaType } from 'ajv';
import { FormBody } from '../../../app/form/Form';
import { languagePreferenceForm } from './content';

export type LanguagePreferenceForm = FormBody<typeof languagePreferenceForm>;

export const firstPageSchema: JSONSchemaType<LanguagePreferenceForm> = {
  type: 'object',
  properties: {
    _csrf: {
      type: 'string'
    },
    languagePreferenceWelsh: {
      type: 'string',
      enum: ['Yes', 'No']
    }
  },
  required: [/* '_csrf?',*/ 'languagePreferenceWelsh'],
  additionalProperties: false,
};
