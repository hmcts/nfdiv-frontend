Feature: Privacy policy

  Scenario: Load privacy policy
    Given I am on the homepage
    When I click the "Privacy policy" link
    Then the page should include "Privacy policy"
