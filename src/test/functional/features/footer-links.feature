Feature: Footer Links

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with my authenticated credentials "hmcts.nfdiv@gmail.com" "Pa55word11"
    And click the Sign In button
    Then I expect the page header to be "Divorce - GOV.UK"

  Scenario: Load Cookies Page
    When I click the "Cookies" link
    Then the page should include "Cookies"
