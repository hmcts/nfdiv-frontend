Feature: Update contact details

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    When I go to 'CHECK_ANSWERS_URL'
    And I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    When I as respondent enter my valid case reference and valid access code
    Then the page URL should be "RESPONDENT" / "HUB_PAGE"

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

    Given I sign out
    And I login with applicant "1"
    Then the page URL should be "HUB_PAGE"

    When I click to review my contact details
    Then I click to change my address

    Given I enter my address directly
    Then I click continue and expect URL "ADDRESS_PRIVATE"

    Given I clear the form
    And I do not need my contact details kept private

    Then I click continue and expect URL "CHECK_CONTACT_DETAILS"

    Then I click continue and expect URL "HUB_PAGE"
