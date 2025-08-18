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

  Scenario: Search gov records pay by card happy path
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

    Given I click element "#no"
    When I click continue
    Then the page should include element "#whySearchGovRecords"

    Given I select element "#applicant1SearchGovRecordsReasonForApplying"
    And I type "test"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsWhichDepartments"

    Given I click element "#applicant1SearchGovRecordsWhichDepartments-2"
    When I select element "#applicant1SearchGovRecordsWhyTheseDepartments"
    And I type "test"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsPartnerName"

    Given I clear the form
    When I click element "#applicant1SearchGovRecordsPartnerName"
    And I type "test name"
    When I click continue
    Then the page should include element "#conditional-applicant1SearchGovRecordsKnowPartnerDateOfBirth"

    Given I select element "#applicant1SearchGovRecordsKnowPartnerDateOfBirth-2"
    Then the page should include element "#applicant1SearchGovRecordsPartnerApproximateAge"
    Given I select element "#applicant1SearchGovRecordsPartnerApproximateAge"
    And I type "40"
    When I click continue
    Then the page should include element "#applicant1SearchGovRecordsKnowPartnerNationalInsurance-hint"

    Given I click element "#no"
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

    Given I click element "#no"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourServiceFeeTitle"

    Given I pay and submit the service application
    Then the page should include "You have submitted your request"

    Given I click element "#returnToHub"
    Then the page should include "considering your request for search government records"