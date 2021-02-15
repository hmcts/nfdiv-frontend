const { I } = inject();

const iClick = (text: string) => {
  I.waitForText(text);
  I.click(text);
};

When('I click {string}', iClick);
When('I select {string}', iClick);

Then('I expect the page header to be {string}', (title: string) => {
  I.seeInTitle(title);
});

Then('the page should include {string}', (text: string) => {
  I.see(text);
});

Then('{string} should be ticked', (text: string) => {
  I.seeCheckboxIsChecked(text);
});
