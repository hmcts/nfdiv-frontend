import { Response } from 'express';

import { DivorceOrDissolution } from '../../../main/app/case/definition.js';

export const mockResponse = ({ locals = {} } = {}): Response => {
  const res: Partial<Response> = {
    locals: {
      serviceType: DivorceOrDissolution.DIVORCE,
      host: 'localhost',
      ...locals,
    },
  };

  res.redirect = jest.fn().mockReturnValue(res) as unknown as Response['redirect'];
  res.render = jest.fn().mockReturnValue(res) as unknown as Response['render'];
  res.json = jest.fn().mockReturnValue(res) as unknown as Response['json'];
  res.send = jest.fn().mockReturnValue(res) as unknown as Response['send'];
  res.type = jest.fn().mockReturnValue(res) as unknown as Response['type'];
  res.end = jest.fn() as unknown as Response['end'];
  res.cookie = jest.fn() as unknown as Response['cookie'];
  res.clearCookie = jest.fn() as unknown as Response['clearCookie'];
  res.status = jest.fn().mockImplementation((code = 200) => {
    res.statusCode = code;
    return res;
  }) as unknown as Response['status'];

  return res as unknown as Response;
};
