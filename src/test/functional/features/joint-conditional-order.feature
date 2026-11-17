Feature: Joint conditional order

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "HOME_URL"
    And I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    Given I enter my valid case reference and valid access code
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    Then I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"

    Given I confirm the prayer and statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"

  Scenario: Applicant 1 is first in time applicant for conditional order journey
    Given I progress the case to AwaitingConditionalOrder and login as applicant "1"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"
    And the page should not include a back link

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"

    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect hub element "#jointCoPendingBeforeDueDateLine1"

    Then I sign out then login with applicant "2" and expect URL "HUB_PAGE"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"

    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect hub element "#awaitingLegalAdvisorReferralLine1"

  @nightly
  Scenario: Applicant 2 is first in time applicant for conditional order journey and responds with additional information
    Given I progress the case to AwaitingConditionalOrder and login as applicant "2"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"
    And the page should not include a back link

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"

    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect hub element "#jointCoPendingBeforeDueDateLine1"

    Then I sign out then login with applicant "1" and expect hub element "#applicantNotYetAppliedForConditionalOrderContent"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"

    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect hub element "#awaitingLegalAdvisorReferralLine1"

    Given I set the case state to "AwaitingClarification" and login as applicant "2"

    When I go to "APPLICANT_2" / "PROVIDE_INFORMATION_TO_THE_COURT"
    Then the page should include element "#provideInformationToTheCourtUploadTitle"
    And I clear the form

    Given I provide additional details
    And I cannot upload some or all of my documents
    Then the page should include element "#cannotUploadYouCanPostConditional"

    Then I click continue and expect hub element "#clarificationSubmittedWithoutDocumentsContent"

  @flaky
  Scenario: Applicant 2 responds with additional information and uploads for conditional order journey
    Given I set the case state to "AwaitingClarification" and login as applicant "2"
    When I go to "APPLICANT_2" / "PROVIDE_INFORMATION_TO_THE_COURT"
    Then the page should include element "#provideInformationToTheCourtUploadTitle"
    And I clear the form

    Given I provide additional details
    Then I upload the file "fixtures/larry-the-cat.jpg"

    Then I click continue and expect hub element "#clarificationSubmittedWithDocumentsContent"
