Feature: General Application D11 journey joint applicant 1

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click send for review
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include element "#reviewYourApplicationTitle"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select element "#applicant2IConfirmPrayer"
    And I select element "#applicant2StatementOfTruth"
    When I click submit
    Then the page URL should be "/applicant2/response-submitted"
    Then I set the case state to "Submitted"

  Scenario: Pre-Issue joint application applicant1 D11 Journey help with fees
    When I sign out
    And I login with applicant "1"
    And I go to "/interim-applications/general-application/make-an-application"
    Then the page should include element "#preIssueMakeAnApplicationTitle"

    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#partnerAgreesNoHearingTitle"

    Given I click element "#yesDoesNotNeedConsent"
    When I click continue
    Then the page should include element "#applicationCostTitle"

    When I click continue
    Then the page should include element "#partnerInformationCorrectTitle"

    Given I click element "#yesDetailsCorrect"
    When I click continue
    Then the page should include element "#generalApplicationTypeTitle"

    Given I click element "#applicant1GenAppType-2"
    When I click continue
    Then the page should include element "#whyThisApplicationTitle"

    Given I select element "#applicant1GenAppReason"
    And I type "Reason for making this application"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#uploadEvidenceTitle"

    Given I click element "#applicant1InterimAppsCannotUploadDocs"
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
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click continue
    Then the page should include element "#generalApplicationSubmittedTitle"
    And the page should include "You have submitted your application"

  Scenario: Pre-Issue joint application applicant1 D11 Journey card payment
    When I sign out
    And I login with applicant "1"
    And I go to "/interim-applications/general-application/make-an-application"
    Then the page should include element "#preIssueMakeAnApplicationTitle"

    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#partnerAgreesNoHearingTitle"

    Given I click element "#yesDoesNotNeedConsent"
    When I click continue
    Then the page should include element "#applicationCostTitle"

    When I click continue
    Then the page should include element "#partnerInformationCorrectTitle"

    Given I click element "#yesDetailsCorrect"
    When I click continue
    Then the page should include element "#generalApplicationTypeTitle"

    Given I click element "#applicant1GenAppType-2"
    When I click continue
    Then the page should include element "#whyThisApplicationTitle"

    Given I select element "#applicant1GenAppReason"
    And I type "Reason for making this application"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourGeneralApplicationFeeTitle"

    Given I pay and submit the general application
    Then the page should include "You have submitted your application"

  Scenario: Pre-Issue joint application applicant1 D11 Journey withdraw before payment
    When I sign out
    And I login with applicant "1"
    And I go to "/interim-applications/general-application/make-an-application"
    Then the page should include element "#preIssueMakeAnApplicationTitle"

    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant1InterimAppsIUnderstand"
    When I click continue
    Then the page should include element "#partnerAgreesNoHearingTitle"

    Given I click element "#yesDoesNotNeedConsent"
    When I click continue
    Then the page should include element "#applicationCostTitle"

    When I click continue
    Then the page should include element "#partnerInformationCorrectTitle"

    Given I click element "#yesDetailsCorrect"
    When I click continue
    Then the page should include element "#generalApplicationTypeTitle"

    Given I click element "#applicant1GenAppType-2"
    When I click continue
    Then the page should include element "#whyThisApplicationTitle"

    Given I select element "#applicant1GenAppReason"
    And I type "Reason for making this application"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourGeneralApplicationFeeTitle"
    And the page should include "I want to withdraw this application"

    Given I click element "#withdrawLink"
    Then the page should include "Withdraw your application"

    When I click submit
    Then the page should include "Your application has been withdrawn"
