Feature: Submitting an application

  Background:
    Given I create a new user and login

  Scenario: Completed all required questions and confirming
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"

  @nightly
  Scenario: Completed all required questions and confirming with a HWF code
    Given I've already completed the form using the fixture "completeCaseWithHWF"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Submit application"
    Then the page should include "Application submitted"
