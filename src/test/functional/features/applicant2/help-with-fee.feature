Feature: Applicant 2 Help with fee

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/check-your-answers"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    When I go to '/applicant2/help-with-your-fee'
    Then the page should include "Help with the divorce fee"

  @nightly
  Scenario: They have not indicated if they need help paying for the fees
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They need help paying for the fees, but don't have a HWF reference number
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    And I select "No"
    And I click "Continue"
    Then the page should include "You need to apply for help with your divorce fees"

  @nightly
  Scenario: Error when missing required reference number
    Given I go to '/applicant2/have-you-applied-for-help-with-fees'
    And I clear the form
    When I select "Yes"
    When I click "Continue"
    Then the page should include "There was a problem"
    And I clear the form
    When I select "Yes"
    When I select "Enter your Help With Fees reference number"
    And I type "invalid"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They need help paying the fee and have a valid reference number
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page should include "Have you already applied for help with your divorce fee?"
    And I clear the form
    And I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"
    When I click "Continue"
    Then the page should include "Enter your name"

  Scenario: They do not need help paying the fee
    Given I select "I do not need help paying the fee"
    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-name"
