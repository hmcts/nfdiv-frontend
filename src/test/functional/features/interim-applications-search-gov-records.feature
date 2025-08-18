Feature: Search gov records journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"

  Scenario: Search gov records happy path
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosOverdue"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueLink"

    Given I go to "/interim-applications/no-response/gov-search-possible"
    And I click element "#search"
    When I click continue
    Then the page should include element "#searchGovRecordsApplicationTitle"

  Scenario: Search gov records help with fees happy path
    Given I set the case state to "AosOverdue"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueLink"

    Given I go to "/interim-applications/no-response/gov-search-possible"
    And I click element "#search"
    When I click continue
    Then the page should include element "#searchGovRecordsApplicationTitle"

    When I click continue
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberInputTitle"

    Given I select element "#applicant1InterimAppsHwfRefNumber"
    And I type "HWF-A1B-23D"
    When I click continue
    Then the page should include element "#whySearchGovRecords"

    Given I select element "#applicant1SearchGovRecordsReasonForApplying"
    And I type "test"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsWhichDepartments"

    Given I click element "#applicant1SearchGovRecordsWhichDepartments-3"
    Then the page should include element "#applicant1SearchGovRecordsOtherDepartmentNames"
    When I select element "#applicant1SearchGovRecordsOtherDepartmentNames"
    And I type "DVLA"
    When I select element "#applicant1SearchGovRecordsWhyTheseDepartments"
    And I type "test"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsPartnerName"

    Given I click element "#applicant1SearchGovRecordsPartnerName"
    When I click continue
    Then the page should include element "#conditional-applicant1SearchGovRecordsKnowPartnerDateOfBirth"

    Given I select element "#applicant1SearchGovRecordsKnowPartnerDateOfBirth"
    Then the page should include element "#applicant1SearchGovRecordsPartnerDateOfBirth"
    Given I select "Day"
    And I type "1"
    Given I select "Month"
    And I type "1"
    Given I select "Year"
    And I type "2000"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsKnowPartnerNationalInsurance-hint"

    Given I click element "#yes"
    Then the page should include element "#applicant1SearchGovRecordsPartnerNationalInsurance"
    When I select element "#applicant1SearchGovRecordsPartnerNationalInsurance"
    And I type "JB 34 66 84 E"
    When I click continue
    Then the page should include element "#postcode"

    Given I select element "#postcode"
    And I type "SW1H 9AJ"
    When I click element "#findAddressButton"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results

    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
    When I select element "#applicant1SearchGovRecordsPartnerLastKnownAddressDates"
    And I type "test dates"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsKnowPartnerAdditionalAddresses-hint"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsPartnerAdditionalAddress1"

    Given I select element "#applicant1SearchGovRecordsPartnerAdditionalAddress1"
    And I type "test dates"
    When I select element "#applicant1SearchGovRecordsPartnerAdditionalAddressDates1"
    And I type "test dates"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click continue
    Then the page should include element "#serviceApplicationSubmittedTitle"
    And the page should include "You have submitted your application for search government records."





#  Finish this scenario when the no-response/update-partners-contact-details page is complete
#  Scenario: No response (no respondent address) happy path to deemed service
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include "Your application will be checked by court staff."
#
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    And a superuser updates "applicant2Address1" with ""
#    And a superuser updates "applicant2Address2" with ""
#    And a superuser updates "applicant2Address3" with ""
#    And a superuser updates "applicant2AddressTown" with ""
#    And a superuser updates "applicant2AddressCounty" with ""
#    And a superuser updates "applicant2AddressCountry" with ""
#    And a superuser updates "applicant2AddressPostcode" with ""
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"
#    When I click element "#aosDueAndDraftedLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#haveTheyReceivedTitle"
#    And the page should include element "#noDetailsProvided"
#
#    Given I click element "#newAddress"
#    When I click continue

