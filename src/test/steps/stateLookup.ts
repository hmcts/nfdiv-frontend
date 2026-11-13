import * as definition from '../../main/app/case/definition';
import { State } from '../../main/app/case/definition';

import { logAndThrow } from './commonHelpers/logger';

const stateEnum = (definition as unknown as { State?: Record<string, State> }).State;
if (!stateEnum) {
  throw new Error(
    'State enum is not available at runtime - is "preserveConstEnums" enabled in src/test/tsconfig.json?'
  );
}

const stateLookup = new Map<string, State>(
  Object.entries(stateEnum).flatMap(([name, value]) => [
    [name.toLowerCase(), value],
    [value.toLowerCase(), value],
  ])
);

const stateValues = new Set<string>(Object.values(stateEnum));

export const isState = (value?: string): value is State => {
  return !!value && stateValues.has(value);
};

/**
 * Resolves a state from either its enum key or its value. Matching is case-insensitive
 */
export const lookupState = (value?: string): State => {
  const state = value ? stateLookup.get(value.trim().toLowerCase()) : undefined;
  if (!state) {
    return logAndThrow(`Unknown case state: "${value}". Provide a valid State key or value.`);
  }
  return state;
};
