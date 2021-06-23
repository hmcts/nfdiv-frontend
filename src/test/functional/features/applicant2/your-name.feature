Feature: Applicant 2 Your names

  Background:
    Given I login
    When I am reviewing an application for divorce created by my wife
    Then I go to '/applicant2/enter-your-name'

  Scenario: Entering my names
    Given the page should include "Enter your name"
    And I clear the form
    When I select "Your first name"
    And I type "My first name"
    And I select "Your last name"
    And I type "My last-name"
    And I click "Continue"
    And the page should include "Check your answers"

  @nightly
  Scenario: Error when entering a number in the your name field
    Given I clear the form
    When I select "Your first name"
    And I type "My first name!"
    And I select "Your last name"
    And I type "My last-name1"
    And I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter your name using letters only."

  @nightly
  Scenario: Error when not entering my name name
    Given I clear the form
    When I click "Continue"
    Then the page should include "You have not entered your first name."
