import { DivorceOrDissolution } from '@hmcts/nfdiv-case-definition';
import { Response } from 'express';

export const mockResponse = ({ locals = { serviceType: DivorceOrDissolution.DIVORCE } } = {}): Response => {
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
