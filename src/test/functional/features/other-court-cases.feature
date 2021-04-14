Feature: Other court cases

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to '/other-court-cases'
    Then the page should include "Other court cases"

  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Successfully completing the form with No option
    Given I select "No"
    When I click "Continue"
    Then the page URL should be "/money-property"

  Scenario: Successfully completing the form with Yes option
    Given I select "Yes"
    Given I select "Our marriage"
    Given I select "Our property"
    When I click "Continue"
    Then the page URL should be "/other-court-cases-details"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    When I select "Yes"
    And I click "Continue"
    Then the page should include "There was a problem"
