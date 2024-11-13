Feature: Joint request for information

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"

  @nightly
  Scenario: [1] Applicant 1 joint rfi journey
    Given a case worker issues a request for information to app1 on a joint case
    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce. We have sent an email to your wife with the information that the court needs."
    And the page should include "The court will review the information from your wife once provided, then the application can progress."

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
  Scenario: [1] Applicant 2 joint rfi journey
    Given a case worker issues a request for information to app2 on a joint case
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has reviewed your application for divorce. We have sent an email to your husband with the information that the court needs."
    And the page should include "The court will review the information from your husband once provided, then the application can progress."

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce."

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include "Respond to the court's feedback"

    Given I select "Write your response below if the court has asked you to explain something or provide additional information. If the court has just asked you to upload documents, then you do not have to write anything unless you think it's useful information."
    And I type "Response Details"
    When I click "Continue"
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include "Review your response"

    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have responded to the court."

  @nightly
  Scenario: [2] Applicant 1 joint rfi journey can't upload all documents
    Given a case worker issues a request for information to app1 on a joint case
    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce. We have sent an email to your wife with the information that the court needs."
    And the page should include "The court will review the information from your wife once provided, then the application can progress."

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
  Scenario: [2] Applicant 2 joint rfi journey can't upload all documents
    Given a case worker issues a request for information to app2 on a joint case
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has reviewed your application for divorce. We have sent an email to your husband with the information that the court needs."
    And the page should include "The court will review the information from your husband once provided, then the application can progress."

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce."

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include "Respond to the court's feedback"

    Given I select "I'm having trouble uploading some or all of my documents"
    When I click "Continue"
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include "Review your response"

    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have told us that you cannot upload some or all of your documents."

  @nightly
  Scenario: [3] Applicant 1 joint rfi journey sent to both parties
    Given a case worker issues a request for information to both parties on a joint case
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

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have responded to the court."

  @nightly
  Scenario: [3] Applicant 2 joint rfi journey sent to both parties
    Given a case worker issues a request for information to both parties on a joint case
    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce."

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include "Respond to the court's feedback"

    Given I select "Write your response below if the court has asked you to explain something or provide additional information. If the court has just asked you to upload documents, then you do not have to write anything unless you think it's useful information."
    And I type "Response Details"
    When I click "Continue"
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include "Review your response"

    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have responded to the court."

    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "You have responded to the court."

  @nightly
  Scenario: [4] Applicant 1 joint rfi journey sent to both parties can't upload all documents
    Given a case worker issues a request for information to both parties on a joint case
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

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have told us that you cannot upload some or all of your documents."

  @nightly
  Scenario: [4] Applicant 2 joint rfi journey sent to both parties can't upload all documents
    Given a case worker issues a request for information to both parties on a joint case
    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce."

    When I click "Provide information"
    Then the page URL should be "/respond-to-the-courts-feedback"
    And the page should include "Respond to the court's feedback"

    Given I select "I'm having trouble uploading some or all of my documents"
    When I click "Continue"
    Then the page URL should be "/applicant2/review-your-response-to-the-courts-feedback"
    And the page should include "Review your response"

    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have told us that you cannot upload some or all of your documents."

    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "You have told us that you cannot upload some or all of your documents."

  @nightly
  Scenario: [5] Applicant joint rfi third party journey
    Given a case worker issues a request for information to a third party on a joint case
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has reviewed your application for divorce."
    And the page should include "We have sent an email to a Third party with the information that the court needs."
    And the page should include "The court will review the information from the Third party once provided, then the application can progress."

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has reviewed your application for divorce."
    And the page should include "We have sent an email to a Third party with the information that the court needs."
    And the page should include "The court will review the information from the Third party once provided, then the application can progress."
