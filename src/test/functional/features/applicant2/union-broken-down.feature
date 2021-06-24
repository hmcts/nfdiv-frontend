Feature: Applicant 2 Union broken down

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/irretrievable-breakdown'
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"

  @nightly
  Scenario: They have not indicated if their partnership has broken down
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Their partnership has not broken down
    Given I select "No, my marriage has not irretrievably broken down"
    Then the page should include "This is the law in England and Wales."
