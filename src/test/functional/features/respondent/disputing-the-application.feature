Feature: Respondent disputing the application

  Background:
    Given I login
    And I've already completed the form using the fixture "completeCase"
    And I set the case state to "AosDrafted"
    When I go to '/respondent/disputing-the-application'
    Then the page should include "Disputing the divorce application"

  @nightly
  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not answered the question. You need to select an answer before continuing."

  Scenario: They confirm they want to dispute
    Given I select "I confirm I want to dispute the divorce"
    Then the page should include "You are about to confirm that you want to dispute the divorce."
