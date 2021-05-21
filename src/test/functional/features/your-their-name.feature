Feature: Your and their names

  Background:
    Given I login

  Scenario: Entering your and their names
    Given I've said I'm divorcing my husband
    And I go to "/enter-your-name"
    And the page should include "Enter your name"
    And I clear the form
    When I select "Your first name"
    And I type "My first name"
    And I select "Your last name"
    And I type "My last-name"
    And I click "Continue"
    And the page should include "Enter your husband’s name"
    And I clear the form
    When I select "Your husband’s first name"
    And I type "Their first name"
    And I select "Your husband’s middle name"
    And I type "Their middle-name"
    And I select "Your husband’s last name"
    And I type "Their last-name"
    And I click "Continue"
    Then the page should include "Your names on your marriage certificate"

  Scenario: Entering your name for a join application
    Given I've said I'm appling as a joint application
    And I go to "/enter-your-name"
    And the page should include "Enter your name"
    And I clear the form
    When I select "Your first name"
    And I type "My first name"
    And I select "Your last name"
    And I type "My last-name"
    And I click "Continue"
    Then the page should include "Your names on your marriage certificate"

  @nightly
  Scenario: Error when entering a number in the your name field
    Given I go to "/enter-your-name"
    Given I clear the form
    When I select "Your first name"
    And I type "My first name!"
    And I select "Your last name"
    And I type "My last-name1"
    And I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter your name using letters only."

  @nightly
  Scenario: Error when not entering their name
    Given I go to "/enter-your-name"
    Given I clear the form
    And I click "Continue"
    Then the page should include "You have not entered your first name."
