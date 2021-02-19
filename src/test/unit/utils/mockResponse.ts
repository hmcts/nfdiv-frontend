import { Response } from 'express';

export const mockResponse = ({ locals = {} } = {}): Response<Record<string, unknown>> => {
  const res = { locals } as Response<Record<string, unknown>>;
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };

  return res;
};
