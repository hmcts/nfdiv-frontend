Feature: Pre-Issue application withdraw journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application saved"
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



