Feature: Applicant 2 Help with fee

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/help-with-your-fee'
    Then the page should include "Help with the divorce fee"

  Scenario: They have not indicated if they need help paying for the fees
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They need help paying for the fees, but don't have a HWF reference number
    Given I select "I need help paying the fee"
    And I click "Continue"
    Then the page URL should be "/applicant2/have-you-applied-for-help-with-fees"

  Scenario: They do not need help paying the fee
    Given I select "I do not need help paying the fee"
    When I click "Continue"
    Then the page URL should be "/applicant2/enter-your-name"
