import Axios, { AxiosInstance } from 'axios';
import config from 'config';

import { DivorceOrDissolution } from '../case/definition';
import type { AppSession } from '../controller/AppRequest';

export class PaymentClient {
  client: AxiosInstance;

  constructor(private readonly session: AppSession, private readonly returnUrl: string) {
    this.client = Axios.create({
      baseURL: config.get('services.govPay.url'),
      headers: {
        authorization: `Bearer ${config.get('services.govPay.apiKey')}`,
      },
    });
  }

  public async create(): Promise<Payment> {
    const isDivorce = this.session.userCase.divorceOrDissolution === DivorceOrDissolution.DIVORCE;
    const caseId = this.session.userCase.id.toString();

    const response = await this.client.post('/v1/payments', {
      amount: 55000,
      reference: caseId,
      description: `${isDivorce ? 'Divorce' : 'Ending your civil partnership'} application fee`,
      return_url: this.returnUrl,
      delayed_capture: false,
      metadata: {
        caseId,
      },
      email: this.session.user.email,
      prefilled_cardholder_details: {
        cardholder_name: `${this.session.user.givenName} ${this.session.user.familyName}`,
        billing_address: {
          line1: this.session.userCase.applicant1Address1,
          line2: this.session.userCase.applicant1Address2,
          city: this.session.userCase.applicant1AddressTown,
          postcode: this.session.userCase.applicant1AddressPostcode,
          country: this.session.userCase.applicant1AddressCountry,
        },
      },
      language: this.session.lang || 'en',
    });

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
  payment_id: string;
  reference: string;
  created_date: string;
  state: { status: string; finished: boolean; code: PaymentStatusCode };
  payment_provider: string;
  _links?: { next_url: { href: string } };
}
