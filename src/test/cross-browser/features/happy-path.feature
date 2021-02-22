Feature: No fault divorce application submission

  Background:
    Given I login
    When I go to '/your-details'
    Then the page should include "Apply for a divorce"

  Scenario: Successfully submitting a no fault divorce application
    Then I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
