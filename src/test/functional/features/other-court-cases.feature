Feature: Other court cases

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to '/other-court-cases'
    Then the page should include "Other court cases"

  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They don't have any other court cases
    Given I select "No"
    When I click "Continue"
    Then the page URL should be "/dividing-money-property"

  Scenario: They do have other court cases
    Given I select "Yes"
    Given I select "Marriage"
    Given I select "Property"
    When I click "Continue"
    Then the page URL should be "/details-other-proceedings"


  Scenario: They don't indicate if they have any other court cases
    Given I clear the form
    When I select "Yes"
    And I click "Continue"
    Then the page should include "There was a problem"
