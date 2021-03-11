Feature: Living in England or Wales for the last 12 months

  Background:
    Given I login
    When I go to '/living-england-wales-twelve-months'
    Then the page should include "Have you been living in England or Wales for the last 12 months?"

  @nightly
  Scenario: Error when not answering Have you been living in England or Wales for the last 12 months?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Have not lived in England or Wales for the last 12 months
    And I select "No"
    When I click "Continue"
    Then the page should include "Your domicile"

  Scenario: Successfully completing the form
    And I select "Yes"
    And I click "Continue"
    Then the page should include "Interstitial"
