import { Logger } from '@hmcts/nodejs-logging';
import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { SupportedLanguages } from '../../modules/i18n';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { Fee, ListValue } from '../case/definition';
import type { AppSession } from '../controller/AppRequest';

const logger = Logger.getLogger('payment');

export class PaymentClient {
  client: AxiosInstance;

  constructor(
    private readonly session: AppSession,
    readonly returnUrl: string
  ) {
    this.client = axios.create({
      baseURL: config.get('services.payments.url'),
      headers: {
        Authorization: 'Bearer ' + session.user.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
      },
    });
    this.returnUrl = returnUrl;
  }

  public async create(serviceRequestNumber: string, feesFromOrderSummary: ListValue<Fee>[]): Promise<Payment> {
    const total = feesFromOrderSummary.reduce((sum, item) => sum + +item.value.FeeAmount, 0) / 100;

    const bodyCardPay = {
      amount: total,
      currency: 'GBP',
      language: this.session.lang === SupportedLanguages.En ? 'English' : this.session.lang?.toUpperCase(),
      'return-url': this.returnUrl,
    };
    try {
      const response = await this.client.post<Payment>(
        `/service-request/${serviceRequestNumber}/card-payments`,
        bodyCardPay
      );

      if (!response.data || !response.data.next_url) {
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
      const response = await this.client.get<Payment>(`/card-payments/${paymentReference}`);
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
  call_back_url: string;
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
  service_request_reference: string;
  hmcts_org_id: string;
  next_url: string;
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
