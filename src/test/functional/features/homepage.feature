Feature: Homepage

  Scenario: Load Homepage
    Given I am on the homepage
    Then I expect the page header to be "Divorce - GOV.UK"
    When I click the "Cymraeg" link
    Then the page should include "Mae hwn yn wasanaeth newydd"
    When I click the "English" link
    Then the page should include "This is a new service"
