Feature: Jurisdiction - may not be able to get a divorce in England and Wales

  Background:
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section
    When I go to '/you-may-not-be-able-to-england-and-wales'
    Then the page should include "You may not be able to get a divorce in England and Wales"

  @nightly
  Scenario: Was not last habitually resident in England or Wales and is not same sex
    When I go to '/where-your-lives-are-based'
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You may not be able to get a divorce in England and Wales"

  @nightly
  Scenario: Not eligible for residual jurisdiction
    Given I go to "/are-you-eligible-for-residual-jurisdiction"
    When I click "Continue"
    Then the page should include "You may not be able to get a divorce in England and Wales"
    When I click "Check how you’re legally connected to England or Wales again"
    Then the page URL should be "/check-jurisdiction"
