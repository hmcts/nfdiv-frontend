Feature: Can use English or Welsh courts

  Background:
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section
    And I click "Continue"
    When I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    Then I click "Continue"
    And the page should include "You can use English or Welsh courts to apply for a divorce"

  Scenario: Go back
    Given I click "Back"
    Then the page should include "Check if you can get a divorce in England and Wales"
