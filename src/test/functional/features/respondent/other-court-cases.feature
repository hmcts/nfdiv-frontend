Feature: Respondent other court cases

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I set the case state to "AwaitingAos"
    When I go to '/respondent/other-court-cases'
    Then the page should include "Other court cases"

  @nightly
  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They don't have any other court cases
    Given I select "No"
    When I click "Continue"
    Then the page URL should be "/how-the-court-will-contact-you"

  Scenario: They do have other court cases
    Given I select "Yes"
    Given I select "Marriage"
    Given I select "Property"
    When I click "Continue"
    Then the page URL should be "/respondent/details-other-proceedings"
    Given I select "Provide details about the other legal proceedings"
    And I type "These are the court case details"
    When I click "Continue"
    Then the page URL should be "/respondent/how-the-court-will-contact-you"
