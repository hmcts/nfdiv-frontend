Feature: Existing Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I click "Sign out"
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I set applicant 2's email address
    And I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/existing-application"

  Scenario: Continuing with existing application
    When I click "I want to continue with my existing application"
    And I click "Continue"
    Then the page URL should be "/application-sent-for-review"

  Scenario: Joining new application
    When I click "I want to join the new application"
    And I click "Continue"
    Then the page URL should be "/applicant2/enter-your-access-code"
