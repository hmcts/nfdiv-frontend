Feature: Joint final order journey

  Background: Logged in for hub page and progress case to AwaitingFinalOrder
    Given I create a new applicant "1" user and login
    And I've already completed the form using the fixture "jointFinalOrderCompleteCase"
    Then I go to "CHECK_ANSWERS_URL"
    And I click send for review
    Then I login as applicant "2" and link to the case

    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    Then I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"
    And I confirm the prayer and statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"
    And I set the case state to "AwaitingFinalOrder"

  @nightly
  Scenario: Applicant joint final order journey within a year
    Given I login as applicant "1" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click continue and expect hub element "#hasAppliedForJointFinalOrderContent"

    Given I login as applicant "2" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click submit and expect hub element "#jointFinalOrderRequestedContent"

  @nightly
  Scenario: Applicant 1 joint switch to sole final order journey
    Given I login as applicant "1" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click continue and expect hub element "#hasAppliedForJointFinalOrderContent"

    Given I prepare the case for applicant "1" switch-to-sole final order
    And I intend to apply for final order as a sole applicant
    Then I click confirm and expect hub element "#intendToSwitchToSoleFinalOrderContent"
    And a superuser updates "dateApplicant1DeclaredIntentionToSwitchToSoleFo" with "2022-10-21"

    Given I login as applicant "1" and expect hub element "#intendingAndAbleToSwitchToSoleFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click submit to apply for final order as a sole applicant

  @nightly
  Scenario: Applicant 2 joint switch to sole final order journey
    Given I login as applicant "2" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click submit and expect hub element "#hasAppliedForJointFinalOrderContent"

    Given I prepare the case for applicant "2" switch-to-sole final order
    And I intend to apply for final order as a sole applicant
    Then I click confirm and expect hub element "#intendToSwitchToSoleFinalOrderContent"
    And a superuser updates "dateApplicant2DeclaredIntentionToSwitchToSoleFo" with "2022-10-21"

    Given I login as applicant "2" and expect hub element "#intendingAndAbleToSwitchToSoleFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click submit to apply for final order as a sole applicant

  @nightly
  Scenario: Applicant 1 joint switch to sole final order journey when case goes overdue after applying
    Given I login as applicant "1" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click submit and expect hub element "#hasAppliedForJointFinalOrderContent"

    Given I prepare the case for applicant "1" switch-to-sole when final order overdue
    And I intend to apply for final order as a sole applicant
    Then I click confirm and expect hub element "#intendToSwitchToSoleFinalOrderContent"
    And a superuser updates "dateApplicant1DeclaredIntentionToSwitchToSoleFo" with "2022-10-21"

    Given I login as applicant "1" and expect hub element "#intendingAndAbleToSwitchToSoleFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click submit to apply for final order as a sole applicant when overdue

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#finalOrderRequestedContent"

  Scenario: Applicant joint final order journey overdue applicant 1 applies first
    Given a superuser updates "isFinalOrderOverdue" with "Yes"
    Then I login as applicant "1" and expect hub element "#awaitingJointFinalOrderContent"
    And I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click continue and expect URL "EXPLAIN_THE_DELAY"

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#hasAppliedForJointFinalOrderContent"

    Given I login as applicant "2" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click continue and expect URL "EXPLAIN_THE_DELAY"

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#jointFinalOrderRequestedContent"

  Scenario: Applicant joint final order journey overdue applicant 2 applies first
    Given a superuser updates "isFinalOrderOverdue" with "Yes"
    Then I login as applicant "2" and expect hub element "#awaitingJointFinalOrderContent"
    And I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click continue and expect URL "EXPLAIN_THE_DELAY"

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#hasAppliedForJointFinalOrderContent"

    Given I login as applicant "1" and expect hub element "#awaitingJointFinalOrderContent"
    Then I click apply for final order and expect URL "FINALISING_YOUR_APPLICATION"

    Given I want to finalise my divorce
    Then I click continue and expect URL "EXPLAIN_THE_DELAY"

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#jointFinalOrderRequestedContent"
