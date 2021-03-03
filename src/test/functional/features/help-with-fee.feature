Feature: Help with fee

  Background:
    Given I login
    When I go to '/help-with-your-fee'
    Then the page should include "Do you need help paying the fee for your divorce?"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Selecting options for exit page
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    And I select "No"
    And I click "Continue"
    Then the page should include "You need to apply for help with your divorce fees"

  @nightly
  Scenario: Error when missing required reference number
    Given I go to '/have-you-applied-for-help-with-fees'
    And I clear the form
    When I select "Yes"
    When I click "Continue"
    Then the page should include "There was a problem"
    And I clear the form
    When I select "Yes"
    When I select "Enter your Help With Fees reference number"
    And I type "invalid"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Successfully completing the form with a reference number
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    And I clear the form
    And I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"
    When I click "Continue"
    Then the page should include "Check your answers"

  Scenario: You do not need help paying the fee
    Given I select "I do not need help paying the fee"
    When I click "Continue"
    Then the page should include "Did you get married in the UK?"
