Feature: Pay your fee

  Background:
    Given I login

  Scenario: Continuing to payment
    Given I've already completed all questions correctly
    And I go to '/check-your-answers'
    And I clear the form
    When I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    And I click "Continue to payment"
    Then the page URL should be "/pay-your-fee"
    And the page should include "Pay your divorce fee"
    And I go to "/"
    And the page URL should be "/pay-your-fee"
    And I click "Back"
    Then the page URL should be "/check-your-answers"
