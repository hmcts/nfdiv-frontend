Feature: Jurisdiction - may not be able to get a divorce in England and Wales

  Scenario: May not have jurisdiction
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section

    # Was not last habitually resident in England or Wales and is not same sex
    And I go to "/check-jurisdiction"
    When I click "Continue"
    Then the page URL should be "/where-your-lives-are-based"
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You may not be able to get a divorce in England and Wales"

    Given I reset the jurisdiction connections
    And I go to '/check-jurisdiction'
    And I click "Continue"

    # Not eligible for residual jurisdiction
    Given I go to "/are-you-eligible-for-residual-jurisdiction"
    And I select "No"
    When I click "Continue"
