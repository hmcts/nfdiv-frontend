Feature: You need to get their address

  Background:
    Given I login
    When I go to '/need-to-get-address'
    Then the page should include "You need to get their address"

  Scenario: Choosing that they want to serve papers another way
    Given I select "I want to apply to have the divorce papers ‘served’ (delivered) to them another way"
    When I click "Continue"
    Then the page URL should be "/how-to-apply-to-serve"

  Scenario: Not choosing to serve papers another way
    Given I clear the form
    When I click "Continue"
    Then the page URL should be "/enter-their-address"
