Feature: Joint final order

  Background: Logged in for hub page
    Given I create a new user and login

  @nightly
  Scenario: [1] Applicant joint final order journey within a year
    Given I've already completed the form using the fixture "jointFinalOrderCompleteCase"
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

    And I set the case state to "AwaitingFinalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a ‘final order’. Your husband also has to apply because this is a joint application."
    And the page should include "They have been sent an email reminder."

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"
    Given I select "I want to finalise my divorce"
    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "You and your wife have both confirmed you want to finalise the divorce."

  @nightly
  Scenario: [2] Applicant 1 joint switch to sole final order journey
    Given I've already completed the form using the fixture "jointFinalOrderCompleteCase"
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

    And I set the case state to "AwaitingFinalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a ‘final order’. Your husband also has to apply because this is a joint application."
    And the page should include "They have been sent an email reminder."

    Then I set the case state to "AwaitingJointFinalOrder"
    And a superuser updates "dateFinalOrderSubmitted" with "2022-09-21T08:08:34.548"

    Given I click "Sign out"
    When I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "STOP HERE"

  @nightly
  Scenario: [3] Applicant 2 joint switch to sole final order journey
    Given I've already completed the form using the fixture "jointFinalOrderCompleteCase"
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

    And I set the case state to "AwaitingFinalOrder"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have applied for a ‘final order’. Your wife also has to apply because this is a joint application."
    And the page should include "They have been sent an email reminder."

    Then I set the case state to "AwaitingJointFinalOrder"
    And a superuser updates "dateFinalOrderSubmitted" with "2022-09-21T08:08:34.548"

    Given I click "Sign out"
    When I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "STOP HERE"
