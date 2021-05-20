Feature: Union broken down

  Background:
    Given I login
    When I go to '/irretrievable-breakdown'
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"

  @nightly
  Scenario: They have not indicated if their partnership has broken down
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Their partnership has not broken down
    When I select "No, my marriage has not irretrievably broken down"
    Then the page should include "This is the law in England and Wales."
    When I click "Continue"
    Then the page should include "You cannot apply to get a divorce"

  Scenario: Civil partnership has not broken down
    Given I go to '/irretrievable-breakdown?forceCivilMode'
    When I select "No, my civil partnership has not irretrievably broken down"
    Then the page should include "This is the law in England and Wales."
    When I click "Continue"
    Then the page should include "You cannot apply to end your civil partnership"

  Scenario: Union has broken down
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"
    When I select "Yes, my marriage has irretrievably broken down"
    Then I click "Continue"
    And the page should include "When did you get married?"
