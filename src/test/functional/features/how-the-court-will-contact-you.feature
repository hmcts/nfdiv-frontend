Feature: How the court will contact you

  Background:
    Given I login
    When I go to "/how-the-court-will-contact-you"
    Then the page should include "How the court will contact you"
    And I expect the page title to be "Apply for a divorce - How the court will contact you - GOV.UK"

  Scenario: Successfully completing the form
    Given I clear the form
    And I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    When I click "Continue"
    Then the page should include "What language do you want to receive emails and documents in?"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have to agree to receive email notifications in order to use this online service."

  @nightly
  Scenario: Error when phone number field is invalid
    Given I clear the form
    And I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    When I select "Enter your phone number (optional)"
    And I type "12345"
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "The phone number you have entered is invalid. Enter a valid phone number to continue."
