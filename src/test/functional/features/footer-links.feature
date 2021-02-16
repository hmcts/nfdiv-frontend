Feature: Footer Links

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    Then I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"

  Scenario: Load Terms and Conditions Page
    When I click "Terms and conditions"
    Then the page should include "Terms and conditions"

  Scenario: Load Cookies Page
    When I click "Cookies"
    Then the page should include "Cookies"

  Scenario: Load Accessibility Statement Page
    When I click "Accessibility statement"
    Then the page should include "Accessibility Statement"
