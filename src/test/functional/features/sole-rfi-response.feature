Feature: Sole request for information

  Background: Logged in for hub page
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click element "#applicant1IConfirmPrayer"
    And I click element "#applicant1StatementOfTruth"
    When I click continue to payment
    And I pay and submit the application
    Then the page should include element "#applicationSubmittedTitle"

  Scenario: Applicant sole rfi journey
    Given a case worker issues a request for information
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1Sole"

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
    And the page should include element "#respondedToRfiLine1Sole"

    Given a case worker issues a request for information
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1Sole"

    When I click element "#informationRequestedButton"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseCannotUploadDocs"
    When I click continue
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click submit
    Then the page URL should be "/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1Sole"

    Given a case worker issues a request for information to a third party
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#otherLine1Sole"
