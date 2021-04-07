Feature: Do you have address

  Background:
    Given I login
    And I've said I'm divorcing my husband
    And I've said I do not have my husband's email address
    Then the page should include "Do you have your husband's postal address?"

  Scenario: Successfully completing the form with Yes, I have their address
    Given I clear the form
    Given I select "Yes, I have their address"
    When I click "Continue"
    Then the page URL should be "/enter-their-address"

  Scenario: Successfully completing the form with No, I do not have their address
    Given I clear the form
    Given I select "No, I do not have their address"
    When I click "Continue"
    Then the page URL should be "/need-to-get-address"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
