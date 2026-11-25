import { vi } from 'vitest';

import { DivorceOrDissolution } from '../../../main/app/case/definition.js';
import { AppRequest } from '../../../main/app/controller/AppRequest.js';
import { SupportedLanguages } from '../../../main/modules/i18n/index.js';

export const mockRequest = ({
  headers = {},
  body = {},
  session = {},
  cookies = {},
  userCase = {},
  appLocals = {},
  isApplicant2 = false,
} = {}): AppRequest =>
  ({
    headers: { 'accept-language': SupportedLanguages.En, ...headers },
    body,
    locals: {
      api: {
        triggerEvent: vi.fn(),
        triggerPaymentEvent: vi.fn(),
        getCaseById: vi.fn(),
        isApplicant2: vi.fn(),
        getNewInviteCase: vi.fn(),
        createCase: vi.fn(),
      },
      logger: {
        info: vi.fn(),
        error: vi.fn(),
      },
    },
    query: {},
    session: {
      user: {
        id: '123456',
        accessToken: 'mock-user-access-token',
        name: 'test',
        givenName: 'First name',
        familyName: 'Last name',
        email: 'test@example.com',
      },
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        ...userCase,
      },
      lang: SupportedLanguages.En,
      existingCaseId: '123456',
      isApplicant2,
      save: vi.fn((done: () => void) => done()),
      destroy: vi.fn((done: () => void) => done()),
      ...session,
    },
    app: {
      locals: {
        steps: [
          {
            getNextStep: () => '',
            form: { fields: { gender: { type: 'radios' } } },
          },
        ],
        ...appLocals,
      },
    },
    cookies,
    path: '/request',
    url: '/request',
    originalUrl: '/request',
    logout: vi.fn(),
  }) as unknown as AppRequest;

export const mockRequestApp2 = ({
  headers = {},
  body = {},
  session = {},
  cookies = {},
  userCase = {},
  appLocals = {},
  isApplicant2 = false,
} = {}): AppRequest =>
  ({
    headers: { 'accept-language': SupportedLanguages.En, ...headers },
    body,
    locals: {
      api: {
        triggerEvent: vi.fn(),
        triggerPaymentEvent: vi.fn(),
        getCaseById: vi.fn(),
        isApplicant2: vi.fn(),
        getNewInviteCase: vi.fn(),
        createCase: vi.fn(),
      },
      logger: {
        info: vi.fn(),
        error: vi.fn(),
      },
    },
    query: {},
    session: {
      user: {
        id: '123456',
        accessToken: 'mock-user-access-token',
        name: 'test',
        givenName: 'First name',
        familyName: 'Last name',
        email: 'test@example.com',
      },
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        ...userCase,
      },
      lang: SupportedLanguages.En,
      existingCaseId: '123456',
      isApplicant2,
      save: vi.fn((done: () => void) => done()),
      destroy: vi.fn((done: () => void) => done()),
      ...session,
    },
    app: {
      locals: {
        steps: [
          {
            getNextStep: () => '',
            form: { fields: { gender: { type: 'radios' } } },
          },
        ],
        ...appLocals,
      },
    },
    cookies,
    path: '/request/applicant2',
    url: '/request',
    originalUrl: '/request',
    logout: vi.fn(),
  }) as unknown as AppRequest;
