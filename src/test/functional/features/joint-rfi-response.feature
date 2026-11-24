Feature: Joint request for information

  Background: Logged in for hub page
    Given I create a new applicant "1" user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Then I go to "CHECK_ANSWERS_URL"
    And I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Then I login as applicant "2" and link to the case

    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    Then I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"
    And I confirm the prayer and statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"
    And I set the case state to "Submitted"

  Scenario: Applicant 1 joint rfi journey
    Given a case worker issues a request for information to app1 on a joint case
    Then I login as applicant "2" and expect hub element "#partnerLine1"

    Given I login as applicant "1" and expect hub element "#informationRequestedLine1"
    Then I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"

    Given I provide the requested information
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#respondedToRfiLine1"

    Given a case worker issues a request for information to app1 on a joint case
    Then I login as applicant "2" and expect hub element "#partnerLine1"

    Given I login as applicant "1" and expect hub element "#informationRequestedLine1"
    Then I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#awaitingRequestedInformationLine1"

    Given a case worker issues a request for information to both parties on a joint case
    Then I login as applicant "1" and expect hub element "#informationRequestedLine1"

    Given I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"
    And I provide the requested information
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#respondedToRfiLine1"

    Then I login as applicant "2" and expect hub element "#respondedToRfiLine1"

    Given a case worker issues a request for information to both parties on a joint case
    Then I login as applicant "1" and expect hub element "#informationRequestedLine1"

    Given I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"
    And I cannot upload some or all of my documents
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#awaitingRequestedInformationLine1"

    Then I login as applicant "2" and expect hub element "#awaitingRequestedInformationLine1"

    Given a case worker issues a request for information to a third party on a joint case
    Then I login as applicant "1" and expect hub element "#otherLine1"

  Scenario: Applicant 2 joint rfi journey
    Given a case worker issues a request for information to app2 on a joint case
    Then I login as applicant "1" and expect hub element "#partnerLine1"

    Given I login as applicant "2" and expect hub element "#informationRequestedLine1"
    Then I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"

    Given I provide the requested information
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#respondedToRfiLine1"

    Given a case worker issues a request for information to app2 on a joint case
    Then I login as applicant "1" and expect hub element "#partnerLine1"

    Given I login as applicant "2" and expect hub element "#informationRequestedLine1"
    Then I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#awaitingRequestedInformationLine1"

    Given a case worker issues a request for information to both parties on a joint case
    Then I login as applicant "2" and expect hub element "#informationRequestedLine1"

    Given I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"
    And I provide the requested information
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Then I click submit and expect hub element "#respondedToRfiLine1"

    Given a case worker issues a request for information to both parties on a joint case
    Then I login as applicant "2" and expect hub element "#informationRequestedLine1"

    Given I click provide information and expect URL "RESPOND_TO_COURT_FEEDBACK"
    And I cannot upload some or all of my documents
    Then I click continue and expect URL "REVIEW_YOUR_RESPONSE"

    Given I click submit and expect hub element "#awaitingRequestedInformationLine1"
    Then I login as applicant "1" and expect hub element "#awaitingRequestedInformationLine1"

    Given a case worker issues a request for information to a third party on a joint case
    Then I login as applicant "2" and expect hub element "#otherLine1"
