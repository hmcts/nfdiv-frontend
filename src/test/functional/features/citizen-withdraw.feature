Feature: Citizen Withdraw
  Background: Logged in on check your answers page
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'

  Scenario: Withdraw from the check your answers page
    Given I click element "#withdrawLink"
    Then the page should include "Withdraw your application"
    When I click submit
    Then the page should include "Application Withdrawn"
