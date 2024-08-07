Feature: PCQ Equality and diversity questions

  Background:
    Given I create a new user and login
    When I go to "/equality"

  @flaky
  Scenario: Answer all Equality and diversity questions
    Given I click "Continue to the questions"
    And the page should include "What is your date of birth?"
    Then I select "Day"
    And I type "1"
    And I select "Month"
    And I type "1"
    And I select "Year"
    And I type "2000"
    And I click "Continue"
    And the page should include "What is your main language?"
    And I select "English"
    And I click "Continue"
    And the page should include "What is your sex?"
    And I select "Male"
    And I click "Continue"
    And the page should include "Is your gender the same as the sex you were registered at birth?"
    And I select "Yes"
    And I click "Continue"
    And the page should include "Which of the following best describes how you think of yourself?"
    And I select "Heterosexual or straight"
    And I click "Continue"
    And the page should include "What is your ethnic group?"
    And I select "White"
    And I click "Continue"
    And the page should include "Which one best describes your White background?"
    And I select "English, Welsh, Scottish, Northern Irish or British"
    And I click "Continue"
    And the page should include "What is your religion?"
    And I select "No religion"
    And I click "Continue"
    And the page should include "Do you have any physical or mental health conditions or illnesses lasting or expected to last 12 months or more?"
    And I select "No"
    And I click "Continue"
    And the page should include "Are you pregnant or have you been pregnant in the last year?"
    And I select "No"
    And I click "Continue"
    And the page should include "You have answered"
    And I click "Continue to the next steps"
    Then the page should include "Check your answers"

  @flaky
  Scenario: Choose not to answer all Equality and diversity questions
    Given I click "I don't want to answer these questions"
    Then the page should include "Check your answers"
