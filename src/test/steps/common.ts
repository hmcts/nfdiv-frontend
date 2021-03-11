import { config as testConfig } from '../config';

const { I, login } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(3);
});

Given('I go to {string}', (text: string) => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
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

When('I select {string} for {string}', (optionLabel: string, fieldLabel: string) => {
  I.checkOption(optionLabel, `//*[contains(text(), '${fieldLabel}')]/..`);
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

Then('{string} should be ticked', (text: string) => {
  I.seeCheckboxIsChecked(text);
});

Then('I type {string}', (text: string) => {
  I.type(text);
});

Given('I clear the form', () => {
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
});
