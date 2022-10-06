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

    When I click "Continue"
    Then the page URL should be "/respondent/how-do-you-want-to-respond"
    Given I've already completed the form using the fixture "respondentCompleteCase" for "respondent"
    And I go to '/respondent/check-your-answers'
    And I select "I confirm that:"

    When I click "Submit"
    Then the page URL should be "/respondent/hub-page"

  Scenario: Applicant 1 applies for conditional order and responds with additional information
    Given I set the case state to "AwaitingConditionalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’"

    When I click "Apply for conditional order"
    Then the page URL should be "/read-the-response"
    And the page should include "Read your husband's response"

    When I click "Continue"
    Then the page URL should be "/continue-with-your-application"
    And I click "I want to continue with my divorce application"

    When I click "Continue"
    Then the page URL should be "/review-your-application"
    Given I click "Yes"
    And I click "Continue"
    And I click "I believe that the facts stated in this application are true"
    And I click "Submit"
    Then the page URL should be "/hub-page"

  @flaky
  Scenario: Applicant 1 response with additional information and uploads for condition order
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    And I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"

    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"

    When I click "Continue"
    Then the page URL should be "/hub-page"
    And the page should include "You have provided the information requested by the court."
    And the page should include "This was the court’s feedback, explaining what was needed"

    Given I click "Sign out"
    And I login with applicant "2"
    Then the page should include "Your wife has provided the information requested by the court."
    And the page should include "This was the court’s feedback, explaining the information which was needed"
