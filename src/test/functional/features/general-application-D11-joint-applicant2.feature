Feature: General Application D11 journey sole respondent

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointFinalOrderCompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/response-submitted"
    And I set the case state to "Submitted"
    Then I click "Sign out"
    Given I login with applicant "2"

  Scenario: Joint Applicant 2 D11 Journey help with fees
    When I go to "/applicant2/hub-page"
    And I click element "#makeAnApplicationLink"
    Then the page should include element "#preIssueMakeAnApplicationTitle"

    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant2InterimAppsIUnderstand"
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

    Given I click element "#applicant2GenAppType-2"
    When I click continue
    Then the page should include element "#whyThisApplicationTitle"

    Given I select element "#applicant2GenAppReason"
    And I type "Reason for making this application"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#uploadEvidenceTitle"

    Given I click element "#applicant2InterimAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberInputTitle"

    Given I select element "#applicant2InterimAppsHwfRefNumber"
    And I type "HWF-A1B-23D"

    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant2InterimAppsStatementOfTruth"
    When I click continue
    Then the page should include element "#generalApplicationSubmittedTitle"
    And the page should include "You have submitted your application"

  Scenario: Joint Applicant 2 D11 Journey card payment
    When I go to "/applicant2/hub-page"
    And I click element "#makeAnApplicationLink"
    Then the page should include element "#preIssueMakeAnApplicationTitle"

    When I click start
    Then the page should include element "#interruptionTitle"

    Given I click element "#applicant2InterimAppsIUnderstand"
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

    Given I click element "#applicant2GenAppType-2"
    When I click continue
    Then the page should include element "#whyThisApplicationTitle"

    Given I select element "#applicant2GenAppReason"
    And I type "Reason for making this application"
    When I click continue
    Then the page should include element "#wantUploadEvidenceTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant2InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourGeneralApplicationFeeTitle"

    Given I pay and submit the general application
    Then the page should include "You have submitted your application"