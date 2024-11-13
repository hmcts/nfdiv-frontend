Feature: Sole request for information

  Background: Logged in for hub page
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"

  @nightly
  Scenario: Applicant sole rfi journey
    Given a case worker issues a request for information
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has reviewed your application for divorce."

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include "Respond to the court's feedback"

    Given I select "Write your response below if the court has asked you to explain something or provide additional information. If the court has just asked you to upload documents, then you do not have to write anything unless you think it's useful information."
    And I type "Response Details"
    When I click "Continue"
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include "Review your response"

    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have responded to the court."

  @nightly
  Scenario: Applicant sole rfi journey can't upload all documents
    Given a case worker issues a request for information
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has reviewed your application for divorce."

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include "Respond to the court's feedback"

    Given I select "I'm having trouble uploading some or all of my documents"
    When I click "Continue"
    Then the page URL should be "/review-your-response-to-the-courts-feedback"
    And the page should include "Review your response"

    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have told us that you cannot upload some or all of your documents."

  @nightly
  Scenario: Applicant sole rfi third party journey
    Given a case worker issues a request for information to a third party
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has reviewed your application for divorce."
    And the page should include "We have sent an email to a Third party with the information that the court needs."
    And the page should include "The court will review the information from the Third party once provided, then the application can progress."
