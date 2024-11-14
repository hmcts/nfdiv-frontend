Feature: Sole request for information

  Background: Logged in for hub page
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"

  Scenario: Applicant sole rfi journey
    Given a case worker issues a request for information
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1Sole"

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseDetails"
    And I type "Response Details"
    When I click "Continue"
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include element "#respondedToRfiLine1Sole"

  Scenario: Applicant sole rfi journey can't upload all documents
    Given a case worker issues a request for information
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#informationRequestedLine1Sole"

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include element "#respondToCourtsFeedbackTitle"

    Given I select element "#app1RfiDraftResponseCannotUploadDocs"
    When I click "Continue"
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include element "#reviewYourResponseTitle"

    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include element "#awaitingRequestedInformationLine1Sole"

  Scenario: Applicant sole rfi third party journey
    Given a case worker issues a request for information to a third party
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include element "#otherLine1Sole"
