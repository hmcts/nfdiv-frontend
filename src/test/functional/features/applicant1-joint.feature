Feature: Applicant 1 joint application

  Background:
    Given I create a new user and login
    Then the page URL should be "YOUR_DETAILS_URL"
    And the page should not include a back link

  Scenario: They fill out a happy path applicant 1 joint journey
    Given I want to divorce my husband
    And I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"
    Given I confirm my marriage has broken down irretrievably

    When I click continue and expect URL "RELATIONSHIP_DATE_URL"
    Then I enter the relationship date

    When I click continue and expect URL "CERTIFICATE_URL"
    Given I have my marriage certificate with me

    When I click continue and expect URL "HELP_WITH_YOUR_FEE_URL"
    Then I select no

    When I click continue and expect URL "HOW_DO_YOU_WANT_TO_APPLY"
    Given I want to apply jointly

    When I click continue and expect URL "THEIR_EMAIL_ADDRESS"
    And I enter their email address

    When I click continue and expect URL "IN_THE_UK"
    Then I select yes

    When I click continue and expect URL "CHECK_JURISDICTION"

    Then I click continue and expect URL "WHERE_YOUR_LIVES_ARE_BASED_URL"
    Given we both live in England or Wales

    When I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"

    Then I click continue and expect URL "ENTER_YOUR_NAME"
    And I enter my name

    When I click continue and expect URL "CHECK_YOUR_NAME"
    Then I select no

    When I click continue and expect URL "YOUR_CERTIFICATE_NAME"
    Then I enter my name on the certificate

    When I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Given I agree that the court can contact me by email

    When I click continue and expect URL "ENGLISH_OR_WELSH"
    Then I select English

    When I click continue and expect URL "ADDRESS_PRIVATE"
    Given I do not need my contact details kept private

    When I click continue and expect URL "ENTER_YOUR_ADDRESS"
    Then I enter my address

    When I click continue and expect URL "OTHER_COURT_CASES"
    Then I select no

    When I click continue and expect URL "MONEY_PROPERTY"
    Then I select no

    When I click continue and expect URL "UPLOAD_YOUR_DOCUMENTS"
    Given I cannot upload my original marriage certificate

    When I click continue and expect URL "CHECK_ANSWERS_URL"

    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"


  @nightly
  Scenario: They fill out an unhappy path applicant 1 joint journey with help with fees
    Given I want to divorce my husband
    And we were a same-sex couple when we got married

    When I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"
    Given my marriage has not broken down irretrievably
#    Then the page should include "Your marriage must have broken down irretrievably for you to get a divorce. This is the law in England and Wales."
#    And the page should include element "#STOP"

    When I click continue and expect URL "RELATIONSHIP_NOT_BROKEN_URL"

    Then I click back and expect URL "HAS_RELATIONSHIP_BROKEN_URL"
#    Then the page URL should be "HAS_RELATIONSHIP_BROKEN_URL"
    Given I confirm my marriage has broken down irretrievably

    When I click continue and expect URL "RELATIONSHIP_DATE_URL"
#    Then the page should include "When did you get married?"
    Given I enter the relationship date
#    Given I enter a date of "1 1 2000" into the "relationshipDate" field

    When I click continue and expect URL "CERTIFICATE_URL"
#    Then the page should include "Do you have your marriage certificate with you?"
    Given I do not have my marriage certificate with me

    When I click continue and expect URL "NO_CERTIFICATE_URL"
    #Then the page should include "You need your marriage certificate"

    Then I click back and expect URL "CERTIFICATE_URL"
#    Then the page URL should be "CERTIFICATE_URL"
    Given I have my marriage certificate with me

    When I click continue and expect URL "HELP_WITH_YOUR_FEE_URL"
    #Then the page should include "Help with fees"
    Given I select yes

    When I click continue and expect URL "HELP_PAYING_HAVE_YOU_APPLIED"
#    Then the page should include "Do you have a help with fees reference number?"
    Given I select no

    Then I click continue and expect URL "HELP_PAYING_NEED_TO_APPLY"
#    Then the page should include "Apply for help with fees"

    When I click continue and expect URL "ENTER_HWF_NUMBER_URL"
#    Then the page should include "Enter your Help With Fees reference number"
    Given I enter my HWF reference number

    When I click continue and expect URL "HOW_DO_YOU_WANT_TO_APPLY"
#    Then the page should include "How do you want to apply for the divorce?"
    Given I want to apply jointly

    When I click continue and expect URL "THEIR_EMAIL_ADDRESS"
#    Then the page should include "Enter your husband's email address"
    Given I select "I do not know their email address"

    When I click continue and expect URL "YOU_NEED_THEIR_EMAIL_ADDRESS"
#    Then the page should include "You need to get their email address"

    Then I click back and expect URL "THEIR_EMAIL_ADDRESS"
#    Then the page URL should be "THEIR_EMAIL_ADDRESS"
    Given I clear the form
    And I enter their email address
#    And I select "Your husband's email address"
#    And I type "simulate-delivered@notifications.service.gov.uk"

    When I click continue and expect URL "IN_THE_UK"
#    Then the page should include "Did you get married in the UK?"
    Given I select no

    When I click continue and expect URL "CERTIFICATE_IN_ENGLISH"
#    Then the page should include "Is your original marriage certificate in English?"
    Given I select no

    When I click continue and expect URL "CERTIFIED_TRANSLATION"
#    Then the page should include "Do you have a ‘certified translation’ of your marriage certificate?"
    Given I select no

    When I click continue and expect URL "GET_CERTIFIED_TRANSLATION"
