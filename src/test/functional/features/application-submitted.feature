Feature: Submitting an application

  Background:
    Given I create a new user and login
    When I've already completed all questions correctly
    Then I go to '/check-your-answers'

  Scenario: Completed all required questions and confirming
    Given I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
