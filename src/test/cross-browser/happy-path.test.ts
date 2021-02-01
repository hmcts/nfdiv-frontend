Feature('No fault divorce application submission');

Scenario('Successfully submitting a no fault divorce application', ({ I }) => {
  I.amOnPage('/');
  I.waitForText('Sign in');
  I.fillField('username', 'hmcts.nfdiv@gmail.com');
  I.fillField('password', 'Pa55word11');
  I.click('Sign in');
  I.see('Apply for a divorce');
});
