Feature: Check Your Joint Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I go to '/applicant2/check-your-joint-application'
    Then the page should include "Check your wife's answers"

  Scenario: Checking answers
    And the page should include "Yes, my marriage has irretrievably broken down"
    And the page should include "When did you get married?	31 December 1999"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate"
    And the page should include "Help with fees"
    And the page should include "Help paying the divorce fee	I do not need help paying the fee"
    And the page should include "Did you get married in the UK?	Yes"

  Scenario: Not confirming answers
    And I clear the form
    And I click "Continue"
    And the page should include "There was a problem"
    And I select "No"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Confirming answers is incorrect
    When I go to '/applicant2/enter-your-name'
    And I clear the form
    When I select "Your first name"
    And I type "My first name"
    And I select "Your last name"
    And I type "My last name"
    And I click "Continue"
    Then the page URL should be "/applicant2/changes-to-your-name"
    And I go to '/applicant2/check-your-joint-application'
    Then the page should include "Check your wife's answers"
    And I select "No"
    When I select "Explain what is incorrect or needs changing. Your answer will be sent to your wife."
    And I type "date of marriage is incorrect."
    When I click "Continue"
    Then the page URL should be "/applicant2/your-comments-sent"
    And the page should include "Your comments have been sent to your wife"

  Scenario: Confirming answers is correct
    And I select "Yes"
    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-answers"
