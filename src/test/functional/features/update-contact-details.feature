Feature: Update contact details
  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"

  Scenario: Applicant 1 updates contact details
    Given I set the case state to "Holding"
    And I go to "/"
    Then the page URL should be "/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
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

  Scenario: Applicant 2 updates contact details
    Given I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    And I set the case state to "Holding"
    And I go to "/"
    Then the page URL should be "/applicant2/hub-page"
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

