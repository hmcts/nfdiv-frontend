Feature: Applicant middleware

  Background:
    Given I create a new user and login
    Then the page URL should be "/your-details"

  @nightly
  Scenario: Applicant 1 attempts to access an applicant 2 page
    When I go to '/applicant2/other-court-cases'
    Then the page URL should be "/error"

  @now
  Scenario: Applicant 2 attempts to access an applicant 1 page
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"
    When I go to '/other-court-cases'
    Then the page URL should be "/error"
