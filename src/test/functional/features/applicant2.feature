Feature: Applicant 2 joint application journey

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"

  Scenario: They fill out a happy path applicant 2 joint application journey
    When I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    Given I enter my valid case reference and valid access code
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I confirm my marriage has broken down irretrievably
    Then I click continue and expect URL "ENTER_YOUR_NAME"

    Given I enter my name
    Then I click continue and expect URL "CHECK_YOUR_NAME"

    Given I select no
    Then I click continue and expect URL "YOUR_CERTIFICATE_NAME"

    Given I enter my name on the certificate
    Then I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"

    Given I agree that the court can contact me by email
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I select English
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I do not need my contact details kept private
    Then I click continue and expect URL "ENTER_YOUR_ADDRESS"

    Given I enter my address
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I select no
    Then I click continue and expect URL "MONEY_PROPERTY"

    Given I do not need a financial order
    Then I click continue and expect URL "CHECK_JOINT_APPLICATION"

    Given I confirm the information my partner provided is correct
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Then I click continue and expect URL "CONFIRM_JOINT_APPLICATION"

    Given I confirm the prayer and statement of truth
    Then I click continue and expect URL "RESPONSE_SUBMITTED"

    Given I login with applicant "1" and expect URL "CONFIRM_JOINT_APPLICATION"

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_AND_SUBMIT"

    Given I click check your answers
    Then I click back and expect URL "PAY_AND_SUBMIT"

    Then I pay and submit the joint application

    Then I login with applicant "2" and expect hub element "#awaitingDocumentsTitle"

  @nightly
  Scenario: They fill out an unhappy path applicant 2 joint application journey with help with fees
    When I go to "HELP_WITH_YOUR_FEE_URL"

    Given I select yes
    Then I click continue and expect URL "HELP_PAYING_HAVE_YOU_APPLIED"

    Given I select yes
    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Given I enter my HWF reference number
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_APPLY"

    When I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    Given I enter my valid case reference and valid access code
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I confirm my marriage has broken down irretrievably
    Then I click continue and expect URL "HELP_WITH_YOUR_FEE_URL"

    Given I select no
    Then I click continue and expect URL "ENTER_YOUR_NAME"

    When I click back and expect URL "HELP_WITH_YOUR_FEE_URL"
    Given I select yes
    Then I click continue and expect URL "HELP_PAYING_HAVE_YOU_APPLIED"

    Given I select no
    Then I click continue and expect URL "HELP_PAYING_NEED_TO_APPLY"

    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Given I enter my HWF reference number
    Then I click continue and expect URL "ENTER_YOUR_NAME"

    Given I enter my name
    Then I click continue and expect URL "CHECK_YOUR_NAME"

    Given I select no
    Then I click continue and expect URL "YOUR_CERTIFICATE_NAME"

    Given I enter my name on the certificate
    Then I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"

    Given I agree that the court can contact me by email
    And I enter my phone number
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I select English
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I need my contact details kept private
    Then I click continue and expect URL "ENTER_YOUR_ADDRESS"

    Given I enter my address
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I select yes
    Then I click continue and expect URL "DETAILS_OTHER_PROCEEDINGS"

    Given I enter details of the other proceedings
    Then I click continue and expect URL "MONEY_PROPERTY"

    Given I select yes
    Then I click continue and expect URL "WHO_IS_THE_FINANCIAL_ORDER_FOR"

    Given I need a financial order for myself
    Then I click continue and expect URL "CHECK_JOINT_APPLICATION"

    Given I deny the information my partner provided is correct
    And I explain what is incorrect or needs changing
    Then I click continue and expect URL "YOUR_COMMENTS_SENT"

  @nightly
  Scenario: They end the joint application
    When I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    Given I enter my valid case reference and valid access code
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given my marriage has not broken down irretrievably
    Then I click continue and expect URL "YOU_CANNOT_APPLY"

    Then I click end the joint application and expect URL "NOT_CONFIRMED_JOINT_APPLICATION"

    Then I login with applicant "1" and expect URL "APPLICATION_ENDED"

  @flaky
  Scenario: Applicant 2 upload larry-the-cat
    When I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I enter my valid case reference and valid access code
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    When I go to "APPLICANT_2" / "UPLOAD_YOUR_DOCUMENTS"
    Given I upload the file "fixtures/larry-the-cat.jpg"
    Then I delete the file "larry-the-cat.jpg"
    And I clear the form
    And I cannot upload my name change proof
    Then I click continue and expect URL "CHECK_JOINT_APPLICATION"
