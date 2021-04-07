Feature: You need to get their address

  Background:
    Given I login
    When I go to '/need-to-get-address'
    Then the page should include "You need to get their address"

  Scenario: Successfully completing the form
    Given I select "I want to apply to have the divorce papers ‘served’ (delivered) to them another way"
    When I click "Continue"
    Then the page URL should be "/other-court-cases"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "If you want to apply to have the papers served to them another way then you need to check the box before continuing"
