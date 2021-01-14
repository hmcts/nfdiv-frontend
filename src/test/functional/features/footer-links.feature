Feature: Privacy policy

  Scenario: Load privacy policy
    Given I am on Divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with my authenticated credentials "hmcts.nfdiv@gmail.com" "Pa55word11"
    And click the Sign In button
    When I click the "Privacy policy" link
    Then the page should include "Privacy policy"
