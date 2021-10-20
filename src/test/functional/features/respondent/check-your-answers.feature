Feature: Respondent Check Your Answers

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given CaseWorker issues application
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Respond to the application"
    When I select "I have read the application for divorce"
    When I click "Continue"
    And I go to "/respondent/check-your-answers"
    Then the page should include "What language do you want to receive emails and documents in? English"
    Then the page should include "Are there, or have there ever been, any other legal proceedings relating to your marriage, property or children? No"

  Scenario: Checking answers and submitting
    And I select "I confirm that:"
    When I click "Submit"
    Then the page URL should be "/respondent/hub-page"

