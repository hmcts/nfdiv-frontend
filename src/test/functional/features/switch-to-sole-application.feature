Feature: Switch to sole application journey

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Then I go to "CHECK_ANSWERS_URL"
    And I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

  @nightly
  Scenario: [1] Switching to Sole application by Applicant 1
    Given I enter my valid case reference and valid access code
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    Then I go to 'CHECK_JOINT_APPLICATION'

    Given I select yes
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Then I click continue and expect URL "CONFIRM_JOINT_APPLICATION"

    Given I confirm the prayer and statement of truth
    Then I click continue and expect URL "RESPONSE_SUBMITTED"

    Given I login with applicant "1"
    Then I go to 'CONFIRM_JOINT_APPLICATION'

    Given I confirm the prayer and statement of truth
    Then I click continue
    And I go to 'SWITCH_TO_SOLE_APPLICATION'

    Given I want to create a new application
    And I want to divorce my husband
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

  @nightly
  Scenario: [2] Switching to Sole application by Applicant 1 before Applicant 2 links to the case
    Given I go to 'SWITCH_TO_SOLE_APPLICATION'
    And I want to create a new application

    Given I want to divorce my husband
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to "HOME_URL"
    Then the page URL should be "CHECK_ANSWERS_URL"

  @nightly
  Scenario: [3] Switching to Sole application by Applicant 2
    Given I enter my valid case reference and valid access code
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    Then I go to 'CHECK_JOINT_APPLICATION'

    Given I select yes
    Then I click continue and expect URL "CHECK_ANSWERS_URL"

    Then I click continue and expect URL "CONFIRM_JOINT_APPLICATION"

    Given I confirm the prayer and statement of truth
    Then I click continue and expect URL "RESPONSE_SUBMITTED"

    Given I go to "SWITCH_TO_SOLE_APPLICATION"
    And I want to create a new application

    Given I want to divorce my husband
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

  @nightly
  Scenario: [4] Switching to Sole application by Applicant 1 in AwaitingApplicant1Response state
    Given I enter my valid case reference and valid access code
    And I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    Then I go to 'CHECK_JOINT_APPLICATION'

    Given I select no
    And I explain what is incorrect or needs changing
    Then I click continue and expect URL "YOUR_COMMENTS_SENT"

    Given I login with applicant "1"
    Then I go to "HOW_DO_YOU_WANT_TO_APPLY"

    Given I want to apply on my own
    Then I click continue and expect URL "SWITCH_TO_SOLE_APPLICATION"

    Given I want to create a new application
    And I want to divorce my husband
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"
