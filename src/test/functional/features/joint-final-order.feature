Feature: Joint final order

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"

  Scenario: Applicant joint final order journey within a year
    And I set the case state to "AwaitingFinalOrder"
    When I click "Stop here"
    And I login with applicant "1"
    Then the page should include "You can now apply for a 'final order'."

    When I click "Apply for a final order"
    Then the page should include "Do you want to finalise your divorce?"
    Given I select "I want to finalise my divorce"

    When I click "Continue"
    Then the page URL should be "/hub-page"
