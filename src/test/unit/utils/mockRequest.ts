import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = (): AppRequest<never> => {
  const req = ({
    body: () => ({}),
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
  } as unknown) as AppRequest<never>;
  req.body = (jest.fn().mockReturnValue(req) as unknown) as never;
  return req;
};
