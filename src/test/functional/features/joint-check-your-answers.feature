Feature: Check Your Answers (Joint Application)

  Background:
    Given I create a new user and login

  Scenario: Checking answers as a joint applicant
    Given I've completed enough questions correctly to get to the check your answers page as a joint applicant
    When I go to '/check-your-answers'
    Then the page should include "Your answers will be sent to your husband to review. Once they have reviewed and provided some of their own information then the application will be ready to submit."

  Scenario: Sending application to applicant 2 to confirm
    Given I've completed enough questions correctly to get to the check your answers page as a joint applicant
    And I go to '/check-your-answers'
    And I click "Send for Review"
    Then the page URL should be "/application-sent-for-review"
