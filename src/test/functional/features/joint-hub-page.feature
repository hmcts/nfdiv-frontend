Feature: Joint hub page

  Background:
    Given I create a new applicant "1" user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "CHECK_ANSWERS_URL"
    Then I click send for review
    Given I login as applicant "2" and link to the case
    And a superuser updates "issueDate" with "2020-01-01"

  Scenario: Joint hub applicant 1 and applicant 2 pages
    Given I set the case state to "Holding" and expect hub element "#applicantSubmittedContent"
    Then I confirm receipt of the application

    Given I login as applicant "1" and expect hub element "#applicantSubmittedContent"
    Then I confirm receipt of the application

    Given I set the case state to "AwaitingConditionalOrder" and expect hub element "#applicantNotYetAppliedForJointConditionalOrderContent"
    And the page should not include element "#partnerIsOfflineContent"
    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Given I login as applicant "2" and expect hub element "#applicantNotYetAppliedForJointConditionalOrderContent"
    And the page should not include element "#partnerIsOfflineContent"
    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Given I set the case state to "ConditionalOrderPronounced" and expect hub element "#jointConditionalOrderPronouncedContent"
    Then I login as applicant "1" and expect hub element "#jointConditionalOrderPronouncedContent"

    Given I set the case state to "AwaitingPronouncement" and expect hub element "#awaitingLegalAdvisorReferralJointContent"
    Then I login as applicant "2" and expect hub element "#awaitingLegalAdvisorReferralJointContent"

  Scenario: Joint hub applicant 1 and applicant 2 pages, Part two
    Given I progress the case to awaiting pronouncement and expect hub element "#awaitingPronouncementJointContent"
    Then the page should include element "#certificateOfEntitlementLink"

    Given I login as applicant "2" and expect hub element "#awaitingPronouncementJointContent"
    And the page should include element "#certificateOfEntitlementLink"

    Given I set the case state to "AwaitingClarification" and expect hub element "#awaitingClarificationJointContent"
    Then I login as applicant "1" and expect hub element "#awaitingClarificationJointContent"

    Given I set the case state to "AwaitingFinalOrder" and expect hub element "#awaitingJointFinalOrderContent"
    And the page should include element "#applyForFinalOrderButton"

    Given I login as applicant "2" and expect hub element "#awaitingJointFinalOrderContent"
    And the page should include element "#applyForFinalOrderButton"

    Given I set the case state to "AwaitingJointFinalOrder" and expect hub element "#awaitingJointFinalOrderContent"
    And the page should include element "#applyForFinalOrderButton"

    Given I login as applicant "1" and expect hub element "#awaitingJointFinalOrderContent"
    And the page should include element "#applyForFinalOrderButton"

    Given I set the case state to "FinalOrderRequested" and expect hub element "#jointFinalOrderRequestedContent"
    Then I login as applicant "2" and expect hub element "#jointFinalOrderRequestedContent"

  @nightly
  Scenario: Joint hub applicant 1 and applicant 2 submitted documents
    Given I set the case state to "AwaitingClarification" and expect hub element "#awaitingClarificationJointContent"
    Then I click to provide information to the court

    Given I provide additional details
    Then I click continue and expect hub element "#clarificationSubmittedWithDocumentsContent"

    Then I login as applicant "1" and expect hub element "#clarificationSubmittedWithDocumentsContent"

  @nightly
  Scenario: Joint hub applicant 1 and applicant 2 documents not submitted
    Given I set the case state to "AwaitingClarification" and expect hub element "#awaitingClarificationJointContent"
    Then I click to provide information to the court

    Given I provide additional details
    And I cannot upload some or all of my documents
    Then I click continue and expect hub element "#clarificationSubmittedWithoutDocumentsContent"

    Then I login as applicant "1" and expect hub element "#clarificationSubmittedWithoutDocumentsContent"

