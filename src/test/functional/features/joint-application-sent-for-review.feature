Feature: Joint Application Sent for Review

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"

  Scenario: Cannot go back from application-sent-for-review page
    When I go to "/application-sent-for-review"
    Then the page URL should be "/application-sent-for-review"
    And I cannot go back to the previous page

  Scenario: Cannot go back from no-response-yet page
    When I go to "/no-response-yet"
    Then the page URL should be "/no-response-yet"
    And I cannot go back to the previous page

  Scenario: Cannot go back from needs-to-confirm-joint-application page
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I go to '/applicant2/needs-to-confirm-joint-application'
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    And I cannot go back to the previous page

  Scenario: Cannot go back from your-comments-sent page
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I go to '/applicant2/your-comments-sent'
    Then the page URL should be "/applicant2/your-comments-sent"
    And I cannot go back to the previous page
