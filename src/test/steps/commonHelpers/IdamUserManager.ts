import { Logger } from '@hmcts/nodejs-logging';
import { AxiosInstance, create as axiosCreate } from 'axios';

import { UserRole } from '../../../main/app/case/definition';

export class IdamUserManager {
  logger: Logger;
  client: AxiosInstance;
  usersBeingDeleted: Set<string> = new Set();
  private caseWorker: TestUserAndPassword;
  generateTestUsername: () => string;
  private readonly testUser: TestUserAndPassword;
  private applicant1: TestUserAndPassword;
  private applicant2: TestUserAndPassword;
  private respondent: TestUserAndPassword;
  private currentUser: TestUserKey | undefined;
  private cleanupBarrier: Promise<void> = Promise.resolve();

  constructor(idamUrl: string, testUserNameGenerator: () => string, testPass: string) {
    this.logger = Logger.getLogger('IdamUserManager');
    this.client = axiosCreate({
      baseURL: new URL('/', idamUrl).toString(),
    });
    this.generateTestUsername = () => testUserNameGenerator();
    this.testUser = { username: this.generateTestUsername(), password: testPass };
    this.applicant1 = { username: '', password: '' };
    this.applicant2 = { username: '', password: '' };
    this.respondent = { username: '', password: '' };
    this.caseWorker = { username: '', password: '' };
  }

  async init(): Promise<IdamUserManager> {
    await this.createUser(this.testUser.username, this.testUser.password);
    return this;
  }

  private queueCleanup(work: () => Promise<void>): Promise<void> {
    const run = this.cleanupBarrier.then(work, work);
    this.cleanupBarrier = run.then(
      () => undefined,
      () => undefined
    ); // keep barrier chain alive
    return run;
  }

  private async waitForCleanup(): Promise<void> {
    await this.cleanupBarrier;
  }

  async createUser(
    email: string = this.generateTestUsername(),
    password: string = this.getTestPass(),
    role = ['citizen']
  ): Promise<TestUserAndPassword> {
    await this.waitForCleanup();
    return this.create(email, password, role);
  }

  async createApplicant1(): Promise<TestUserAndPassword> {
    this.applicant1 = await this.createUser();
    return this.applicant1;
  }

  async createApplicant2(): Promise<TestUserAndPassword> {
    this.applicant2 = await this.createUser();
    return this.applicant2;
  }

  async createRespondent(): Promise<TestUserAndPassword> {
    this.respondent = await this.createUser();
    return this.respondent;
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
    await this.waitForCleanup();
    this.caseWorker = await this.create(email, password, role);
    return this.caseWorker;
  }

