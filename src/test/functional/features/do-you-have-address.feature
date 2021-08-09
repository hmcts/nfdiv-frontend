Feature: Do you have address

  Background:
    Given I login
    And I've said I'm divorcing my husband
    And I've said I'm applying as a sole application
    And I've said I do not have my husband's email address
    Then the page should include "Do you have your husband's postal address?"

  Scenario: They have their partners address
    Given I clear the form
    Given I select "Yes, I have their address"
    When I click "Continue"
    Then the page URL should be "/enter-their-address"

  Scenario: They do not know their partners address
    Given I clear the form
    Given I select "No, I do not have their address"
    When I click "Continue"
    Then the page URL should be "/need-to-get-address"


  Scenario: They have not indicated if they have their partners postal address
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
