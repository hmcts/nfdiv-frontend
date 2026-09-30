Feature: CSRF protection

  Background:
    Given I create a new user and login
    Then the page URL should be "/your-details"
    And the page should include "Who are you applying to divorce?"
    Given I select "My husband"
    And I click "Continue"
    Then the page should include "Has your marriage broken down irretrievably (it cannot be saved)?"

  Scenario: They submit the form with a valid CSRF token
    Given I select "I confirm my marriage has broken down irretrievably"
    When I click "Continue"
    Then the page should include "When did you get married?"

  Scenario: They submit the form with an invalid CSRF token
    Given I select "I confirm my marriage has broken down irretrievably"
    And I use an invalid CSRF token
    When I click "Continue"
    Then the page should include "Bad request"

