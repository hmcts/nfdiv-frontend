Feature: No fault union dissolution application submission

  Background:
    Given I create a new applicant "1" user and login

  Scenario: Successfully submitting a no fault union dissolution application
    Given I've completed all happy path questions correctly
    Then I pay and submit and expect the application to be saved
