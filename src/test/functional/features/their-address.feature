Feature: Their address

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/enter-their-address"
    Then the page should include "Enter your husband’s postal address"

  @nightly
  Scenario: Successfully searching for their partners UK postcode
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results
    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
    When I click "Continue"
    Then the page URL should be "/other-court-cases"
    Given I go to "/enter-their-address"
    Then the form input "Building and street" should be "102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE"
    And the form input "Town or city" should be "LONDON"
    And the form input "County" should be "CITY OF WESTMINSTER"
    And the form input "Postcode" should be "SW1H 9AJ"

  Scenario: Successfully manually entering their partners UK address
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "ZZ00 0ZZ"
    And I click "Find address"
    And the page should include "ZZ00 0ZZ"
    And the page should include "0 addresses found"
    When I click "I cannot find the address in the list"
    And I select "Building and street"
    And I type "Ministry of Justice, 102 Petty France"
    And I select "Town or city"
    And I type "London"
    And I select "Postcode"
    And I type "SW1H 9AJ"
    And I click "Continue"
    Then the page URL should be "/other-court-cases"

  Scenario: Entering their partners international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    Then the page should include "Address line 1"
    Given I select "Address line 1"
    And I type "Their line 1"
    And I select "Address line 2"
    And I type "Their line 2"
    And I select "Address line 3"
    And I type "Their line 3"
    And I select "Town or city"
    And I type "Their town"
    And I select "County, district, state or province"
    And I type "Their county"
    And I select "Postal code, zip code or area code"
    And I type "Their code"
    And I select "Country"
    And I type "Their country"
    And I click "Continue"
    Then the page URL should be "/other-court-cases"
    When I go to "/enter-their-address"
    Then the form input "Country" should be "Their country"

  @nightly
  Scenario: Not entering their partners postcode
    Given I reset the postcode lookup form
    When I click "Find address"
    Then the page should include "You have not entered your husband’s postcode. Enter their postcode before continuing."

  @nightly
  Scenario: Their partners postcode is invalid
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "not a postcode!"
    When I click "Find address"
    Then the page should include "You have not entered a valid UK postcode. Enter a valid UK postcode before continuing."

  @nightly
  Scenario: They miss a field when entering their partners UK address
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    And I click "Find address"
    And I click "I cannot find the address in the list"
    And I click "Continue"
    Then the page should include "You have not entered your husband’s building and street address. Enter their building and street address before continuing."
    And the page should include "You have not entered your husband’s town or city. Enter their town or city before continuing."
    And the page should include "You have not entered your husband’s postcode. Enter their postcode before continuing."

  @nightly
  Scenario: They haven't completed their partners international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    When I click "Continue"
    Then the page should include "You have not entered your husband’s building and street address. Enter their building and street address before continuing."
    And the page should include "You have not entered your husband’s country. Enter their country before continuing."
