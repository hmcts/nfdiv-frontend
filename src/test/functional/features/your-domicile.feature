Feature: Your domicile

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/your-domicile"
    Then the page should include "Your domicile"

  Scenario: Successfully completing the form Yes/Yes (Your domicile)
    Given I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/jurisdiction/interstitial"

  Scenario: Successfully completing the form Yes/No (Your domicile)
    Given I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-six-months"

  Scenario: Successfully completing the form No/Yes (Your domicile)
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  Scenario: Successfully completing the form No/No (Your domicile)
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