#    Then the page should include "You need to get a ‘certified translation’ of your marriage certificate"

    Then I click back and expect URL "CERTIFIED_TRANSLATION"
#    Then the page URL should be "CERTIFIED_TRANSLATION"
    Given I select yes

    When I click continue and expect URL "COUNTRY_AND_PLACE"
#    Then the page should include "Where you got married"
    Given I enter the marriage location

    When I click continue and expect URL "CHECK_JURISDICTION"
    Given I go to "CERTIFICATE_IN_ENGLISH"
    And I clear the form
    And I select yes

    When I click continue and expect URL "COUNTRY_AND_PLACE"
#    Then the page should include "Where you got married"
#    Given I clear the form
    Given I enter the marriage location
#    And I select "Enter the country where you got married"
#    And I type "England"
#    Given I select "Enter the place where you got married"
#    And I type "London"

    Then I click continue and expect URL "CHECK_JURISDICTION"
#    Then the page should include "Check if you can get a divorce in England or Wales"

    When I click continue and expect URL "WHERE_YOUR_LIVES_ARE_BASED_URL"
#    Then the page should include "Where your lives are based"
    Given we both live in England or Wales

    When I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
#    Then the page should include "You can use English or Welsh courts to get a divorce"

    When I click continue and expect URL "ENTER_YOUR_NAME"
#    Then the page should include "Enter your name"
    Given I enter my name
#    Given I clear the form
#    And I select "Your first name"
#    And I type "Sarah"
#    And I select "Your last name"
#    And I type "Smith"

    When I click continue and expect URL "CHECK_YOUR_NAME"
#    Then the page should include "Is any part of your full name (Sarah Smith) written differently on your marriage certificate?"
    Given I select no

    When I click continue and expect URL "YOUR_CERTIFICATE_NAME"
#    Then the page should include "How is your name written on your marriage certificate"
    Given I enter my name on the certificate

    When I click continue and expect URL "HOW_THE_COURTS_WILL_CONTACT_YOU"
#    Then the page should include "How the court will contact you"
    Given I agree that the court can contact me by email
#    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    And I enter my phone number

    When I click continue and expect URL "ENGLISH_OR_WELSH"
#    Then the page should include "What language do you want to receive emails and documents in?"
    Given I select English

    When I click continue and expect URL "ADDRESS_PRIVATE"
#    Then the page should include "Do you need your contact details kept private from your husband?"
    Given I need my contact details kept private
#    Given I select "Keep my contact details private"
#    Then the page should include "Are you currently in a refuge?"
#    Given I select "No"
#    Then the page should include "If you think you might be experiencing domestic abuse or you feel unsafe, then support is available"

    When I click continue and expect URL "ENTER_YOUR_ADDRESS"
#    Then the page should include "Enter your postal address"
    Given I enter my international address
#    Given I have an international address
#    And I select "Address line 1"
#    And I type "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102 PETTY FRANCE"
#    And I select "Town or city"
#    And I type "London"
#    And I select "Postal code, zip code or area code (optional)"
#    And I type "SW1H 9AJ"
#    And I select "Country"
#    And I type "UK"

    When I click continue and expect URL "OTHER_COURT_CASES"
#    And the page should include "Other court cases relating to this marriage"
    Given I select yes

    When I click continue and expect URL "DETAILS_OTHER_PROCEEDINGS"
#    Then the page should include "Details of the other legal proceedings"
    Given I enter details of the other proceedings
#    Given I select "Provide details about the other legal proceedings."
#    And I type "Test other legal proceedings details"

    When I click continue and expect URL "MONEY_PROPERTY"
#    And the page should include "Dividing your money and property"
    Given I select yes

    When I click continue and expect URL "WHO_IS_THE_FINANCIAL_ORDER_FOR"
#    And the page should include "Who is the financial order for?"
    And I need a financial order for myself and my children

    When I click continue and expect URL "UPLOAD_YOUR_DOCUMENTS"
#    Then the page should include "Upload your documents"
    Given I delete any previously uploaded files
#    Then the page should include "No files uploaded"
    Given I cannot upload my original foreign marriage certificate

    When I click continue and expect URL "CHECK_ANSWERS_URL"
#    And I go to "/"
#    Then the page should include "Check your answers"
#    And the page should include "I confirm my marriage has broken down irretrievably"
#    And the page should include "When did you get married?"
#    And the page should include "1 January 2000"
#    And the page should include "Do you have your marriage certificate with you?"
#    And the page should include "Yes, I have my marriage certificate with me"
#    And the page should include "Help paying the divorce fee"
#    And the page should include "Yes"
#    And the page should include "Help with fees reference number"
#    And the page should include "HWF-ABC-123"
#    And the page should include "Enter the country where you got married"
#    And the page should include "England"
#    And the page should include "Did you get married in the UK?"
#    And the page should include "No"

    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
#    Then the page URL should be "SENT_TO_APPLICANT2_FOR_REVIEW"
#    And the page should include "Your answers have been sent to your husband to review"

  @flaky
  Scenario: Applicant 1 upload larry-the-cat
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "UPLOAD_YOUR_DOCUMENTS"
#    Then the page should include "Upload your documents"
    Given I delete any previously uploaded files
#    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
#    Then I wait until the page contains image "larry-the-cat.jpg"
    And I delete the file "larry-the-cat.jpg"
#    And I wait until the page doesn't contain "larry-the-cat.jpg"
    When I clear the form
    And I cannot upload my original marriage certificate
    Then I click continue and expect URL "CHECK_ANSWERS_URL"
#    Then the page should include "Check your answers"
#    And the page should include "I cannot upload some or all of my documents"
