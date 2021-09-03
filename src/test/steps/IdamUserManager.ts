/* eslint-disable no-console */

import axios, { AxiosInstance } from 'axios';

export class IdamUserManager {
  client: AxiosInstance;
  users: Set<string> = new Set();

  constructor(idamUrl: string) {
    this.client = axios.create({
      baseURL: new URL('/', idamUrl).toString(),
    });
  }

  async create(email: string, password: string, role = 'citizen'): Promise<void> {
    try {
      await this.client.post('/testing-support/accounts', {
        id: 'No Fault Divorce Citizen 12345',
        email,
        password,
        roles: [
          {
            code: role,
          },
        ],
        forename: 'FunctionalTest',
        surname: role,
      });
      this.users.add(email);
      console.info('Created user', email);
    } catch (e) {
      console.info('Error creating user', email, e);
      throw e;
    }
  }

  async delete(email: string): Promise<void> {
    try {
      await this.client.delete(`/testing-support/accounts/${email}`);
      this.users.delete(email);
      console.info('Deleted user', email);
    } catch (e) {
      console.info('Error deleting user', email, e);
    }
  }

  async deleteAll(): Promise<void> {
    for (const user of this.users) {
      await this.delete(user);
    }
  }

  async clearAndKeepOnlyOriginalUser(): Promise<void> {
    this.users = new Set([...this.users][0]);
  }

  getCurrentUsername(): string {
    return Array.from(this.users).pop() as string;
  }

  getUsername(index: number): string {
    return Array.from(this.users)[index] as string;
  }
}
