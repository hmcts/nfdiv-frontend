Feature: Joint hub page applied first

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1AppliedFirstCompleteCase"
    Given I go to "HOME_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

  Scenario: Joint hub applicant 1 and applicant 2 applied first
    Given I set the case state to "AwaitingFinalOrder" and expect hub element "#hasAppliedForFinalOrderContent"
    Then I sign out then login with applicant "1" and expect hub element "#hasAppliedForFinalOrderContent"
