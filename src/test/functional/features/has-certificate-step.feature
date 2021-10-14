Feature: Certificate step

  Background:
    Given I login
    When I go to '/do-you-have-your-certificate'
    Then the page should include "Do you have your marriage certificate with you?"

  Scenario: They have their union certificate
    Given I select "Yes, I have my marriage certificate"
    When I click "Continue"
    Then I wait until the page contains "Do you need help paying the fee for your divorce?"

  @nightly
  Scenario: They have not indicated if they have the certificate
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They do not have their union certificate
    Given I select "No, I do not have marriage certificate"
    When I click "Continue"
    Then the page should include "You need your marriage certificate"
