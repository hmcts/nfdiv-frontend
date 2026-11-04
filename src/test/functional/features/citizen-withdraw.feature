Feature: Citizen Withdraw
  Background: Logged in on check your answers page
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"

  Scenario: Withdraw from the check your answers page
    Given I click to withdraw and expect URL "WITHDRAW_APPLICATION"
    Then I click submit application and expect URL "APPLICATION_WITHDRAWN"
