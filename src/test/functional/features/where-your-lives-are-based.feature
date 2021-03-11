Feature: Where your lives are based

  Background:
    Given I login
    When I go to "/where-your-lives-are-based"
    Then the page should include "Where your lives are based"

  Scenario: Successfully completing the form
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s / wife’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "Check your answers"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
