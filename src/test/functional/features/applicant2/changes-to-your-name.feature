Feature: Applicant 2 changes to your name

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/changes-to-your-name'
    Then the page should include "Changes to your name"

  Scenario: They did not change their name
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/applicant2/how-the-court-will-contact-you"

  Scenario: They changed their name when the union happened and after
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/applicant2/how-did-you-change-your-name"

  Scenario: They changed their name when the union happened
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/applicant2/how-did-you-change-your-name"

  Scenario: They changed the name after the union happened
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/applicant2/how-did-you-change-your-name"

  @nightly
  Scenario: They have not indicated if their name has changed
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
