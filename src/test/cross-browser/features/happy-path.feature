Feature: No fault union dissolution application submission

  Background:
    Given I create a new user and login
    Then the page URL should be "YOUR_DETAILS_URL"
    And the page should not include a back link

  Scenario: Successfully submitting a no fault union dissolution application
    Given I've completed all happy path questions correctly
    Then I pay and submit and expect the application to be saved
