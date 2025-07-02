Feature: Alternative service journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"

    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#haveTheyReceivedTitle"
    And the page should include element "#detailsProvided"

    Given I click element "#notKnown"
    When I click continue
    Then the page should include element "#noNewContactDetailsTitle"

    Given I click element "#alternativeService"
    When I click continue
    Then the page should include element "#alternativeServiceApplicationTitle"

  Scenario: Alternative service happy path
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
    And I type "HWF-A1B-23D"
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

    Given I click element "#applicant1InterimAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#whyApplyThisWayTitle"
    And the page should include "You should also explain why you are not able to upload evidence"

    Given I select element "#applicant1AltServiceMethodJustification"
    And I type "More Details"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    #    Given I click element "#applicant1InterimAppsStatementOfTruth
    #    When I click submit
    #    Finish this journey when payment options are added
