Feature: No response journey

  Background:
    Given I progress the case to AwaitingAos

  Scenario: No response happy path to deemed service
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosAwaitingLine1"

    Given I set the case to AosDrafted
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    Then I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"

    Then I progress to HAVE_THEY_RECEIVED
#    Then I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

#    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#haveTheyReceivedTitle"
    And the page should include element "#detailsProvided"

    Given I confirm their details are up to date
#    Given I click element "#upToDate"
    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"
#    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I have evidence they have received the papers
#    Given I click element "#proveYes"
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"
#    Then the page should include element "#hasCertificateOfServiceTitle"

    Given I do not have a certificate of service
#    Given I click element "#hasCertificateOfServiceNo"
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"
#    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: No response respondent represented happy path to deemed service
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosAwaitingLine1"

    Given I set the case to AosDrafted
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
    And a superuser sets Applicant 2 represented
#    And a superuser updates "applicant2SolicitorRepresented" with "Yes"
#    And a superuser updates "applicant2SolicitorFirmName" with "Test Solicitor Firm Name"
#    Then I sign out
    Then I login with applicant "1"
    And the page URL should be "HUB_PAGE" and the page should include element "#aosDueAndDraftedLine1"

    Then I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

    Then I click start and expect URL "HAVE_THEY_RECEIVED_REPRESENTED"
#    Then the page should include element "#haveTheyReceivedRepresentedTitle"

    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"
#    When I click element "#noFormContinue"
#    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I have evidence they have received the papers
#    Given I click element "#proveYes"
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"
#    Then the page should include element "#hasCertificateOfServiceTitle"

    Given I do not have a certificate of service
#    Given I click element "#hasCertificateOfServiceNo"
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"
#    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: No response respondent confidential happy path to deemed service
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosAwaitingLine1"

    Given I set the case to AosDrafted and Applicant 2 is private
#    And a superuser updates "aosIsDrafted" with "Yes"
#    And a superuser updates "applicant2AddressPrivate" with "Yes"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"

    Then I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

    Then I click start and expect URL "EVIDENCE_RECEIVED_APPLICATION"
#    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I have evidence they have received the papers
#    Given I click element "#proveYes"
    Then I click continue and expect URL "EVIDENCE_CERTIFICATE_OF_SERVICE"
#    Then the page should include element "#hasCertificateOfServiceTitle"

    Given I do not have a certificate of service
#    Given I click element "#hasCertificateOfServiceNo"
    Then I click continue and expect URL "DEEMED_SERVICE_APPLICATION"
#    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: No response respondent confidential HAVE_THEY_RECEIVED redirects to HUB_PAGE
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosAwaitingLine1"

    Given I set the case to AosDrafted and Applicant 2 is private
#    And a superuser updates "aosIsDrafted" with "Yes"
#    And a superuser updates "applicant2AddressPrivate" with "Yes"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"

     When I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

#    Then I click start and expect URL "HAVE_THEY_RECEIVED_REPRESENTED"
#    Then the page should include element "#haveTheyReceivedRepresentedTitle"

    Then I click start and expect URL "EVIDENCE_RECEIVED_APPLICATION"
#    Then the page should include element "#evidenceReceivedApplicationTitle"

    When I go to "HAVE_THEY_RECEIVED"
    Then the page URL should be "HUB_PAGE" and the page should include element "#aosDueAndDraftedLine1"

  Scenario: No response unhappy path to process server
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosAwaitingLine1"

    Given I set the case to AosDrafted
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"

    Then I click element "#aosDueAndDraftedLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#haveTheyReceivedTitle"
    And the page should include element "#detailsProvided"

    Given I don't know my partner's contact details
#    Given I click element "#notKnown"
    Then I click continue and expect URL "NO_NEW_ADDRESS"
#    Then the page should include element "#noNewContactDetailsTitle"

    Given I select in person service
    Then I click continue and expect URL "PARTNER_IN_PERSON"
#    Then the page should include element "#partnerInPersonTitle"

    Given I select process server service
#    Given I click element "#processServer"
    Then I click continue and expect URL "PROCESS_SERVER"
#    Then the page should include element "#processServerTitle"

    Then I click continue and expect URL "SUCCESS_SCREEN_PROCESS_SERVER"
#    Then the page should include element "#successScreenProcessServerTitle"

    Then I click element "#downloadPapersLink" and expect URL "PROCESS_SERVER_DOCS"
#    Then the page should include element "#processServerDocumentsTitle"

  Scenario: No response new postal address
    Given I set the case to AosOverdue
#    Then the page should include "View your options for proceeding without a response from the respondent"

    Given I progress to HAVE_THEY_RECEIVED when overdue
#    Then I click element "#aosDueLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

#    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#upToDate"

    Given I have new contact details for my partner
#    Given I click element "#newAddress"
    Then I click continue and expect URL "NEW_POSTAL_AND_EMAIL"
