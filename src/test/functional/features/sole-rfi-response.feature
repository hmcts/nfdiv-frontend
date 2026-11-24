Feature: Sole request for information response journey

  Background: Logged in for hub page
    Given I create a new applicant "1" user and login
    And I've already completed the form using the fixture "completeCase"
    Then I go to 'CHECK_ANSWERS_URL'
    And I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"
    And I pay and submit and expect the application to be saved
    Then a case worker issues a request for information

  Scenario: Applicant sole rfi journey
    Given I login as applicant "1" and expect hub element "#informationRequestedLine1Sole"
    Then I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"

    Given I provide the requested information
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#respondedToRfiLine1Sole"

    Given a case worker issues a request for information
    And I login as applicant "1" and expect hub element "#informationRequestedLine1Sole"
    Then I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#awaitingRequestedInformationLine1Sole"

    Given a case worker issues a request for information to a third party
    Then I login as applicant "1" and expect hub element "#otherLine1Sole"
