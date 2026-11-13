Feature: Alternative service journey pre-issue

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "completeCase"
    Then I set the case state to "AwaitingDocuments"
    When I sign out
    And I login with applicant "1"
    And I go to "/interim-applications/no-respondent-address/progress-without-address"
    Then the page should include element "#progressWithoutAddressTitle"

    When I click continue
    Then the page should include element "#haveYouFoundAddressTitle"

    Given I click element "#no"
    And I click continue
    Then the page should include element "#haveDifferentWayToContactTitle"

    Given I click element "#yes"
    And I click continue
    Then the page should include element "#willApplyToSendPapersTitle"

    Given I click element "#yes"
    And I click continue
    Then the page should include element "#alternativeServiceApplicationTitle"

  Scenario: Alternative service happy path pre-issue
    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
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
    Then the page should include element "#payYourServiceFeeTitle"

    Given I pay and submit the service application
    Then the page should include "You have submitted your application"

  Scenario: Alternative service HWF happy path pre-issue
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
