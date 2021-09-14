Feature: Application Ended

  Scenario: Applicant 2 Unlinked From Case
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I click "Continue"
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"
    And I click "No"
    And I click "Continue"
    Then the page should include "You cannot apply to get a divorce"
    And I click "End joint application"
    Then the page should include "You have not confirmed your joint application"
    And I click "Sign out"
    Given I login with applicant 1
    Then the page URL should be "/application-ended"
