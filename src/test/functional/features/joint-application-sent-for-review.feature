Feature: Joint Application Sent for Review

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I cannot go back to the previous page
