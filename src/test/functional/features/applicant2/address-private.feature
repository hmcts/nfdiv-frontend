Feature: Applicant 2 Contact details kept private

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    And I go to '/applicant2/address-private'
    Then the page should include "Do you need your contact details kept private from your wife"

  @nightly
  Scenario: Error when not answering Do you need your contact details kept private from your wife?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They want to keep their details private
    And I select "Keep my contact details private"
    Then the page should include "If you think you might be experiencing domestic abuse or you feel unsafe, then support is available"
    And I click "Continue"
    Then the page URL should be "/applicant2/enter-your-address"
