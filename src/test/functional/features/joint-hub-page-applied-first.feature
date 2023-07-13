Feature: Joint hub page

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1AppliedFirstCompleteCase"
    Given I go to "/"
    When I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

  Scenario: Joint hub applicant 1 and applicant 2 applied first
    Given I set the case state to "AwaitingFinalOrder"
    And I go to "/"
    Then the page should include "You have applied for a ‘final order’. Your wife also has to apply because this is a joint application. They have been sent an email reminder."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have applied for a ‘final order’. Your husband also has to apply because this is a joint application. They have been sent an email reminder."
