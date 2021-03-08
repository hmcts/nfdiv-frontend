Feature: Check Your Answers

  Background:
    Given I login
    And I go to '/irretrievable-breakdown'
    And I click "Yes, my marriage has irretrievably broken down"
    And I click "Continue"
    And I go to '/do-you-have-your-certificate'
    And I click "Yes, I have my marriage certificate"
    And I click "Continue"
    And I go to '/help-with-your-fee'
    And I select "I need help paying the fee"
    And I click "Continue"
    And the page should include "Have you already applied for help with your divorce fee?"

  Scenario: Selecting Wife
    Given I go to '/your-details'
    And I clear the form
    And I click "My wife"
    And I click "Continue"
    When I go to '/check-your-answers'
    Then the page should include "About your marriage"
    And the page should include "Who are you applying to divorce?	My wife"
    And the page should not include "same-sex couple"
    And I go to '/check-your-answers?forceCivilMode'
    And the page should include "Are you male or female?	Female"
    And the page should not include "Back"

  Scenario: Selecting Husband same gender
    Given I go to '/your-details'
    And I clear the form
    And I click "My husband"
    And I click "We were a same-sex couple when we got married"
    And I click "Continue"
    When I go to '/check-your-answers'
    Then the page should include "About your marriage"
    And the page should include "Who are you applying to divorce?	My husband"
    And the page should include "Select the following if it applies to you:	We were a same-sex couple when we got married"

  Scenario: Selecting Female
    Given I go to '/your-details?forceCivilMode'
    And I clear the form
    And I click "Female"
    And I click "Continue"
    When I go to '/check-your-answers?forceCivilMode'
    Then the page should include "About your civil partnership"
    And the page should include "Are you male or female?	Female"

  Scenario: Partnership Broken down
    Given I go to '/check-your-answers'
    Then the page should include "Yes, my marriage has irretrievably broken down"

  Scenario: Entering a correct certificate date
    Given I go to '/date-from-certificate'
    And I clear the form
    When I select "Day"
    And I type "12"
    And I select "Month"
    And I type "12"
    And I select "Year"
    And I type "2012"
    And I click "Continue"
    When I go to '/check-your-answers'
    Then the page should include "When did you get married?	12 December 2012"

  Scenario: Entering a correct Help With Fees number
    Given I go to '/have-you-applied-for-help-with-fees'
    And I clear the form
    And I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"
    And I click "Continue"
    When I go to '/check-your-answers'
    Then the page should include "Payment"
    And the page should include "Do you need help paying the fee for your divorce?	I need help paying the fee"
    And the page should include "Have you already applied for help with your divorce fee?	Yes"
    And the page should include "HWF-ABC-123"

  Scenario: Viewing the page in Welsh
    Given I go to '/check-your-answers?lng=cy'
    Then the page should include "Ydy, mae fy mhriodas wedi chwalu'n gyfan gwbl"
