Feature: Sole final order journey

  Background: Logged in for hub page
    Given I create a new applicant "1" user and login

  Scenario: Applicant sole final order journey within a year
    Given I've already completed the form using the fixture "finalOrderCompleteCase"
    Then I go to 'CHECK_ANSWERS_URL'

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    Then I login as the respondent and link to the case
    And I set the case state to "AwaitingFinalOrder" and sign out

    Given I login as applicant "1" and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueContent"
    Then I click apply for final order

    Given I want to finalise my divorce
    Then I click submit and expect hub element "#finalOrderRequestedContent"

  @nightly
  Scenario: Applicant sole final order journey overdue
    Given I've already completed the form using the fixture "finalOrderOverdueCompleteCase"
    Then I go to 'CHECK_ANSWERS_URL'

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    Then I login as the respondent and link to the case
    And I set the case state to "AwaitingFinalOrder" and sign out

    Given I login as applicant "1" and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueContent"
    Then I click apply for final order

    Given I want to finalise my divorce
    Then I click submit to apply for final order as a sole applicant when overdue

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#finalOrderRequestedContent"

  Scenario: Respondent sole final order payment journey
    Given I've already completed the form using the fixture "finalOrderCompleteCase"
    Then I go to 'CHECK_ANSWERS_URL'

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    Then I login as the respondent and link to the case
    And I prepare the case for the respondent to apply for final order

    Given I login as the respondent and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueRespondentCanApplyContent"
    Then I click apply for final order

    Given I want to finalise my divorce
    And I explain why I need to apply for the final order
    Then I click continue and expect URL "HELP_WITH_YOUR_FINAL_ORDER_FEE_URL"

    Given I select no
    Then I click continue and expect URL "PAY_YOUR_FINAL_ORDER_FEE"

    Given I pay and submit the final order application
    Then I login as applicant "1" and expect hub element "#finalOrderRequestedApplicant2AppliedFirstContent"

  Scenario: Applicant sole final order within a year after respondent does not complete payment
    Given I've already completed the form using the fixture "finalOrderCompleteCase"
    Then I go to 'CHECK_ANSWERS_URL'

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    Then I login as the respondent and link to the case
    And I prepare the case for the respondent to apply for final order

    Given I login as the respondent and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueRespondentCanApplyContent"
    Then I click apply for final order

    Given I want to finalise my divorce
    And I explain why I need to apply for the final order
    Then I click continue and expect URL "HELP_WITH_YOUR_FINAL_ORDER_FEE_URL"

    Given I select no
    Then I click continue and expect URL "PAY_YOUR_FINAL_ORDER_FEE"

    Given I click pay and submit but do not complete the payment
    Then I login as applicant "1" and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueContent"

    Given I click apply for final order
    And I want to finalise my divorce
    Then I click submit and expect hub element "#finalOrderRequestedContent"

  @nightly
  Scenario: Applicant sole final order after respondent does not complete payment when overdue
    Given I've already completed the form using the fixture "finalOrderOverdueCompleteCase"
    Then I go to 'CHECK_ANSWERS_URL'

    Given I confirm the prayer and statement of truth
    Then I click continue to payment and expect URL "PAY_YOUR_FEE"

    Given I pay and submit and expect the application to be saved
    And a case worker issues the application
    Then I login as the respondent and link to the case
    And I prepare the case for the respondent to apply for final order

    Given I login as the respondent and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueRespondentCanApplyContent"
    Then I click apply for final order

    Given I want to finalise my divorce
    And I explain why I need to apply for the final order
    Then I click continue and expect URL "HELP_WITH_YOUR_FINAL_ORDER_FEE_URL"

    Given I select no
    Then I click continue and expect URL "PAY_YOUR_FINAL_ORDER_FEE"

    Given I click pay and submit but do not complete the payment
    Then I login as applicant "1" and expect hub element "#awaitingFinalOrderOrFinalOrderOverdueContent"

    Given I click apply for final order
    And I want to finalise my divorce
    Then I click continue and expect URL "EXPLAIN_THE_DELAY"

    Given I enter the reason for the delay
    And I confirm the statement of truth
    Then I click submit and expect hub element "#finalOrderRequestedContent"

