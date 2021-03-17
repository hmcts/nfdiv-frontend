Feature: Habitually Resident

  Background:
    Given I login
    When I go to '/habitually-resident-england-wales'
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"

  Scenario: Error when not answering did you get married in the UK?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Was last habitually resident in England or Wales and does one of you still live here?
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use the English or Welsh court"

  Scenario: Was not last habitually resident in England or Wales and is same sex?
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
    Given I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    When I go to '/habitually-resident-england-wales'
    And I select "No"
    When I click "Continue"
    Then the page should include "Page not found"

  Scenario: Was not last habitually resident in England or Wales and is not same sex?
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
    Given I select "My husband"
    And I click "Continue"
    When I go to '/habitually-resident-england-wales'
    And I select "No"
    When I click "Continue"
    Then the page should include "Page not found"
