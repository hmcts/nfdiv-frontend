Feature: No fault union dissolution application submission

  Background:
    Given I login
    When I go to '/your-details'
    Then the page should include "Apply for a divorce"
    And I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
    And the page should include "Who are you applying to divorce?"

  Scenario: Successfully submitting a no fault union dissolution application
    Given I've completed all happy path questions correctly to get to check your answers page
    And I go to '/check-your-answers'
    And I clear the form
    When I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    And I click "Continue to payment"
    Then the page URL should be "/pay-fee"
