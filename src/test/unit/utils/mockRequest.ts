import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({ session = {}, body = {}, cookies = {} } = {}): AppRequest<never> =>
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
      destroy: jest.fn(done => done()),
      ...session,
    },
    cookies,
    path: '/request',
    url: '/request',
    originalUrl: '/request',
    logout: jest.fn(),
  } as unknown) as AppRequest<never>);
