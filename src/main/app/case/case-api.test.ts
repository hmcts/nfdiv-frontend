import { UserDetails } from '../controller/AppRequest';
import { PaymentModel } from '../payment/PaymentModel';

import { CaseApi, InProgressDivorceCase, getCaseApi } from './case-api';
import { CaseApiClient } from './case-api-client';
import {
  ApplicationType,
  CITIZEN_ADD_PAYMENT,
  CITIZEN_UPDATE,
  DivorceOrDissolution,
  SYSTEM_UNLINK_APPLICANT,
  State,
  UserRole,
} from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
  roles: ['something'],
};

describe('CaseApi', () => {
  const mockApiClient = {
    getLatestLinkedCase: jest.fn(),
    getLatestCaseOrInvite: jest.fn(),
    getCaseById: jest.fn(),
    createCase: jest.fn(),
    getCaseUserRoles: jest.fn(),
    sendEvent: jest.fn(),
  };

  let api: CaseApi;
  beforeEach(() => {
    api = new CaseApi(mockApiClient as unknown as CaseApiClient);
  });

  afterEach(() => {
    mockApiClient.getLatestLinkedCase.mockClear();
    mockApiClient.getLatestCaseOrInvite.mockClear();
    mockApiClient.getCaseById.mockClear();
    mockApiClient.createCase.mockClear();
    mockApiClient.getCaseUserRoles.mockClear();
    mockApiClient.sendEvent.mockClear();
  });

  const serviceType = DivorceOrDissolution.DIVORCE;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should return %s case data response',
    async caseType => {
      const expectedCase = {
        id: '1234',
        state: State.Draft,
        divorceOrDissolution: caseType,
        applicationFeeOrderSummary: [{ test: 'fees' }],
        payments: [{ test: 'payment' }],
      };
      mockApiClient.getLatestLinkedCase.mockResolvedValue(expectedCase);

      const userCase = await api.getOrCreateCase(caseType, userDetails);

      expect(userCase).toStrictEqual(expectedCase);
    }
  );

  test('Should throw error when case could not be retrieved', async () => {
    mockApiClient.getLatestLinkedCase.mockRejectedValue(new Error('Case could not be retrieved.'));

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be retrieved.');
  });

  test('Should create a case if one is not found', async () => {
    mockApiClient.getLatestLinkedCase.mockResolvedValue(false);
    mockApiClient.getLatestLinkedCase.mockResolvedValue(false);
    const createdCase = { id: '1234', state: State.Draft, divorceOrDissolution: 'divorce' };
    mockApiClient.createCase.mockResolvedValue(createdCase);

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual(createdCase);
  });

  test('Should throw error when case could not be created', async () => {
    mockApiClient.getLatestLinkedCase.mockResolvedValue(false);
    mockApiClient.getLatestLinkedCase.mockResolvedValue(false);
    mockApiClient.createCase.mockRejectedValue(new Error('Case could not be created.'));

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');
  });

  test('Should throw an error if in progress divorce case is found', async () => {
    const mockCase = { D8DivorceUnit: 'serviceCentre', state: 'AwaitingDecreeNisi' };
    mockApiClient.getLatestLinkedCase.mockResolvedValue(mockCase);

    try {
      await api.getOrCreateCase(serviceType, userDetails);
    } catch (err) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err instanceof InProgressDivorceCase).toBeTruthy();
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err.message).toBe('User has in progress divorce case');
      return;
    }
  });

  test('Should ignore incomplete divorce cases', async () => {
    const mockDivCase = { D8DivorceUnit: 'serviceCentre', state: 'AwaitingPayment' };
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestLinkedCase.mockImplementation(async caseType =>
      Promise.resolve(caseType.endsWith('DIVORCE') ? mockDivCase : mockCase)
    );

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual(mockCase);
  });

  test('Should ignore divorce cases not assigned to the service center', async () => {
    const mockDivCase = { D8DivorceUnit: 'BuryStEdmunds', state: 'AwaitingDecreeNisi' };
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestLinkedCase.mockImplementation(async caseType =>
      Promise.resolve(caseType.endsWith('DIVORCE') ? mockDivCase : mockCase)
    );

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual(mockCase);
  });

  test('Should update case', async () => {
    const expectedRes = { id: '1234', divorceOrDissolution: DivorceOrDissolution.DIVORCE };
    mockApiClient.sendEvent.mockResolvedValue(expectedRes);

    const caseData = { divorceOrDissolution: DivorceOrDissolution.DIVORCE };
    const actualRes = await api.triggerEvent('1234', caseData, CITIZEN_UPDATE);

    expect(mockApiClient.sendEvent).toHaveBeenCalledWith('1234', caseData, CITIZEN_UPDATE);
    expect(actualRes).toStrictEqual(expectedRes);
  });

  test('Should update the case with a new payment', async () => {
    const expectedRes = { id: '1234', applicationPayments: [] };
    mockApiClient.sendEvent.mockResolvedValue(expectedRes);
    const payments = new PaymentModel([]);

    const actualRes = await api.addPayment('1234', payments.list);

    expect(mockApiClient.sendEvent).toHaveBeenCalledWith('1234', { applicationPayments: [] }, CITIZEN_ADD_PAYMENT);
    expect(actualRes).toStrictEqual(expectedRes);
  });

  test('Should throw error when case could not be updated', async () => {
    mockApiClient.sendEvent.mockRejectedValue(new Error('Case could not be updated.'));
    const caseData = { divorceOrDissolution: DivorceOrDissolution.DIVORCE };

    await expect(api.triggerEvent('not found', caseData, CITIZEN_UPDATE)).rejects.toThrow('Case could not be updated.');
  });

  test('Should return case for caseId passed', async () => {
    const expectedCase = { id: '1234', state: 'Draft', accessCode: 'NFSDCLV3' };
    mockApiClient.getCaseById.mockResolvedValue(expectedCase);

    const actualCase = await api.getCaseById('1234');
    expect(actualCase).toStrictEqual(expectedCase);
  });

  test('Should throw error when case could not be fetched', async () => {
    mockApiClient.getCaseById.mockRejectedValue(new Error('Case could not be retrieved.'));

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');
  });

  test('isApplicant2() should return true if the case role contains applicant 2', async () => {
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.APPLICANT_2 }] });

    const isApplicant2 = await api.isApplicant2('1234123412341234', userDetails.id);
    expect(isApplicant2).toBe(true);
  });

  test('isApplicantAlreadyLinked() should return true if the case role contains applicant 2', async () => {
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestCaseOrInvite.mockResolvedValue(mockCase);
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.APPLICANT_2 }] });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(true);
  });

  test('isApplicantAlreadyLinked() should return false if the case role contains creator', async () => {
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestCaseOrInvite.mockResolvedValue(mockCase);
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(false);
  });

  test('isApplicantAlreadyLinked() should return true if the case role contains creator for a joint case', async () => {
    const mockCase = {
      id: '1',
      state: State.Draft,
      divorceOrDissolution: serviceType,
      applicationType: ApplicationType.JOINT_APPLICATION,
    };
    mockApiClient.getLatestCaseOrInvite.mockResolvedValue(mockCase);
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(true);
  });

  test('isApplicantAlreadyLinked() should return false if the case role does not contain applicant 2', async () => {
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestCaseOrInvite.mockResolvedValue(mockCase);
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CASE_WORKER }] });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(false);
  });

  test('isApplicantAlreadyLinked() returns false if case is not found', async () => {
    mockApiClient.getLatestCaseOrInvite.mockResolvedValue(false);
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CASE_WORKER }] });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(false);
  });

  test('should unlink stale draft cases', async () => {
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestLinkedCase.mockImplementation((caseType: string) =>
      Promise.resolve(caseType.includes('DIVORCE') ? false : mockCase)
    );
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });
    mockApiClient.sendEvent.mockResolvedValue(mockCase);

    await api.unlinkStaleDraftCaseIfFound(serviceType, userDetails);

    expect(mockApiClient.sendEvent).toHaveBeenCalledWith('1', {}, SYSTEM_UNLINK_APPLICANT);
  });

  test('should not invoke unlink event if no cases found', async () => {
    mockApiClient.getLatestLinkedCase.mockResolvedValue(false);
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });
    mockApiClient.sendEvent.mockResolvedValue({});

    await api.unlinkStaleDraftCaseIfFound(serviceType, userDetails);

    expect(mockApiClient.sendEvent).not.toHaveBeenCalled();
  });

  test('should not invoke unlink event if the case is not in draft state', async () => {
    const mockCase = { id: '1', state: State.Holding, divorceOrDissolution: serviceType };
    mockApiClient.getLatestLinkedCase.mockImplementation((caseType: string) =>
      Promise.resolve(caseType.includes('DIVORCE') ? false : mockCase)
    );
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });
    mockApiClient.sendEvent.mockResolvedValue(mockCase);

    await api.unlinkStaleDraftCaseIfFound(serviceType, userDetails);

    expect(mockApiClient.sendEvent).not.toHaveBeenCalled();
  });

  test('should not invoke unlink event if user is applicant 2', async () => {
    const mockCase = { id: '1', state: State.Draft, divorceOrDissolution: serviceType };
    mockApiClient.getLatestLinkedCase.mockImplementation((caseType: string) =>
      Promise.resolve(caseType.includes('DIVORCE') ? false : mockCase)
    );
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.APPLICANT_2 }] });
    mockApiClient.sendEvent.mockResolvedValue(mockCase);

    await api.unlinkStaleDraftCaseIfFound(serviceType, userDetails);

    expect(mockApiClient.sendEvent).not.toHaveBeenCalled();
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
