Feature: No response journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"

  Scenario: No response happy path to deemed service
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"
    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"
    When I click start
    Then the page should include element "#haveTheyReceivedTitle"
    And the page should include element "#detailsProvided"

    Given I click element "#upToDate"
    When I click continue
    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I click element "#proveYes"
    When I click continue
    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: No response respondent represented happy path to deemed service
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    And a superuser updates "applicant2SolicitorRepresented" with "Yes"
    And a superuser updates "applicant2SolicitorFirmName" with "Test Solicitor Firm Name"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"

    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#haveTheyReceivedRepresentedTitle"

    When I click element "#noFormContinue"
    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I click element "#proveYes"
    When I click continue
    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: No response respondent confidential happy path to deemed service
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    And a superuser updates "applicant2AddressPrivate" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"

    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I click element "#proveYes"
    When I click continue
    Then the page should include element "#deemedServiceApplicationTitle"

  Scenario: No response respondent confidential /have-they-received throws error
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    And a superuser updates "applicant2AddressPrivate" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"

    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#evidenceReceivedApplicationTitle"

    When I go to "/have-they-received"
    Then the page should include element "#errorTitle"

  Scenario: No response unhappy path to process server
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"

    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#haveTheyReceivedTitle"
    And the page should include element "#detailsProvided"

    Given I click element "#notKnown"
    When I click continue
    Then the page should include element "#noNewContactDetailsTitle"

    Given I click element "#inPersonService"
    When I click continue
    Then the page should include element "#partnerInPersonTitle"

    Given I click element "#processServer"
    When I click continue
    Then the page should include element "#processServerTitle"

    When I click continue
    Then the page should include element "#successScreenProcessServerTitle"

    When I click element "#downloadPapersLink"
    Then the page should include element "#processServerDocumentsTitle"

  Scenario: No response /new-postal-and-email new postal address
    Given I set the case state to "AosOverdue"
    Then the page should include "View your options for proceeding without a response from the respondent"

    When I click element "#aosDueLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#upToDate"

    Given I click element "#newAddress"
    When I click continue
    Then the page should include element "#newPostalAddress"

    Given I click element "#newPostalAddress"
    When I click continue
    Then the page should include element "#enterPostcode"

    Given I select element "#postcode"
    And I type "SW1A 1AA"
    When I click element "#findAddressButton"
    Then the page should include "SW1A 1AA"
    And I wait for the postcode lookup to return results

    Given I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    When I click accept and send
    Then the page should include element "#detailsUpdatedTitle"

  Scenario: No response /new-postal-and-email new email address
    Given I set the case state to "AosOverdue"
    Then the page should include "View your options for proceeding without a response from the respondent"

    When I click element "#aosDueLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#upToDate"

    Given I click element "#newAddress"
    When I click continue
    Then the page should include element "#newPostalAddress"

    Given I click element "#newEmailAddress"
    When I click continue
    Then the page should include element "#provideNewEmail"

    When I click element "#provideNewEmail"
    And I click continue
    Then the page should include element "#applicant1NoResponsePartnerEmailAddress"

    Given I select element "#applicant1NoResponsePartnerEmailAddress"
    And I type "test@test.com"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    When I click accept and send
    Then the page should include element "#detailsUpdatedTitle"

  Scenario: No response /new-postal-and-email new postal and email address
    Given I set the case state to "AosOverdue"
    Then the page should include "View your options for proceeding without a response from the respondent"

    When I click element "#aosDueLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#haveTheyReceivedTitle"

    Given I select element '#newAddress'
    When I click continue
    Then the page should include element "#newPostalAndEmailTitle"

    Given I select element "#bothEmailAndPostalAddress"
    When I click continue
    Then the page should include element "#provideNewEmailAddressTitle"

    Given I select element "#applicant1NoResponsePartnerEmailAddress"
    And I type "test@test.com"
    When I click continue
    Then the page should include element "#enterPostcode"

    Given I select element "#postcode"
    And I type "SW1A 1AA"
    When I click element "#findAddressButton"
    Then the page should include "SW1A 1AA"
    And I wait for the postcode lookup to return results

    Given I choose "BUCKINGHAM PALACE, LONDON, SW1A 1AA" from "Select an address"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    When I click accept and send
    Then the page should include element "#detailsUpdatedTitle"

  Scenario: No response update contact details /new-postal-and-email throws error
    Given I go to "/interim-applications/no-response/new-postal-and-email"
    When I click continue
    Then the page should show an error for field "newPostalAddress"

  Scenario: No response /server-again send papers again or try something else
    Given I set the case state to "AosOverdue"
    Then the page should include "View your options for proceeding without a response from the respondent"

    When I click element "#aosDueLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#upToDate"

    Given I click element "#upToDate"
    When I click continue
    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I click element "#proveNo"
    When I click continue
    Then the page should include element "#sendPapersAgainToPartner"

    Given I click element "#sendPapersAgain"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    When I click accept and send
    Then the page should include element "#sendPapersAgainTitle"
