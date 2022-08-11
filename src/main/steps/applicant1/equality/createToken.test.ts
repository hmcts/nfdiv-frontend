import { v4 as uuid } from 'uuid';

import { SupportedLanguages } from '../../../modules/i18n';
import { CHECK_ANSWERS_URL } from '../../urls';

import { createToken } from './createToken';

describe('createToken', () => {
  const params = {
    serviceId: 'NEW_DIVORCE_LAW',
    actor: 'APPLICANT1',
    pcqId: uuid(),
    partyId: 'test@email.com',
    returnUrl: CHECK_ANSWERS_URL,
    language: SupportedLanguages.En,
    token: '',
  };

  test('Should create token if tokenKey exists', async () => {
    const result = await createToken(params, 'PCQ_TOKEN');

    expect(result).toHaveLength(374);
  });
});
