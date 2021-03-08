import { Response } from 'express';

import { CaseType } from '../../../main/app/case/case';

export const mockResponse = ({ locals = { serviceType: CaseType.Divorce } } = {}): Response => {
  const res: Partial<Response> = { locals };
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.end = jest.fn();
  res.cookie = jest.fn();
  res.status = jest.fn().mockImplementation((code = 200) => {
    res.statusCode = code;
    return res;
  });

  return (res as unknown) as Response;
};
