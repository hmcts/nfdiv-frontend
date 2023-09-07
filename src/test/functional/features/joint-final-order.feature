Feature: Joint final order

  Background: Logged in for hub page and progress case to AwaitingFinalOrder
    Given I create a new user and login
    And I've already completed the form using the fixture "jointFinalOrderCompleteCase"
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
    Then I click "Sign out"

  @nightly
  Scenario: [1] Applicant joint final order journey within a year
    Given I login with applicant "1"
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
    Given I login with applicant "1"
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
    And a superuser updates "applicant1CanIntendToSwitchToSoleFo" with "Yes"

    Given I click "Sign out"
    When I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "If you do not think they will confirm the application then you can finalise your divorce"

    Given I click "as a sole applicant"
    Then the page URL should be "/how-to-finalise"
    And the page should include "How to finalise your divorce"

    Given I click "I intend to apply for a final order as sole applicant and I want the court to notify my husband"
    Then I click "Confirm"
    Then the page URL should be "/hub-page"
    And the page should include "The court has notified your husband by email that you are intending to apply for a final order as a sole applicant."

    Given I click "Sign out"
    When I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The court has notified your husband by email that you are intending to apply for a final order as a sole applicant."
    Then a superuser updates "dateApplicant1DeclaredIntentionToSwitchToSoleFo" with "2022-10-21"

    Given I click "Sign out"
    When I login with applicant "1"
    Then I click "Apply for final order"
    Then the page URL should be "/finalising-your-application"
    And the page should include "Do you want to finalise your divorce?"
    Then I click "I want to finalise my divorce"
    Then I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a ‘final order’. Your application will be checked by court staff."

  @nightly
  Scenario: [3] Applicant 2 joint switch to sole final order journey
    Given I login with applicant "2"
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
    And a superuser updates "applicant2CanIntendToSwitchToSoleFo" with "Yes"

    Given I click "Sign out"
    When I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "If you do not think they will confirm the application then you can finalise your divorce"

    Given I click "as a sole applicant"
    Then the page URL should be "/applicant2/how-to-finalise"
    And the page should include "How to finalise your divorce"

    Given I click "I intend to apply for a final order as sole applicant and I want the court to notify my wife"
    Then I click "Confirm"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has notified your wife by email that you are intending to apply for a final order as a sole applicant."

    Given I click "Sign out"
    When I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The court has notified your wife by email that you are intending to apply for a final order as a sole applicant."
    Then a superuser updates "dateApplicant2DeclaredIntentionToSwitchToSoleFo" with "2022-10-21"

    Given I click "Sign out"
    When I login with applicant "2"
    Then I click "Apply for final order"
    Then the page URL should be "/applicant2/finalising-your-application"
    And the page should include "Do you want to finalise your divorce?"
    Then I click "I want to finalise my divorce"
    Then I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a ‘final order’. Your application will be checked by court staff."

  Scenario: Applicant joint final order journey overdue applicant 1 applies first
    Given I login with applicant "1"
    And I set the case state to "FinalOrderOverdue"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Continue"
    Then the page URL should be "/explain-the-delay"

    Given I select "You are making this application for a final order over one year from when the conditional order was made. Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application."
    And I type "Applicant 1 reason for delay"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a ‘final order’. Your husband also has to apply because this is a joint application."
    And the page should include "They have been sent an email reminder."

    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Continue"
    Then the page URL should be "/applicant2/explain-the-delay"

    Given I select "You are making this application for a final order over one year from when the conditional order was made. Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application."
    And I type "Applicant 2 reason for delay"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "You and your wife have both confirmed you want to finalise the divorce."

  Scenario: Applicant joint final order journey overdue applicant 2 applies first
    Given I login with applicant "1"
    And I set the case state to "FinalOrderOverdue"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Continue"
    Then the page URL should be "/applicant2/explain-the-delay"

    Given I select "You are making this application for a final order over one year from when the conditional order was made. Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application."
    And I type "Applicant 2 reason for delay"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have applied for a ‘final order’. Your wife also has to apply because this is a joint application."
    And the page should include "They have been sent an email reminder."

    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "You can now apply for a ‘final order’."

    When I click "Apply for final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Continue"
    Then the page URL should be "/explain-the-delay"

    Given I select "You are making this application for a final order over one year from when the conditional order was made. Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application."
    And I type "Applicant 1 reason for delay"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/hub-page"
    Then the page should include "You and your husband have both confirmed you want to finalise the divorce."
