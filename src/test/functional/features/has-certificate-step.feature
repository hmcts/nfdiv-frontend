Feature: Certificate step

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    Then the page should include "Who are you applying to divorce?"
    And I go to '/do-you-have-your-certificate'

  Scenario: Successfully completing the form
    Given I select "Yes, I have my marriage certificate"
    When I click "Continue"
    Then the page should include "Do you need help paying the fee for your divorce?"

  Scenario: Error when missing a required field
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Exit page
    Given I select "No, I do not have marriage certificate"
    When I click "Continue"
    Then the page should include "You need your marriage certificate"
