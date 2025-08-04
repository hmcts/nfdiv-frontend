Feature: Deemed service journey

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

    Given I click element "#upToDate"
    When I click continue
    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I click element "#proveYes"
    When I click continue
    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: Deemed service happy path
    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#uploadEvidenceTitle"

    Given I click element "#applicant1InterimAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#howDoYouKnowDeemedTitle"

    Given I select element "#applicant1DeemedEvidenceDetails"
    And I type "Evidence Details"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourServiceFeeTitle"

    Given I pay and submit the service application
    Then the page should include "You have submitted your application"
#    Given I click element "#applicant1InterimAppsStatementOfTruth"
#    When I click submit
#    Finish this journey when payment options are added

  Scenario: Deemed service no evidence journey
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
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#whyNoEvidenceDeemedTitle"

    Given I select element "#applicant1DeemedNoEvidenceStatement"
    And I type "No Evidence"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#serviceApplicationSubmittedTitle"

  Scenario: Deemed service withdrawn application
    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#uploadEvidenceTitle"

    Given I click element "#applicant1InterimAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#howDoYouKnowDeemedTitle"

    Given I select element "#applicant1DeemedEvidenceDetails"
    And I type "Evidence Details"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourServiceFeeTitle"
    And the page should include "I want to withdraw this application"

    Given I click element "#withdrawLink"
    Then the page should include "Withdraw your service application"
    When I click submit
    Then the page should include "Service application withdrawn"
