Feature:

  Background:
    Given I create a new user and login

  Scenario: Completed all required questions and confirming with HWF
    Given I've completed all happy path questions correctly
    Given I pay and submit the application
    And the page should include "Application submitted"
