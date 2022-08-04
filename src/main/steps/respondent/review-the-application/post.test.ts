import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { DRAFT_AOS, UPDATE_AOS } from '../../../app/case/definition';
import { PostController } from '../../../app/controller/PostController';
import { FormContent } from '../../../app/form/Form';
import * as steps from '../../index';

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

  it('triggers UPDATE_AOS when confirmReadPetition is checked in userCase', async () => {
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

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, UPDATE_AOS);
  });

  test('rejects with an error when unable to save session data in ReviewTheApplicationPostController', async () => {
    const mockFormContent = {
      fields: {
        confirmReadPetition: {},
      },
    } as unknown as FormContent;

    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { confirmReadPetition: Checkbox.Checked };
    const controller = new PostController(mockFormContent.fields);

    const mockSave = jest.fn(done => done('An error while saving session'));
    const req = mockRequest({ body, session: { save: mockSave } });
    (req.locals.api.triggerEvent as jest.Mock).mockImplementation(
      jest.fn(() => {
        throw Error;
      })
    );
    const res = mockResponse();
    await expect(controller.post(req, res)).rejects.toEqual('An error while saving session');
    expect(req.locals.logger.error).toBeCalled();
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });
});