  private async create(email: string, password: string, role: string[]): Promise<TestUserAndPassword> {
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

  hasUser = (userKey: TestUserKey): boolean => {
    const user = this[userKey];
    return !!user && !!user.username && user.username !== '';
  };

  private async delete(email: string): Promise<void> {
    email = email.trim();
    if (email.length === 0) {
      return;
    }

    if (this.usersBeingDeleted.has(email)) {
      return;
    }

    this.usersBeingDeleted.add(email);

    try {
      await this.client.delete(`/testing-support/accounts/${email}`);
      this.logger.info('Deleted user', email);
    } catch (e) {
      this.logger.error('Error deleting user', email, e);
    } finally {
      this.usersBeingDeleted.delete(email);
    }
  }

  private clearUser(userKey: TestUserKey): void {
    if (this.hasUser(userKey) && userKey !== TestUserKey.TEST_USER) {
      this[userKey] = { username: '', password: '' };
    }
    if (this.currentUser === userKey) {
      this.clearCurrentUser();
    }
  }

  async deleteUser(userKey: TestUserKey): Promise<void> {
    if (this.hasUser(userKey)) {
      const email = this[userKey].username;
      this.clearUser(userKey);
      await this.delete(email);
    }
  }

  private getUsersToDelete(): Set<string> {
    const usersToDelete: Set<string> = new Set();
    if (this.hasUser(TestUserKey.APPLICANT_1)) {
      usersToDelete.add(this[TestUserKey.APPLICANT_1].username);
      this.clearUser(TestUserKey.APPLICANT_1);
    }
    if (this.hasUser(TestUserKey.APPLICANT_2)) {
      usersToDelete.add(this[TestUserKey.APPLICANT_2].username);
      this.clearUser(TestUserKey.APPLICANT_2);
    }
    if (this.hasUser(TestUserKey.RESPONDENT)) {
      usersToDelete.add(this[TestUserKey.RESPONDENT].username);
      this.clearUser(TestUserKey.RESPONDENT);
    }
    if (this.hasUser(TestUserKey.CASEWORKER)) {
      usersToDelete.add(this[TestUserKey.CASEWORKER].username);
      this.clearUser(TestUserKey.CASEWORKER);
    }
    return usersToDelete;
  }

  async deleteAll(): Promise<void> {
    let usersToDelete: string[] = [];
    await this.queueCleanup(async () => {
      usersToDelete = Array.from(this.getUsersToDelete());

      if (this.hasUser(TestUserKey.TEST_USER)) {
        usersToDelete.push(this[TestUserKey.TEST_USER].username);
      }
    });
    await Promise.all(usersToDelete.map(email => this.delete(email)));
  }

  async clearAndKeepOnlyOriginalUser(): Promise<void> {
    let usersToDelete: string[] = [];
    await this.queueCleanup(async () => {
      usersToDelete = Array.from(this.getUsersToDelete());
    });
    await Promise.all(usersToDelete.map(email => this.delete(email)));
  }

  getCurrentUser(): TestUserAndPassword {
    if (!this.currentUser) {
      throw new Error('No current user set');
    }
    return this[this.currentUser];
  }

  getCurrentUserKey(): TestUserKey {
    if (!this.currentUser) {
      throw new Error('No current user set');
    }
    return this.currentUser;
  }

  clearCurrentUser(): void {
    this.currentUser = undefined;
  }

  isApplicant2(): boolean {
    return this.currentUser === TestUserKey.APPLICANT_2;
  }

  isRespondent(): boolean {
    return this.currentUser === TestUserKey.RESPONDENT;
  }

  getUser = async (userKey: TestUserKey): Promise<TestUserAndPassword> => {
    switch (userKey) {
      case TestUserKey.APPLICANT_1:
        return this.getApplicant1();
      case TestUserKey.APPLICANT_2:
        return this.getApplicant2();
      case TestUserKey.RESPONDENT:
        return this.getRespondent();
      case TestUserKey.CASEWORKER:
        return this.getCaseWorker();
      case TestUserKey.TEST_USER:
        return this.getDefaultTestUser();
    }
  };

  setCurrentUser(userKey: TestUserKey): void {
    this.currentUser = userKey;
  }

  getApplicant1 = async (): Promise<TestUserAndPassword> => {
    if (!this.hasUser(TestUserKey.APPLICANT_1)) {
      await this.createApplicant1();
    }
    return this.applicant1;
  };

  getApplicant2 = async (): Promise<TestUserAndPassword> => {
    if (!this.hasUser(TestUserKey.APPLICANT_2)) {
      await this.createApplicant2();
    }
    return this.applicant2;
  };

  getRespondent = async (): Promise<TestUserAndPassword> => {
    if (!this.hasUser(TestUserKey.RESPONDENT)) {
      await this.createRespondent();
    }
    return this.respondent;
  };

  getCaseWorker = async (): Promise<TestUserAndPassword> => {
    if (!this.hasUser(TestUserKey.CASEWORKER)) {
      await this.createCaseWorker();
    }
    return this.caseWorker;
  };

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

export enum TestUserKey {
  APPLICANT_1 = 'applicant1',
  APPLICANT_2 = 'applicant2',
  RESPONDENT = 'respondent',
  CASEWORKER = 'caseWorker',
  TEST_USER = 'testUser',
}
