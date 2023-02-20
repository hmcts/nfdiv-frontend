import * as oidc from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';
import { PaymentModel } from '../payment/PaymentModel';

import { CaseApi, getCaseApi } from './case-api';
import * as caseApiClient from './case-api-client';
import { CITIZEN_ADD_PAYMENT, CITIZEN_UPDATE, DivorceOrDissolution, State, UserRole } from './definition';

jest.mock('axios');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiClientMock = jest.spyOn(caseApiClient, 'getCaseApiClient');

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
    getCaseById: jest.fn(),
    createCase: jest.fn(),
    findUserInviteCases: jest.fn(),
    findExistingUserCases: jest.fn(),
    getCaseUserRoles: jest.fn(),
    sendEvent: jest.fn(),
  };

  let api: CaseApi;
  beforeEach(() => {
    api = new CaseApi(mockApiClient as unknown as caseApiClient.CaseApiClient);
  });

  afterEach(() => {
    mockApiClient.getCaseById.mockClear();
    mockApiClient.createCase.mockClear();
    mockApiClient.findUserInviteCases.mockClear();
    mockApiClient.findExistingUserCases.mockClear();
    mockApiClient.getCaseUserRoles.mockClear();
    mockApiClient.sendEvent.mockClear();
  });

  const serviceType = DivorceOrDissolution.DIVORCE;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should create a %s case',
    async caseType => {
      const createdCase = { id: '1234', state: State.Draft, divorceOrDissolution: caseType };
      mockApiClient.createCase.mockResolvedValue(createdCase);

      const userCase = await api.createCase(caseType, userDetails);

      expect(userCase).toStrictEqual(createdCase);
    }
  );

  test('Should throw error when case could not be created', async () => {
    mockApiClient.createCase.mockRejectedValue(new Error('Case could not be created.'));

    await expect(api.createCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');
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

  test('should return case data for new invite case', async () => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
      roles: ['caseworker'],
    });
    const mockCase = [{ id: '1', state: State.Draft, case_data: { divorceOrDissolution: serviceType } }];
    (getCaseApiClientMock as jest.Mock).mockReturnValue({
      findUserInviteCases: jest.fn(() => mockCase),
    });
    const results = await api.getNewInviteCase('user.email@gmail.com', serviceType, {} as never);

    expect(results).toStrictEqual({ id: '1', state: State.Draft, divorceOrDissolution: serviceType });
    getSystemUserMock.mockClear();
  });

  test('should return false for if there is no invite case', async () => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
      roles: ['caseworker'],
    });
    (getCaseApiClientMock as jest.Mock).mockReturnValue({
      findUserInviteCases: jest.fn(() => false),
    });
    const results = await api.getNewInviteCase('user.email@gmail.com', serviceType, {} as never);

    expect(results).toStrictEqual(false);
    getSystemUserMock.mockClear();
  });

  test('getExistingAndNewUserCases should return both existing case and new invite case if unique cases', async () => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
      roles: ['caseworker'],
    });
    const userCase1 = { id: '1', state: State.Draft, case_data: { divorceOrDissolution: serviceType } };
    const userCase2 = { id: '2', state: State.Draft, case_data: { divorceOrDissolution: serviceType } };
    (getCaseApiClientMock as jest.Mock).mockReturnValue({
      findUserInviteCases: jest.fn(() => [userCase2]),
    });
    mockApiClient.findExistingUserCases.mockResolvedValue([userCase1]);
    const results = await api.getExistingAndNewUserCases('user.email@gmail.com', serviceType, {} as never);

    expect(results).toStrictEqual({
      existingUserCase: { id: '1', state: State.Draft, divorceOrDissolution: serviceType },
      newInviteUserCase: { id: '2', state: State.Draft, divorceOrDissolution: serviceType },
    });
    getSystemUserMock.mockClear();
  });

  test('getExistingAndNewUserCases should return existing case and false if invited case is an existing case', async () => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
      roles: ['caseworker'],
    });
    const userCase = { id: '1234', state: State.Draft, case_data: { divorceOrDissolution: serviceType } };
    (getCaseApiClientMock as jest.Mock).mockReturnValue({
      findUserInviteCases: jest.fn(() => [userCase]),
    });
    mockApiClient.findExistingUserCases.mockResolvedValue([userCase]);
    const results = await api.getExistingAndNewUserCases('user.email@gmail.com', serviceType, {} as never);

    expect(results).toStrictEqual({
      existingUserCase: { id: '1234', state: State.Draft, divorceOrDissolution: serviceType },
      newInviteUserCase: false,
    });
    getSystemUserMock.mockClear();
  });

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should return %s case data response',
    async caseType => {
      const userCase = [
        {
          id: '1234',
          state: State.Draft,
          case_data: {
            divorceOrDissolution: caseType,
            applicationFeeOrderSummary: [{ test: 'fees' }],
            applicationPayments: [{ test: 'payment' }],
          },
        },
      ];
      mockApiClient.findExistingUserCases.mockResolvedValue(userCase);

      const results = await api.getExistingUserCase(caseType);

      expect(results).toStrictEqual({
        id: '1234',
        state: State.Draft,
        divorceOrDissolution: caseType,
        applicationFeeOrderSummary: [{ test: 'fees' }],
        payments: [{ test: 'payment' }],
      });
    }
  );

  test('Should throw error when case could not be retrieved', async () => {
    mockApiClient.findExistingUserCases.mockRejectedValue(new Error('Case could not be retrieved.'));

    await expect(api.getExistingUserCase(serviceType)).rejects.toThrow('Case could not be retrieved.');
  });

  test('Should ignore incomplete divorce cases', async () => {
    const mockDivCase = [{ id: '1', state: 'AwaitingPayment', case_data: { D8DivorceUnit: 'serviceCentre' } }];
    const mockCase = [{ id: '1', state: State.Draft, case_data: { divorceOrDissolution: serviceType } }];
    mockApiClient.findExistingUserCases.mockImplementation(async caseType =>
      Promise.resolve(caseType.endsWith('DIVORCE') ? mockDivCase : mockCase)
    );

    const userCase = await api.getExistingUserCase(serviceType);

    expect(userCase).toStrictEqual({ id: '1', state: State.Draft, divorceOrDissolution: serviceType });
  });

  test('Should ignore divorce cases not assigned to the service center', async () => {
    const mockDivCase = [{ id: '1', state: 'AwaitingDecreeNisi', case_data: { D8DivorceUnit: 'BuryStEdmunds' } }];
    const mockCase = [{ id: '1', state: State.Draft, case_data: { divorceOrDissolution: serviceType } }];
    mockApiClient.findExistingUserCases.mockImplementation(async caseType =>
      Promise.resolve(caseType.endsWith('DIVORCE') ? mockDivCase : mockCase)
    );

    const userCase = await api.getExistingUserCase(serviceType);

    expect(userCase).toStrictEqual({ id: '1', state: State.Draft, divorceOrDissolution: serviceType });
  });

  test('Should prioritise Submitted case over Draft case', async () => {
    const mockDraftCase = {
      id: '1',
      state: State.Draft,
      case_data: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    };
    const mockSubmittedCase = {
      id: '2',
      state: State.Submitted,
      case_data: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    };
    mockApiClient.findExistingUserCases.mockResolvedValue([mockDraftCase, mockSubmittedCase]);

    const userCase = await api.getExistingUserCase(DivorceOrDissolution.DIVORCE);

    expect(userCase).toStrictEqual({
      id: '2',
      state: State.Submitted,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
  });

  test('Should return the only case if there is only one', async () => {
    const mockCase = {
      id: '1',
      state: State.AwaitingClarification,
      case_data: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    };
    mockApiClient.findExistingUserCases.mockResolvedValue([mockCase]);

    const userCase = await api.getExistingUserCase(DivorceOrDissolution.DIVORCE);

    expect(userCase).toStrictEqual({
      id: '1',
      state: State.AwaitingClarification,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
  });

  test('Should return latest draft cases if multiple linked cases are draft', async () => {
    const mockDraftCase = {
      id: '1',
      state: State.Draft,
      case_data: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    };
    const mockDraftCase2 = {
      id: '2',
      state: State.Draft,
      case_data: { divorceOrDissolution: DivorceOrDissolution.DIVORCE },
    };
    mockApiClient.findExistingUserCases.mockResolvedValue([mockDraftCase, mockDraftCase2]);

    const userCase = await api.getExistingUserCase(DivorceOrDissolution.DIVORCE);

    expect(userCase).toStrictEqual({ id: '1', state: State.Draft, divorceOrDissolution: DivorceOrDissolution.DIVORCE });
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

    const actualRes = await api.triggerPaymentEvent('1234', payments.list, CITIZEN_ADD_PAYMENT);

    expect(mockApiClient.sendEvent).toHaveBeenCalledWith('1234', { applicationPayments: [] }, CITIZEN_ADD_PAYMENT);
    expect(actualRes).toStrictEqual(expectedRes);
  });

  test('Should throw error when case could not be updated', async () => {
    mockApiClient.sendEvent.mockRejectedValue(new Error('Case could not be updated.'));
    const caseData = { divorceOrDissolution: DivorceOrDissolution.DIVORCE };

    await expect(api.triggerEvent('not found', caseData, CITIZEN_UPDATE)).rejects.toThrow('Case could not be updated.');
  });

  test('isApplicant2() should return true if the case role contains applicant 2', async () => {
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.APPLICANT_2 }] });

    const isApplicant2 = await api.isApplicant2('1234123412341234', userDetails.id);
    expect(isApplicant2).toBe(true);
  });

  test('isApplicant2() should return false if the case role does not contain applicant 2', async () => {
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });

    const isApplicant2 = await api.isApplicant2('1234123412341234', userDetails.id);
    expect(isApplicant2).toBe(false);
  });

  test('getUsersRoleOnCase() should return the user role of the user on the case', async () => {
    mockApiClient.getCaseUserRoles.mockResolvedValue({ case_users: [{ case_role: UserRole.CREATOR }] });

    const getUsersRoleOnCase = await api.getUsersRoleOnCase('1234123412341234', userDetails.id);
    expect(getUsersRoleOnCase).toBe(UserRole.CREATOR);
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
