Feature: Update contact details
  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"

  Scenario: Applicant 1 updates contact details
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I click "Sign out"
    And I login with applicant 1
    Then the page URL should be "/hub-page"
    When I click "Review your contact details"
    Then the page should include "Review your contact details"
    When I click "Change"
    Then the page should include "Enter your postal address"
    Given I clear the form
    And I select "Building and street"
    And I type "Address 1"
    And I select "Town or city"
    And I type "LONDON"
    And I select "County"
    And I type "CITY OF WESTMINSTER"
    And I select "Postcode"
    And I type "SW1H 9AA"
    And I select "Country"
    And I type "UK"
    When I click "Continue"
    Then the page URL should be "/address-private"
    Given I clear the form
    And I select "I do not need my contact details kept private"
    When I click "Continue"
    Then the page URL should be "/check-contact-details"
    When I click "Continue"
    Then the page URL should be "/hub-page"

  Scenario: respondent updates contact details
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Review your contact details"
    Then the page should include "Review your contact details"
    When I click "Change"
    Then the page should include "Enter your postal address"
    Given I clear the form
    And I select "Building and street"
    And I type "Address 2"
    And I select "Town or city"
    And I type "LONDON"
    And I select "County"
    And I type "CITY OF WESTMINSTER"
    And I select "Postcode"
    And I type "SW1H 9AB"
    And I select "Country"
    And I type "UK"
    When I click "Continue"
    Then the page URL should be "/address-private"
    Given I clear the form
    And I select "I do not need my contact details kept private"
    When I click "Continue"
    Then the page URL should be "/check-contact-details"
    When I click "Continue"
    Then the page URL should be "/hub-page"

