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

    Given I click element "#applicant1GenAppsIUnderstand"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberInputTitle"

    Given I select element "#applicant1GenAppsHwfRefNumber"
    And I type "HWF-A1B-23D"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#uploadEvidenceTitle"

    Given I click element "#applicant1GenAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#howDoYouKnowDeemedTitle"

    Given I select element "#applicant1DeemedEvidenceDetails"
    And I type "Evidence Details"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

#    Given I click element "#applicant1GenAppsStatementOfTruth"
#    When I click submit
#    Finish this journey when payment options are added

  Scenario: Deemed service no evidence journey
    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1GenAppsIUnderstand"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberInputTitle"

    Given I select element "#applicant1GenAppsHwfRefNumber"
    And I type "HWF-A1B-23D"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#whyNoEvidenceDeemedTitle"

    Given I select element "#applicant1DeemedNoEvidenceStatement"
    And I type "No Evidence"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

