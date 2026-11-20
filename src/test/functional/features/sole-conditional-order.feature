Feature: Sole conditional order journey

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    Then I go to "CHECK_ANSWERS_URL"
    And I confirm the prayer and statement of truth

    Then I click continue to payment and expect URL "PAY_YOUR_FEE"
    And I pay and submit and expect the application to be saved

    Given a case worker issues the application
    And I as respondent enter my valid case reference and valid access code
    Then I click respond to the application

    Given I have read the application for divorce
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"

    Given I've already completed the form using the fixture "respondentCompleteCase" for the respondent
    Then I go to "RESPONDENT" / "CHECK_ANSWERS_URL"
    And I confirm the statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"

  Scenario: Applicant 1 applies for conditional order
    Given I set the case state to "AwaitingConditionalOrder" then login as applicant "1" and expect hub element "#awaitingConditionalOrderContent"

    Given I click apply for conditional order and expect URL "READ_THE_RESPONSE"
    Then I click continue and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_APPLICATION"

    Given I click yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Given I confirm the statement of truth
    Then I click submit and expect hub element "#legalAdvisorReferralContent"

  Scenario: Applicant 1 applies for conditional order and provides additional information
    Given I set the case state to "AwaitingClarification" then login as applicant "1" and expect hub element "#awaitingClarificationSoleContent"
    Then I click provide information and expect URL "PROVIDE_INFORMATION_TO_THE_COURT"

    Given I clear the form
    Then I provide additional details
    And I cannot upload some or all of my documents
    Then I click continue and expect hub element "#clarificationSubmittedWithoutDocumentsContent"

    Given I login with the respondent and expect hub element "#clarificationSubmittedWithoutDocumentsContent"

  @flaky
  Scenario: Applicant 1 applies for conditional order and provides additional information with uploads
    Given I set the case state to "AwaitingClarification" then login as applicant "1" and expect hub element "#awaitingClarificationSoleContent"
    Then I click provide information and expect URL "PROVIDE_INFORMATION_TO_THE_COURT"

    Given I clear the form
    Then I provide additional details
    And I delete any previously uploaded files
    Then I upload the file "fixtures/larry-the-cat.jpg"
    And I click continue and expect hub element "#clarificationSubmittedWithDocumentsContent"

    Then I login with the respondent and expect hub element "#clarificationSubmittedWithDocumentsContent"
