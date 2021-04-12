Feature: Contact details kept private

  Background:
    Given I login
    And I've said I'm divorcing my husband
    And I go to '/address-private'
    Then the page should include "Do you need your contact details kept private from your husband"

  @nightly
  Scenario: Error when not answering Do you need your contact details kept private from your husband?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Successfully completing the form (contact details kept private)
    And I select "Keep my contact details private"
    And I click "Continue"
    Then the page URL should be "/enter-your-address"
