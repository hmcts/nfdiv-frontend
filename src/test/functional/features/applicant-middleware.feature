Feature: Applicant middleware

  Background:
    Given I create a new user and login
    Then the page URL should be "/your-details"


  Scenario: The applicants attempt to access the wrong page
    When I go to '/applicant2/other-court-cases'
    Then the page URL should be "/error"

    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"
    When I go to '/other-court-cases'
    Then the page URL should be "/error"
