Feature: Hub page

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicationCompleteCase"
    And I go to "/"
    Then the page URL should be "/hub-page"

  Scenario: Applicant 1 has not confirmed the receipt
    When I go to "/"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"

  Scenario: Applicant 1 confirms receipt
    Given I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."
    And the page should include "2021-07-26"

