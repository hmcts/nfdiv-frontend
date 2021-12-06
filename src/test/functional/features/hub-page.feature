Feature: Hub page

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    And I've already completed the form using the fixture "jointApplicant2CompleteCase"
    And I go to '/applicant2/check-your-joint-application'
    And I click "Yes"
    When I click "Continue"
    Then the page should include "Check your answers so far"
    Given I go to "/applicant2/confirm-your-joint-application"
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    Given I click "Sign out"
    When I login with applicant "1"
    And I go to '/confirm-your-joint-application'
    And I click "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    Then the page URL should be "/pay-and-submit"
    Given I pay and submit the joint application
    Then the page should include "Application submitted"
    When a case worker issues the application
    And I click "Sign out"

  Scenario: Joint Applicant 1 confirms receipt
    When I login with applicant "1"
    And I go to "/"
    Then the page URL should be "/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."

  Scenario: Joint Applicant 2 confirms receipt
    When I login with applicant "2"
    And I go to "/"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."

