Feature: Certificate step

  Background:
    Given I login
    When I go to '/do-you-have-your-certificate'
    Then the page should include "Do you have your marriage certificate with you?"

  Scenario: Successfully completing the form
    Given I select "Yes, I have my marriage certificate"
    When I click "Continue"
    Then the page should include "Do you need help paying the fee for your divorce?"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Exit page
    Given I select "No, I do not have marriage certificate"
    When I click "Continue"
    Then the page should include "You need your marriage certificate"
