import { AppRequest } from 'app/controller/AppRequest';

export const mockRequest = (): AppRequest<never> => {
  const req = {
    body: () => {},
    scope: {
      cradle: {

      }
    },
    query: {},
    session: {
      save: (callback) => callback(),
      state: {}
    },
    path: '/request'
  } as unknown as AppRequest<never>;
  req.body = jest.fn().mockReturnValue(req) as unknown as never;
  return req;
};
