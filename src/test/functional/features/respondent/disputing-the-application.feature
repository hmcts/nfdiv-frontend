Feature: Respondent disputing the application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
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
    And I select "I have read the application for divorce"
    And I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    Given I select "I want to dispute the divorce"
    And I select "Continue"
    Then the page URL should be "/respondent/disputing-the-application"

  Scenario: They confirm they want to dispute
    Given I select "I confirm I want to dispute the divorce"
    Then the page should include "You are about to confirm that you want to dispute the divorce."
    And I click "Continue"
    Then the page URL should be "legal-jurisdiction-of-the-courts"
    And the page should include "The legal power (jurisdiction) of the courts"

  Scenario: They no longer want to dispute
    Given I select "I do not want to dispute the divorce"
    And I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    And the page should include "How do you want to respond to the application?"
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You need to select how you want to respond before continuing."

  @nightly
  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not answered the question. You need to select an answer before continuing."

