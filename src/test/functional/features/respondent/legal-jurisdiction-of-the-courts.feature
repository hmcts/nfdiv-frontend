Feature: Respondent Legal Jurisdiction of the Courts 

  Background:
    Given I create a new user and login
    Given I've already completed the form using the fixture "completeCase"
    And I set the case state to "AwaitingAos"
    When I go to '/respondent/legal-jurisdiction-of-the-courts'
    Then the page should include "Do you agree the courts of England and Wales have legal power (jurisdiction) to grant your divorce?"
  
  @nightly
  Scenario: Error when not answering legal jurisdiction?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Agree that the courts of England and Wales have jurisdiction
    Given I select "Yes, I agree the courts have jurisdiction"
    When I click "Continue"
    Then the page URL should be "/respondent/other-court-cases"

  Scenario: Disagree that the courts of England and Wales have jurisdiction
    Given I select "No, I do not agree the courts have jurisdiction"
    And the page should include "Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to grant your divorce."
    And the page should include "Which country is your life mainly based?"

  Scenario: Disagree that the courts of England and Wales have jurisdiction without filling in the form
    Given I clear the form
    And I select "No, I do not agree the courts have jurisdiction"
    When I click "Continue"
    Then the page should include "There was a problem"