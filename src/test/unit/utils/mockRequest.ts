import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({ session = {}, body = {}, cookies = {}, userCase = {} } = {}): AppRequest =>
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
  } as unknown) as AppRequest);
