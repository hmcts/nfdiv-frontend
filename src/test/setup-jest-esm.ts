import { jest } from '@jest/globals';

jest.unstable_mockModule('axios', () => jest.createMockFromModule('axios'));
jest.unstable_mockModule('@hmcts/nodejs-logging', () => jest.createMockFromModule('@hmcts/nodejs-logging'));
