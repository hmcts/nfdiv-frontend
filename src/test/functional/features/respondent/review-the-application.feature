Feature: Respondent review the application

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I set the case state to "AwaitingAos"
    When I go to '/respondent/review-the-application'
    Then the page should include "Review the divorce application"
    And the page should include "Sole divorce application"
    And the page should include "Who the marriage is between"
    And the page should include "First name Last name and Husbands name (as shown on the marriage certificate)"
    And the page should include "Other court cases"
    And the page should include "The applicant has indicated that there are no other court cases which are related to the marriage"
    And the page should include "Financial order application"
    And the page should include "The applicant is not intending to apply to the court for financial orders."

  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "You need to confirm that you have read the application before you continue."
