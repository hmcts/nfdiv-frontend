Feature: Check Your Answers (Joint Application)

  Background:
    Given I create a new user and login

  Scenario: Checking answers as a joint applicant
    Given I've completed enough questions correctly to get to the check your answers page as a joint applicant
    When I go to '/check-your-answers'
    Then the page should include "Yes, my marriage has irretrievably broken down"
    And the page should include "When did you get married?	31 December 1999"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate"
    And the page should include "Help with fees"
    And the page should include "Help paying the divorce fee	I need help paying the fee"
    And the page should include "Have you already applied for help with your divorce fee?	Yes"
    And the page should include "HWF-ABC-123"
    And the page should include "Is your original marriage certificate in English?	No"
    And the page should include "Do you have a ‘certified translation’ of your marriage certificate?	Yes, I have a certified translation"
    And the page should include "Enter the country where you got married	Mozambique"
    And the page should include "Enter the place where you got married	Maputo"

  Scenario: Checking completed answers as a joint applicant
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to '/check-your-answers'
    Then the page should include "Your answers will be sent to your husband to review. Once they have reviewed and provided some of their own information then the application will be ready to submit."


  Scenario: Sending application to applicant 2 to confirm
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to '/check-your-answers'
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
