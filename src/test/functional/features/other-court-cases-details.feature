Feature: Other court cases details

Background:
  Given I login
  When I go to '/other-court-cases-details'
  Then the page should include "Details of the other legal proceedings"

  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Form is filled in
    Given I select "Provide details about the other legal proceedings."
    And I type "These are the court case details"
    When I click "Continue"
    Then the page URL should be "/dividing-money-property"