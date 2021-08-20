Feature: Applicant 2 Confirm Your Joint Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I go to '/applicant2/confirm-your-joint-application'
    Then the page should include "Confirm your joint application"

  Scenario: Checking answers
    And the page should include "Yes, the marriage has irretrievably broken down"
    And the page should include "About your marriage"
    And the page should include "When did you get married?	31 December 1999"
    And the page should include "Help with fees"
    And the page should include "Is help with fees being claimed on this application?	No, because both applicants did not apply"
    And the page should include "Did you get married in the UK?	Yes"

  @nightly
  Scenario: Not confirming answers
    And I clear the form
    And I click "Continue"
    And the page should include "There was a problem"
    And the page should include "You have not confirmed"


  Scenario: Confirming answers is correct
    When I go to '/applicant2/enter-your-name'
    And I clear the form
    When I select "Your first name"
    And I type "My first name"
    And I select "Your last name"
    And I type "My last-name"
    And I click "Continue"
    And I go to '/applicant2/confirm-your-joint-application'
    And I select "I confirm that I’m applying to the court with my wife to:"
    And I select "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