#    Then the page should include element "#newPostalAddress"

    Given I have a new address for my partner
#    Given I click element "#newPostalAddress"
    Then I click continue and expect URL "NEW_POSTAL_ADDRESS"
#    Then the page should include element "#enterPostcode"

    Given I enter their new address
#    Given I select element "#postcode"
#    And I type "SW1A 1AA"
#    When I click element "#findAddressButton"
#    Then the page should include "SW1A 1AA"
#    And I wait for the postcode lookup to return results
#    Given I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"
#    Then the page should include element "#checkAnswersTitle"

    Then I click accept and send and expect URL "NO_RESPONSE_DETAILS_UPDATED"
#    Then the page should include element "#detailsUpdatedTitle"

  Scenario: No response new email address
    Given I set the case to AosOverdue
#    Then the page should include "View your options for proceeding without a response from the respondent"

    Given I progress to HAVE_THEY_RECEIVED when overdue

#    Then I click element "#aosDueLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

#    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#upToDate"

    Given I have new contact details for my partner
#    Given I click element "#newAddress"
    Then I click continue and expect URL "NEW_POSTAL_AND_EMAIL"
#    Then the page should include element "#newPostalAddress"

    Given I have a new email address for my partner
#    Given I click element "#newEmailAddress"
    Then I click continue and expect URL "NEW_EMAIL"
#    Then the page should include element "#provideNewEmail"

    Given I want to provide a new email address for my partner
#    When I click element "#provideNewEmail"
    Then I click continue and expect URL "PROVIDE_NEW_EMAIL_ADDRESS"
#    Then the page should include element "#applicant1NoResponsePartnerEmailAddress"

    Given I enter their new email address
#    Given I select element "#applicant1NoResponsePartnerEmailAddress"
#    And I type "test@test.com"
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"
#    Then the page should include element "#checkAnswersTitle"

    Then I click accept and send and expect URL "NO_RESPONSE_DETAILS_UPDATED"
#    Then the page should include element "#detailsUpdatedTitle"

  Scenario: No response new postal and email address
    Given I set the case to AosOverdue

    Given I progress to HAVE_THEY_RECEIVED when overdue
#    Then I click element "#aosDueLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

#    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#haveTheyReceivedTitle"

    Given I have new contact details for my partner
#    Given I select element '#newAddress'
    Then I click continue and expect URL "NEW_POSTAL_AND_EMAIL"
#    Then the page should include element "#newPostalAndEmailTitle"

    Given I have a new postal and email address for my partner
#    Given I select element "#bothEmailAndPostalAddress"
    Then I click continue and expect URL "PROVIDE_NEW_EMAIL_ADDRESS"
#    Then the page should include element "#provideNewEmailAddressTitle"

    Given I enter their new email address
#    Given I select element "#applicant1NoResponsePartnerEmailAddress"
#    And I type "test@test.com"
    Then I click continue and expect URL "NEW_POSTAL_ADDRESS"
#    Then the page should include element "#enterPostcode"

    Given I enter their new address
#    Given I select element "#postcode"
#    And I type "SW1A 1AA"
#    When I click element "#findAddressButton"
#    Then the page should include "SW1A 1AA"
#    And I wait for the postcode lookup to return results
#    Given I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"
#    Then the page should include element "#checkAnswersTitle"

    Then I click accept and send and expect URL "NO_RESPONSE_DETAILS_UPDATED"
#    Then the page should include element "#detailsUpdatedTitle"

  Scenario: No response update contact details NEW_POSTAL_AND_EMAIL throws error
    Given I set the case to AosOverdue

    Given I go to "NEW_POSTAL_AND_EMAIL"
    Then I click continue
    Then the page should show an error for field "newPostalAddress"

  Scenario: No response send papers again or try something else
    Given I set the case to AosOverdue
#    Then the page should include "View your options for proceeding without a response from the respondent"

    Given I progress to HAVE_THEY_RECEIVED when overdue

#    Then I click element "#aosDueLink" and expect URL "OPTIONS_FOR_PROGRESSING"
#    Then the page should include element "#optionsForProgressingTitle"

#    Then I click start and expect URL "HAVE_THEY_RECEIVED"
#    Then the page should include element "#upToDate"

    Given I confirm their details are up to date
#    Given I click element "#upToDate"
    Then I click continue and expect URL "EVIDENCE_RECEIVED_APPLICATION"
#    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I do not have evidence they have received the papers
#    Given I click element "#proveNo"
    Then I click continue and expect URL "SERVE_AGAIN"
#    Then the page should include element "#sendPapersAgainToPartner"

    Given I want to send the papers again
#    Given I click element "#sendPapersAgain"
    Then I click continue and expect URL "NEW_CONTACT_DETAIL_CHECK_ANSWERS"
#    Then the page should include element "#checkAnswersTitle"

    Then I click accept and send and expect URL "WILL_SERVE_AGAIN"
#    Then the page should include element "#sendPapersAgainTitle"
