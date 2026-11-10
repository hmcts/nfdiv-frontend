Feature: Pre-Issue application withdraw journey

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    When I go to 'CHECK_ANSWERS_URL'
    And I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    Then I set the case state to "Submitted"

  Scenario: Pre-Issue application withdraw happy path
    When I sign out
    And I login with applicant "1"
    Then I go to "WITHDRAW_THIS_APPLICATION"

    Given I select yes
    And I enter my reason for withdrawing
    Then I click continue and expect URL "CHECK_ANSWERS_WITHDRAW"

    Then I click submit and expect URL "WITHDRAW_CONFIRMATION"



