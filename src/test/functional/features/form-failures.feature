Feature: Form failures

  Background:
    Given I create a new user and login

  @nightly
  Scenario: They fail to fill out the applicant 1 forms
    Given I go to "/irretrievable-breakdown"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/date-from-certificate"
    When I click "Continue"
    Then the page should include "You have not entered a date. Enter a date to continue."
    Given I select "Day"
    And I type "!"
    And I select "Month"
    And I type "1"
    And I select "Year"
    And I type "abc"
    When I click "Continue"
    Then the page should include "You have entered an invalid date. Enter the date using the following format: 31 3 2002"
    Given I clear the form
    And I enter a date 2 years ahead
    When I click "Continue"
    Then the page should include "You have entered a date that is in the future. Enter a date that is in the past before continuing."
    Given I clear the form
    And I enter a date 6 months ago
    When I click "Continue"
    Then the page should include "You have not been married long enough to apply for a divorce"

    Given I go to "/do-you-have-your-certificate"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/help-with-your-fee"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/have-you-applied-for-help-with-fees"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "Yes"
    When I click "Continue"
    Then the page should include "You need to enter your Help With Fees reference number before continuing. You received this when you applied."
    Given I select "Enter your Help With Fees reference number"
    And I type "invalid"
    When I click "Continue"
    Then the page should include "You have entered an invalid Help With Fees reference number. Check the number and enter it again."

    Given I go to "/how-do-you-want-to-apply"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/their-email-address"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not entered their email address or said you do not know it. You have to do one or the other before continuing."
    Given I select "Your husband's email address"
    And I type "test.com"
    When I click "Continue"
    Then the page should include "You have entered an invalid email address. Check it and enter it again before continuing."
    Given I clear the form
    And I select "Your husband's email address"
    And I type "simulate-delivered@notifications.service.gov.uk"
    And I select "I do not know their email address"
    When I click "Continue"
    Then the page should include "You have entered an email address and indicated that you do not know their email address. You can only do one before continuing."
    Given I clear the form
    And I select "Your husband's email address"
    And I type my own email address
    When I click "Continue"
    Then the page should include "You have entered your own email address. You need to enter your husband's email address before continuing."

    Given I go to "/do-you-have-address"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/need-to-get-address"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/other-court-cases"
    And I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/details-other-proceedings"
    And I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/enter-their-address"
    When I click "Find address"
    Then the page should include "You have not entered your husband’s postcode. Enter their postcode before continuing."
    Given I reset the postcode lookup form
    And I wait "1" seconds
    And I select "Enter a UK postcode"
    And I type "not a postcode!"
    When I click "Find address"
    Then the page should include "You have not entered a valid UK postcode. Enter a valid UK postcode before continuing."
    Given I reset the postcode lookup form
    And I wait "1" seconds
    And I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    And I click "Find address"
    And I click "I cannot find the address in the list"
    And I click "Continue"
    Then the page should include "You have not entered your husband’s building and street address. Enter their building and street address before continuing."
    And the page should include "You have not entered your husband’s town or city. Enter their town or city before continuing."
    And the page should include "You have not entered your husband’s postcode. Enter their postcode before continuing."
    Given I reset the postcode lookup form
    And I click "I have an international address"
    When I click "Continue"
    Then the page should include "You have not entered your husband’s building and street address. Enter their building and street address before continuing."
    And the page should include "You have not entered your husband’s country. Enter their country before continuing."

    Given I go to "/in-the-uk"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/certificate-in-english"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/certified-translation"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/country-and-place"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to enter the country."
    And the page should include "You have not answered the question. You need to enter the place."

    Given I go to "/where-your-lives-are-based"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/enter-your-name"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not entered your first name. Enter it before continuing."
    And the page should include "You have not entered your last name. Enter it before continuing."
    Given I clear the form
    When I select "Your first name"
    And I type "My first name!"
    And I select "Your last name"
    And I type "My last-name1"
    And I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter your name using letters only."

    Given I go to "/confirm-your-name"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/enter-their-name"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not entered their first name. Enter it before continuing."
    And the page should include "You have not entered their last name. Enter it before continuing."
    Given I clear the form
    When I select "Your husband’s first name(s)"
    And I type "Their first name!"
    And I select "Your husband’s last name(s)"
    And I type "Their last-name1"
    And I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter their name using letters only."

    Given I go to "/confirm-their-name"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/your-names-on-certificate"
    When I click "Continue"
    Then the page should include "You have not entered anything. Enter your full name as it appears on your marriage certificate."
    And the page should include "You have not entered anything. Enter their full name as it appears on your marriage certificate."
    Given I select "Copy your full name from the marriage certificate"
    And I type "Firstname Lastname1"
    And I select "Copy your husband's full name from the marriage certificate"
    And I type "Husbands name1"
    And I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter your name using letters only."

    Given I go to "/changes-to-your-name"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "Yes"
    Given I select "Another way"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to say how you changed your name so the court knows which document to check."

    Given I go to "/how-the-court-will-contact-you"
    And I click "Continue"
    Then the page should include "You have to agree to receive email notifications in order to use this online service."
    Given I clear the form
    And I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    When I select "Enter your phone number (optional)"
    And I type "12345"
    And I click "Continue"
    Then the page should include "The phone number you have entered is invalid. Enter a valid phone number to continue."

    Given I go to "/address-private"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/enter-your-address"
    When I click "Find address"
    Then the page should include "You have not entered your postcode. Enter your postcode before continuing."
    Given I wait "1" seconds
    And I select "Enter a UK postcode"
    And I type "ZZ00 0ZZ"
    And I click "Find address"
    And I click "I cannot find the address in the list"
    When I click "Continue"
    Then the page should include "You have not entered your building and street address. Enter your building and street address before continuing."
    And the page should include "You have not entered your town or city. Enter your town or city before continuing."
    And the page should include "You have not entered your postcode. Enter your postcode before continuing."
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    Given I wait for the postcode lookup to return results
    And I click "Continue"
    Then the page should include "You have not selected your address. Select your address from the list before continuing."

    Given I go to "/do-they-have-a-solicitor"
    When I click "Continue"
    Then the page should include "You have not answered the question. Select an answer before continuing."

    Given I go to "/enter-solicitor-details"
    And I select "Solicitor email address"
    And I type "test"
    When I click "Continue"
    Then the page should include "You have entered the email address in the wrong format. Check it and enter it again."

    Given I go to "/details-other-proceedings"
    When I click "Continue"
    Then the page should include "You have not provided any information. You need to enter details of the other legal proceedings."

    Given I go to "/dividing-money-property"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/who-is-the-financial-order-for"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/upload-your-documents"
    When I click "Continue"
    Then the page should include "You have not uploaded anything. Either upload your document or select that you cannot upload your documents."

    Given I go to "/how-do-you-want-to-apply"
    And I select "I want to apply jointly, with my husband"
    When I click "Continue"
    Then the page URL should be "/their-email-address"

    Given I go to "/their-email-address"
    When I click "Continue"
    Then the page should include "You have not entered their email address. You have to enter their email address to do a joint application."

    Given I've already completed the form using the fixture "completeCase"
    And I go to "/check-your-answers"
    When I click "Continue"
    Then the page should include "You have not confirmed what you are applying to the court to do. You need to confirm before continuing."
    And the page should include "You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing."

    Given I set the case state to "AwaitingFinalOrder"
    And I go to "/finalising-your-application"
    When I click "Submit"
    Then the page should include "You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out."

    Given I go to "/explain-the-delay"
    When I click "Submit"
    Then the page should include "You have not entered any information. You need to explain why your application has been delayed before continuing."
    And the page should include "You have not confirmed you believe the information you have entered is true. Confirm you believe it’s true before continuing."


  @nightly
  Scenario: They fail to fill out the applicant 1 joint application forms
    Given I go to "/how-do-you-want-to-apply"
    And I select "I want to apply jointly, with my husband"
    When I click "Continue"
    Then the page URL should be "/their-email-address"
    Given I click "Continue"
    Then the page should include "You have not entered their email address. You have to enter their email address to do a joint application."

  @nightly
  Scenario: They fail to fill out the respondent forms
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"

    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    And the page should include "Review the divorce application"
    When I click "Continue"
    Then the page should include "You need to confirm that you have read the application before you continue."
    Given I select "I have read the application for divorce"

    When I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    Given I clear the form
    When I click "Continue"
    Then the page should include "You need to select how you want to respond before continuing."

    Given I go to "/respondent/disputing-the-application"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/respondent/legal-jurisdiction-of-the-courts"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    Given I select "No, I do not agree the courts have jurisdiction"
    When I click "Continue"
    Then the page should include "You need to explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to grant your divorce"
    And the page should include "You need to tell us which country your life is mainly based"

    Given I go to "/respondent/other-court-cases"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/respondent/details-other-proceedings"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/respondent/how-the-court-will-contact-you"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have to agree to receive email notifications in order to use this online service."

    Given I've already completed the form using the fixture "respondentCompleteCase" for "respondent"
    And I go to "/respondent/legal-jurisdiction-of-the-courts"
    When I click "Continue"
    Then the page should include "Other court cases relating to this marriage"

    Given I go to "/respondent/how-the-court-will-contact-you"
    When I click "Continue"
    Then the page should include "What language do you want to receive emails and documents in?"

    Given I go to "/"
    When I click "Submit"
    Then the page should include "You have not confirmed that you are the respondent and that you believe the facts in the application are true. You need to confirm before continuing."

    Given I go to "/respondent/finalising-your-application"
    When I click "Submit"
    Then the page should include "You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out."
    Then the page should include "You need to explain why you are applying for the final order before continuing."

  @nightly
  Scenario: They fail to fill out the applicant 2 forms
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"

    When I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"
    Given I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/applicant2/help-with-your-fee"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/applicant2/have-you-applied-for-help-with-fees"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "Yes"
    When I click "Continue"
    Then the page should include "You need to enter your Help With Fees reference number before continuing. You received this when you applied."

    Given I go to "/applicant2/enter-your-names"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not entered your first name. Enter it before continuing."
    And the page should include "You have not entered your last name. Enter it before continuing."
    Given I select "Your first name"
    And I type "My first name!"
    And I select "Your last name"
    And I type "My last-name1"
    When I click "Continue"
    Then the page should include "You have entered an invalid character, like a number. Enter your name using letters only."

    Given I go to "/applicant2/confirm-your-name"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/applicant2/changes-to-your-name"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "Yes"
    Given I select "Another way"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to say how you changed your name so the court knows which document to check."

    Given I go to "/applicant2/how-the-court-will-contact-you"
    And I clear the form
    And I select "Enter your phone number (optional)"
    And I type "12345"
    When I click "Continue"
    Then the page should include "You have to agree to receive email notifications in order to use this online service."
    And the page should include "The phone number you have entered is invalid. Enter a valid phone number to continue."

    Given I go to "/applicant2/address-private"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/applicant2/enter-your-address"
    And I clear the form
    When I click "Find address"
    Then the page should include "You have not entered your postcode. Enter your postcode before continuing."

    Given I wait "1" seconds
    And I select "Enter a UK postcode"
    And I type "ZZ00 0ZZ"
    And I click "Find address"
    And I click "I cannot find the address in the list"
    When I click "Continue"
    Then the page should include "You have not entered your building and street address. Enter your building and street address before continuing."
    And the page should include "You have not entered your town or city. Enter your town or city before continuing."
    And the page should include "You have not entered your postcode. Enter your postcode before continuing."
    Given I reset the postcode lookup form
    And I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    Given I wait for the postcode lookup to return results
    And I click "Continue"
    Then the page should include "You have not selected your address. Select your address from the list before continuing."

    Given I go to "/applicant2/other-court-cases"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/applicant2/details-other-proceedings"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not provided any information. You need to enter details of the other legal proceedings."

    Given I go to "/applicant2/dividing-money-property"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I go to "/applicant2/upload-your-documents"
    And I clear the form
    And I select "I cannot upload some or all of my documents"
    When I click "Continue"
    Then the page should include "You have not uploaded anything. Either upload your document or select that you cannot upload your documents."
    And the page should include "Select which file you could not upload before continuing."

    Given I go to "/applicant2/check-your-joint-application"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "No"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/upload-your-documents"
    When I click "Continue"
    Then the page should include "Select which file you could not upload before continuing."

    Given I go to "/applicant2/confirm-your-joint-application"
    And I clear the form
    When I click "Submit"
    Then the page should include "You need to confirm you are applying to the court to dissolve your marriage (get a divorce)."
    And the page should include "You need to confirm the facts stated in this application are true"


  @nightly
  Scenario: They fail to fill out joint conditional order questions
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I set the case state to "AwaitingConditionalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"

    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"

    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "I want to continue with my divorce application"

    When I click "Continue"
    Then the page URL should be "/review-your-joint-application"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."
    Given I select "No"
    When I click "Continue"
    Then the page should include "You need to say what information is incorrect before continuing."
    Given I select "Yes"

    When I click "Continue"
    Then the page URL should be "/check-your-conditional-order-answers"
    When I click "Submit"
    Then the page should include "You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing."
    Given I select "I believe that the facts stated in this application are true"

    When I click "Submit"
    Then the page URL should be "/hub-page"
    When I click "Sign out"
    And I login with applicant "2"
    And I set the case state to "ConditionalOrderPending"
    When I go to "/"
    Then the page URL should be "/applicant2/hub-page"
    When I click "Apply for conditional order"
    Then the page URL should be "/applicant2/continue-with-your-application"
    When I click "Continue"
    Then the page should include "You have not answered the question. You need to select an answer before continuing."

    Given I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    Given I clear the form
    When I click "Continue"
    Then the page should include "You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option."
    When I click "Sign out"
    And I login with applicant "2"
    When I go to "/applicant2/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    Given I clear the form
    When I click "Continue"
    Then the page should include "You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option."

  @nightly
  Scenario: Jurisdiction form failures
    Given I go to "/where-your-lives-are-based"
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/your-domicile"
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/living-england-wales-twelve-months"
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/living-england-wales-six-months"
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/habitually-resident-england-wales"
    When I click "Continue"
    Then the page should include "There was a problem"

    Given I go to "/living-england-wales-twelve-months"
    When I click "Continue"
    Then the page should include "There was a problem"

  @nightly
  Scenario: Enter your access code form failures
    Given I go to "/your-details"
    And I click "Sign out"
    When I create a new user and login as applicant 2
    And I go to "/applicant2/enter-your-access-code"
    And I clear the form
    And I select "Your reference number"
    And I type "1234123412341234"
    And I select "Your access code"
    And I type "QWERTY45"
    When I click "Continue"
    Then the page should include "You have entered the wrong reference number"

    Given I clear the form
    And I select "Your access code"
    And I type "QWERTY45"
    When I click "Continue"
    Then the page should include "You have not entered a reference number"

    Given I clear the form
    And I select "Your reference number"
    And I type "1234123412341234"
    When I click "Continue"
    Then the page should include "You have not entered an access code"

    Given I clear the form
    When I click "Continue"
    Then the page should include "You have not entered"
