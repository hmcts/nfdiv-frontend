Feature: Dispense with service journey

  Background:
    Given I prep the case for an interim application

    Given I don't know my partner's contact details
    Then I click continue and expect URL "NO_NEW_ADDRESS"

    Given I have no contact details for my partner
    Then I click continue and expect URL "OWN_SEARCHES"

    Given I select not found
    Then I click continue and expect URL "IS_PARTNER_ABROAD"

    Given I select no
    Then I click continue and expect URL "DISPENSE_SERVICE_APPLICATION"

  Scenario: Dispense with service happy path
    When I click start and expect URL "HELP_WITH_FEES_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_INPUT_DISPENSE"

    Given I enter my HWF reference number
    Then I click continue and expect URL "LAST_DATE_DISPENSE"

    Given I select yes
    Then I enter the date we last lived together
    Then I click continue and expect URL "LAST_ADDRESS_DISPENSE"

    Given I enter their last known address
    Then I click continue and expect URL "AWARE_PARTNER_ADDRESS_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "PARTNER_NEW_ADDRESS_DISPENSE"

    Given I enter their past address
    Then I click continue and expect URL "LAST_SEEN_DISPENSE"

    Given I enter the date they were last seen
    Then I click continue and expect URL "FINAL_ORDER_SEARCH_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "EMAIL_DISPENSE"

    Given I select yes
    When I click continue and expect URL "EMAIL_DESCRIPTION_DISPENSE"

    Given I enter details of attempts to contact them via email
    Then I click continue and expect URL "PHONE_NUMBER_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "PHONE_DESCRIPTION_DISPENSE"

    Given I enter details of attempts to contact them via phone
    Then I click continue and expect URL "TRACING_AGENT_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "TRACING_AGENT_RESULTS_DISPENSE"

    Given I enter the tracing agent results
    Then I click continue and expect URL "TRACING_ONLINE_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "TRACING_ONLINE_RESULTS_DISPENSE"

    Given I enter the results of an online trace
    Then I click continue and expect URL "SEARCHING_ONLINE_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "SEARCHING_ONLINE_RESULTS_DISPENSE"

    Given I enter the results of an online search
    Then I click continue and expect URL "EMPLOYMENT_CONTACT_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "EMPLOYMENT_DETAILS_DISPENSE"

    Given I enter details of attempts to contact their employer
    Then I click continue and expect URL "CHILDREN_OF_FAMILY_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "CHILDREN_CONTACT_DISPENSE"

    Given I select yes
    Then I click continue and expect URL "WHEN_CONTACT_CHILDREN_DISPENSE"

    Given I enter details of how they contact the children
    Then I click continue and expect URL "CHILD_MAINTENANCE_DISPENSE"

    Given I select yes
    Then I enter the results of a child maintenance search
    Then I click continue and expect URL "FRIENDS_OR_RELATIVES_DISPENSE"

    Given I enter contact details for their friends and relatives
    Then I click continue and expect URL "OTHER_ENQUIRIES_DISPENSE"

    Given I enter details of my other enquiries
    Then I click continue and expect URL "UPLOAD_EVIDENCE_DISPENSE"

    Given I cannot upload some or all of my documents
    Then I click continue and expect URL "CHECK_ANSWERS_DISPENSE"

    Given I confirm the statement of truth
    Then I click continue and expect URL "SERVICE_APPLICATION_SUBMITTED"
