Feature: Dispense service journey pre-issue

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "completeCase"
    Then I set the case state to "AwaitingDocuments"
    When I sign out
    And I login with applicant "1"
    And I go to "/interim-applications/dispense-service/service-application"

  Scenario: Dispense with service help with fees happy path pre-issue
    Then the page should include element "#dispenseWithServiceApplicationTitle"

    When I click start
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
    Then the page should include element "#lastDateDispenseTitle"

    Given I click element "#yes"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-day"
    And I type "1"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-month"
    And I type "1"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-year"
    And I type "2000"
    When I click continue
    Then the page should include element "#enterAddressTitle"

    Given I select element "#postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results

    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
    When I click continue
    Then the page should include element "#awarePartnerAddressDispenseTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#partnerNewAddressDispenseTitle"

    Given I select element "#applicant1DispensePartnerPastAddress1"
    And I type "123 Example Street"
    Then I select element "#applicant1DispensePartnerPastAddressEnquiries1"
    And I type "Example Enquiries"
    When I click continue
    Then the page should include element "#lastSeenDispenseTitle"

    Given I select element "#applicant1DispensePartnerLastSeenOrHeardOfDate-day"
    And I type "1"
    Then I select element "#applicant1DispensePartnerLastSeenOrHeardOfDate-month"
    And I type "1"
    Then I select element "#applicant1DispensePartnerLastSeenOrHeardOfDate-year"
    And I type "2000"
    Then I select element "#applicant1DispensePartnerLastSeenDescription"
    And I type "Last seen description"
    When I click continue
    Then the page should include element "#finalOrderSearchDispenseTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#emailDispenseTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#emailDescriptionTitle"

    Given I select element "#applicant1DispensePartnerEmailAddresses"
    And I type "test@test.com - no response to email"
    When I click continue
    Then the page should include element "#phoneNumbersDispenseTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#phoneDescriptionTitle"

    Given I select element "#applicant1DispensePartnerPhoneNumbers"
    And I type "01234 567890 - no response to phone"
    When I click continue
    Then the page should include element "#tracingAgentDispenseTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#tracingAgentResultsTitle"

    Given I select element "#applicant1DispenseTracingAgentResults"
    And I type "Tracing agent results"
    When I click continue
    Then the page should include element "#tracingOnlineTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#tracingOnlineResultsTitle"

    Given I select element "#applicant1DispenseTracingOnlineResults"
    And I type "Tracing online results"
    When I click continue
    Then the page should include element "#searchingOnlineTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#searchingOnlineResultsTitle"

    Given I select element "#applicant1DispenseSearchingOnlineResults"
    And I type "Searching online results"
    When I click continue
    Then the page should include element "#contactingEmployerTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#employmentDetailsTitle"

    Given I select element "#applicant1DispenseEmployerName"
    And I type "Example Employer"
    Then I select element "#applicant1DispenseEmployerAddress"
    And I type "123 Example Street, Example Town, EX1 2MP"
    Then I select element "#applicant1DispensePartnerOccupation"
    And I type "Test Occupation"
    Then I select element "#applicant1DispenseContactingEmployerResults"
    And I type "Contacting employer results"
    When I click continue
    Then the page should include element "#childrenOfFamilyTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#childrenContactTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#whenContactChildrenTitle"

    Given I select element "#applicant1DispenseHowPartnerContactChildren"
    And I type "How partner contacts children"
    When I click continue
    Then the page should include element "#childMaintenanceTitle"

    Given I select element "#yes"
    Then I select element "#applicant1DispenseChildMaintenanceResults"
    And I type "Child maintenance results"
    When I click continue
    Then the page should include element "#friendsOrRelativesTitle"

    Given I select element "#applicant1DispenseContactFriendsOrRelativesDetails"
    And I type "Friends or relatives contact details"
    When I click continue

    Then the page should include element "#otherEnquiriesTitle"
    Given I select element "#applicant1DispenseOtherEnquiries"
    And I type "Other enquiries details"
    When I click continue

    Then the page should include element "#uploadEvidenceTitle"
    Given I select element "#applicant1InterimAppsCannotUploadDocs"
    When I click continue

    Then the page should include element "#checkAnswersTitle"
    Given I select element "#applicant1InterimAppsStatementOfTruth"
    When I click continue
    Then the page should include element "#serviceApplicationSubmittedTitle"
    And the page should include "You have applied to dispense with service."

  Scenario: Dispense with service pay by card happy path pre-issue
    Then the page should include element "#dispenseWithServiceApplicationTitle"

    When I click start
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#lastDateDispenseTitle"

    Given I click element "#yes"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-day"
    And I type "1"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-month"
    And I type "1"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-year"
    And I type "2000"
    When I click continue
    Then the page should include element "#enterAddressTitle"

    Given I select element "#postcode"
    And I type "SW1H 9AJ"
    When I click "Find address"
    Then the page should include "SW1H 9AJ"
    And I wait for the postcode lookup to return results

    Given I choose "MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ" from "Select an address"
    When I click continue
    Then the page should include element "#awarePartnerAddressDispenseTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#partnerNewAddressDispenseTitle"

    Given I select element "#applicant1DispensePartnerPastAddress1"
    And I type "123 Example Street"
    Then I select element "#applicant1DispensePartnerPastAddressEnquiries1"
    And I type "Example Enquiries"
    When I click continue
    Then the page should include element "#lastSeenDispenseTitle"

    Given I select element "#applicant1DispensePartnerLastSeenOrHeardOfDate-day"
    And I type "1"
    Then I select element "#applicant1DispensePartnerLastSeenOrHeardOfDate-month"
    And I type "1"
    Then I select element "#applicant1DispensePartnerLastSeenOrHeardOfDate-year"
    And I type "2000"
    Then I select element "#applicant1DispensePartnerLastSeenDescription"
    And I type "Last seen description"
    When I click continue
    Then the page should include element "#finalOrderSearchDispenseTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#emailDispenseTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#emailDescriptionTitle"

    Given I select element "#applicant1DispensePartnerEmailAddresses"
    And I type "test@test.com - no response to email"
    When I click continue
    Then the page should include element "#phoneNumbersDispenseTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#phoneDescriptionTitle"

    Given I select element "#applicant1DispensePartnerPhoneNumbers"
    And I type "01234 567890 - no response to phone"
    When I click continue
    Then the page should include element "#tracingAgentDispenseTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#tracingAgentResultsTitle"

    Given I select element "#applicant1DispenseTracingAgentResults"
    And I type "Tracing agent results"
    When I click continue
    Then the page should include element "#tracingOnlineTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#tracingOnlineResultsTitle"

    Given I select element "#applicant1DispenseTracingOnlineResults"
    And I type "Tracing online results"
    When I click continue
    Then the page should include element "#searchingOnlineTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#searchingOnlineResultsTitle"

    Given I select element "#applicant1DispenseSearchingOnlineResults"
    And I type "Searching online results"
    When I click continue
    Then the page should include element "#contactingEmployerTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#employmentDetailsTitle"

    Given I select element "#applicant1DispenseEmployerName"
    And I type "Example Employer"
    Then I select element "#applicant1DispenseEmployerAddress"
    And I type "123 Example Street, Example Town, EX1 2MP"
    Then I select element "#applicant1DispensePartnerOccupation"
    And I type "Test Occupation"
    Then I select element "#applicant1DispenseContactingEmployerResults"
    And I type "Contacting employer results"
    When I click continue
    Then the page should include element "#childrenOfFamilyTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#childrenContactTitle"

    Given I select element "#yes"
    When I click continue
    Then the page should include element "#whenContactChildrenTitle"

    Given I select element "#applicant1DispenseHowPartnerContactChildren"
    And I type "How partner contacts children"
    When I click continue
    Then the page should include element "#childMaintenanceTitle"

    Given I select element "#yes"
    Then I select element "#applicant1DispenseChildMaintenanceResults"
    And I type "Child maintenance results"
    When I click continue
    Then the page should include element "#friendsOrRelativesTitle"

    Given I select element "#applicant1DispenseContactFriendsOrRelativesDetails"
    And I type "Friends or relatives contact details"
    When I click continue

    Then the page should include element "#otherEnquiriesTitle"
    Given I select element "#applicant1DispenseOtherEnquiries"
    And I type "Other enquiries details"
    When I click continue

    Then the page should include element "#uploadEvidenceTitle"
    Given I select element "#applicant1InterimAppsCannotUploadDocs"
    When I click continue
    Then the page should include element "#checkAnswersTitle"

    Given I click element "#applicant1InterimAppsStatementOfTruth"
    When I click submit
    Then the page should include element "#payYourServiceFeeTitle"

    Given I pay and submit the service application
    And the page should include "You have applied to dispense with service."
