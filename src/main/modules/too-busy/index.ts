import { Application } from 'express';
import toobusy from 'toobusy-js';

export class TooBusy {
  public enableFor(app: Application): void {
    // eslint-disable-next-line import/no-named-as-default-member
    toobusy.maxLag(200);

    app.use(function (req, res, next) {
      if (toobusy()) {
        res.status(503);
        res.send('Server Too Busy');
      } else {
        next();
      }
    });
  }
}
