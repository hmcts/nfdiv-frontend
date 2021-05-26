Feature: Pay your fee

  Background:
    Given I login

  Scenario: Continuing to payment
    When I go to "/pay-your-fee"
    Then the page should include "Pay your divorce fee"
