Feature: Applicant 2 Details other proceedings

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/details-other-proceedings'
    Then the page should include "Details of the other legal proceedings"

  @nightly
  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Form is filled in
    Given I select "Provide details about the other legal proceedings"
    And I type "These are the court case details"
    When I click "Continue"
    Then the page URL should be "/applicant2/dividing-money-property"
