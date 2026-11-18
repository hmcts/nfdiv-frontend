Feature: Joint hub page co partner offline

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

    Given I set the case state to "Holding" and expect hub element "#applicantSubmittedContent"
    Then I confirm receipt of the application

    Given I login with applicant "1" and expect hub element "#applicantSubmittedContent"
    Then I confirm receipt of the application
    And I set the case state to "AwaitingConditionalOrder"

  Scenario: Joint hub both applicants apply for co page when partner is offline
    Given a superuser updates "applicant2Offline" with "Yes"
    Then I login with applicant "1" and expect hub element "#applicantNotYetAppliedForConditionalOrderContent"
    And the page should include element "#partnerIsOfflineContent"
    And the page should not include element "#applyForConditionalOrderButton"

    Given a superuser updates "applicant1Offline" with "Yes"
    And I login with applicant "2" and expect hub element "#applicantNotYetAppliedForConditionalOrderContent"
    And the page should include element "#partnerIsOfflineContent"
    And the page should not include element "#applyForConditionalOrderButton"
