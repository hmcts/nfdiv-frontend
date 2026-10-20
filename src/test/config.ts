import { createAzurePlaywrightConfig, ServiceAuth, ServiceOS } from '@azure/playwright';
import sysConfig from 'config';
import { randomUUID } from 'crypto';
import { Application } from 'express';
import { getTokenFromApi } from '../main/app/auth/service/get-service-auth-token';
import { PropertiesVolume } from '../main/modules/properties-volume';
import { IdamUserManager } from './steps/commonHelpers/IdamUserManager';

// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});

let idamUserManager: IdamUserManager;

const setupTestSecrets = async () => {
  const propertiesVolume = new PropertiesVolume();
  await propertiesVolume.enableFor({ locals: { developmentMode: true } } as unknown as Application);
};

const initializeTestEnvironment = async () => {
  if (!process.env.TEST_PASSWORD) {
    await setupTestSecrets();
  }

  getTokenFromApi();

  const idamTokenUrl =
    sysConfig.has('services.idam.apiBaseUrl') && sysConfig.has('services.idam.tokenPath')
      ? new URL(
          sysConfig.get('services.idam.tokenPath') as string,
          `${sysConfig.get('services.idam.apiBaseUrl') as string}/`
        ).toString()
      : (sysConfig.get('services.idam.tokenURL') as string);

  const testUsernameGenerator = () => `nfdiv.frontend.test.${new Date().getTime()}.${Math.random()}@hmcts.net`;
  const testPass = process.env.TEST_PASSWORD || sysConfig.get('e2e.userTestPassword') || '';

  const userManager = new IdamUserManager(idamTokenUrl, testUsernameGenerator, testPass);
  idamUserManager = await userManager.init();
};

export enum TestUserType {
  CITIZEN = 'citizen',
  CITIZEN_SINGLETON = 'citizenSingleton',
  CITIZEN_APPLICANT_2 = 'citizenApplicant2',
}

export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  WaitForTimeout: 30000,
  getIdamUserManager: () => {
    return idamUserManager;
  },
  Gherkin: {
    features: './features/**/*.feature',
    steps: [
      '../steps/common.ts',
      '../steps/date.ts',
      '../steps/check-your-answers.ts',
      '../steps/jurisdiction.ts',
      '../steps/happy-path.ts',
      '../steps/postcode.ts',
      '../steps/you-need-to-review-your-application.ts',
    ],
  },
  bootstrap: async (): Promise<void> => {
    await initializeTestEnvironment();
  },
  teardown: async (): Promise<void> => idamUserManager.deleteAll(),
  helpers: {},
};

process.env.PLAYWRIGHT_SERVICE_RUN_ID = process.env.PLAYWRIGHT_SERVICE_RUN_ID || randomUUID();

const playwrightConfig = {
  url: config.TEST_URL,
  show: !config.TestHeadlessBrowser,
  browser: 'chromium',
  waitForTimeout: config.WaitForTimeout,
  waitForAction: 350,
  timeout: config.WaitForTimeout,
  retries: 3,
  waitForNavigation: 'load',
  ignoreHTTPSErrors: true,
  bypassCSP: true,
};

config.helpers = {
  Playwright: {
    ...playwrightConfig,
    chromium:
      process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN &&
      createAzurePlaywrightConfig(playwrightConfig, {
        connectTimeout: config.WaitForTimeout,
        os: ServiceOS.LINUX,
        serviceAuthType: ServiceAuth.ACCESS_TOKEN,
        exposeNetwork: process.env.TEST_URL ? '*.platform.hmcts.net' : '<loopback>',
        runId: process.env.PLAYWRIGHT_SERVICE_RUN_ID,
      }),
  },
};
