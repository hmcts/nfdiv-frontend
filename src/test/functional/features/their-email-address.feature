Feature: Their email address

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to '/their-email-address'
    Then the page should include "Enter your husband's email address"

  Scenario: Successfully enter their email address
    Given I clear the form
    Given I select "Your husband's email address"
    And I type "test@test.com"
    When I click "Continue"
    Then the page URL should be "/do-you-have-address"

  Scenario: Successfully enter do not know their email
    Given I clear the form
    Given I select "I do not know their email address"
    When I click "Continue"
    Then the page URL should be "/do-you-have-address"

  Scenario: Error when entering both their email and selecting I do not know their email
    Given I clear the form
    Given I select "Your husband's email address"
    And I type "test@test.com"
    Given I select "I do not know their email address"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Error when entering invalid email
    Given I clear the form
    Given I select "Your husband's email address"
    And I type "test.com"
    When I click "Continue"
    Then the page should include "There was a problem"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
