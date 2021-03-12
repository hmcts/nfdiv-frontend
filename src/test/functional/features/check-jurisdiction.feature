Feature: Check Jurisdiction

  Background:
    Given I login
    When I go to "/check-jurisdiction"
    Then the page should include "Check if you can get a divorce in England and Wales"
    And the page should include "You must have some connection to England or Wales"

  Scenario: Continuing
    When I click "Continue"
    Then the page should include "Check your answers"
