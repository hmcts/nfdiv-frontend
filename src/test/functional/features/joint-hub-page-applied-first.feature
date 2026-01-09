Feature: Joint hub page applied first

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1AppliedFirstCompleteCase"
    Given I go to "/"
    When I click send for review
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

  Scenario: Joint hub applicant 1 and applicant 2 applied first
    Given I set the case state to "AwaitingFinalOrder"
    And I go to "/"
    Then the page should include element "#hasAppliedForFinalOrderContent"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include element "#hasAppliedForFinalOrderContent"
