import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({ session = {}, body = {} } = {}): AppRequest<never> =>
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
      },
      save: jest.fn(done => done()),
      ...session,
    },
    path: '/request',
    url: '/request',
    originalUrl: '/request',
    logout: jest.fn(),
  } as unknown) as AppRequest<never>);
