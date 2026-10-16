import { Logger } from '@hmcts/nodejs-logging';
import { AxiosInstance, create as axiosCreate } from 'axios';

import { UserRole } from '../../main/app/case/definition';

export class IdamUserManager {
  logger: Logger;
  client: AxiosInstance;
  users: Set<string> = new Set();
  usersBeingDeleted: Set<string> = new Set();
  caseWorker: string;

  constructor(idamUrl: string) {
    this.logger = Logger.getLogger('IdamUserManager');
    this.client = axiosCreate({
      baseURL: new URL('/', idamUrl).toString(),
    });
    this.caseWorker = '';
  }

  async createUser(email: string, password: string, role = ['citizen']): Promise<void> {
    await this.create(email, password, role);
    this.users.add(email);
  }

  async createCaseWorker(
    email: string,
    password: string,
    role = [
      'caseworker',
      'caseworker-divorce',
      UserRole.CASE_WORKER,
      UserRole.SYSTEMUPDATE,
      UserRole.LEGAL_ADVISOR,
      UserRole.SUPER_USER,
    ]
  ): Promise<void> {
    await this.create(email, password, role);
    this.caseWorker = email;
  }

  async create(email: string, password: string, role: string[]): Promise<void> {
    try {
      await this.client.post('/testing-support/accounts', {
        email,
        password,
        roles: role.map(r => {
          return {
            code: r,
          };
        }),
        forename: 'FunctionalTest',
        surname: 'LastNameTest',
      });
      this.logger.info('Created user', email);
    } catch (e) {
      this.logger.error('Error creating user', email, e);
      throw e;
    }
  }

  async delete(email: string): Promise<void> {
    if (!this.users.has(email) && this.caseWorker !== email) {
      return;
    }

    if (this.usersBeingDeleted.has(email)) {
      return;
    }

    this.usersBeingDeleted.add(email);

    try {
      await this.client.delete(`/testing-support/accounts/${email}`);
      this.users.delete(email);
      if (this.caseWorker === email) {
        this.caseWorker = '';
      }
      this.logger.info('Deleted user', email);
    } catch (e) {
      this.logger.error('Error deleting user', email, e);
    } finally {
      this.usersBeingDeleted.delete(email);
    }
  }

  async deleteAll(): Promise<void> {
    const usersToDelete = new Set(this.users);

    if (this.caseWorker) {
      usersToDelete.add(this.caseWorker);
    }

    for (const user of usersToDelete) {
      await this.delete(user);
    }
  }

  async clearAndKeepOnlyOriginalUser(): Promise<void> {
    const users = Array.from(this.users);
    const firstUser = users.shift();

    await Promise.all(users.map(user => this.delete(user)));

    this.users = firstUser ? new Set([firstUser]) : new Set();
  }

  getCurrentUsername(): string {
    return Array.from(this.users).pop() as string;
  }

  getUsername(index: number): string {
    return Array.from(this.users)[index] as string;
  }

  getCaseWorker(): string {
    return this.caseWorker;
  }
}
