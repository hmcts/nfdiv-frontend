Feature: Final order

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    And I set the case state to "AwaitingFinalOrder"

  Scenario: Applicant sole final order journey within a year
    Given a superuser updates "dateFinalOrderNoLongerEligible" with "2025-05-05"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a 'final order'."

    When I click "Apply for a final order"
    Then the page should include "Do you want to finalise your divorce?"
    Given I select "I want to finalise my divorce"

    When I click "Continue"
    Then the page URL should be "/hub-page"

  Scenario: Respondent sole final order journey
    Given a superuser updates "dateFinalOrderEligibleToRespondent" with "2022-01-01"
    When I click "Sign out"
    And I login with applicant "2"

    Given I go to "/"
    Then the page should include "Your wife has still not applied for a 'final order'"
    Given I click "Apply for a final order"
    Then the page URL should be '/respondent/finalising-your-application'
