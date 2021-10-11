Feature: Respondent Legal Jurisdiction of the Courts 

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I set the case state to "AwaitingAos"
    When I go to '/respondent/legal-jurisdiction-of-the-courts'
    Then the page should include "Do you agree the courts of England and Wales have jurisdiction?"
  
  @nightly
  Scenario: Error when not answering legal jurisdiction?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Agree that the courts of England and Wales have jurisdiction
    And I select "Yes"
    When I click "Continue"
    Then the page URL should be "/respondent/other-court-cases"

  Scenario: Disagree that the courts of England and Wales have jurisdiction
    And I select "No"
    And I click "Continue"
    Then the page URL should be "/respondent/other-court-cases"