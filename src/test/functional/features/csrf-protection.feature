Feature: CSRF protection

  Background:
    Given I create a new applicant "1" user and login
    Given I want to divorce my husband
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

  Scenario: They submit the form with a valid CSRF token
    Given I confirm my marriage has broken down irretrievably
    Then I click continue and expect URL "RELATIONSHIP_DATE_URL"

  Scenario: They submit the form with an invalid CSRF token
    Given I confirm my marriage has broken down irretrievably
    And I use an invalid CSRF token
    Then I click continue and the request should redirect to the CSRF error page

