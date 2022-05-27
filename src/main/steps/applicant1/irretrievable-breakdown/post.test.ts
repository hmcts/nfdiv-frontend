import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, DivorceOrDissolution, State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SAVE_AND_SIGN_OUT } from '../../urls';

import IrretrievableBreakdownPostController from './post';

describe('IrretrievableBreakdownPostController', () => {
  const mockFormContent = {
    fields: {
      divorceOrDissolution: {},
      state: {},
    },
  } as unknown as FormContent;

  it('triggers CITIZEN_UPDATE for case in Draft state for Divorce', async () => {
    const body = {
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      state: State.Draft,
    };
    const irretrievableBreakdownPostController = new IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    });
    const res = mockResponse();
    await irretrievableBreakdownPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_UPDATE for case in AwaitingApplicant1Response state for Divorce', async () => {
    const body = {
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      state: State.AwaitingApplicant1Response,
    };
    const irretrievableBreakdownPostController = new IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    });
    const res = mockResponse();
    await irretrievableBreakdownPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_UPDATE for case in Draft state for Dissolution', async () => {
    const body = {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      state: State.Draft,
    };
    const irretrievableBreakdownPostController = new IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { divorceOrDissolution: DivorceOrDissolution.DISSOLUTION },
    });
    const res = mockResponse();
    await irretrievableBreakdownPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_UPDATE for case in AwaitingApplicant1Response state for Dissolution', async () => {
    const body = {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      state: State.AwaitingApplicant1Response,
    };
    const irretrievableBreakdownPostController = new IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { divorceOrDissolution: DivorceOrDissolution.DISSOLUTION },
    });
    const res = mockResponse();
    await irretrievableBreakdownPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('calls save and sign out when saveAndSignOut true', async () => {
    const body = {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      state: State.Draft,
      saveAndSignOut: true,
    };
    const irretrievableBreakdownPostController = new IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { divorceOrDissolution: DivorceOrDissolution.DISSOLUTION },
    });
    const res = mockResponse();
    await irretrievableBreakdownPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { divorceOrDissolution: DivorceOrDissolution.DISSOLUTION, state: State.Draft },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });
});
