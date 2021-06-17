Feature: Enter your access code

  Background:
    Given I login

  Scenario: They have entered the correct case reference
    Given I have a pre-populated case
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"

  Scenario: They have entered an incorrect case reference
    Given I go to '/enter-your-access-code'
    And I clear the form
    And I select "Your reference number"
    And I type "1234123412341234"
    And I select "Your access code"
    And I type "QWERTY45"
    And I click "Continue"
    Then the page should include "You have entered the wrong reference number"

  Scenario: They have not entered their case reference
    Given I go to '/enter-your-access-code'
    And I clear the form
    And I select "Your access code"
    And I type "QWERTY45"
    And I click "Continue"
    Then the page should include "You have not entered a reference number"

  Scenario: They have not entered their access code
    Given I go to '/enter-your-access-code'
    And I clear the form
    And I select "Your reference number"
    And I type "1234123412341234"
    And I click "Continue"
    Then the page should include "You have not entered an access code"

  Scenario: They have not filled in any of the form
    Given I go to '/enter-your-access-code'
    And I clear the form
    And I click "Continue"
    Then the page should include "You have not entered"
