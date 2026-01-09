Feature: Joint hub page

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "/"
    When I click send for review
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

  Scenario: Joint hub applicant 1 and applicant 2 pages
    Given I set the case state to "Holding"
    And I go to "/"
    Then the page should include element "#applicantSubmittedContent"
    When I click element "#confirmReceiptButton"
    Then the page should include element "#applicantConfirmedReceiptContent"
    And the page should not include element "#confirmReceiptButton"

    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include element "#applicantSubmittedContent"
    When I click element "#confirmReceiptButton"
    Then the page should include element "#applicantConfirmedReceiptContent"
    And the page should not include element "#confirmReceiptButton"

    Given I set the case state to "AwaitingConditionalOrder"
    When I go to "/"
    Then the page should include element "#applicantNotYetAppliedForConditionalOrderContent"
    And the page should not include element "#partnerIsOfflineContent"
    When I click element "#applyForConditionalOrderButton"
    Then the page URL should be "/continue-with-your-application"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include element "#applicantNotYetAppliedForConditionalOrderContent"
    And the page should not include element "#partnerIsOfflineContent"
    When I click element "#applyForConditionalOrderButton"
    Then the page URL should be "/continue-with-your-application"

    Given I set the case state to "ConditionalOrderPronounced"
    When I go to "/"
    Then the page should include element "#conditionalOrderPronouncedContent"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include element "#conditionalOrderPronouncedContent"

    Given I set the case state to "AwaitingPronouncement"
    Then the page should include element "#awaitingLegalAdvisorReferralContent"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include element "#awaitingLegalAdvisorReferralContent"

  Scenario: Joint hub applicant 1 and applicant 2 pages, Part two
    Given I set the case state to "AwaitingPronouncement"
    And a case worker updates court case hearing
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 10 November 2021 at 12:00AM."
    And the page should include element "#certificateOfEntitlementLink"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 10 November 2021 at 12:00AM."
    And the page should include element "#certificateOfEntitlementLink"

    Given I set the case state to "AwaitingClarification"
    Then the page should include element "#awaitingClarificationContent"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include element "#awaitingClarificationContent"

    Given I set the case state to "AwaitingFinalOrder"
    And I go to "/"
    Then the page should include element "#awaitingFinalOrderContent"
    And the page should include element "#applyForFinalOrderButton"

    Given I set the case state to "AwaitingJointFinalOrder"
    And I go to "/"
    Then the page should include element "#awaitingFinalOrderContent"
    And the page should include element "#applyForFinalOrderButton"

    Given I set the case state to "FinalOrderRequested"
    And I go to "/"
    Then the page should include element "#finalOrderRequestedContent"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include element "#finalOrderRequestedContent"

  @nightly
  Scenario: Joint hub applicant 1 and applicant 2 submitted documents
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include element "#provideInformationToTheCourtUploadTitle"

    When I clear the form
    And I select element "#coClarificationResponses"
    And I type "test details"

    When I click continue
    Then the page URL should be "/hub-page"
    And the page should include element "#clarificationSubmittedWithDocumentsContent"

    When I click "Sign out"
    And I login with applicant "1"
    And the page should include element "#clarificationSubmittedWithDocumentsContent"

  @nightly
  Scenario: Joint hub applicant 1 and applicant 2 documents not submitted
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include element "#provideInformationToTheCourtUploadTitle"

    And I select element "#coCannotUploadClarificationDocuments"
    When I click continue
    And the page should include element "#clarificationSubmittedWithoutDocumentsContent"

    When I click "Sign out"
    And I login with applicant "1"
    And the page should include element "#clarificationSubmittedWithoutDocumentsContent"

