Feature: Footer Links

  Scenario: Load Accessibility Statement Page
    Given I am on the homepage
    Then I expect the page header to be "Divorce - GOV.UK"
    When I click the "Accessibility statement" link
    Then the page should include "Accessibility Statement"
