Feature: You need to review your application

  Background:
    Given I login

  Scenario: Should continue to Has your marriage irretrievably broken down page
    Given I am reviewing an application for divorce created by my husband
    When I go to '/applicant2/you-need-to-review-your-application'
    And I click "Continue"
    Then the page URL should be "/applicant2/irretrievable-breakdown"

  Scenario: The page should render civil partner and civil partnership content
    Given I am reviewing an application for dissolution of my civil partnership
    When I go to '/applicant2/you-need-to-review-your-application?forceCivilMode'
    Then the page should include "civil partner"
    And the page should include "an application to end your civil partnership"
    And the page should include "to end your civil partnership"

  Scenario: The page should render husband and divorce content
    Given I am reviewing an application for divorce created by my husband
    When I go to '/applicant2/you-need-to-review-your-application'
    Then the page should include "husband"
    And the page should include "a divorce application"
    And the page should include "for divorce"


  Scenario: The page should render wife and divorce content
    Given I am reviewing an application for divorce created by my wife
    When I go to '/applicant2/you-need-to-review-your-application'
    Then the page should include "wife"
    And the page should include "a divorce application"
    And the page should include "for divorce"
