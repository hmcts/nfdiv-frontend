Feature: Your domicile

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/your-domicile"
    Then the page should include "Your domicile"

  Scenario: Successfully completing the form Yes/Yes
    Given I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/you-can-use-english-welsh-courts"

  Scenario: Successfully completing the form Yes/No (when your life not based in England)
    Given I go to "/where-your-lives-are-based"
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    When I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  Scenario: Successfully completing the form Yes/No (when your life based in England)
    Given I've completed all questions correctly to get to the jurisdiction section
    And I go to "/where-your-lives-are-based"
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    When I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-six-months"

  Scenario: Successfully completing the form No/Yes
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  Scenario: Successfully completing the form No/No
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
