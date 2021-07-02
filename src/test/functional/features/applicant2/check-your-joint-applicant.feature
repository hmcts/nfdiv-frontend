Feature: Check Your Answers

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/check-your-joint-applicant'
    Then the page should include "Check your wife's answers"

  Scenario: Checking answers
    When I go to '/check-your-answers'
    Then the page should include "Yes, my marriage has irretrievably broken down"
    And the page should include "When did you get married?	31 December 1999"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate"
    And the page should include "Help with fees"
    And the page should include "Do you need help paying the fee for your divorce?	I need help paying the fee"
    And the page should include "Have you already applied for help with your divorce fee?	Yes"
    And the page should include "HWF-ABC-123"
    And the page should include "Is your original marriage certificate in English?	No"
    And the page should include "Do you have a ‘certified translation’ of your marriage certificate?	Yes, I have a certified translation"
    And the page should include "Enter the country where you got married	Mozambique"
    And the page should include "Enter the place where you got married	Maputo"
    And the page should include "Did you get married in the UK?	No"

  @nightly
  Scenario: Not confirming answers
    And I clear the form
    And I click "Continue"
    And the page should include "There was a problem"
    And I select "No"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Confirming answers is correct
    And I select "Yes"
    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-answers"

  Scenario: Confirming answers is incorrect
    And I select "No"
    When I select "Explain what is incorrect or needs changing. Your answer will be sent to your husband."
    And I type "date of marriage is incorrect."
    When I click "Continue"
    Then the page URL should be "/applicant2/application-sent-for-review"
