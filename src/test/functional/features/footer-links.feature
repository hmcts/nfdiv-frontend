Feature: Privacy policy

  Scenario: Load privacy policy
    Given I am on the Divorce homepage
    When I can select the privacy policy link in the footer
    Then I expect the page title to be "Privacy policy"
