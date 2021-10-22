Feature: Respondent review the application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Respond to the application"
    Then the page should include "Review the divorce application"
    And the page should include "Sole divorce application"
    And the page should include "Who the marriage is between"
    And the page should include "First name Last name and Husbands name (as shown on the marriage certificate)"
    And the page should include "Other court cases"
    And the page should include "The applicant has indicated that there are no other court cases which are related to the marriage"
    And the page should include "Financial order application"
    And the page should include "The applicant is not intending to apply to the court for financial orders."

  Scenario: They confirm they have read the application
    Given I select "I have read the application for divorce"
    And I select "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"

  @nightly
  Scenario: Failed to fill in the form
    Given I clear the form
    When I click "Continue"
    Then the page should include "You need to confirm that you have read the application before you continue."
