import { AxiosInstance, create as axiosCreate } from 'axios';

import { UserRole } from '../../../main/app/case/definition';

import { logger } from './logger';

export class IdamUserManager {
  logger: typeof logger;
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
    this.logger = logger;
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
    await this.createUser(TestUserKey.TEST_USER, this.testUser.username, this.testUser.password);
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
    userKey: TestUserKey,
    email: string = this.generateTestUsername(),
    password: string = this.getTestPass(),
    role = ['citizen']
  ): Promise<TestUserAndPassword> {
    await this.waitForCleanup();
    return this.create(email, password, role, userKey);
  }

  async createApplicant1(): Promise<TestUserAndPassword> {
    this.applicant1 = await this.createUser(TestUserKey.APPLICANT_1);
    return this.applicant1;
  }

  async createApplicant2(): Promise<TestUserAndPassword> {
    this.applicant2 = await this.createUser(TestUserKey.APPLICANT_2);
    return this.applicant2;
  }

  async createRespondent(): Promise<TestUserAndPassword> {
    this.respondent = await this.createUser(TestUserKey.RESPONDENT);
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
    this.caseWorker = await this.create(email, password, role, TestUserKey.CASEWORKER);
    return this.caseWorker;
  }

  private async create(
    email: string,
    password: string,
    role: string[],
    userKey: TestUserKey
  ): Promise<TestUserAndPassword> {
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
      this.logger.info(`Created ${userKey} user`, email);
      return {
        username: email,
        password,
      };
    } catch (e) {
      this.logger.error(`Error creating ${userKey} user`, email, e);
      throw e;
    }
  }

  hasUser = (userKey: TestUserKey): boolean => {
    const user = this[userKey];
    return !!user && !!user.username && user.username !== '';
  };

  private async delete(userKey: TestUserKey): Promise<void> {
    const email = this[userKey].username;
    if (email.length === 0) {
      return;
    }

    if (this.usersBeingDeleted.has(email)) {
      return;
    }

    this.usersBeingDeleted.add(email);

    try {
      this.clearUser(userKey);
      await this.client.delete(`/testing-support/accounts/${email}`);
      this.logger.info(`Deleted ${userKey} user`, email);
    } catch (e) {
      this.logger.error(`Error deleting ${userKey} user`, email, e);
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

  private getUsersToDelete(): Set<TestUserKey> {
    const usersToDelete: Set<TestUserKey> = new Set();
    if (this.hasUser(TestUserKey.APPLICANT_1)) {
      usersToDelete.add(TestUserKey.APPLICANT_1);
    }
    if (this.hasUser(TestUserKey.APPLICANT_2)) {
      usersToDelete.add(TestUserKey.APPLICANT_2);
    }
    if (this.hasUser(TestUserKey.RESPONDENT)) {
      usersToDelete.add(TestUserKey.RESPONDENT);
    }
    if (this.hasUser(TestUserKey.CASEWORKER)) {
      usersToDelete.add(TestUserKey.CASEWORKER);
    }
    return usersToDelete;
  }

  async deleteAll(): Promise<void> {
    let usersToDelete: TestUserKey[] = [];
    await this.queueCleanup(async () => {
      usersToDelete = Array.from(this.getUsersToDelete());

      if (this.hasUser(TestUserKey.TEST_USER)) {
        usersToDelete.push(TestUserKey.TEST_USER);
      }
    });
    await Promise.all(usersToDelete.map(userKey => this.delete(userKey)));
  }

  async clearAndKeepOnlyOriginalUser(): Promise<void> {
    let usersToDelete: TestUserKey[] = [];
    await this.queueCleanup(async () => {
      usersToDelete = Array.from(this.getUsersToDelete());
    });
    await Promise.all(usersToDelete.map(userKey => this.delete(userKey)));
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

  switchApplicant1AndApplicant2(): void {
    const applicant1 = this.applicant1;
    const currentUser = this.currentUser;
    this.applicant1 = this.applicant2;
    this.applicant2 = applicant1;
    if (currentUser === TestUserKey.APPLICANT_1) {
      this.currentUser = TestUserKey.APPLICANT_2;
    } else if (currentUser === TestUserKey.APPLICANT_2) {
      this.currentUser = TestUserKey.APPLICANT_1;
    }
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
  CASEWORKER = 'caseworker',
  TEST_USER = 'testUser',
}
