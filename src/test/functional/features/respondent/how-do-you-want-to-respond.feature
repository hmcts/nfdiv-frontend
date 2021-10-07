Feature: Respondent how do you want to respond

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I set the case state to "AwaitingAos"
    When I go to '/respondent/how-do-you-want-to-respond'
    Then the page should include "How do you want to respond to the application?"

  @nightly
  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You need to select how you want to respond before continuing."

  Scenario: They do not want to dispute
    Given I select "Continue without disputing the divorce"
    When I click "Continue"
    Then the page URL should be "/do-you-agree-jurisdiction"
