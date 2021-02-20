Feature: No fault divorce application submission

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I go to '/your-details'
    And I see the divorce homepage

  Scenario: Successfully submitting a no fault divorce application
    Then I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
