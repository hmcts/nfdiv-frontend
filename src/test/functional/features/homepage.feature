Feature: Homepage

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And click the Sign In button
    And I see the divorce homepage

  Scenario: Load divorce homepage
    Then I expect the page header to be "Divorce - GOV.UK"
    When I click the "Cymraeg" link
    Then the page should include "Mae hwn yn wasanaeth newydd"
    When I click the "English" link
    Then the page should include "This is a new service"

  Scenario: Load civil partnership homepage
    When I am on civil partnership homepage
    Then I expect the page header to be "Civil partnership - GOV.UK"

  Scenario: Sign out
    When I am on civil partnership homepage
    When I click the "Sign Out" link
    Then I am on the admin portal sign in page
