import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../app/case/case';
import { JurisdictionConnections, PATCH_CASE } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import { addConnection } from './connections';
import JurisdictionPostController from './post';

jest.mock('../../../steps/jurisdiction/interstitial/connections');
const addConnectionMock = addConnection as jest.Mock<JurisdictionConnections[]>;

describe('JurisdictionPostController', () => {
  test('Should add connections field and call trigger PATCH', async () => {
    addConnectionMock.mockReturnValue([JurisdictionConnections.PET_RESP_RESIDENT]);

    const errors = [] as never[];
    const body = { partnersLifeBasedInEnglandAndWales: YesOrNo.Yes, yourLifeBasedInEnglandAndWales: YesOrNo.Yes };
    const bodyWithConnection = {
      partnersLifeBasedInEnglandAndWales: YesOrNo.Yes,
      yourLifeBasedInEnglandAndWales: YesOrNo.Yes,
      connections: ['A'],
    };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;

    const jurisdictionController = new JurisdictionPostController(mockForm);
    const expectedUserCase = {
      id: '1234',
      partnersLifeBasedInEnglandAndWales: YesOrNo.Yes,
      yourLifeBasedInEnglandAndWales: YesOrNo.Yes,
      connections: ['A'],
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await jurisdictionController.post(req, res);

    expect(addConnectionMock).toBeCalled();
    expect(req.body.connections).toEqual([JurisdictionConnections.PET_RESP_RESIDENT]);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, PATCH_CASE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });
});
