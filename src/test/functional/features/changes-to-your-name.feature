Feature: Changes to your name

  Background:
    Given I login
    When I go to '/changes-to-your-name'
    Then the page should include "Changes to your name"

  Scenario: Successfully completing the form No/No
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/how-the-court-will-contact-you"

  Scenario: Successfully completing the form Yes/Yes
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/how-did-you-change-your-name"

  Scenario: Successfully completing the form Yes/No
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/how-did-you-change-your-name"

  Scenario: Successfully completing the form No/Yes
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/how-did-you-change-your-name"

  @nightly
  Scenario: Error when missing a required field
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
