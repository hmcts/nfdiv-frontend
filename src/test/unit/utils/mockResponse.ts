import { Response } from 'express';
import { vi } from 'vitest';

import { DivorceOrDissolution } from '../../../main/app/case/definition.js';

export const mockResponse = ({ locals = {} } = {}): Response => {
  const res: Partial<Response> = {
    locals: {
      serviceType: DivorceOrDissolution.DIVORCE,
      host: 'localhost',
      ...locals,
    },
  };

  res.redirect = vi.fn().mockReturnValue(res) as unknown as Response['redirect'];
  res.render = vi.fn().mockReturnValue(res) as unknown as Response['render'];
  res.json = vi.fn().mockReturnValue(res) as unknown as Response['json'];
  res.send = vi.fn().mockReturnValue(res) as unknown as Response['send'];
  res.type = vi.fn().mockReturnValue(res) as unknown as Response['type'];
  res.end = vi.fn() as unknown as Response['end'];
  res.cookie = vi.fn() as unknown as Response['cookie'];
  res.clearCookie = vi.fn() as unknown as Response['clearCookie'];
  res.status = vi.fn((code: number = 200) => {
    res.statusCode = code;
    return res;
  }) as unknown as Response['status'];

  return res as unknown as Response;
};
