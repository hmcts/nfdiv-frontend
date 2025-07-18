Feature: Respondent

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

  Scenario: They fill out a happy path respondent journey
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Respond to the application"
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

  @nightly
  Scenario: They fill out an unhappy path respondent journey
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    And the page should include "Review the divorce application"

    Given I select "I have read the application for divorce"
    When I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    And the page should include "How do you want to respond to the application?"
    Given I select "I want to dispute the divorce"

    When I click "Continue"
    Then the page URL should be "/respondent/disputing-the-application"
    And the page should include "Disputing the divorce application"
    Given I select "I do not want to dispute the divorce"

    When I click "Continue"
    Then the page URL should be "how-do-you-want-to-respond"

    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You need to select how you want to respond before continuing."
    Given I select "I want to dispute the divorce"

    When I click "Continue"
    Then the page URL should be "disputing-the-application"
    Given I select "I confirm I want to dispute the divorce"
    Then the page should include "You are about to confirm that you want to dispute the divorce."

    When I click "Continue"
    Then the page URL should be "legal-jurisdiction-of-the-courts"
    Given I select "No, I do not agree the courts have jurisdiction"
    And I click "Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to grant your divorce."
    And I type "test details"
    And I select "Which country is your life mainly based?"
    And I type "test details"

    When I click "Continue"
    Then the page URL should be "/respondent/intend-to-delay"
    And the page should include "Do you intend to ask the court to delay the divorce until it is satisfied with your financial situation?"
    Given I select "No"

    When I click "Continue"
    Then the page URL should be "/respondent/other-court-cases"
    And the page should include "Other court cases relating to this marriage"
    Given I select "Yes"

    When I click "Continue"
    Then the page URL should be "/respondent/details-other-proceedings"
    And the page should include "Details of the other legal proceedings"
    Given I select "Provide details about the other legal proceedings."
    And I type "test details"
    And I select "Yes" for "Have the ongoing proceedings been concluded?"
    And I select "I cannot upload some or all of my documents"


    When I click "Continue"
    Then the page URL should be "/respondent/how-the-court-will-contact-you"
    And the page should include "How the court will contact you"
    Given I click "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    And I click "Enter your phone number (optional)"
    And I type "0123456789"

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

  Scenario: They fill out a happy path respondent journey when case is in AwaitingConditionalOrder
    Given I set the case state to "AwaitingConditionalOrder"
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"

    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    And the page should include "Review the divorce application"
    Given I select "I have read the application for divorce"

    When I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    Given I've already completed the form using the fixture "respondentCompleteCase" for "respondent"
    And I go to '/respondent/check-your-answers'
    And I select "I confirm that:"

    When I click "Submit"
    Then the page URL should be "/respondent/response-submitted"
