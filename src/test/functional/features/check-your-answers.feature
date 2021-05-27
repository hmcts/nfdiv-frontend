Feature: Check Your Answers

  Background:
    Given I login

  Scenario: Selecting Wife
    Given I go to '/your-details'
    And I clear the form
    And I click "My wife"
    And I click "Continue"
    When I go to '/check-your-answers'
    And the page should not include "Back"
    Then the page should include "About your marriage"
    And the page should include "Who are you applying to divorce?	My wife"
    And the page should not include "same-sex couple"
    And I go to '/check-your-answers?forceCivilMode'
    And the page should include "Are you male or female?	Female"

  Scenario: Selecting Husband same gender
    Given I go to '/your-details'
    And I clear the form
    And I click "My husband"
    And I click "We were a same-sex couple when we got married"
    And I click "Continue"
    When I go to '/check-your-answers'
    Then the page should include "About your marriage"
    And the page should include "Who are you applying to divorce?	My husband"
    And the page should include "Same-sex couples	We were a same-sex couple when we got married"

  Scenario: Checking answers
    Given I've completed enough questions correctly to get to the check your answers page
    When I go to '/check-your-answers'
    Then the page should include "Yes, my marriage has irretrievably broken down"
    And the page should include "When did you get married?	31 December 1999"
    And the page should include "Do you have your marriage certificate with you?	Yes, I have my marriage certificate"
    And the page should include "Help with fees"
    And the page should include "Do you need help paying the fee for your divorce?	I need help paying the fee"
    And the page should include "Have you already applied for help with your divorce fee?	Yes"
    And the page should include "HWF-ABC-123"
    And the page should include "Is your original marriage certificate in English?	No"
    And the page should include "Do you have a ‘certified translation’ of your marriage certificate?	Yes, I have a certified translation"
    And the page should include "Enter the country where you got married	Mozambique"
    And the page should include "Enter the place where you got married	Maputo"
    And the page should include "Did you get married in the UK?	No"

  Scenario: Viewing the page in Welsh
    Given I go to '/irretrievable-breakdown'
    And I click "Yes, my marriage has irretrievably broken down"
    And I click "Continue"
    And the page should include "When did you get married?"
    Given I go to '/check-your-answers?lng=cy'
    Then the page should include "Ydy, mae fy mhriodas wedi chwalu'n gyfan gwbl"

  @flaky
  Scenario: Completed all required questions and confirming
    Given I've already completed all questions correctly
    And I go to '/check-your-answers'
    And I clear the form
    And I click "Continue to payment"
    And the page should include "You have not confirmed"
    When I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    And I click "Continue to payment"
    Then the page URL should be "/pay-your-fee"
