import { CaseWithId } from '../app/case/case';
import { State } from '../app/case/definition';

import { hasSubmittedAos } from './index.utils';

describe('hasSubmittedAos', () => {
  test('Returns true if dateAosSubmitted is defined', () => {
    const userCase: CaseWithId = {
      id: '1234',
      state: State.Holding,
      dateAosSubmitted: '2021-05-10',
    } as CaseWithId;
    const result = hasSubmittedAos(userCase);
    expect(result).toBe(true);
  });

  test('Returns false if dateAosSubmitted is undefined', () => {
    const userCase: CaseWithId = {
      id: '1234',
      state: State.Holding,
    } as CaseWithId;
    const result = hasSubmittedAos(userCase);
    expect(result).toBe(false);
  });
});
