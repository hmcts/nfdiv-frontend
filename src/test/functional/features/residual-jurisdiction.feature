Feature: Residual Jurisdiction

  Background:
    Given I login
    When I go to '/are-you-eligible-for-residual-jurisdiction'
    Then the page should include "Residual jurisdiction"

  @nightly
  Scenario: Error when not answering are you eligible for residual jurisdiction?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Not eligible for residual jurisdiction
    Given I select "No"
    When I click "Continue"
    Then the page should include "You may not be able to get a divorce in England and Wales"

  Scenario: eligible for residual jurisdiction
    Given I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
