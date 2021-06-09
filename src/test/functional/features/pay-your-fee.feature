Feature: Pay your fee

  Background:
    Given I login

  Scenario: Continuing to payment
    Given I've completed all happy path questions correctly
    Then the page URL should be "/pay-your-fee"
    And the page should include "Pay your divorce fee"
    And I go to "/"
    And the page URL should be "/pay-your-fee"
    And I click "Back"
    Then the page URL should be "/check-your-answers"
