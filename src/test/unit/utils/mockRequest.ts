
export const mockRequest = () => {
  const req: any = {
    body: '',
    scope: {
      cradle: {

      }
    },
    query: {},
    session: {
      save: (callback: any) => callback(),
      state: {}
    },
    path: '/request'
  };
  req.body = jest.fn().mockReturnValue(req);
  return req;
};
