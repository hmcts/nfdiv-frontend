Feature: Respondent journey

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    Then I go to 'CHECK_ANSWERS_URL'

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    Then a case worker issues the application

  Scenario: They fill out a happy path respondent journey
    And I as respondent enter my valid case reference and valid access code

    Given I click respond to the application
    And I have read the application for divorce
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"

    Given I do not want to dispute the application
    Then I click continue and expect URL "LEGAL_JURISDICTION_OF_THE_COURTS"

    Given I agree that the courts have jurisdiction
    Then I click continue and expect URL "INTEND_TO_DELAY"

    Given I select no
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I select no
    Then I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"

    Given I agree that the court can contact me by email
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I select English
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"

  @nightly
  Scenario: They fill out an unhappy path respondent journey
    And I as respondent enter my valid case reference and valid access code

    Given I click respond to the application
    And I have read the application for divorce
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"

    Given I want to dispute the application
    Then I click continue and expect URL "DISPUTING_THE_APPLICATION"

    Given I do not want to dispute the application
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"

    Then I click continue and expect error for field "disputeApplication"

    Given I want to dispute the application
    Then I click continue and expect URL "DISPUTING_THE_APPLICATION"

    Given I confirm that I want to dispute the application
    Then I click continue and expect URL "LEGAL_JURISDICTION_OF_THE_COURTS"

    Given I do not agree that the courts have jurisdiction
    And I explain why the courts do not have jurisdiction
    Then I click continue and expect URL "INTEND_TO_DELAY"

    Given I select no
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I select yes
    Then I click continue and expect URL "DETAILS_OTHER_PROCEEDINGS"

    Given I enter details of the other proceedings
    And I confirm that the other proceedings have been concluded
    And I cannot upload some or all of my documents
    Then I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"

    Given I agree that the court can contact me by email
    And I enter my phone number
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I select English
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"

  Scenario: They fill out a happy path respondent journey when case is in AwaitingConditionalOrder
    Given I set the case state to "AwaitingConditionalOrder"
    Then I as respondent enter my valid case reference and valid access code

    Given I click respond to the application
    And I have read the application for divorce
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"

    Given I've already completed the form using the fixture "respondentCompleteCase" for the respondent
    Then I go to "RESPONDENT" / "CHECK_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"
