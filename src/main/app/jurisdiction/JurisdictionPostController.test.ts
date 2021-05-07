import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Checkbox } from '../case/case';
import { JurisdictionConnections, PATCH_CASE, YesOrNo } from '../case/definition';
import { Form } from '../form/Form';

import { JurisdictionPostController } from './JurisdictionPostController';
import { addConnection } from './connections';

jest.mock('./connections');
const addConnectionMock = addConnection as jest.Mock<JurisdictionConnections[]>;

describe('JurisdictionPostController', () => {
  test('Should add connections field and call trigger PATCH', async () => {
    addConnectionMock.mockReturnValue([JurisdictionConnections.PET_RESP_RESIDENT]);

    const errors = [] as never[];
    const body = { partnersLifeBasedInEnglandAndWales: YesOrNo.YES, yourLifeBasedInEnglandAndWales: YesOrNo.YES };
    const bodyWithConnection = {
      iConfirmPrayer: Checkbox.Unchecked,
      iBelieveApplicationIsTrue: Checkbox.Unchecked,
      partnersLifeBasedInEnglandAndWales: YesOrNo.YES,
      yourLifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
    };
    const mockForm = ({
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;

    const jurisdictionController = new JurisdictionPostController(mockForm);
    const expectedUserCase = {
      id: '1234',
      partnersLifeBasedInEnglandAndWales: YesOrNo.YES,
      yourLifeBasedInEnglandAndWales: YesOrNo.YES,
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
