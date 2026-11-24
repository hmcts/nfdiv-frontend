Feature: Sole hub page

  Background:
    Given I progress the case to AwaitingAos
    And I login as the respondent and link to the case

  Scenario: Sole hub applicant and respondent pages
    Given I click respond to the application
    Then I login with applicant "1" and expect hub element "#aosAwaitingLine1"

    Given I set the case to AosDrafted
    Then I set the case to AosOverdue

    Then I click to review my contact details

    Given I login with the respondent
    Then I click respond to the application

    Given I have read the application for divorce
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"

    Given I've already completed the form using the fixture "respondentCompleteCase" for the respondent
    Then I go to 'CHECK_ANSWERS_URL'
    And I confirm the statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"

    Given I set the case state to "Holding"
    Then I go to "RESPONDENT" / "HUB_PAGE" and expect element "#respondentHoldingContent"

    Then I login with applicant "1" and expect hub element "#holdingContent"

    Given a superuser updates "disputeApplication" with "Yes"
    Then I login with the respondent and expect hub element "#respondentD8AwaitingContent"

    Then I login with applicant "1" and expect hub element "#d8AwaitingContent"

    Then I set the case state to "AwaitingConditionalOrder" and expect hub element "#awaitingConditionalOrderContent"

    Given I set the case state to "AwaitingGeneralConsideration" and expect hub element "#generalApplicationReceivedSoleContent"
    Then I login with the respondent and expect hub element "#generalApplicationReceivedSoleContent"

    Given I set the case state to "AwaitingLegalAdvisorReferral" and expect hub element "#awaitingLegalAdvisorReferralRespondentContent"
    Then I login with applicant "1" and expect hub element "#awaitingLegalAdvisorReferralSoleContent"

    Given I progress the case to awaiting pronouncement and expect hub element "#awaitingPronouncementSoleContent"
    Then I login with the respondent and expect hub element "#awaitingPronouncementRespondentContent"

    Given I set the case state to "AwaitingClarification" then login as applicant "1" and expect hub element "#awaitingClarificationSoleContent"

    Given I click provide information and expect URL "PROVIDE_INFORMATION_TO_THE_COURT"
    Then I provide additional details
    And I cannot upload some or all of my documents
    Then the page should include element "#cannotUploadYouCanPostConditional"

    Then I click continue and expect hub element "#clarificationSubmittedWithoutDocumentsContent"

    Given I set the case state to "ConditionalOrderPronounced" and expect hub element "#conditionalOrderPronouncedContent"
    Then I login with the respondent and expect hub element "#conditionalOrderPronouncedRespondentContent"

    Given I set the case state to "AwaitingServiceConsideration" then login as applicant "1" and expect hub element "#awaitingServiceConsiderationOrBailiffReferralContent"

    Given I set the case state to "AwaitingBailiffReferral" and expect hub element "#awaitingServiceConsiderationOrBailiffReferralContent"

    Given I set the case state to "BailiffRefused" and expect hub element "#serviceAdminRefusalOrBailiffRefusalContent"

    Given I set the case state to "AwaitingBailiffService" and expect hub element "#awaitingBailiffServiceContent"
