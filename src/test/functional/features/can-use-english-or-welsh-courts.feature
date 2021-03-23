Feature: Can use English or Welsh courts

  Background:
    Given I login
    When I go to "/jurisdiction/interstitial"
    Then the page should include "You can use the English or Welsh court"

  Scenario: Go back
    When I click "Back"
    Then the page should include "Check if you can get a divorce in England and Wales"
