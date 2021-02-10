import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = (body = {}): AppRequest<never> =>
  (({
    body,
    scope: {
      cradle: {},
    },
    query: {},
    session: {
      save: callback => callback(),
      state: {},
    },
    path: '/request',
    url: '/request',
    originalUrl: '/request',
  } as unknown) as AppRequest<never>);
