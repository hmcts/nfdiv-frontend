Feature: Joint hub page applied first

  Background:
    Given I create a new applicant "1" user and login
    And I've already completed the form using the fixture "jointApplicant1AppliedFirstCompleteCase"
    Given I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I login as applicant "2" and link to the case
    And a superuser updates "issueDate" with "2020-01-01"

  Scenario: Joint hub applicant 1 and applicant 2 applied first
    Given I set the case state to "AwaitingFinalOrder" and expect hub element "#hasAppliedForJointFinalOrderContent"
    Then I login as applicant "1" and expect hub element "#hasAppliedForJointFinalOrderContent"
