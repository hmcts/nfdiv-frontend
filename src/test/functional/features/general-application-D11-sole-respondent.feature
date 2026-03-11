Feature: General Application D11 journey sole respondent

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application saved"
    Given a case worker issues the application

    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    And the page should not include element "#makeAnApplicationLink"

    Given I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    And the page should include "Review the divorce application"

    Given I select "I have read the application for divorce"
    When I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    And the page should include "How do you want to respond to the application?"
    Given I select "Continue without disputing the divorce"

    When I click "Continue"
    Then the page URL should be "legal-jurisdiction-of-the-courts"
    And the page should include "The legal power (jurisdiction) of the courts"
    Given I select "Yes, I agree the courts have jurisdiction"
    When I click "Continue"

    Then the page URL should be "/respondent/intend-to-delay"
    And the page should include "Do you intend to ask the court to delay the divorce until it is satisfied with your financial situation?"
    Given I select "No"
    When I click "Continue"

    Then the page URL should be "/respondent/other-court-cases"
    And the page should include "Other court cases relating to this marriage"
    Given I select "No"

    When I click "Continue"
    Then the page URL should be "respondent/how-the-court-will-contact-you"
    And the page should include "How the court will contact you"
    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."

    When I click "Continue"
    Then the page URL should be "/respondent/english-or-welsh"
    And the page should include "What language do you want to receive emails and documents in?"
    Given I select "English"

    When I click "Continue"
    Then the page URL should be "/respondent/check-your-answers"
    And the page should include "Check your answers"
    Given I select "I confirm that:"

    When I click "Submit"
    Then the page URL should be "/respondent/response-submitted"

  Scenario: Pre-Issue application respondent D11 Journey help with fees
    Given I go to "/respondent/hub-page"
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

  Scenario: Pre-Issue respondent D11 Journey card payment
    Given I go to "/respondent/hub-page"
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