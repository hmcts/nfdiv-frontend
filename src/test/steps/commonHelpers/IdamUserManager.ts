import { Logger } from '@hmcts/nodejs-logging';
import { AxiosInstance, create as axiosCreate } from 'axios';

import { UserRole } from '../../../main/app/case/definition';

export class IdamUserManager {
  logger: Logger;
  client: AxiosInstance;
  users: Set<string> = new Set();
  usersBeingDeleted: Set<string> = new Set();
  private caseWorker: TestUserAndPassword;
  generateTestUsername: () => string;
  private readonly testUser: TestUserAndPassword;

  constructor(idamUrl: string, testUserNameGenerator: () => string, testPass: string) {
    this.logger = Logger.getLogger('IdamUserManager');
    this.client = axiosCreate({
      baseURL: new URL('/', idamUrl).toString(),
    });
    this.generateTestUsername = () => testUserNameGenerator();
    this.testUser = { username: this.generateTestUsername(), password: testPass };
    this.caseWorker = { username: '', password: '' };
  }

  async init(): Promise<IdamUserManager> {
    await this.createUser(this.testUser.username, this.testUser.password);
    return this;
  }

  async createUser(
    email: string = this.generateTestUsername(),
    password: string = this.getTestPass(),
    role = ['citizen']
  ): Promise<TestUserAndPassword> {
    const user = await this.create(email, password, role);
    this.users.add(user.username);
    return user;
  }

  async createCaseWorker(
    email: string = this.generateTestUsername(),
    password: string = this.getTestPass(),
    role = [
      'caseworker',
      'caseworker-divorce',
      UserRole.CASE_WORKER,
      UserRole.SYSTEMUPDATE,
      UserRole.LEGAL_ADVISOR,
      UserRole.SUPER_USER,
    ]
  ): Promise<TestUserAndPassword> {
    this.caseWorker = await this.create(email, password, role);
    return this.caseWorker;
  }

  async create(email: string, password: string, role: string[]): Promise<TestUserAndPassword> {
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
      return {
        username: email,
        password,
      };
    } catch (e) {
      this.logger.error('Error creating user', email, e);
      throw e;
    }
  }

  async delete(email: string): Promise<void> {
    if (!this.users.has(email) && this.caseWorker.username !== email) {
      return;
    }

    if (this.usersBeingDeleted.has(email)) {
      return;
    }

    this.usersBeingDeleted.add(email);

    try {
      await this.client.delete(`/testing-support/accounts/${email}`);
      this.users.delete(email);
      if (this.caseWorker.username === email) {
        this.caseWorker = { username: '', password: '' };
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

    if (this.caseWorker.username && this.caseWorker.username !== '') {
      usersToDelete.add(this.caseWorker.username);
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

  getCurrentUser(): TestUserAndPassword {
    const username = Array.from(this.users).pop() as string;
    const password = !username ? '' : this.getTestPass();
    return {
      username,
      password,
    };
  }

  getUser(index: number): TestUserAndPassword {
    const username = Array.from(this.users)[index] as string;
    const password = !username ? '' : this.getTestPass();
    return {
      username,
      password,
    };
  }

  getCaseWorker(): TestUserAndPassword {
    return this.caseWorker;
  }

  getDefaultTestUser(): TestUserAndPassword {
    return this.testUser;
  }

  getTestPass(): string {
    return this.testUser.password;
  }
}

export interface TestUserAndPassword {
  username: string;
  password: string;
}
