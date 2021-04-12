Feature: How to apply to serve (deliver) the papers another way

  Background:
    Given I login
    When I go to "/how-to-apply-to-serve"
    Then the page should include "How to apply to serve (deliver) the papers another way"
    And the page should include "You have to make a separate application to serve the divorce papers another way"

  Scenario: Continuing
    Given I click "Continue"
    Then the page URL should be "/other-court-cases"

  Scenario: Apply to serve for civil partnerships
    Given I go to '/how-to-apply-to-serve?forceCivilMode'
    Then the page should include "You have to make a separate application to serve the ending a civil partnership papers another way"
