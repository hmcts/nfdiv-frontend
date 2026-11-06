Feature: Alternative service journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "HUB_PAGE"
    And the page should include element "#aosAwaitingLine1"
#    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "HUB_PAGE"
    Then the page should include element "#aosDueAndDraftedLine1"

    Then I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#haveTheyReceivedTitle"
#    And the page should include element "#detailsProvided"

    Given I don't know my partner's contact details
    Then I click continue and expect URL "NO_NEW_ADDRESS"
#    Then the page should include element "#noNewContactDetailsTitle"

    Given I select alternative service
    Then I click continue and expect URL "ALTERNATIVE_SERVICE_APPLICATION"
#    Then the page should include element "#alternativeServiceApplicationTitle"

  Scenario: Alternative service happy path
    Given I click start and expect URL "ALTERNATIVE_INTERRUPTION"
#    Then the page should include element "#interruptionTitle"

    Given I confirm I understand
    Then I click continue and expect URL "HELP_WITH_FEES_ALTERNATIVE"
#    Then the page should include element "#helpWithFeesTitle"

    Given I select no
    Then I click continue and expect URL "ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS"
#    Then the page should include element "#whyAlternativeServiceTitle"

    Given I enter my alternative service reason
#    Given I select element "#applicant1AltServiceReasonForApplying"
#    And I type "Alternative service reason"
    Then I click continue and expect URL "ALTERNATIVE_SENDING_PAPERS_TO_PARTNER"
#    Then the page should include element "#alternativeSendingPapersTitle"

    Given I want to send papers in a different way
    Then I click continue and expect URL "ALTERNATIVE_HOW_TO_SERVE"
#    Then the page should include element "#alternativeHowToServeTitle"

    Given I want to serve by phone
#    Given I select element "#applicant1AltServiceDifferentWays"
#    And I select element "#applicant1AltServicePartnerPhone"
#    And I type "01234567890"
    Then I click continue and expect URL "WANT_UPLOAD_EVIDENCE_ALTERNATIVE"
#    Then the page should include element "#wantUploadEvidenceTitle"

    Given I select yes
    Then I click continue and expect URL "UPLOAD_EVIDENCE_ALTERNATIVE"
#    Then the page should include element "#uploadEvidenceTitle"

    Given I cannot upload some or all of my documents
#    Given I click element "#applicant1InterimAppsCannotUploadDocs"
    Then I click continue and expect URL "ALTERNATIVE_WHY_APPLY_THIS_WAY"
    And the page should not include element "#unableToUploadLine1"
#    Then the page should include element "#whyApplyThisWayTitle"
#    And the page should not include "You should also explain why you are not able to upload evidence"

    Given I enter more details
#    Given I select element "#applicant1AltServiceMethodJustification"
#    And I type "More Details"
    Then I click continue and expect URL "CHECK_ANSWERS_ALTERNATIVE"
#    Then the page should include element "#checkAnswersTitle"

    Given I confirm the statement of truth
#    Given I click element "#applicant1InterimAppsStatementOfTruth"
    Then I click submit and expect URL "PAY_YOUR_SERVICE_FEE"
#    Then the page should include element "#payYourServiceFeeTitle"

    Then I pay and submit the service application
#    Then the page should include "You have submitted your application"

  Scenario: Alternative service HWF happy path
    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberInputTitle"

    Given I select element "#applicant1InterimAppsHwfRefNumber"
    And I type "HWF-A1B-236"
    When I click continue
    Then the page should include element "#whyAlternativeServiceTitle"

    Given I select element "#applicant1AltServiceReasonForApplying"
    And I type "Alternative service reason"
    When I click continue
    Then the page should include element "#alternativeSendingPapersTitle"

    Given I click element "#inADifferentWay"
    When I click continue
    Then the page should include element "#alternativeHowToServeTitle"

    Given I select element "#applicant1AltServiceDifferentWays"
    And I select element "#applicant1AltServicePartnerPhone"
    And I type "01234567890"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#uploadEvidenceTitle"

    Given I click element "#applicant1InterimAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#whyApplyThisWayTitle"
    And the page should not include "You should also explain why you are not able to upload evidence"

    Given I select element "#applicant1AltServiceMethodJustification"
    And I type "More Details"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#serviceApplicationSubmittedTitle"
