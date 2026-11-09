Feature: Alternative service journey

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "HUB_PAGE"
    And the page should include element "#aosAwaitingLine1"

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "HUB_PAGE"
    Then the page should include element "#aosDueAndDraftedLine1"

    Then I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"

    Then I click start and expect URL "HAVE_THEY_RECEIVED"

    Given I don't know my partner's contact details
    Then I click continue and expect URL "NO_NEW_ADDRESS"

    Given I select alternative service
    Then I click continue and expect URL "ALTERNATIVE_SERVICE_APPLICATION"

  Scenario: Alternative service happy path
    Given I click start and expect URL "ALTERNATIVE_INTERRUPTION"

    Given I confirm I understand
    Then I click continue and expect URL "HELP_WITH_FEES_ALTERNATIVE"

    Given I select no
    Then I click continue and expect URL "ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS"

    Given I enter my alternative service reason
    Then I click continue and expect URL "ALTERNATIVE_SENDING_PAPERS_TO_PARTNER"

    Given I want to send papers in a different way
    Then I click continue and expect URL "ALTERNATIVE_HOW_TO_SERVE"

    Given I want to serve by phone
    Then I click continue and expect URL "WANT_UPLOAD_EVIDENCE_ALTERNATIVE"

    Given I select yes
    Then I click continue and expect URL "UPLOAD_EVIDENCE_ALTERNATIVE"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "ALTERNATIVE_WHY_APPLY_THIS_WAY"
    And the page should not include element "#unableToUploadLine1"

    Given I enter more details
    Then I click continue and expect URL "CHECK_ANSWERS_ALTERNATIVE"

    Given I confirm the statement of truth
    Then I click submit and expect URL "PAY_YOUR_SERVICE_FEE"

    Then I pay and submit the service application

  Scenario: Alternative service HWF happy path
    When I click start
    Then the page URL should be "ALTERNATIVE_INTERRUPTION"

    Given I confirm I understand
    Then I click continue and expect URL "HELP_WITH_FEES_ALTERNATIVE"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_ALTERNATIVE"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE"

    Given I enter my HWF reference number
    Then I click continue and expect URL "ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS"

    Given I enter my alternative service reason
    Then I click continue and expect URL "ALTERNATIVE_SENDING_PAPERS_TO_PARTNER"

    Given I want to send papers in a different way
    Then I click continue and expect URL "ALTERNATIVE_HOW_TO_SERVE"

    Given I want to serve by phone
    Then I click continue and expect URL "WANT_UPLOAD_EVIDENCE_ALTERNATIVE"

    Given I select yes
    Then I click continue and expect URL "UPLOAD_EVIDENCE_ALTERNATIVE"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "ALTERNATIVE_WHY_APPLY_THIS_WAY"
    And the page should not include element "#unableToUploadLine1"

    Given I enter more details
    Then I click continue and expect URL "CHECK_ANSWERS_ALTERNATIVE"

    Given I confirm the statement of truth
    Then I click submit and expect URL "SERVICE_APPLICATION_SUBMITTED"
