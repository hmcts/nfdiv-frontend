import { Logger } from '@hmcts/nodejs-logging';
import Axios, { AxiosInstance } from 'axios';
import config from 'config';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CASE_TYPE, DivorceOrDissolution, JURISDICTION } from '../case/definition';
import type { AppSession } from '../controller/AppRequest';

const logger = Logger.getLogger('payment');

export class PaymentClient {
  client: AxiosInstance;

  constructor(private readonly session: AppSession, readonly returnUrl: string) {
    this.client = Axios.create({
      baseURL: config.get('services.payments.url'),
      headers: {
        Authorization: 'Bearer ' + session.user.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        'return-url': returnUrl,
        'service-callback-url': '',
      },
    });
  }

  public async create(): Promise<Payment> {
    const userCase = this.session.userCase;
    const isDivorce = userCase.divorceOrDissolution === DivorceOrDissolution.DIVORCE;
    const caseId = userCase.id.toString();
    const total = userCase.applicationFeeOrderSummary.Fees.reduce((sum, item) => sum + +item.value.FeeAmount, 0) / 100;
    const body = {
      site_id: config.get('services.payments.siteId'),
      amount: total,
      ccd_case_number: caseId,
      description: `${isDivorce ? 'Divorce' : 'Ending your civil partnership'} application fee`,
      service: JURISDICTION,
      currency: 'GBP',
      case_type: CASE_TYPE,
      fees: userCase.applicationFeeOrderSummary.Fees.map(fee => ({
        calculated_amount: `${parseInt(fee.value.FeeAmount, 10) / 100}`,
        code: fee.value.FeeCode,
        version: fee.value.FeeVersion,
      })),
      language: this.session.lang === 'en' ? '' : this.session.lang?.toUpperCase(),
    };

    try {
      const response = await this.client.post('/card-payments', body);

      if (!response.data || !response.data._links?.next_url.href) {
        throw response;
      }

      return response.data;
    } catch (e) {
      const errMsg = 'Error creating payment';
      logger.error(errMsg, e.data);
      throw new Error(errMsg);
    }
  }

  public async get(paymentReference: string): Promise<Payment | undefined> {
    try {
      const response = await this.client.get(`/card-payments/${paymentReference}`);
      return response.data;
    } catch (e) {
      const errMsg = 'Error fetching payment';
      logger.error(errMsg, e.data);
    }
  }
}

export interface Payment {
  _links: LinksDto;
  account_number: string;
  amount: number;
  case_reference: string;
  ccd_case_number: string;
  channel: string;
  currency: string;
  customer_reference: string;
  date_created: string;
  date_updated: string;
  description: string;
  external_provider: string;
  external_reference: string;
  fees: FeeDto[];
  giro_slip_no: string;
  id: string;
  method: string;
  organisation_name: string;
  payment_group_reference: string;
  payment_reference: string;
  reference: string;
  reported_date_offline: string;
  service_name: string;
  site_id: string;
  status: HmctsPayStatus;
  status_histories: StatusHistoryDto[];
}

interface LinksDto {
  next_url: LinkDto;
  self: LinkDto;
  cancel: LinkDto;
}

interface LinkDto {
  href: string; // @TODO check how URI serializes
  method: RequestMethod;
}

enum RequestMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}

export interface FeeDto {
  calculated_amount: number;
  ccd_case_number: string;
  code: string;
  description: string;
  id: number;
  jurisdiction1: string;
  jurisdiction2: string;
  memo_line: string;
  natural_account_code: string;
  net_amount: number;
  reference: string;
  version: string;
  volume: number;
}

export interface StatusHistoryDto {
  amount: number;
  description: string;
  reference: string;
  currency: string;
  ccd_case_number: string;
  channel: string;
  method: string;
  external_provider: string;
  status: HmctsPayStatus;
  external_reference: string;
  site_id: string;
  service_name: string;
  payment_group_reference: string;
  fees: FeeDto[];
  _links: {
    self: LinkDto;
  };
}

export type HmctsPayStatus = 'Initiated' | 'Success' | 'Failed';
