Feature: Update contact details journey

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    When I go to 'CHECK_ANSWERS_URL'
    And I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    Then I login as the respondent and link to the case

  @nightly
  Scenario: Applicant and Respondent update contact details
    When I click to review my contact details
    Then I click to change my address

    Given I enter my address directly
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I clear the form
    And I do not need my contact details kept private

    Then I click continue and expect URL "CHECK_CONTACT_DETAILS"

    Then I click continue and expect URL "HUB_PAGE"

    Given I login with applicant "1" and expect URL "HUB_PAGE"
    When I click to review my contact details
    Then I click to change my address

    Given I enter my address directly
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I clear the form
    And I do not need my contact details kept private

    Then I click continue and expect URL "CHECK_CONTACT_DETAILS"

    Then I click continue and expect URL "HUB_PAGE"
