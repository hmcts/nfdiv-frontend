import { DivorceOrDissolution } from '@hmcts/nfdiv-case-definition';

import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({ headers = {}, body = {}, session = {}, cookies = {}, userCase = {} } = {}): AppRequest =>
  (({
    headers: { 'accept-language': 'en', ...headers },
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
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
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
