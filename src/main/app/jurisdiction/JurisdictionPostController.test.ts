import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { JURISDICTION_INTERSTITIAL_URL } from '../../steps/urls';
import { CITIZEN_UPDATE, DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';
import { FormContent } from '../form/Form';

import { JurisdictionPostController } from './JurisdictionPostController';
import { addConnectionsBasedOnQuestions } from './connections';

jest.mock('./connections');
const addConnectionsBasedOnQuestionsMock = addConnectionsBasedOnQuestions as jest.Mock<JurisdictionConnections[]>;

describe('JurisdictionPostController', () => {
  test('Should add connections field and call trigger PATCH and set unreachable fields as null', async () => {
    addConnectionsBasedOnQuestionsMock.mockReturnValue([JurisdictionConnections.APP_1_APP_2_RESIDENT]);

    const body = {
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
    };
    const bodyWithConnection = {
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
      applicant1DomicileInEnglandWales: null,
      applicant1LivingInEnglandWalesSixMonths: null,
      applicant1LivingInEnglandWalesTwelveMonths: null,
      applicant2DomicileInEnglandWales: null,
      bothLastHabituallyResident: null,
      jurisdictionResidualEligible: null,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      id: '1234',
    };
    const mockFormContent = {
      fields: {
        applicant2LifeBasedInEnglandAndWales: {},
        applicant1LifeBasedInEnglandAndWales: {},
      },
    } as unknown as FormContent;

    const jurisdictionController = new JurisdictionPostController(mockFormContent.fields);
    const expectedUserCase = {
      id: '1234',
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await jurisdictionController.post(req, res);

    expect(addConnectionsBasedOnQuestionsMock).toHaveBeenCalled();
    expect(req.body.connections).toEqual([JurisdictionConnections.APP_1_APP_2_RESIDENT]);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, CITIZEN_UPDATE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });

  test('Should add connections field regardless of question answers if on JURISDICTION_INTERSTITIAL_URL page', async () => {
    addConnectionsBasedOnQuestionsMock.mockReturnValue([]);

    const body = {
      connections: [JurisdictionConnections.APP_1_APP_2_DOMICILED],
    };
    const bodyWithConnection = {
      connections: ['F'],
      applicant1DomicileInEnglandWales: null,
      applicant1LifeBasedInEnglandAndWales: null,
      applicant2DomicileInEnglandWales: null,
      applicant2LifeBasedInEnglandAndWales: null,
      bothLastHabituallyResident: null,
      applicant1LivingInEnglandWalesSixMonths: null,
      applicant1LivingInEnglandWalesTwelveMonths: null,
      jurisdictionResidualEligible: null,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      id: '1234',
    };
    const mockFormContent = {
      fields: {
        connections: {},
      },
    } as unknown as FormContent;

    const jurisdictionController = new JurisdictionPostController(mockFormContent.fields);
    const expectedUserCase = {
      id: '1234',
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
    };

    const req = mockRequest({ body });
    req.url = JURISDICTION_INTERSTITIAL_URL;
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await jurisdictionController.post(req, res);

    expect(addConnectionsBasedOnQuestionsMock).toHaveBeenCalled();
    expect(req.body.connections).toEqual([JurisdictionConnections.APP_1_APP_2_DOMICILED]);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, CITIZEN_UPDATE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });
});
