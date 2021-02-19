Feature: Your details step

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"
    And I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
    And the page should not include "Back"

  Scenario: Successfully completing the form
    Given I select "My husband"
    And I select "We were a same-sex couple when we got married"
    When I click "Continue"
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"

  Scenario: Loading the your details for civil partnership
    Given I go to '/your-details?forceCivilMode'
    Then I expect the page title to be "End a civil partnership - Are you male or female? - GOV.UK"
    And the page should include "Are you male or female?"

  Scenario: Error when missing a required field
    Given I clear the form
    When I select "We were a same-sex couple when we got married"
    And I click "Continue"
    Then the page should include "There was a problem"
    And "We were a same-sex couple when we got married" should be ticked
