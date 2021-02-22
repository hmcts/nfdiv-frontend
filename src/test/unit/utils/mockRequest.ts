import { RequestWithScope } from '../../../main/modules/oidc';

export const mockRequest = ({ session = {}, body = {}, cookies = {}, userCase = {} } = {}): RequestWithScope<never> =>
  (({
    body,
    scope: {
      cradle: {
        api: {
          updateCase: jest.fn(),
        },
      },
    },
    query: {},
    session: {
      userCase: {
        id: '1234',
        divorceOrDissolution: 'divorce',
        ...userCase,
      },
      save: jest.fn(done => done()),
      destroy: jest.fn(done => done()),
      ...session,
    },
    cookies,
    path: '/request',
    url: '/request',
    originalUrl: '/request',
    logout: jest.fn(),
  } as unknown) as RequestWithScope<never>);
