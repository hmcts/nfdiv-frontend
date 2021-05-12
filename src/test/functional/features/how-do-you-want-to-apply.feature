Feature: How do you want to apply

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/how-do-you-want-to-apply"
    Then the page should include "How do you want to apply for the divorce?"

  Scenario: They have not indicated how they want to apply
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not answered the question. You need to select an answer before continuing."

  Scenario: They want to apply as a sole application
    When I select "I want to apply on my own, as a sole applicant"
    When I click "Continue"
    Then the page should include "Do you need help paying the fee for your divorce?"

  Scenario: They want to apply as a joint application
    When I select "I want to apply jointly, with my husband"
    When I click "Continue"
    Then the page should include "Enter your husband's email address"
       

    