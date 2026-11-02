Feature: Applicant 1 sole application

  Background:
    Given I create a new user and login
    Then the page URL should be "YOUR_DETAILS_URL"
    And the page should not include a back link

  Scenario: They fill out a happy path applicant 1 sole journey
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

    Given I want to apply on my own
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
    When I click continue and expect URL "YOUR_CERTIFICATE_NAME"

    Given I enter my name on the certificate
    Then I click continue and expect URL "THEIR_NAME"

    Given I enter their name
    Then I click continue and expect URL "CHECK_THEIR_NAME"

    Given I select no
    Then I click continue and expect URL "THEIR_CERTIFICATE_NAME"

    Given I enter their name on the certificate
    Then I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"

    Given I agree that the court can contact me by email
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I select English
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I do not need my contact details kept private
    Then I click continue and expect URL "ENTER_YOUR_ADDRESS"

    Given I enter my address
    Then I click continue and expect URL "DO_THEY_HAVE_A_SOLICITOR"

    Given I select no
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Given I enter their email address
    Then I click continue and expect URL "DO_YOU_HAVE_ADDRESS"

    Given I select yes
    Then I click continue and expect URL "ENTER_THEIR_ADDRESS"

    Given I enter their address
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I select no
    When I click continue and expect URL "MONEY_PROPERTY"

    Given I do not need a financial order
    Then I click continue and expect URL "UPLOAD_YOUR_DOCUMENTS"

    Given I cannot upload my original marriage certificate
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Then I pay and submit and expect the application to be saved

  @nightly
  Scenario: They fill out an unhappy path applicant 1 sole journey with help with fees
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

    Given I want to apply on my own
    Then I click continue and expect URL "IN_THE_UK"

    Given I select no
    Then I click continue and expect URL "CERTIFICATE_IN_ENGLISH"

    Given I select no
    When I click continue and expect URL "CERTIFIED_TRANSLATION"

    Given I select no
    Then I click continue and expect URL "GET_CERTIFIED_TRANSLATION"
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
    Then I click continue and expect URL "THEIR_NAME"

    Given I enter their name
    Then I click continue and expect URL "CHECK_THEIR_NAME"

    Given I select no
    Then I click continue and expect URL "THEIR_CERTIFICATE_NAME"

    And I enter their name on the certificate
    Then I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"

    Given I agree that the court can contact me by email
    And I enter my phone number
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I select English
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I need my contact details kept private
    Then I click continue and expect URL "ENTER_YOUR_ADDRESS"

    Given I enter my address
    Then I click continue and expect URL "DO_THEY_HAVE_A_SOLICITOR"

    Given I select yes
    Then I click continue and expect URL "ENTER_SOLICITOR_DETAILS"

    Given I enter their solicitor's email address
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Given I go to "DO_THEY_HAVE_A_SOLICITOR"
    And I select no
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Given I enter their email address
    Then I click continue and expect URL "DO_YOU_HAVE_ADDRESS"

    Given I select yes
    Then I click continue and expect URL "ENTER_THEIR_ADDRESS"

    Given I enter their international address
    Then I click continue and expect URL "YOU_NEED_TO_SERVE"

    Given I go to "DO_YOU_HAVE_ADDRESS"
    And I select no
    Then I click continue and expect URL "NEED_TO_GET_ADDRESS"

    Given I want to apply to serve another way
    Then I click continue and expect URL "HOW_TO_APPLY_TO_SERVE"

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

    Given I confirm the prayer and statement of truth
    Then I click submit application and expect URL "APPLICATION_SUBMITTED"
