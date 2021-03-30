Feature: Your address

  Background:
    Given I login
    When I go to "/enter-your-address"
    Then the page should include "Enter your postal address"

  Scenario: Successfully entering a UK postcode
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1A 1AA"
    When I click "Find address"
    Then the page should include "SW1A 1AA"
    And the page should include "1 address found"
    Given I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    When I click "Continue"
    Then the page should include "Check your answers"
    Given I go to "/enter-your-address"
    Then the form input "Building and street" should be "BUCKINGHAM PALACE"
    And the form input "Town or city" should be "LONDON"
    And the form input "County" should be "CITY OF WESTMINSTER"
    And the form input "Postcode" should be "SW1A 1AA"

  Scenario: Successfully entering an international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    Then the page should include "Full address"
    Given I select "Full address"
    And I type "My example international address"
    And I click "Continue"
    Then the page should include "Check your answers"
    When I go to "/enter-your-address"
    Then the form input "Full address" should be "My example international address"

  @nightly
  Scenario: Error when missing the postcode
    Given I reset the postcode lookup form
    When I click "Find address"
    Then the page should include "You have not entered your postcode. Enter your postcode before continuing."

  @nightly
  Scenario: Error when postcode is invalid
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "not a postcode!"
    When I click "Find address"
    Then the page should include "You have not entered a valid UK postcode. Enter a valid UK postcode before continuing."

  @nightly
  Scenario: Error when missing a required UK address field
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1A 1AA"
    And I click "Find address"
    And I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    And I click "Continue"
    When I go to "/enter-your-address"
    And I clear the form
    And I click "Continue"
    Then the page should include "You have not entered your building and street address. Enter your building and street address before continuing."
    And the page should include "You have not entered your town or city. Enter your town or city before continuing."
    And the page should include "You have not entered your postcode. Enter your postcode before continuing."

  @nightly
  Scenario: Error when missing a required international address field
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    When I click "Continue"
    Then the page should include "You have not entered your full address. Enter your full address before continuing."
