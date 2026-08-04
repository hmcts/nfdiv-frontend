import csurf from 'csurf';
import type { Application } from 'express';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

import { CSRFToken } from './index';

jest.mock('csurf', () => jest.fn());

describe('CSRFToken', () => {
  const csrfMiddleware = jest.fn();
  const app = { use: jest.fn() } as unknown as Application;
  const csrfToken = new CSRFToken();

  beforeEach(() => {
    jest.clearAllMocks();
    (csurf as unknown as jest.Mock).mockReturnValue(csrfMiddleware);
  });

  test('stores generated csrf token in res.locals and calls next', () => {
    csrfToken.enableFor(app);

    const tokenInjector = (app.use as jest.Mock).mock.calls[0][1];
    const req = { csrfToken: jest.fn().mockReturnValue('csrf-token-value') };
    const res = { locals: {} as Record<string, unknown> };
    const next = jest.fn();

    tokenInjector(req, res, next);

    expect(req.csrfToken).toHaveBeenCalledTimes(1);
    expect(res.locals.csrfToken).toBe('csrf-token-value');
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('extracts csrf token from csrf-token header when body token is missing', () => {
    csrfToken.enableFor(app);

    const csurfOptions = (csurf as unknown as jest.Mock).mock.calls[0][0];
    const token = csurfOptions.value({
      body: {},
      headers: { 'csrf-token': 'header-token' },
    });

    expect(token).toBe('header-token');
  });

  test('extracts csrf token from x-csrf-token header when csrf-token header is missing', () => {
    csrfToken.enableFor(app);

    const csurfOptions = (csurf as unknown as jest.Mock).mock.calls[0][0];
    const token = csurfOptions.value({
      body: {},
      headers: { 'x-csrf-token': 'x-csrf-token-value' },
    });

    expect(token).toBe('x-csrf-token-value');
  });

  test('extracts csrf token from x-xsrf-token header when other headers are missing', () => {
    csrfToken.enableFor(app);

    const csurfOptions = (csurf as unknown as jest.Mock).mock.calls[0][0];
    const token = csurfOptions.value({
      body: {},
      headers: { 'x-xsrf-token': 'x-xsrf-token-value' },
    });

    expect(token).toBe('x-xsrf-token-value');
  });

  test('redirects to csrf token error page when csrf validation fails', () => {
    csrfToken.enableFor(app);

    const errorMiddleware = (app.use as jest.Mock).mock.calls[1][0];
    const res = { redirect: jest.fn() };
    const next = jest.fn();

    errorMiddleware({ code: 'EBADCSRFTOKEN', stack: 'bad csrf' }, {} as never, res, next);

    expect(res.redirect).toHaveBeenCalledWith(CSRF_TOKEN_ERROR_URL);
    expect(next).not.toHaveBeenCalled();
  });

  test('passes non csrf errors to next middleware', () => {
    csrfToken.enableFor(app);

    const errorMiddleware = (app.use as jest.Mock).mock.calls[1][0];
    const res = { redirect: jest.fn() };
    const next = jest.fn();

    errorMiddleware({ code: 'SOME_OTHER_ERROR' }, {} as never, res, next);

    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});
