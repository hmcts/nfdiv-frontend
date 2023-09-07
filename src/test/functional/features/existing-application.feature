Feature: Existing Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    Given I click "Sign out"
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I set the email address for applicant 2
    And I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/existing-application"

  @nightly
  Scenario: Continuing with existing application
    When I click "I want to continue with my existing application"
    And I click "Continue"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"

  @nightly
  Scenario: Joining new application
    When I click "I want to join the new application"
    And I click "Continue"
    Then the page URL should be "/applicant2/enter-your-access-code"
