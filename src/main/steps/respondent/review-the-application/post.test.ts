import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_SAVE_AND_CLOSE,
  DRAFT_AOS,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import * as steps from '../../index';
import { SAVE_AND_SIGN_OUT } from '../../urls';

import ReviewTheApplicationPostController from './post';

describe('ReviewTheApplicationPostController', () => {
  const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

  const expectedUserCase = {
    id: '1234',
    divorceOrDissolution: 'divorce',
    gender: 'female',
    sameSex: Checkbox.Unchecked,
    addedByAPI: 'adds new data to the session returned from API',
  };

  it('triggers DRAFT_AOS when confirmReadPetition is undefined in userCase', async () => {
    const body = {
      confirmReadPetition: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        confirmReadPetition: {},
      },
    } as unknown as FormContent;
    const reviewTheApplicationPostController = new ReviewTheApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: true, userCase: expectedUserCase } });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);

    const res = mockResponse();
    await reviewTheApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, DRAFT_AOS);
  });

  it('triggers CITIZEN_APPLICANT2_UPDATE when confirmReadPetition is checked in userCase', async () => {
    const body = {
      confirmReadPetition: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        confirmReadPetition: {},
      },
    } as unknown as FormContent;
    const reviewTheApplicationPostController = new ReviewTheApplicationPostController(mockFormContent.fields);

    expectedUserCase['confirmReadPetition'] = Checkbox.Checked;

    const req = mockRequest({ body, session: { isApplicant2: true, userCase: expectedUserCase } });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);

    const res = mockResponse();
    await reviewTheApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE);
  });

  test('rejects with an error when unable to save session data in ReviewTheApplicationPostController', async () => {
    const mockFormContent = {
      fields: {
        confirmReadPetition: {},
      },
    } as unknown as FormContent;

    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { confirmReadPetition: Checkbox.Checked };
    const reviewTheApplicationPostController = new ReviewTheApplicationPostController(mockFormContent.fields);

    const mockSave = jest.fn(done => done('An error while saving session'));
    const req = mockRequest({ body, session: { save: mockSave } });
    (req.locals.api.triggerEvent as jest.Mock).mockImplementation(
      jest.fn(() => {
        throw Error;
      })
    );
    const res = mockResponse();
    await expect(reviewTheApplicationPostController.post(req, res)).rejects.toEqual('An error while saving session');
    expect(req.locals.logger.error).toBeCalled();
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });

  test('case is saved with empty formData', async () => {
    const mockFormContent = {
      fields: {
        confirmReadPetition: {},
      },
    } as unknown as FormContent;

    const body = { confirmReadPetition: Checkbox.Checked, saveAndSignOut: true };
    const reviewTheApplicationPostController = new ReviewTheApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await reviewTheApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });
});
