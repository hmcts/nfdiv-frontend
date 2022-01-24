Feature: Sole conditional order

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    Then the page URL should be "/respondent/hub-page"
    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    And the page should include "Review the divorce application"
    Given I select "I have read the application for divorce"
    And I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    Given I've already completed the form using the fixture "respondentCompleteCase" for respondent
    And I go to '/respondent/check-your-answers'
    Given I select "I confirm that:"
    When I click "Submit"
    Then the page URL should be "/respondent/hub-page"
    And I set the case state to "AwaitingConditionalOrder"
    And I click "Sign out"
    And I login with applicant "1"

  Scenario: Applicant 1 applies for condition order
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/read-the-response"
    And the page should include "Read your husband's response"
    And I click "Continue"
    Then the page URL should be "/continue-with-your-application"
    And I click "I want to continue with my divorce application"
    And I click "Continue"
    Then the page URL should be "/review-your-application"
    And I click "Yes"
    And I click "Continue"
    And I click "I believe that the facts stated in this application are true"
    And I click "Continue"
    Then the page URL should be "/hub-page"
