Feature: Final order

  Background: Logged in for hub page
    Given I create a new user and login

  Scenario: Applicant sole final order journey within a year
    Given I've already completed the form using the fixture "finalOrderCompleteCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    And I set the case state to "AwaitingFinalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a 'final order'."

    When I click "Apply for a final order"
    Then the page should include "Do you want to finalise your divorce?"

    Given I select "I want to finalise my divorce"
    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a ‘final order’. Your application will be checked by court staff."
    And the page should include "You should receive an email within 2 working days,"

  @nightly
  Scenario: Applicant sole final order journey overdue
    Given I've already completed the form using the fixture "finalOrderOverdueCompleteCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    And I set the case state to "FinalOrderOverdue"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a 'final order'."

    When I click "Apply for a final order"
    Then the page should include "Do you want to finalise your divorce?"
    Given I select "I want to finalise my divorce"

    When I click "Submit"
    And the page should include "Explain the delay"
    Given I select "You are making this application for a final order over one year from when the conditional order was made. Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application."
    And I type "Reason for delay"
    And I select "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/hub-page"

  Scenario: Respondent sole final order journey
    Given I've already completed the form using the fixture "finalOrderOverdueCompleteCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    And I set the case state to "FinalOrderOverdue"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "Your wife has still not applied for a 'final order'"
    And the page URL should be "/respondent/hub-page"

    Given a superuser updates "dateFinalOrderEligibleToRespondent" with "2020-01-01"
    When I set the case state to "AwaitingFinalOrder"
    And I click "Apply for a final order"
    Then the page URL should be "/respondent/finalising-your-application"

    Given I click "I want permission to apply for a final order, and to finalise my divorce"
    And I select "Explain why you need to apply for the final order"
    And I type "I want to apply myself"
    When I click "Submit"
    Then the page URL should be '/respondent/hub-page'
    And the page should include "You need to pay"
    And the page should include "If you need help paying the fee"

    Given I click "Sign out"
    When I login with applicant "1"
    Then the page should include "Your husband has applied for a ‘final order’."
    And the page should include "A judge will review the application"
    And the page should include "You will then receive an email telling you what they decide."
