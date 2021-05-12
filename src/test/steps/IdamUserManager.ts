/* eslint-disable no-console */

import axios, { AxiosInstance } from 'axios';

export class IdamUserManager {
  client: AxiosInstance;

  constructor(
    idamUrl: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role = 'citizen'
  ) {
    this.client = axios.create({
      baseURL: new URL('/', idamUrl).toString(),
    });
  }

  async create(): Promise<void> {
    try {
      await this.client.post('/testing-support/accounts', {
        email: this.email,
        forename: 'FunctionalTest',
        id: 'No Fault Divorce Citizen 12345',
        password: this.password,
        roles: [
          {
            code: this.role,
          },
        ],
        surname: 'Citizen',
      });
      console.info('Created user', this.email);
    } catch (e) {
      console.info('Error creating user', this.email, e);
      throw e;
    }
  }

  async delete(): Promise<void> {
    try {
      await this.client.delete(`/testing-support/accounts/${this.email}`);
      console.info('Deleted user', this.email);
    } catch (e) {
      console.info('Error deleting user', this.email, e);
    }
  }
}
