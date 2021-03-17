Feature: Names on Certificate

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/your-names-on-certificate"
    Then the page should include "Your names on your marriage certificate"

  Scenario: Submitting Form
    Given I clear the form
    And I select "Copy your full name from the marriage certificate"
    And I type "Firstname Lastname"
    And I select "Copy your husband full name from the marriage certificate "
    And I type "Husbands name"
    And I click "Continue"
    Then the page should include "Check your answers so far"

  Scenario: Error when entering a number in the fields
    Given I clear the form
    And I select "Copy your full name from the marriage certificate"
    And I type "Firstname Lastname1"
    And I select "Copy your husband full name from the marriage certificate "
    And I type "Husbands name1"
    And I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter your name using letters only."

  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "You have not entered anything. Enter your full name as it appears on your marriage certificate."
