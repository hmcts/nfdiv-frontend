Feature: Respondent Hub page

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"

  Scenario: Holding state
    And I set the case state to "Holding"
    And I go to "/respondent/hub-page"
    Then the page should include "You have responded to the divorce application. You do not have to do anything further."

  Scenario: Pending dispute state
    And I set the case state to "PendingDispute"
    And I go to "/respondent/hub-page"
    Then the page should include "and said that you want to dispute it."

  Scenario: Disputed state
    And I set the case state to "Disputed"
    And I go to "/respondent/hub-page"
    Then the page should include "You’ll receive a letter in the post telling you if you need to attend the hearing, and where it will be."