#  Scenario: No response respondent represented happy path to deemed service
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include "Your application will be checked by court staff."
#
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    And a superuser updates "applicant2SolicitorRepresented" with "Yes"
#    And a superuser updates "applicant2SolicitorFirmName" with "Test Solicitor Firm Name"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"
#    When I click element "#aosDueAndDraftedLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#haveTheyReceivedRepresentedTitle"
#
#    When I click element "#noFormContinue"
#    Then the page should include element "#evidenceReceivedApplicationTitle"
#
#    Given I click element "#proveYes"
#    When I click continue
#    Then the page should include element "#deemedServiceApplicationTitle"
#
#  Scenario: No response respondent confidential happy path to deemed service
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include "Your application will be checked by court staff."
#
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    And a superuser updates "applicant2AddressPrivate" with "Yes"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"
#    When I click element "#aosDueAndDraftedLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#evidenceReceivedApplicationTitle"
#
#    Given I click element "#proveYes"
#    When I click continue
#    Then the page should include element "#deemedServiceApplicationTitle"
#
#  Scenario: No response respondent confidential /have-they-received throws error
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include "Your application will be checked by court staff."
#
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    And a superuser updates "applicant2AddressPrivate" with "Yes"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"
#    When I click element "#aosDueAndDraftedLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#evidenceReceivedApplicationTitle"
#
#    When I go to "/have-they-received"
#    Then the page should include element "#errorTitle"
#
#  Scenario: No response unhappy path to process server
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include "Your application will be checked by court staff."
#
#    Given I set the case state to "AosDrafted"
#    And a superuser updates "aosIsDrafted" with "Yes"
#    When I sign out
#    And I login with applicant "1"
#    Then the page should include element "#aosDueAndDraftedLine1"
#    When I click element "#aosDueAndDraftedLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#haveTheyReceivedTitle"
#    And the page should include element "#detailsProvided"
#
#    Given I click element "#notKnown"
#    When I click continue
#    Then the page should include element "#noNewContactDetailsTitle"
#
#    Given I click element "#inPersonService"
#    When I click continue
#    Then the page should include element "#partnerInPersonTitle"
#
#    Given I click element "#processServer"
#    When I click continue
#    Then the page should include element "#processServerTitle"
#
#    When I click continue
#    Then the page should include element "#successScreenProcessServerTitle"
#
#    When I click element "#downloadPapersLink"
#    Then the page should include element "#processServerDocumentsTitle"
#
#  Scenario: No response /new-postal-and-email new postal address
#    Given I set the case state to "AosOverdue"
#    Then the page should include "View your options for proceeding without a response from the respondent"
#    When I click element "#aosDueLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#upToDate"
#
#    Given I click element "#newAddress"
#    When I click continue
#    Then the page should include element "#newPostalAddress"
#    When I click element "#newPostalAddress"
#    When I click continue
#    Then the page should include element "#enterPostcode"
#
#    Given I select element "#postcode"
#    And I type "SW1H 9AJ"
#    When I click element "#findAddressButton"
#    Then the page should include "SW1H 9AJ"
#    And I wait for the postcode lookup to return results
#
#    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
#    When I click continue
#    Then the page should include element "#checkAnswersTitle"
#
#    When I click accept and send
#    Then the page should include element "#detailsUpdatedTitle"
#
#  Scenario: No response /new-postal-and-email new email address
#    Given I set the case state to "AosOverdue"
#    Then the page should include "View your options for proceeding without a response from the respondent"
#    When I click element "#aosDueLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#upToDate"
#
#    Given I click element "#newAddress"
#    When I click continue
#    Then the page should include element "#newPostalAddress"
#    When I click element "#newEmailAddress"
#    When I click continue
#    Then the page should include element "#provideNewEmail"
#
#    When I click element "#provideNewEmail"
#    And I click continue
#    Then the page should include element "#applicant1NoResponsePartnerEmailAddress"
#
#    Given I select element "#applicant1NoResponsePartnerEmailAddress"
#    And I type "test@test.com"
#    When I click continue
#    Then the page should include element "#checkAnswersTitle"
#
#    When I click accept and send
#    Then the page should include element "#detailsUpdatedTitle"
#
#  Scenario: No response /new-postal-and-email new postal and email address
#    Given I set the case state to "AosOverdue"
#    Then the page should include "View your options for proceeding without a response from the respondent"
#    When I click element "#aosDueLink"
#    Then the page should include element "#optionsForProgressingTitle"
#    When I click start
#    Then the page should include element "#upToDate"
#
#    Given I click element "#newAddress"
#    When I click continue
#    Then the page should include element "#newPostalAddress"
#    And I click element "#bothEmailAndPostalAddress"
#    When I click continue
#    Then the page should include element "#enterPostcode"
#
#    Given I select element "#postcode"
#    And I type "SW1H 9AJ"
#    When I click "Find address"
#    Then the page should include "SW1H 9AJ"
#    And I wait for the postcode lookup to return results
#
#    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
#    When I click continue
#    Then the page should include element "#applicant1NoResponsePartnerEmailAddress"
#    When I select element "#applicant1NoResponsePartnerEmailAddress"
#    And I type "test@testing.com"
#    When I click continue
#    Then the page should include element "#checkAnswersTitle"
#
#    When I click "Accept and send"
#    Then the page should include element "#detailsUpdatedTitle"
#
#  Scenario: No response update contact details /new-postal-and-email throws error
#    Given I go to "/interim-applications/no-response/new-postal-and-email"
#    When I click continue
#    Then the page should show an error for field "applicant1NoResponsePartnerNewEmailOrAddress"
