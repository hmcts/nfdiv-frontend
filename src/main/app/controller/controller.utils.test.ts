import { mockRequest } from '../../../test/unit/utils/mockRequest';
import * as urlUtils from '../../steps/url-utils';
import { ApplicationType } from '../case/definition';

import { shouldUpdateAos } from './controller.utils';

describe('Controller utils', () => {
  const isAosStepMock = jest.spyOn(urlUtils, 'isAosStep');
  isAosStepMock.mockReturnValue(true);
  const req = mockRequest({
    session: { isApplicant2: true, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } },
  });

  test('Return true when isAosStep is true', () => {
    expect(shouldUpdateAos(req)).toBe(true);
  });

  test('Return false when isAosStep is false', () => {
    isAosStepMock.mockReturnValue(false);
    expect(shouldUpdateAos(req)).toBe(false);
  });

  test('Return false when isApplicant2 is false', () => {
    req.session.isApplicant2 = false;
    expect(shouldUpdateAos(req)).toBe(false);
  });

  test('Return false when applicationType is joint', () => {
    req.session.userCase.applicationType = ApplicationType.JOINT_APPLICATION;
    expect(shouldUpdateAos(req)).toBe(false);
  });
});
