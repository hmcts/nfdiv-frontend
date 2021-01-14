Feature: Footer Links

  Scenario: Load Terms and Conditions Page
    Given I am on the homepage
    Then I expect the page header to be "Divorce - GOV.UK"
    When I click the "Terms and conditions" link
    Then the page should include "Terms and conditions"
