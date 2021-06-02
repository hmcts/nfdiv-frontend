import Axios, { AxiosInstance } from 'axios';
import config from 'config';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CASE_TYPE, DivorceOrDissolution, JURISDICTION, PaymentStatus } from '../case/definition';
import type { AppSession } from '../controller/AppRequest';

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
    const total = userCase.applicationFeeOrderSummary.Fees.reduce((sum, item) => sum + +item.value.FeeAmount, 0);
    const body = {
      amount: total,
      ccd_case_number: caseId,
      description: `${isDivorce ? 'Divorce' : 'Ending your civil partnership'} application fee`,
      service: JURISDICTION,
      currency: 'GBP',
      case_type: CASE_TYPE,
      fees: userCase.applicationFeeOrderSummary.Fees.map(fee => ({
        calculated_amount: fee.value.FeeAmount,
        code: fee.value.FeeCode,
        version: fee.value.FeeVersion,
      })),
      language: this.session.lang === 'en' ? '' : this.session.lang?.toUpperCase(),
    };

    const response = await this.client.post('/card-payments', body);

    return response.data;
  }

  public async get(paymentId: string): Promise<Payment> {
    const response = await this.client.get(`/v1/payments/${paymentId}`);
    return response.data;
  }
}

// @see https://docs.payments.service.gov.uk/api_reference/#errors-caused-by-payment-statuses
export enum PaymentStatusCode {
  PAYMENT_METHOD_REJECTED = 'P0010',
  PAYMENT_EXPIRED = 'P0020',
  PAYMENT_CANCELLED_BY_USER = 'P0030',
  PAYMENT_CANCELLED_BY_APP = 'P0040',
  PAYMENT_PROVIDER_ERROR = 'P0050',
}

export interface Payment {
  _links: LinksDto;
  accountNumber: string;
  amount: number;
  caseReference: string;
  ccdCaseNumber: string;
  channel: string;
  currency: string;
  customerReference: string;
  dateCreated: string;
  dateUpdated: string;
  description: string;
  externalProvider: string;
  externalReference: string;
  fees: FeeDto[];
  giroSlipNo: string;
  id: string;
  method: string;
  organisationName: string;
  paymentGroupReference: string;
  paymentReference: string;
  reference: string;
  reportedDateOffline: string;
  serviceName: string;
  siteId: string;
  status: PaymentStatus;
  statusHistories: StatusHistoryDto[];
}

interface LinksDto {
  nextUrl: LinkDto;
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
  calculatedAmount: number;
  ccdCaseNumber: string;
  code: string;
  description: string;
  id: number;
  jurisdiction1: string;
  jurisdiction2: string;
  memoLine: string;
  naturalAccountCode: string;
  netAmount: number;
  reference: string;
  version: string;
  volume: number;
}

export interface StatusHistoryDto {
  dateCreated: string;
  dateUpdated: string;
  errorCode: PaymentStatusCode; // @TODO I hope that's right
  errorMessage: string;
  externalStatus: string;
  status: PaymentStatus;
}
