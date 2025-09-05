Feature: Dispense with service journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"
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

    Given I click element "#noContactDetails"
    When I click continue
    Then the page should include element "#ownSearchesTitle"

    Given I click element "#notFound"
    When I click continue
    Then the page should include element "#isPartnerAbroadTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#dispenseWithServiceApplicationTitle"

  Scenario: Dispense with service happy path
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
    Then the page should include element "#daSearchDispenseTitle"

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

    Given I select element "#applicant1DispenseContactFriendsOrFamilyDetails"
    And I type "Friends or relatives contact details"
    When I click continue

    #Then the page should include element "#STOP"
    # Fix and continue this scenario as the journey progresses

