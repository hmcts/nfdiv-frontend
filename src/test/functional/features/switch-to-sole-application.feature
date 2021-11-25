Feature: Switch To Sole Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"

  Scenario: Switching to Sole application by Applicant 1
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant 2
    And I go to '/applicant2/check-your-joint-application'
    And I click "Yes"
    When I click "Continue"
    And I go to '/applicant2/confirm-your-joint-application'
    And I clear the form
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    And I click "Sign out"
    Given I login with applicant 1
    And I go to '/confirm-your-joint-application'
    And I clear the form
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    And I click "Continue"
    And I go to '/switch-to-sole-application'
    And I click "Create a new application"
    Then the page URL should be "/your-details"
    Given I select "My husband"
    When I click "Continue"
    Then the page URL should be "/irretrievable-breakdown"

  Scenario: Switching to Sole application by Applicant 1 before Applicant 2 links to the case
    Given I go to '/switch-to-sole-application'
    And I click "Create a new application"
    Then the page URL should be "/your-details"
    Given I go to "/"
    Then the page URL should be "/check-your-answers"

  Scenario: Switching to Sole application by Applicant 2
    Given I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant 2
    And I go to '/applicant2/check-your-joint-application'
    And I click "Yes"
    When I click "Continue"
    Then the page should include "Check your answers so far"
    Given I go to "/applicant2/confirm-your-joint-application"
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"
    And the page should include "Your wife needs to confirm your joint application"
    Given I go to "/switch-to-sole-application"
    And I click "Create a new application"
    Then the page URL should be "/your-details"
    Given I select "My husband"
    When I click "Continue"
    Then the page URL should be "/irretrievable-breakdown"

  Scenario: Switching to Sole application by Applicant 1 in AwaitingApplicant1Response state
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    And I click "Continue"
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant 2
    And I go to '/applicant2/check-your-joint-application'
    Given I select "No" for "Is the information your wife provided correct?"
    And I select "Explain what is incorrect or needs changing. Your answer will be sent to your wife."
    And I type "Incorrect test details"
    When I click "Continue"
    Then the page URL should be "/applicant2/your-comments-sent"
    And the page should include "Your comments have been sent to your wife"
    Given I click "Sign out"
    When I login with applicant 1
    Given I go to "/how-do-you-want-to-apply"
    Given I select "I want to apply on my own, as a sole applicant"
    When I click "Continue"
    Then the page URL should be "/in-the-uk"
    Given I go to "/enter-their-name"
    Given I clear the form
    When I select "Your husband’s first name"
    And I type "Billy"
    And I select "Your husband’s last name"
    And I type "Bob"
    When I click "Continue"
    Given I go to "/enter-their-address"
    Then the page should include "Enter your husband’s postal address"
    Given I select "Enter a UK postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results
    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
    When I click "Continue"
    Then the page URL should be "/other-court-cases"
    Given I go to "/check-your-answers"
    Given I select "I confirm that I’m applying to the court to:"
    And I select "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    Then the page should include "Pay your divorce fee"
