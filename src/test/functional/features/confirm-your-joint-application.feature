Feature: Confirm Your Joint Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I click "Continue"
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant 2
    And I go to '/applicant2/confirm-your-joint-application'
    And I clear the form
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    And I go to '/confirm-your-joint-application'

  Scenario: confirming joint application
    And I clear the form
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/pay-your-fee"

  Scenario: Not confirming answers
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
