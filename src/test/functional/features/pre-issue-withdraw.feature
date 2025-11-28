Feature: Pre-Issue application withdraw journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "completeCase"
    Then I set the case state to "Submitted"

  Scenario: Pre-Issue application withdraw happy path
    When I sign out
    And I login with applicant "1"
    And I go to "/withdraw-pre-issue/withdraw-this-application"
    Then the page should include element "#withdrawThisApplicationTitle"

    Given I click element "#yes"
    And I click element "#withdrawApplicationReason"
    And I type "Reason for withdrawing the application"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    When I click submit
    Then the page should include element "#applicationWithdrawnTitle"



