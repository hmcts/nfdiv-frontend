Feature: Language Preference

  Background:
    Given I login
    When I go to '/english-or-welsh'
    Then the page should include "What language do you want to receive emails and documents in?"

  Scenario: Error when not answering language preference?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Select English as preferred language
    And I select "English"
    When I click "Continue"
    Then the page URL should be "/address-private"

  Scenario: Select Welsh as preferred language
    And I select "Welsh"
    And I click "Continue"
    Then the page URL should be "/address-private"
