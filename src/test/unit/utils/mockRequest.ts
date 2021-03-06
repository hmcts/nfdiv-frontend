import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({
  session = {},
  body = {},
  cookies = {},
  userCase = {},
  appLocals = {},
} = {}): AppRequest =>
  (({
    body,
    locals: {
      api: {
        updateCase: jest.fn(),
      },
      logger: {
        info: jest.fn(),
        error: jest.fn(),
      },
    },
    query: {},
    session: {
      user: {
        name: 'test',
      },
      userCase: {
        id: '1234',
        divorceOrDissolution: 'divorce',
        ...userCase,
      },
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
  } as unknown) as AppRequest);
