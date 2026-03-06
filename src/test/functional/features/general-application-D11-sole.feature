Feature: General Application D11 journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application saved"
    Then I set the case state to "Submitted"

  Scenario: Pre-Issue application applicant D11 Journey
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

    Given I click element "#applicant1GenAppType-5"
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

