import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { DRAFT_AOS, UPDATE_AOS } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ReviewTheApplicationPostController from './post';

describe('ReviewTheApplicationPostController', () => {
  global.structuredClone = jest.fn(val => {
    return JSON.parse(JSON.stringify(val));
  });

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
});
