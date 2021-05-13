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
    Then the page should include "You may not be able to get a divorce in England and Wales"

  Scenario: Was last habitually resident in England or Wales and does one of you still live here?
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts"
