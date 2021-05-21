import { Case } from '../../main/app/case/case';
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
  login('user');
});

export const iClick = (text: string): void => {
  I.waitForText(text);
  I.click(text);
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
  I.waitForElement('option[value^="{\\"fullAddress"]');
};
Then('I wait for the postcode lookup to return results', iWaitForPostcodeLookUpResults);

export const iResetThePostCodeLookUpForm = (): void => {
  iClearTheForm();

  I.executeScript(() => {
    (document.querySelector('[data-link="resetPostcodeLookup"]') as HTMLAnchorElement).click();
  });
};
Given('I reset the postcode lookup form', iResetThePostCodeLookUpForm);

Given("I've said I'm appling as a joint application", () => {
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

export const iSetTheUsersCaseTo = async (userCaseObj: Partial<BrowserCase>): Promise<void> =>
  I.executeScript(
    async ([userCase, livesBasedUrl, relationshipDateUrl]) => {
      const mainForm = document.getElementById('main-form') as HTMLFormElement;
      const formData = new FormData(mainForm);
      for (const [key, value] of Object.entries(userCase)) {
        formData.set(key, value as string);
      }

      const request = {
        method: 'POST',
        body: new URLSearchParams(formData as unknown as Record<string, string>),
      };
      await fetch(livesBasedUrl, request);
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetch(relationshipDateUrl, request);
    },
    [userCaseObj, WHERE_YOUR_LIVES_ARE_BASED_URL, RELATIONSHIP_DATE_URL]
  );

interface BrowserCase extends Case {
  'relationshipDate-day': number;
  'relationshipDate-month': number;
  'relationshipDate-year': number;
}
