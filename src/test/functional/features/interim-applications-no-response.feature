Feature: No response journey

  Background:
    Given I progress the case to AwaitingAos

  Scenario: No response happy path to deemed service
    Given I set the case to AosDrafted
    Then I click start and expect URL "HAVE_THEY_RECEIVED" with element "#detailsProvided"

    Given I confirm their details are up to date
    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"

    Given I have evidence they have received the papers
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"

    Given I do not have a certificate of service
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"

  Scenario: No response respondent represented happy path to deemed service
    Given I set the case to AosDrafted and Applicant 2 is represented
    Then I click start and expect URL "HAVE_THEY_RECEIVED_REPRESENTED"

    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"

    Given I have evidence they have received the papers
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"

    Given I do not have a certificate of service
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"

  Scenario: No response respondent confidential happy path to deemed service
    Given I set the case to AosDrafted and Applicant 2 is private
    Then I click start and expect URL "EVIDENCE_RECEIVED_APPLICATION"

    Given I have evidence they have received the papers
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"

    Given I do not have a certificate of service
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"

  Scenario: No response respondent confidential HAVE_THEY_RECEIVED redirects to HUB_PAGE
    Given I set the case to AosDrafted and Applicant 2 is private
    Then I click start and expect URL "EVIDENCE_RECEIVED_APPLICATION"

    When I go to "HAVE_THEY_RECEIVED"
    Then the page URL should be "HUB_PAGE" with element "#aosDueAndDraftedLine1"

  Scenario: No response unhappy path to process server
    Given I set the case to AosDrafted
    Then I click start and expect URL "HAVE_THEY_RECEIVED" with element "#detailsProvided"

    Given I don't know my partner's contact details
    Then I click continue and expect URL "NO_NEW_ADDRESS"

    Given I select in person service
    Then I click continue and expect URL "PARTNER_IN_PERSON"

    Given I select process server service
    Then I click continue and expect URL "PROCESS_SERVER"

    Then I click continue and expect URL "SUCCESS_SCREEN_PROCESS_SERVER"

    Then I click element "#downloadPapersLink" and expect URL "PROCESS_SERVER_DOCS"

  Scenario: No response new postal address
    Given I set the case to AosOverdue
    Then I click start and expect URL "HAVE_THEY_RECEIVED"

    Given I have new contact details for my partner
    Then I click continue and expect URL "NEW_POSTAL_AND_EMAIL"

    Given I have a new address for my partner
    Then I click continue and expect URL "NEW_POSTAL_ADDRESS"

    Given I enter their new address
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"

    Then I click accept and send and expect URL "NO_RESPONSE_DETAILS_UPDATED"

  Scenario: No response new email address
    Given I set the case to AosOverdue
    Then I click start and expect URL "HAVE_THEY_RECEIVED"

    Given I have new contact details for my partner
    Then I click continue and expect URL "NEW_POSTAL_AND_EMAIL"

    Given I have a new email address for my partner
    Then I click continue and expect URL "NEW_EMAIL"

    Given I want to provide a new email address for my partner
    Then I click continue and expect URL "PROVIDE_NEW_EMAIL_ADDRESS"

    Given I enter their new email address
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"

    Then I click accept and send and expect URL "NO_RESPONSE_DETAILS_UPDATED"

  Scenario: No response new postal and email address
    Given I set the case to AosOverdue
    Then I click start and expect URL "HAVE_THEY_RECEIVED"

    Given I have new contact details for my partner
    Then I click continue and expect URL "NEW_POSTAL_AND_EMAIL"

    Given I have a new postal and email address for my partner
    Then I click continue and expect URL "PROVIDE_NEW_EMAIL_ADDRESS"

    Given I enter their new email address
    Then I click continue and expect URL "NEW_POSTAL_ADDRESS"

    Given I enter their new address
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"

    Then I click accept and send and expect URL "NO_RESPONSE_DETAILS_UPDATED"

  Scenario: No response update contact details NEW_POSTAL_AND_EMAIL throws error
    Given I set the case to AosOverdue

    When I go to "NEW_POSTAL_AND_EMAIL"
    Then I click continue
    Then the page should show an error for field "newPostalAddress"

  Scenario: No response send papers again or try something else
    Given I set the case to AosOverdue
    Then I click start and expect URL "HAVE_THEY_RECEIVED"

    Given I confirm their details are up to date
    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"

    Given I do not have evidence they have received the papers
    Then I click continue and expect URL "SERVE_AGAIN"

    Given I want to send the papers again
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"

    Then I click accept and send and expect URL "WILL_SERVE_AGAIN"
