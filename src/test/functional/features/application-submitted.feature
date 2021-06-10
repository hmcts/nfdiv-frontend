Feature:

  Background:
    Given I create a new user and login

  Scenario: Completed all required questions and confirming with HWF
    Given I've completed all happy path questions correctly to get to check your answers page
    When I go to '/help-with-your-fee'
    Then the page should include "Do you need help paying the fee for your divorce?"
    And I clear the form
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    And I clear the form
    And I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"
    When I click "Continue"
    And I go to '/check-your-answers'
    And I clear the form
    When I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    And I click "Submit application"
    And the page should include "Application submitted"
