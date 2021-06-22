Feature: Your address

  Background:
    Given I login
    And I've said I'm applying as a sole application
    When I go to "/enter-your-address"
    Then the page should include "Enter your postal address"

  Scenario: Successfully searching for a UK postcode
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1A 1AA"
    When I click "Find address"
    Then the page should include "SW1A 1AA"
    And I wait for the postcode lookup to return results
    Given I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    When I click "Continue"
    Then the page URL should be "/their-email-address"
    Given I go to "/enter-your-address"
    Then the form input "Building and street" should be "BUCKINGHAM PALACE"
    And the form input "Town or city" should be "LONDON"
    And the form input "County" should be "CITY OF WESTMINSTER"
    And the form input "Postcode" should be "SW1A 1AA"

  Scenario: Successfully manually entering a UK address
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "ZZ00 0ZZ"
    And I click "Find address"
    And the page should include "ZZ00 0ZZ"
    And the page should include "0 addresses found"
    When I click "I cannot find the address in the list"
    And I select "Building and street"
    And I type "Buckingham Palace"
    And I select "Town or city"
    And I type "London"
    And I select "Postcode"
    And I type "SW1A 1AA"
    And I click "Continue"
    Then the page URL should be "/their-email-address"

  Scenario: Successfully entering an international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    Then the page should include "Address line 1"
    Given I select "Address line 1"
    And I type "Example line 1"
    And I select "Address line 2"
    And I type "Example line 2"
    And I select "Address line 3"
    And I type "Example line 3"
    And I select "Town or city"
    And I type "Example town"
    And I select "County, district, state or province"
    And I type "Example county"
    And I select "Postal code, zip code or area code"
    And I type "Example code"
    And I select "Country"
    And I type "Example country"
    And I click "Continue"
    Then the page URL should be "/their-email-address"
    When I go to "/enter-your-address"
    Then the form input "Country" should be "Example country"

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
    And I click "I cannot find the address in the list"
    And I click "Continue"
    Then the page should include "You have not entered your building and street address. Enter your building and street address before continuing."
    And the page should include "You have not entered your town or city. Enter your town or city before continuing."
    And the page should include "You have not entered your postcode. Enter your postcode before continuing."

  @nightly
  Scenario: Error when missing a required international address field
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    When I click "Continue"
    Then the page should include "You have not entered your building and street address. Enter your building and street address before continuing."
    And the page should include "You have not entered your country. Enter your country before continuing."

