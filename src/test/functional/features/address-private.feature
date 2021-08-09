Feature: Contact details kept private

  Background:
    Given I login
    And I've said I'm divorcing my husband
    And I go to '/address-private'
    Then the page should include "Do you need your contact details kept private from your husband"

  Scenario: Error when not answering Do you need your contact details kept private from your husband?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They want to keep their details private
    And I select "Keep my contact details private"
    Then the page should include "If you think you might be experiencing domestic abuse or you feel unsafe, then support is available"
    And I click "Continue"
    Then the page URL should be "/enter-your-address"
