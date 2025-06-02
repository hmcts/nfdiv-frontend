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
    And the page should include "stop"

    Given I click element "#upToDate"
    When I click continue
    Then the page should include element "#evidenceReceivedApplicationTitle"

    Given I click element "#proveYes"
    When I click continue
    Then the page should include element "#deemedServiceApplicationTitle"

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
