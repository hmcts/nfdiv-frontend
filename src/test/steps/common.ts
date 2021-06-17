import Axios from 'axios';
import sysConfig from 'config';
import jwt_decode from 'jwt-decode';
import { Logger, transports } from 'winston';

import { CaseApi, getCaseApi } from '../../main/app/case/CaseApi';
import { Case } from '../../main/app/case/case';
import { DivorceOrDissolution } from '../../main/app/case/definition';
import { UserDetails } from '../../main/app/controller/AppRequest';
import { RELATIONSHIP_DATE_URL, WHERE_YOUR_LIVES_ARE_BASED_URL } from '../../main/steps/urls';
import { config as testConfig } from '../config';

const { I, login } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(3);
});

export const iAmOnPage = (text: string): void => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};
Given('I go to {string}', iAmOnPage);

Then('the page URL should be {string}', (url: string) => {
  I.waitInUrl(url);
});

Given('I login', () => {
  login('citizen');
});

Given('I create a new user and login', () => {
  login('citizenSingleton');
});

export const iClick = (text: string, locator?: CodeceptJS.LocatorOrString, wait?: number): void => {
  I.waitForText(text, wait);
  I.click(locator || text);
};

When('I click {string}', iClick);
When('I select {string}', iClick);

export const checkOptionFor = (optionLabel: string, fieldLabel: string): void =>
  I.checkOption(optionLabel, `//*[contains(text(), '${fieldLabel}')]/..`);
When('I select {string} for {string}', (optionLabel: string, fieldLabel: string) => {
  checkOptionFor(optionLabel, fieldLabel);
});

Given('I choose {string} from {string}', (option: string, select: string) => {
  I.selectOption(select, option);
});

Then('I expect the page title to be {string}', (title: string) => {
  I.seeInTitle(title);
});

Then('the page should include {string}', (text: string) => {
  I.see(text);
});

Then('the page should not include {string}', (text: string) => {
  I.dontSee(text);
});

Then('the form input {string} should be {string}', (formInput: string, value: string) => {
  I.seeInField(formInput, value);
});

Then('{string} should be ticked', (text: string) => {
  I.seeCheckboxIsChecked(text);
});

Then('I type {string}', (text: string) => {
  I.type(text);
});

export const iClearTheForm = (): void => {
  I.executeScript(() => {
    const checkedInputs = document.querySelectorAll('input:checked') as NodeListOf<HTMLInputElement>;
    for (const checkedInput of checkedInputs) {
      checkedInput.checked = false;
    }

    const clearInputs = (inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>) => {
      for (const input of inputs) {
        input.value = '';
      }
    };

    clearInputs(document.querySelectorAll('textarea'));
    clearInputs(document.querySelectorAll('input[type="text"]'));
  });
};
Given('I clear the form', iClearTheForm);

export const iWaitForPostcodeLookUpResults = (): void => {
  I.waitForText('Select an address');
  I.waitForElement('option[value^="{\\"fullAddress"]', 10);
};
Then('I wait for the postcode lookup to return results', iWaitForPostcodeLookUpResults);

export const iResetThePostCodeLookUpForm = (): void => {
  iClearTheForm();

  I.executeScript(() => {
    (document.querySelector('[data-link="resetPostcodeLookup"]') as HTMLAnchorElement).click();
  });
};
Given('I reset the postcode lookup form', iResetThePostCodeLookUpForm);

Given("I've said I'm applying as a sole application", () => {
  I.amOnPage('/how-do-you-want-to-apply');
  iClearTheForm();
  I.checkOption('I want to apply on my own, as a sole applicant');
  I.click('Continue');
});

Given("I've said I'm applying as a joint application", () => {
  I.amOnPage('/how-do-you-want-to-apply');
  iClearTheForm();
  I.checkOption('I want to apply jointly');
  I.click('Continue');
});

Given("I've said I'm divorcing my husband", () => {
  I.amOnPage('/your-details');
  iClearTheForm();
  I.checkOption('My husband');
  I.click('Continue');
});

Given("I've said I do not have my husband's email address", () => {
  I.amOnPage('/their-email-address');
  iClearTheForm();
  I.checkOption('I do not know their email address');
  I.click('Continue');
});

Given('I delete any previously uploaded files', async () => {
  const locator = '//a[text()="Delete"]';
  let numberOfElements = await I.grabNumberOfVisibleElements(locator);

  while (numberOfElements >= 1) {
    I.click('Delete');
    numberOfElements = await I.grabNumberOfVisibleElements(locator);
  }
});

When('I upload the file {string}', (pathToFile: string) => {
  I.attachFile('input[type="file"]', pathToFile);
});

When('I enter my valid case reference and valid access code', async () => {
  await I.amOnPage('/enter-your-access-code');
  iClearTheForm();

  const testUser = await iGetTheTestUser();
  const caseApi = iGetTheCaseApi(testUser);
  const userCase = await caseApi.getOrCreateCase(DivorceOrDissolution.DIVORCE, testUser);
  const fetchedCase = await caseApi.getCaseById(userCase.id);

  const caseReference = userCase.id;
  const accessCode = fetchedCase.accessCode;

  iClick('Your reference number');
  I.type(caseReference);
  iClick('Your access code');
  I.type(accessCode as string);
  iClick('Continue');
});

export const iGetTheTestUser = async (): Promise<UserDetails> => {
  const id: string = sysConfig.get('services.idam.clientID');
  const secret = 'thUphEveC2Ekuqedaneh4jEcRuba4t2t';
  const tokenUrl: string = sysConfig.get('services.idam.tokenURL');

  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const data = `grant_type=password&username=${testConfig.TestUser}&password=${testConfig.TestPass}&client_id=${id}
                &client_secret=${secret}&scope=openid%20profile%20roles%20openid%20roles%20profile`;

  const response = await Axios.post(tokenUrl, data, { headers });

  const jwt = jwt_decode(response.data.id_token) as {
    uid: string;
    sub: string;
    given_name: string;
    family_name: string;
    roles: string[];
  };

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
};

export const iGetTheCaseApi = (testUser: UserDetails): CaseApi => {
  const logger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, logger);
};

export const iSetTheUsersCaseTo = async (userCaseObj: Partial<BrowserCase>): Promise<void> =>
  I.executeScript(
    async ([userCase, relationshipDateUrl, livesBasedUrl]) => {
      const mainForm = document.getElementById('main-form') as HTMLFormElement;
      const formData = new FormData(mainForm);
      for (const [key, value] of Object.entries(userCase)) {
        formData.set(key, value as string);
      }

      const request = {
        method: 'POST',
        body: new URLSearchParams(formData as unknown as Record<string, string>),
      };

      await fetch(relationshipDateUrl, request);
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetch(livesBasedUrl, request);
    },
    [userCaseObj, RELATIONSHIP_DATE_URL, WHERE_YOUR_LIVES_ARE_BASED_URL]
  );

export interface BrowserCase extends Case {
  'relationshipDate-day': number;
  'relationshipDate-month': number;
  'relationshipDate-year': number;
}
