Feature: Relationship date formed

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I see the divorce homepage
    And I go to '/date-from-certificate'

  Scenario: Error when missing a required field
    When I click "Continue"
    Then the page should include "You have not entered a date. Enter a date to continue."

  Scenario: Error when entering non numeric value
    Given I select "Day"
    And I enter "!"
    Given I select "Month"
    And I enter "1"
    Given I select "Year"
    And I enter "abc"
    When I click "Continue"
    Then the page should include "You have entered an invalid character. Enter the date using numbers."

  Scenario: Error when entering future date value
    Given I select "Day"
    And I enter "1"
    Given I select "Month"
    And I enter "1"
    Given I select "Year"
    And I enter "5000"
    When I click "Continue"
    Then the page should include "You have entered a date that is in the future. Enter a date that is in the past before continuing."

  Scenario: Successfully completing the form
    Given I select "Day"
    And I enter "1"
    Given I select "Month"
    And I enter "1"
    Given I select "Year"
    And I enter "2000"
    When I click "Continue"
    Then the page should include "Do you have your marriage certificate with you?"
