Feature: Their email address

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to '/their-email-address'
    Then the page should include "Enter your husband's email address"

  Scenario: Successfully enter their email address
    Given I clear the form
    And I select "Your husband's email address"
    And I type "test@test.com"
    When I click "Continue"
    Then the page URL should be "/do-you-have-address"

  Scenario: They do not know their partners email (sole application)
    Given I go to "/how-do-you-want-to-apply"
    When I select "I want to apply on my own, as a sole applicant"
    And I click "Continue"
    When I go to '/their-email-address'
    Then the page should include "Enter your husband's email address"
    Given I clear the form
    And I select "I do not know their email address"
    When I click "Continue"
    Then the page URL should be "/do-you-have-address"

  Scenario: They do not know their partners email (joint application)
    Given I go to "/how-do-you-want-to-apply"
    And I select "I want to apply jointly, with my husband"
    And I click "Continue"
    And I clear the form
    And I select "I do not know their email address"
    When I click "Continue"
    Then the page URL should be "/you-need-their-email-address"
    And the page should include "You need to get their email address"

  Scenario: They do know their partners email (joint application)
    Given I go to "/how-do-you-want-to-apply"
    And I select "I want to apply jointly, with my husband"
    And I click "Continue"
    And I clear the form
    And I select "Your husband's email address"
    And I type "test@test.com"
    When I click "Continue"
    Then the page should include "Did you get married in the UK?"

  Scenario: Error when entering both their email and selecting I do not know their email
    Given I clear the form
    And I select "Your husband's email address"
    And I type "test@test.com"
    And I select "I do not know their email address"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Error when entering invalid email
    Given I clear the form
    And I select "Your husband's email address"
    And I type "test.com"
    When I click "Continue"
    Then the page should include "There was a problem"

  @nightly
  Scenario: They have not indicated their partners email address or chosen that that don't know it
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
