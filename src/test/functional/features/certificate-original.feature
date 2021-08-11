Feature: Certificate Original

  Background:
    Given I login
    When I go to '/certificate-in-english'
    Then the page should include "Is your original marriage certificate in English?"

  @nightly
  Scenario: Error when not answering
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: does not have the original marriage certificate in English?
    And I select "No"
    When I click "Continue"
    Then the page should include "Do you have a ‘certified translation’ of your marriage certificate?"

  @nightly
  Scenario: Error when not answering 'Do you have a ‘certified translation’ of your marriage certificate?'
    And I select "No"
    When I click "Continue"
    Then the page should include "Do you have a ‘certified translation’ of your marriage certificate?"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: you need a ‘certified translation’ of your marriage certificate'
    And I select "No"
    When I click "Continue"
    Then the page should include "Do you have a ‘certified translation’ of your marriage certificate?"
    And I select "No, I do not have a certified translation"
    When I click "Continue"
    Then the page should include "You need to get a ‘certified translation’ of your marriage certificate"

  Scenario: The original certificate is in English
    And I select "Yes"
    And I click "Continue"
    Then the page should include "Where you got married"
