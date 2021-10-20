Feature: Respondent Language Preference

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I set the case state to "AosDrafted"
    When I go to '/respondent/english-or-welsh'
    Then the page should include "What language do you want to receive emails and documents in?"

  @nightly
  Scenario: Error when not answering language preference?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Select English as preferred language
    And I select "English"
    When I click "Continue"
    Then the page URL should be "/respondent/check-your-answers"

  Scenario: Select Welsh as preferred language
    And I select "Welsh"
    And I click "Continue"
    Then the page URL should be "/respondent/check-your-answers"
