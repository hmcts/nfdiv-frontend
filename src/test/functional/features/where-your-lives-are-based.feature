Feature: Where your lives are based

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/where-your-lives-are-based"
    Then the page should include "Where your lives are based"

  Scenario: Successfully completing the form Yes/Yes (Where your lives are based)
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/jurisdiction/interstitial"

  Scenario: Successfully completing the form Yes/No (Where your lives are based)
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-twelve-months"

  Scenario: Successfully completing the form No/Yes (Where your lives are based)
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/jurisdiction/interstitial"

  Scenario: Successfully completing the form No/No (Where your lives are based)
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/your-domicile"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
