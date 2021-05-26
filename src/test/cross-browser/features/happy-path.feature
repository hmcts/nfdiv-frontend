Feature: No fault union dissolution application submission

  Background:
    Given I login
    When I go to '/your-details'
    Then the page should include "Apply for a divorce"
    And I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
    And the page should include "Who are you applying to divorce?"

  Scenario: Successfully submitting a no fault union dissolution application
    Given I've completed all happy path questions correctly and paid
    Then the page URL should be "/application-submitted"
