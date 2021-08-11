Feature: Applicant 2 How the court will contact you

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/applicant2/how-the-court-will-contact-you"
    Then the page should include "How the court will contact you"
    And I expect the page title to be "Apply for a divorce - How the court will contact you - GOV.UK"

  Scenario: They agree that notification can be sent via email
    Given I clear the form
    And I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    When I click "Continue"
    Then the page should include "What language do you want to receive emails and documents in?"

  @nightly
  Scenario: They don't agree notifications can be sent via email
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have to agree to receive email notifications in order to use this online service."

  @nightly
  Scenario: They enter an invalid phone number
    Given I clear the form
    And I select "I agree that the divorce service can send me notifications and serve (deliver) court documents to me by email."
    When I select "Enter your phone number (optional)"
    And I type "12345"
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "The phone number you have entered is invalid. Enter a valid phone number to continue."
