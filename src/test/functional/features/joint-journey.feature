Feature: Joint application journey

  Background:
    Given I create a new user and login
    Then the page URL should be "/your-details"
    And the page should include "Who are you applying to divorce?"

  Scenario: They fill out a happy path joint journey
    # Applicant 1
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

    # Applicant 2
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"

    When I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"
    And the page should include "Has your marriage broken down irretrievably (it cannot be saved)?"
    Given I select "I confirm my marriage has broken down irretrievably"

    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-name"
    And the page should include "Enter your name"
    Given I clear the form
    And I select "Your first name(s)"
    And I type "Billy"
    And I select "Your last name(s)"
    And I type "Bob"

    When I click "Continue"
    Then the page URL should be "/applicant2/changes-to-your-name"
    And the page should include "Changes to your name"
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"

    When I click "Continue"
    Then the page URL should be "/applicant2/how-the-court-will-contact-you"
    And the page should include "How the court will contact you"
    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."

    When I click "Continue"
    Then the page URL should be "/applicant2/address-private"
    And the page should include "Do you need your contact details kept private from your wife?"
    Given I select "I do not need my contact details kept private"

    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-address"
    And the page should include "Enter your postal address"
    Given I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results
    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"

    When I click "Continue"
    Then the page URL should be "/applicant2/other-court-cases"
    And the page should include "Other court cases relating to this marriage"
    Given I select "No"

    When I click "Continue"
    Then the page URL should be "/applicant2/dividing-money-property"
    And the page should include "Dividing your money and property"

    When I select "Continue"
    Then the page URL should be "/applicant2/do-you-want-to-apply-financial-order"
    And the page should include "Applying for a financial order"
    Given I select "No, I do not want to apply for a financial order"

    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-joint-application"
    And the page should include "Check your wife's answers"
    And the page should include "I confirm my marriage has broken down irretrievably"
    And the page should include "When did you get married?	31 December 1999"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate with me"
    And the page should include "Help paying the divorce fee	I do not need help paying the fee"
    And the page should include "Did you get married in the UK?	Yes"
    Given I select "Yes" for "Is the information your wife provided correct?"

    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-answers"
    And the page should include "Check your answers"

    When I click "Continue"
    Then the page URL should be "/applicant2/confirm-your-joint-application"
    And the page should include "Confirm your joint application"
    And the page should include "The marriage has broken down irretrievably (it cannot be saved)"
    And the page should include "About the marriage"
    And the page should include "Date of marriage"
    And the page should include "The applicants are not applying to the court for financial orders."
    Given I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"

    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    And the page should include "Your wife needs to confirm your joint application"

    Given I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/confirm-your-joint-application"
    And I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    Then the page URL should be "/pay-and-submit"
    When I pay and submit the joint application
    Then the page should include "Application submitted"
    Given I click "Sign out"
    And I login with applicant "2"
    Then the page should include "Application submitted"

  @nightly
  Scenario: They fill out an unhappy path joint journey with help with fees
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

    When I click "Continue"
    Then the page should include "How did you change your name?"
    Given I select "Another way"
    And I select "Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here."
    And I type "Test Another Way"
    And I select "By sending off my marriage certificate"
    And I select "By deed poll or ‘statutory declaration’"

    When I click "Continue"
    Then the page should include "How the court will contact you"
    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    And I select "Enter your phone number (optional)"
    And I type "123456789"

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

    # Applicant 2
    When I go to "/help-with-your-fee"
    And I select "I need help paying the fee"

    When I click "Continue"
    Then the page URL should be "/have-you-applied-for-help-with-fees"
    Given I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"
    When I click "Continue"
    Then the page URL should be "/how-do-you-want-to-apply"

    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"

    When I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"
    And the page should include "Has your marriage broken down irretrievably (it cannot be saved)?"
    Given I select "I confirm my marriage has broken down irretrievably"

    When I click "Continue"
    Then the page URL should be "/applicant2/help-with-your-fee"
    And the page should include "Help with the divorce fee"
    Given I select "I do not need help with fees"

    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-name"
    Given I go to "/applicant2/help-with-your-fee"
    And I select "I need help with fees"

    When I click "Continue"
    Then the page URL should be "/applicant2/have-you-applied-for-help-with-fees"
    And the page should include "Have you already applied for help with your divorce fee?"
    Given I select "No"

    When I click "Continue"
    Then the page URL should be "/applicant2/apply-for-help-with-fees"
    And the page should include "You need to apply for help with your divorce fees"
    Given I click "enter it here"
    Then the page URL should be "/applicant2/help-with-your-fee"
    Given I select "I need help with fees"

    When I click "Continue"
    Then the page URL should be "/applicant2/have-you-applied-for-help-with-fees"
    Given I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"

    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-name"
    And the page should include "Enter your name"
    Given I select "Your first name(s)"
    And I type "Sarah"
    And I select "Your last name(s)"
    And I type "Smith"

    When I click "Continue"
    Then the page URL should be "/applicant2/changes-to-your-name"
    And the page should include "Changes to your name"
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"

    When I click "Continue"
    Then the page URL should be "/applicant2/how-did-you-change-your-name"
    And the page should include "How did you change your name?"
    Given I select "Another way"
    And I select "Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here."
    And I type "Test Another Way"
    And I select "By sending off my marriage certificate"
    And I select "By deed poll or ‘statutory declaration’"

    When I click "Continue"
    Then the page URL should be "/applicant2/how-the-court-will-contact-you"
    And the page should include "How the court will contact you"
    Given I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    And I select "Enter your phone number (optional)"
    And I type "123456789"

    When I click "Continue"
    Then the page URL should be "/applicant2/address-private"
    And the page should include "Do you need your contact details kept private from your wife?"
    Given I select "Keep my contact details private"
    Then the page should include "If you think you might be experiencing domestic abuse or you feel unsafe, then support is available"

    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-address"
    And the page should include "Enter your postal address"
    Given I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results
    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"

    When I click "Continue"
    Then the page URL should be "/applicant2/other-court-cases"
    Given I go to "/applicant2/enter-your-address"
    Then the form input "Building and street" should be "102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE"
    And the form input "Town or city" should be "LONDON"
    And the form input "County" should be "CITY OF WESTMINSTER"
    And the form input "Postcode" should be "SW1H 9AJ"

    When I click "Continue"
    And the page should include "Other court cases relating to this marriage"
    Given I select "Yes"

    When I click "Continue"
    Then the page URL should be "/applicant2/details-other-proceedings"
    And the page should include "Details of the other legal proceedings"
    Given I select "Provide details about the other legal proceedings using the information above."
    And I type "Test other legal proceedings details"

    When I click "Continue"
    Then the page URL should be "/applicant2/dividing-money-property"
    And the page should include "Dividing your money and property"

    When I click "Continue"
    Then the page URL should be "/applicant2/do-you-want-to-apply-financial-order"
    And the page should include "Applying for a financial order"
    Given I select "Yes, I want to apply for a financial order"
    And I select "Myself"
    And I select "The children"

    When I click "Continue"
    Then the page URL should be "/applicant2/how-to-apply-financial-order"
    And the page should include "How to apply for a financial order"

    When I click "Continue"
    Then the page URL should be "/applicant2/upload-your-documents"
    And the page should include "Upload your documents"
    Given I delete any previously uploaded files
    And I select "I cannot upload some or all of my documents"
    And I select "Proof that I changed my name"

    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-joint-application"
    And the page should include "Check your wife's answers"
    Given I select "No" for "Is the information your wife provided correct?"
    And I select "Explain what is incorrect or needs changing. Your answer will be sent to your wife."
    And I type "Incorrect test details"

    When I click "Continue"
    Then the page URL should be "/applicant2/your-comments-sent"
    And the page should include "Your comments have been sent to your wife"


  @nightly
  Scenario: Applicant 2 ends the joint application
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    When I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"
    Given I select "My marriage has not broken down irretrievably"
    Then the page should include "Your marriage must have broken down irretrievably for you to get a divorce."
    When I click "Continue"
    Then the page URL should be "/applicant2/you-cannot-apply"
    And the page should include "You cannot apply to get a divorce"
    When I click "End joint application"
    Then the page URL should be "/applicant2/you-have-not-confirmed-joint-application"
    And the page should include "You have not confirmed your joint application"
    And I click "Sign out"
    Given I login with applicant "1"
    Then the page URL should be "/application-ended"

  @flaky
  Scenario: Upload larry-the-cat
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

    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    When I go to "/applicant2/upload-your-documents"
    Then the page should include "Upload your documents"
    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    And I wait until the page contains image "larry-the-cat.jpg"
    And I click "Delete"
    And I wait until the page doesn't contain "larry-the-cat.jpg"
    When I clear the form
    And I select "I cannot upload some or all of my documents"
    And I select "Proof that I changed my name"
    When I click "Continue"
    When I go to "/applicant2/check-your-answers"
    Then the page should include "Check your answers"
    And the page should include "I cannot upload some or all of my documents"


