import { DivorceOrDissolution } from '../../../main/app/case/definition';
import { AppRequest } from '../../../main/app/controller/AppRequest';
import { SupportedLanguages } from '../../../main/modules/i18n';

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
        triggerEvent: jest.fn(),
        triggerPaymentEvent: jest.fn(),
        getCaseById: jest.fn(),
        isApplicant2: jest.fn(),
        getNewInviteCase: jest.fn(),
        createCase: jest.fn(),
      },
      logger: {
        info: jest.fn(),
        error: jest.fn(),
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
      save: jest.fn(done => done()),
      destroy: jest.fn(done => done()),
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
    logout: jest.fn(),
  }) as unknown as AppRequest;
