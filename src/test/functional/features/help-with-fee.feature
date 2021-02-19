Feature: Help with fee

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I go to '/help-with-your-fee'
    And the page should include "Do you need help paying the fee for your divorce?"

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

  Scenario: Error when missing required reference number
    Given I go to '/have-you-applied-for-help-with-fees'
    And I clear the form
    When I select "Yes"
    When I click "Continue"
    Then the page should include "There was a problem"
    And I clear the form
    When I select "Yes"
    When I select "Enter your Help with Fees reference number"
    And I type "invalid"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Successfully completing the form with a reference number
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    And I select "Yes"
    And I select "Enter your Help with Fees reference number"
    And I type "HWF-ABC-123"
    When I click "Continue"
    Then the page should include "Check your answers"

  Scenario: Successfully completing the form
    Given I select "I do not need help paying the fee"
    When I click "Continue"
    Then the page should include "Check your answers"
