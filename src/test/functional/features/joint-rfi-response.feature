Feature: Joint request for information

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click send for review
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include element "#reviewYourApplicationTitle"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select element "#applicant2IConfirmPrayer"
    And I select element "#applicant2StatementOfTruth"
    When I click submit
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"

  Scenario: [1] Applicant 1 joint rfi journey
    Given a case worker issues a request for information to app1 on a joint case
    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#partnerLine1"

    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseDetails"
    And I type "Response Details"

    Given I delete any previously uploaded files
    Then the page should include visible element "#noFilesUploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains file element "#Document1"

    When I click continue
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/hub-page"
    And the page should include element "#respondedToRfiLine1"

  Scenario: [1] Applicant 2 joint rfi journey
    Given a case worker issues a request for information to app2 on a joint case
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#partnerLine1"

    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app2RfiDraftResponseDetails"
    And I type "Response Details"

    Given I delete any previously uploaded files
    Then the page should include visible element "#noFilesUploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains file element "#Document1"

    When I click continue
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#respondedToRfiLine1"

  Scenario: [2] Applicant 1 joint rfi journey can't upload all documents
    Given a case worker issues a request for information to app1 on a joint case
    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#partnerLine1"

    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseCannotUploadDocs"
    When I click continue
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1"

  Scenario: [2] Applicant 2 joint rfi journey can't upload all documents
    Given a case worker issues a request for information to app2 on a joint case
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#partnerLine1"

    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app2RfiDraftResponseCannotUploadDocs"
    When I click continue
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1"

  Scenario: [3] Applicant 1 joint rfi journey sent to both parties
    Given a case worker issues a request for information to both parties on a joint case
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseDetails"
    And I type "Response Details"

    Given I delete any previously uploaded files
    Then the page should include visible element "#noFilesUploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains file element "#Document1"

    When I click continue
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/hub-page"
    And the page should include element "#respondedToRfiLine1"

    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#respondedToRfiLine1"

  Scenario: [3] Applicant 2 joint rfi journey sent to both parties
    Given a case worker issues a request for information to both parties on a joint case
    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app2RfiDraftResponseDetails"
    And I type "Response Details"

    Given I delete any previously uploaded files
    Then the page should include visible element "#noFilesUploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains file element "#Document1"

    When I click continue
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#respondedToRfiLine1"

    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#respondedToRfiLine1"

  Scenario: [4] Applicant 1 joint rfi journey sent to both parties can't upload all documents
    Given a case worker issues a request for information to both parties on a joint case
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseCannotUploadDocs"
    When I click continue
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1"

    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1"

  Scenario: [4] Applicant 2 joint rfi journey sent to both parties can't upload all documents
    Given a case worker issues a request for information to both parties on a joint case
    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#informationRequestedLine1"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app2RfiDraftResponseCannotUploadDocs"
    When I click continue
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1"

    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1"

  Scenario: [5] Applicant joint rfi third party journey
    Given a case worker issues a request for information to a third party on a joint case
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#otherLine1"

    When I sign out
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include element "#otherLine1"
