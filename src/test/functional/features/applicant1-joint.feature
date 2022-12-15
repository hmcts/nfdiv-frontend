Feature: Applicant 1 joint application

  Background:
    Given I create a new user and login
    Then the page URL should be "/your-details"
    And the page should include "Who are you applying to divorce?"
    And the page should not include "Back"

  Scenario: They fill out a happy path applicant 1 joint journey
    Given I select "My husband"
    And I click "Continue"
    Then the page should include "Has your marriage broken down irretrievably (it cannot be saved)?"
    Given I select "I confirm my marriage has broken down irretrievably"

    When I click "Continue"
    Then the page should include "When did you get married?"
    Given I select "Day"
    And I type "1"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "2000"

    When I click "Continue"
    Then the page should include "Do you have your marriage certificate with you?"
    Given I select "Yes, I have my marriage certificate with me"

    When I click "Continue"
    Then the page should include "Do you need help paying the fee for your divorce?"
    Given I select "I do not need help paying the fee"

    When I click "Continue"
    Then the page should include "How do you want to apply for the divorce?"
    Given I select "I want to apply jointly, with my husband"

    When I click "Continue"
    Then the page should include "Enter your husband's email address"
    Given I clear the form
    And I select "Your husband's email address"
    And I type "simulate-delivered@notifications.service.gov.uk"

    When I click "Continue"
    Then the page should include "Did you get married in the UK?"
    Given I select "Yes"

    When I click "Continue"
    Then the page should include "Check if you can get a divorce in England or Wales"

    When I click "Continue"
    Then the page should include "Where your lives are based"
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"

    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"

    When I click "Continue"
    Then the page should include "Enter your name"
    Given I clear the form
    And I select "Your first name"
    And I type "Sarah"
    And I select "Your last name"
    And I type "Smith"

    When I click "Continue"
    Then the page should include "Your names on your marriage certificate"
    Given I select "Copy your full name from the marriage certificate"
    And I type "Sarah Smith"
    And I select "Copy your husband's full name from the marriage certificate"
    And I type "Billy Bob"

    When I click "Continue"
    Then the page should include "Changes to your name"
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"

    When I click "Continue"
    Then the page should include "How the court will contact you"
    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    When I click "Continue"
    Then the page should include "What language do you want to receive emails and documents in"
    Given I select "English"

    When I click "Continue"
    Then the page should include "Do you need your contact details kept private from your husband?"
    Given I select "I do not need my contact details kept private"

    When I click "Continue"
    Then the page should include "Enter your postal address"
    Given I select "Enter a UK postcode"
    And I type "SW1H 9AJ"

    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results
    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"

    When I click "Continue"
    Then the page should include "Other court cases relating to this marriage"
    Given I select "No"

    When I click "Continue"
    Then the page should include "Dividing your money and property"

    When I click "Continue"
    Then the page should include "Applying for a financial order"
    Given I select "No, I do not want to apply for a financial order"

    When I click "Continue"
    Then the page should include "Upload your documents"
    Given I select "I cannot upload my original marriage certificate"

    When I click "Continue"
    And I go to "/"
    And the page should include "Check your answers"
    And the page should include "When did you get married?	1 January 2000"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate with me"
    And the page should include "Help with fees"
    And the page should include "I do not need help paying the fee"
    And the page should include "Did you get married in the UK?	Yes"

    When I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And the page should include "Your answers have been sent to your husband to review"


  @nightly
  Scenario: They fill out an unhappy path applicant 1 joint journey with help with fees
    Given I select "My husband"
    And I select "We were a same-sex couple when we got married"

    When I click "Continue"
    Then the page should include "Has your marriage broken down irretrievably (it cannot be saved)?"
    Given I select "My marriage has not broken down irretrievably"
    Then the page should include "Your marriage must have broken down irretrievably for you to get a divorce. This is the law in England and Wales."

    When I click "Continue"
    Then the page should include "You cannot apply to get a divorce"
    Given I click "Back"
    Then the page URL should be "/irretrievable-breakdown"
    Given I select "I confirm my marriage has broken down irretrievably"

    When I click "Continue"
    Then the page should include "When did you get married?"
    Given I select "Day"
    And I type "1"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "2000"

    When I click "Continue"
    Then the page should include "Do you have your marriage certificate with you?"
    Given I select "No, I do not have marriage certificate with me"

    When I click "Continue"
    Then the page should include "You need your marriage certificate"
    Given I click "Back"
    Then the page URL should be "/do-you-have-your-certificate"
    Given I select "Yes, I have my marriage certificate with me"

    When I click "Continue"
    Then the page should include "Do you need help paying the fee for your divorce?"
    Given I select "I need help paying the fee"

    When I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    Given I select "No"

    When I click "Continue"
    Then the page should include "You need to apply for help with your divorce fees"
    Given I click "enter it here"
    Then the page URL should be "/help-with-your-fee"
    Given I select "I need help paying the fee"

    When I click "Continue"
    Then the page URL should be "/have-you-applied-for-help-with-fees"
    Given I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"

    When I click "Continue"
    Then the page should include "How do you want to apply for the divorce?"
    Given I select "I want to apply jointly, with my husband"

    When I click "Continue"
    Then the page should include "Enter your husband's email address"
    Given I select "I do not know their email address"

    When I click "Continue"
    Then the page should include "You need to get their email address"

    When I click "Back"
    Then the page URL should be "/their-email-address"
    Given I clear the form
    And I select "Your husband's email address"
    And I type "simulate-delivered@notifications.service.gov.uk"

    When I click "Continue"
    Then the page should include "Did you get married in the UK?"
    Given I select "No"

    When I click "Continue"
    Then the page should include "Is your original marriage certificate in English?"
    Given I select "No"

    When I click "Continue"
    Then the page should include "Do you have a ‘certified translation’ of your marriage certificate?"
    Given I select "No, I do not have a certified translation"

    When I click "Continue"
    Then the page should include "You need to get a ‘certified translation’ of your marriage certificate"
    Given I click "Back"
    Then the page URL should be "/certified-translation"
    Given I select "Yes, I have a certified translation"

    When I click "Continue"
    Then the page should include "Where you got married"
    Given I select "Enter the country where you got married"
    And I type "England"
    Given I select "Enter the place where you got married"
    And I type "London"

    When I click "Continue"
    Then the page URL should be "/check-jurisdiction"
    Given I go to "/certificate-in-english"
    And I clear the form
    And I select "Yes"

    When I click "Continue"
    Then the page should include "Where you got married"
    Given I clear the form
    And I select "Enter the country where you got married"
    And I type "England"
    Given I select "Enter the place where you got married"
    And I type "London"

    When I click "Continue"
    Then the page should include "Check if you can get a divorce in England or Wales"

    When I click "Continue"
    Then the page should include "Where your lives are based"
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"

    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"

    When I click "Continue"
    Then the page should include "Enter your name"
    Given I select "Your first name"
    And I type "Sarah"
    And I select "Your middle name(s) (if you have one)"
    And I type "Middle"
    And I select "Your last name"
    And I type "Smith"

    When I click "Continue"
    Then the page should include "Your names on your marriage certificate"
    Given I select "Copy your full name from the marriage certificate"
    And I type "Sarah Smith"
    And I select "Copy your husband's full name from the marriage certificate"
    And I type "Billy Bob"

    When I click "Continue"
    Then the page should include "Changes to your name"
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"
    Then the page should include "How did you change your name?"
    Given I select "Another way" for "Did you change your last name when you got married?"
    And I select "Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here."
    And I type "Test Another Way"
    And I select "By sending off my marriage certificate" for "Have you changed any part of your name since getting married?"
    And I select "By deed poll or ‘statutory declaration’" for "Have you changed any part of your name since getting married?"

    When I click "Continue"
    Then the page should include "How the court will contact you"
    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    And I select "Enter your phone number (optional)"
    And I type "123456789"

    When I click "Continue"
    Then the page should include "What language do you want to receive emails and documents in?"
    Given I select "English"

    When I click "Continue"
    Then the page should include "Do you need your contact details kept private from your husband?"
    Given I select "Keep my contact details private"
    Then the page should include "If you think you might be experiencing domestic abuse or you feel unsafe, then support is available"

    When I click "Continue"
    Then the page should include "Enter your postal address"
    Given I click "I cannot enter a UK postcode"
    And I select "Address line 1"
    And I type "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102 PETTY FRANCE"
    And I select "Town or city"
    And I type "London"
    And I select "Postal code, zip code or area code (optional)"
    And I type "SW1H 9AJ"
    And I select "Country"
    And I type "UK"

    When I click "Continue"
    And the page should include "Other court cases relating to this marriage"
    Given I select "Yes"

    When I click "Continue"
    Then the page should include "Details of the other legal proceedings"
    Given I select "Provide details about the other legal proceedings."
    And I type "Test other legal proceedings details"

    When I click "Continue"
    Then the page should include "Dividing your money and property"

    When I click "Continue"
    Then the page should include "Applying for a financial order"
    Given I select "Yes, I want to apply for a financial order"
    And I select "Myself"
    And I select "The children"

    When I click "Continue"
    Then the page should include "How to apply for a financial order"

    When I click "Continue"
    Then the page should include "Upload your documents"
    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    Given I select "I cannot upload some or all of my documents"
    And I select "Proof that I changed my name"

    When I click "Continue"
    And I go to "/"
    Then the page should include "Check your answers"
    And the page should include "I confirm my marriage has broken down irretrievably"
    And the page should include "When did you get married?	1 January 2000"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate with me"
    And the page should include "Help with fees"
    And the page should include "Help paying the divorce fee	I need help paying the fee"
    And the page should include "Have you already applied for help with your divorce fee?	Yes"
    And the page should include "HWF-ABC-123"
    And the page should include "Enter the country where you got married	England"
    And the page should include "Did you get married in the UK?	No"

    When I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And the page should include "Your answers have been sent to your husband to review"


  @flaky
  Scenario: Applicant 1 upload larry-the-cat
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/upload-your-documents"
    Then the page should include "Upload your documents"
    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"
    And I click "Delete"
    And I wait until the page doesn't contain "larry-the-cat.jpg"
    When I clear the form
    And I select "I cannot upload my original marriage certificate"
    When I click "Continue"
    And I go to "/"
    Then the page should include "Check your answers"
    And the page should include "I cannot upload some or all of my documents"
