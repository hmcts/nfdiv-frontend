Feature: Applicant 2 Language Preference

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/english-or-welsh'
    Then the page should include "What language do you want to receive emails and documents in?"

  @nightly
  Scenario: Error when not answering language preference?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  @nightly
  Scenario: Select English as preferred language
    And I select "English"
    When I click "Continue"
    Then the page URL should be "/applicant2/address-private"

  @nightly
  Scenario: Select Welsh as preferred language
    And I select "Welsh"
    And I click "Continue"
    Then the page URL should be "/applicant2/address-private"
