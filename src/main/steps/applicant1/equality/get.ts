import autobind from 'autobind-decorator';
import axios from 'axios';
import config from 'config';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';

import { AppRequest } from '../../../app/controller/AppRequest';
import { CHECK_ANSWERS_URL } from '../../urls';

import { createToken } from './createToken';

@autobind
export default class PCQGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.userCase.applicant1PcqId) {
      const url = config.get('services.equalityAndDiversity.url');
      const path: string = config.get('services.equalityAndDiversity.path');

      const health = `${url}/health`;
      const response = await axios.get(health);

      if (response.data.status && response.data.status === 'UP') {
        req.session.userCase.applicant1PcqId = uuid();
      } else {
        return res.redirect(CHECK_ANSWERS_URL);
      }

      const params = {
        serviceId: 'NEW_DIVORCE_LAW',
        actor: 'APPLICANT1',
        pcqId: req.session.userCase.applicant1PcqId,
        partyId: req.session.user.email,
        returnUrl: `${res.locals.host}${CHECK_ANSWERS_URL}`,
        language: req.session.lang || 'en',
      };

      params['token'] = createToken(params);
      params.partyId = encodeURIComponent(params.partyId);

      const qs = Object.keys(params)
        .map(key => {
          return `${key}=${params[key]}`;
        })
        .join('&');

      res.redirect(`${url}${path}?${qs}`);
    } else {
      res.redirect(CHECK_ANSWERS_URL);
    }
  }
}
