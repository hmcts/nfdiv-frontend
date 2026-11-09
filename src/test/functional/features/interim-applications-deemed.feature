Feature: Deemed service journey

  Background:
    Given I prep the case for an interim application

    Given I confirm their details are up to date
    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"

    Given I have evidence they have received the papers
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"

    Given I do not have a certificate of service
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"

  Scenario: Deemed service happy path
    Then I click start and expect URL "DEEMED_INTERRUPTION"

    Given I confirm I understand
    Then I click continue and expect URL "HELP_WITH_FEES_DEEMED"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_DEEMED"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_INPUT_DEEMED"

    Given I enter my HWF reference number
    Then I click continue and expect URL "WANT_UPLOAD_EVIDENCE_DEEMED"

    Given I select yes
    Then I click continue and expect URL "UPLOAD_EVIDENCE_DEEMED"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "HOW_DO_YOU_KNOW_DEEMED"

    Given I enter the evidence details
    Then I click continue and expect URL "CHECK_ANSWERS_DEEMED"

    Given I confirm the statement of truth
    Then I click submit and expect URL "SERVICE_APPLICATION_SUBMITTED"

  Scenario: Deemed service no evidence journey
    Then I click start and expect URL "DEEMED_INTERRUPTION"

    Given I confirm I understand
    Then I click continue and expect URL "HELP_WITH_FEES_DEEMED"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_DEEMED"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_INPUT_DEEMED"

    Given I enter my HWF reference number
    Then I click continue and expect URL "WANT_UPLOAD_EVIDENCE_DEEMED"

    Given I select no
    Then I click continue and expect URL "WHY_NO_EVIDENCE_DEEMED"

    Given I enter the no evidence statement
    Then I click continue and expect URL "CHECK_ANSWERS_DEEMED"

    Given I confirm the statement of truth
    Then I click submit and expect URL "SERVICE_APPLICATION_SUBMITTED"

  Scenario: Deemed service withdrawn application
    Then I click start and expect URL "DEEMED_INTERRUPTION"

    Given I confirm I understand
    Then I click continue and expect URL "HELP_WITH_FEES_DEEMED"

    Given I select no
    Then I click continue and expect URL "WANT_UPLOAD_EVIDENCE_DEEMED"

    Given I select yes
    Then I click continue and expect URL "UPLOAD_EVIDENCE_DEEMED"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "HOW_DO_YOU_KNOW_DEEMED"

    Given I enter the evidence details
    Then I click continue and expect URL "CHECK_ANSWERS_DEEMED"

    Given I confirm the statement of truth
    Then I click submit and expect URL "PAY_YOUR_SERVICE_FEE"

    Given I click to withdraw and expect URL "WITHDRAW_SERVICE_APPLICATION"
    Then I click submit and expect URL "SERVICE_APPLICATION_WITHDRAWN"
