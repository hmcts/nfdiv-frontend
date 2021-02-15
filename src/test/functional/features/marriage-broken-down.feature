Feature: Marriage Broken Down

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I see the divorce homepage
    And I go to '/screening-questions/has-relationship-broken'

  Scenario: Error when missing a required field
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Selecting option for exit page
    Given I select "No, my marriage has not irretrievably broken down"
    Then the page should include "This is the law in England and Wales."
    When I click "Continue"
    Then the page should include "You cannot apply to get a divorce"

  Scenario: Successfully completing the form
    Given I select "Yes, my marriage has irretrievably broken down"
    When I click "Continue"
    Then the page should include "When did you get married?"
