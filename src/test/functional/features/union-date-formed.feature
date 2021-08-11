Feature: Date union formed

  Background:
    Given I login
    When I go to '/date-from-certificate'
    Then the page should include "When did you get married?"
    And I clear the form

  @nightly
  Scenario: They have not entered the date their union happened
    When I click "Continue"
    Then the page should include "You have not entered a date. Enter a date to continue."

  @nightly
  Scenario: Error when entering non numeric value
    Given I select "Day"
    And I type "!"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "abc"
    When I click "Continue"
    Then the page should include "You have entered an invalid date. Enter the date using the following format: 31 3 2002"

  @nightly
  Scenario: Error when entering future date value
    Given I enter a date 2 years ahead
    When I click "Continue"
    Then the page should include "You have entered a date that is in the future. Enter a date that is in the past before continuing."

  Scenario: Entering date less than a year
    Given I enter a date 6 months ago
    When I click "Continue"
    Then the page should include "You have not been married long enough to apply for a divorce"

  Scenario: Entering a correct date of the union
    Given I select "Day"
    And I type "1"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "2000"
    When I click "Continue"
    Then the page should include "Do you have your marriage certificate with you?"
