Feature: Pay your fee

  Background:
    Given I login
    When I go to "/pay-your-fee"
    Then the page should include "Pay your divorce fee"

  Scenario: Continuing to payment
    When I click "Pay and submit application"
    Then the page URL should be "/check-your-answers"
