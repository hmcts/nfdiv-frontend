Feature: Applicant 1 joint application

  Background:
    Given I create a new user and login
    Then the page URL should be "YOUR_DETAILS_URL"
    And the page should not include a back link

  Scenario: They fill out a happy path applicant 1 joint journey
    Given I want to divorce my husband
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I confirm my marriage has broken down irretrievably
    Then I click continue and expect URL "RELATIONSHIP_DATE_URL"

    Given I enter the relationship date
    Then I click continue and expect URL "CERTIFICATE_URL"

    Given I have my marriage certificate with me
    Then I click continue and expect URL "HELP_WITH_YOUR_FEE_URL"

    Given I select no
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_APPLY"

    Given I want to apply jointly
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Given I enter their email address
    Then I click continue and expect URL "IN_THE_UK"

    Given I select yes
    Then I click continue and expect URL "CHECK_JURISDICTION"

    Then I click continue and expect URL "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given we both live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"

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

    Given I select no
    Then I click continue and expect URL "UPLOAD_YOUR_DOCUMENTS"

    Given I cannot upload my original marriage certificate
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"


  @nightly
  Scenario: They fill out an unhappy path applicant 1 joint journey with help with fees
    Given I want to divorce my husband
    And we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given my marriage has not broken down irretrievably
    When I click continue and expect URL "RELATIONSHIP_NOT_BROKEN_URL"
    Then I click back and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I confirm my marriage has broken down irretrievably
    Then I click continue and expect URL "RELATIONSHIP_DATE_URL"

    Given I enter the relationship date
    Then I click continue and expect URL "CERTIFICATE_URL"

    Given I do not have my marriage certificate with me
    When I click continue and expect URL "NO_CERTIFICATE_URL"
    Then I click back and expect URL "CERTIFICATE_URL"

    Given I have my marriage certificate with me
    Then I click continue and expect URL "HELP_WITH_YOUR_FEE_URL"

    Given I select yes
    Then I click continue and expect URL "HELP_PAYING_HAVE_YOU_APPLIED"

    Given I select no
    Then I click continue and expect URL "HELP_PAYING_NEED_TO_APPLY"

    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Given I enter my HWF reference number
    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_APPLY"

    Given I want to apply jointly
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Given I select "I do not know their email address"
    When I click continue and expect URL "YOU_NEED_THEIR_EMAIL_ADDRESS"
    Then I click back and expect URL "THEIR_EMAIL_ADDRESS"

    Given I clear the form
    And I enter their email address
    Then I click continue and expect URL "IN_THE_UK"

    Given I select no
    Then I click continue and expect URL "CERTIFICATE_IN_ENGLISH"

    Given I select no
    Then I click continue and expect URL "CERTIFIED_TRANSLATION"

    Given I select no
    When I click continue and expect URL "GET_CERTIFIED_TRANSLATION"
    Then I click back and expect URL "CERTIFIED_TRANSLATION"

    Given I select yes
    Then I click continue and expect URL "COUNTRY_AND_PLACE"

    Given I enter the marriage location
    Then I click continue and expect URL "CHECK_JURISDICTION"

    Given I go to "CERTIFICATE_IN_ENGLISH"
    Then I clear the form
    And I select yes
    Then I click continue and expect URL "COUNTRY_AND_PLACE"

    Given I enter the marriage location
    Then I click continue and expect URL "CHECK_JURISDICTION"

    Then I click continue and expect URL "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given we both live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"

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

    Given I enter my international address
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I select yes
    Then I click continue and expect URL "DETAILS_OTHER_PROCEEDINGS"

    Given I enter details of the other proceedings
    Then I click continue and expect URL "MONEY_PROPERTY"

    Given I select yes
    Then I click continue and expect URL "WHO_IS_THE_FINANCIAL_ORDER_FOR"

    Given I need a financial order for myself and my children
    Then I click continue and expect URL "UPLOAD_YOUR_DOCUMENTS"

    Given I delete any previously uploaded files
    And I cannot upload my original foreign marriage certificate
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

  @flaky
  Scenario: Applicant 1 upload larry-the-cat
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "UPLOAD_YOUR_DOCUMENTS"
    Given I delete any previously uploaded files
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I delete the file "larry-the-cat.jpg"
    And I clear the form
    And I cannot upload my original marriage certificate
    Then I click continue and expect URL "CHECK_ANSWERS_URL"
