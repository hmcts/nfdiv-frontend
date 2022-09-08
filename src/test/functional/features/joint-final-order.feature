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

#  //TODO when final order is implemented change test to user path instead of changing the states for each page
  Scenario: Applicant joint final order journey within a year
    And I set the case state to "AwaitingFinalOrder"
    Then the page should include "You have applied for a ‘final order’."
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "You have applied for a ‘final order’."

    And I set the case state to "FinalOrderRequested"
    Then the page should include "You and your wife have both confirmed you want to finalise the divorce"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "You and your husband have both confirmed you want to finalise the divorce"
