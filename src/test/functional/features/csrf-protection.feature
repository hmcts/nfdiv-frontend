Feature: CSRF protection

  Background:
    Given I create a new user and login
    Then the page URL should be "YOUR_DETAILS_URL"
    And the page should include "Who are you applying to divorce?"
    Given I select the option "my husband"
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

  Scenario: They submit the form with a valid CSRF token
    Given I confirm my marriage has broken down irretrievably
    Then I click continue and expect URL "RELATIONSHIP_DATE_URL"

  Scenario: They submit the form with an invalid CSRF token
    Given I confirm my marriage has broken down irretrievably
    And I use an invalid CSRF token
    Then I click continue and expect URL "CSRF_TOKEN_ERROR_URL"

