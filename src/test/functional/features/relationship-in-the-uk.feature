Feature: Married in the UK

  Background:
    Given I login
    When I go to '/in-the-uk'
    Then the page should include "Did you get married in the UK?"

  @nightly
  Scenario: Error when not answering did you get married in the UK?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Did not get married in the UK?
    Given I select "No"
    When I click "Continue"
    Then the page should include "Is your original marriage certificate in English?"

  Scenario: Successfully completing the form (Married in the UK)
    Given I select "Yes"
    When I click "Continue"
    Then the page URL should be "/check-jurisdiction"
    And the page should include "Check if you can get a divorce in England and Wales"
