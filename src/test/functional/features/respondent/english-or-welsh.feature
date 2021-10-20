Feature: Respondent Language Preference

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Respond to the application"
    When I select "I have read the application for divorce"
    When I click "Continue"
    When I go to '/respondent/english-or-welsh'
    Then the page should include "What language do you want to receive emails and documents in?"

  @nightly
  Scenario: Error when not answering language preference?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  @nightly
  Scenario: Select English as preferred language
    And I select "English"
    When I click "Continue"
    Then the page URL should be "/respondent/check-your-answers"

  @nightly
  Scenario: Select Welsh as preferred language
    And I select "Welsh"
    And I click "Continue"
    Then the page URL should be "/respondent/check-your-answers"
