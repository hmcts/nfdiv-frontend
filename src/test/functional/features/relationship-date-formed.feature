Feature: Relationship date formed

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I go to '/date-from-certificate'
    And the page should include "When did you get married?"
    And I clear the form

  Scenario: Error when missing a required field
    When I click "Continue"
    Then the page should include "You have not entered a date. Enter a date to continue."

  Scenario: Error when entering non numeric value
    Given I select "Day"
    And I type "!"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "abc"
    When I click "Continue"
    Then the page should include "You have entered an invalid date. Enter the date using the following format: 31 3 2002"

  Scenario: Error when entering future date value
    Given I select "Day"
    And I type "1"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "5000"
    When I click "Continue"
    Then the page should include "You have entered a date that is in the future. Enter a date that is in the past before continuing."

  Scenario: Successfully completing the form
    Given I select "Day"
    And I type "1"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "2000"
    When I click "Continue"
    Then the page should include "Do you have your marriage certificate with you?"
