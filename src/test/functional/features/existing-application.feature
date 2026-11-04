Feature: Existing Application

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "HOME_URL"
    And I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I enter my valid case reference and valid access code
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"
    Given I confirm the prayer and statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"
    Given I sign out
    Then I create a new applicant 1 user and login
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I set the email address for applicant 2
    And I go to "HOME_URL"
    And I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I sign out
    And I login with applicant "2"
    Then the page URL should be "EXISTING_APPLICATION"

  @nightly
  Scenario: Continuing with existing application
    Given I want to continue with my existing application
    Then I click continue and expect URL "YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION"

  @nightly
  Scenario: Joining new application
    Given I want to join the new application
    Then I click continue and expect URL "ENTER_YOUR_ACCESS_CODE"
