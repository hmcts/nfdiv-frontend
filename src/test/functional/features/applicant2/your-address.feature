Feature: Applicant 2 Your address

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to "/applicant2/enter-your-address"
    Then the page should include "Enter your postal address"

  Scenario: Applicant 2 successfully searches for a UK postcode
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results
    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
    When I click "Continue"
    Then the page URL should be "/applicant2/other-court-cases"
    Given I go to "/applicant2/enter-your-address"
    Then the form input "Building and street" should be "102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE"
    And the form input "Town or city" should be "LONDON"
    And the form input "County" should be "CITY OF WESTMINSTER"
    And the form input "Postcode" should be "SW1H 9AJ"
