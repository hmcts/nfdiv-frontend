Feature: Homepage

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I see the divorce homepage

  Scenario: Load divorce homepage
    Then I expect the page header to be "Divorce - GOV.UK"
    When I click "Cymraeg"
    Then the page should include "Mae hwn yn wasanaeth newydd"
    When I click "English"
    Then the page should include "This is a new service"

  Scenario: Load civil partnership homepage
    When I am on civil partnership homepage
    Then I expect the page header to be "Civil partnership - GOV.UK"
    And the page should include "Are you male or female?"

  Scenario: Save and sign out
    When I click "Save and sign out"
    Then the page should include "Your application has been saved"
    And I go back to the homepage
    Then I am on the admin portal sign in page
