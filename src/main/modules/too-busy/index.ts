import { Application } from 'express';
import toobusy, { maxLag } from 'toobusy-js';

export class TooBusy {
  public enableFor(app: Application): void {
    maxLag(200);

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
