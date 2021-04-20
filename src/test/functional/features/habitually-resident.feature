Feature: Habitually Resident

  Background:
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section
    When I go to '/habitually-resident-england-wales'
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"

  @nightly
  Scenario: Error when not answering did you get married in the UK?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Was last habitually resident in England or Wales and does one of you still live here?
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts"

  # Scenario: Was not last habitually resident in England or Wales and is same sex
  # Tested in can-use-english-or-welsh-courts.feature: G Eligible for Residual Jurisdiction

  Scenario: Was not last habitually resident in England or Wales and is not same sex
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
    Given I select "My husband"
    And I click "Continue"
    When I go to '/habitually-resident-england-wales'
    And I select "No"
    When I click "Continue"
    Then the page URL should be "/connection-summary"

  Scenario: Was not last habitually resident and not domicile in England or Wales
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
    Given I select "My husband"
    When I go to '/where-your-lives-are-based'
    Then the page should include "Where your lives are based"
    Given I clear the form
    When I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    When I go to '/your-domicile'
    Then the page should include "Your domicile"
    Given I clear the form
    When I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    When I go to '/habitually-resident-england-wales'
    And I select "No"
    When I click "Continue"
    Then the page URL should be "/you-may-not-be-able-to-england-and-wales"
