Feature: Check Your Answers

  Background:
    Given I login

  Scenario: Selecting Wife
    Given I go to '/your-details'
    And I clear the form
    And I click "My wife"
    And I click "Continue"
    When I go to '/'
    Then the page should include "About your marriage"
    And the page should include "Who are you divorcing?	My wife"
    And the page should not include "same-sex couple"
    When I go to '/check-answers?forceCivilMode'
    And the page should include "Are you male or female?	Female"

  Scenario: Selecting Husband same gender
    Given I go to '/your-details'
    And I clear the form
    And I click "My husband"
    And I click "We were a same-sex couple when we got married"
    And I click "Continue"
    When I go to '/'
    Then the page should include "About your marriage"
    And the page should include "Who are you divorcing?	My husband"
    And the page should include "Type of relationship	We were a same-sex couple"

  Scenario: Entering a correct certificate date
    Given I go to '/date-from-certificate'
    And I clear the form
    When I select "Day"
    And I type "12"
    Given I select "Month"
    And I type "12"
    Given I select "Year"
    And I type "2012"
    And I click "Continue"
    When I go to '/'
    Then the page should include "Date of marriage	12/12/2012"

  Scenario: Entering a correct Help With Fees number
    Given I go to '/help-with-your-fee'
    Given I select "I need help paying the fee"
    And I click "Continue"
    And I clear the form
    And I select "Yes"
    And I select "Enter your Help With Fees reference number"
    And I type "HWF-ABC-123"
    And I click "Continue"
    When I go to '/'
    Then the page should include "Payment"
    And the page should include "Do you need help paying the fee for your divorce?	Yes"
    And the page should include "Help With Fees number	HWF-ABC-123"

