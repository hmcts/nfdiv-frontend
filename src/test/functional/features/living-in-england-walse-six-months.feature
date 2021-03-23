Feature: Living in England or Wales for the last 6 months

  Background:
    Given I login
    When I go to '/living-england-wales-six-months'
    Then the page should include "Have you been living in England or Wales for the last 6 months?"

  @nightly
  Scenario: Error when not answering Have you been living in England or Wales for the last 6 months?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Have not lived in England or Wales for the last 6 months??
    And I select "No"
    When I click "Continue"
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"

  Scenario: Successfully completing the form (Living in England or Wales for the last 6 months)
    And I select "Yes"
    And I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
