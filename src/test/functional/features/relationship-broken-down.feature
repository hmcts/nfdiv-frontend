Feature: Relationship broken down

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I go to '/irretrievable-breakdown'
    And the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"

  Scenario: Error when missing a required field
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Selecting option for exit page
    When I select "No, my marriage has not irretrievably broken down"
    Then the page should include "This is the law in England and Wales."
    When I click "Continue"
    Then the page should include "You cannot apply to get a divorce"

  Scenario: Selecting option for exit page for civil partnership
    Given I go to '/irretrievable-breakdown?forceCivilMode'
    When I select "No, my relationship has not irretrievably broken down"
    Then the page should include "This is the law in England and Wales."
    When I click "Continue"
    Then the page should include "You cannot apply to end your civil partnership"

  Scenario: Successfully completing the form
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"
    When I select "Yes, my marriage has irretrievably broken down"
    Then I click "Continue"
    And the page should include "When did you get married?"
