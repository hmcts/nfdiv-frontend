
export const mockRequest = () => {
  const req: any = {
    body: '',
    scope: {
      cradle: {

      }
    },
    query: {},
    session: {},
    path: '/request'
  };
  req.body = jest.fn().mockReturnValue(req);
  return req;
};
