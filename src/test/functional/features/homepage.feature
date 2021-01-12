Feature: Homepage

  Scenario: Load Homepage
    Given I am on Divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with my authenticated credentials "hmcts.nfdiv@gmail.com" "Pa55word11"
    And click the Sign In button
    Then I expect the page header to be "Divorce - GOV.UK"
