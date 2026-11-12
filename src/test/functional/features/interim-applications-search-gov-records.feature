Feature: Search gov records journey

  Background:
    Given I prep the case for an overdue interim application

    Given I don't know my partner's contact details
    Then I click continue and expect URL "NO_NEW_ADDRESS"

    Given I have no contact details for my partner
    Then I click continue and expect URL "OWN_SEARCHES"

    Given I select not found
    Then I click continue and expect URL "IS_PARTNER_ABROAD"

    Given I select yes
    Then I click continue and expect URL "GOV_SEARCH_POSSIBLE"

    Given I want to search government records
    Then I click continue and expect URL "SEARCH_GOV_RECORDS_APPLICATION"

  Scenario: Search gov records happy path
    Given I click start and expect URL "SEARCH_GOV_RECORDS_HWF"

    Given I select no
    Then I click continue and expect URL "WHY_SEARCH_GOV_RECORDS"

    Given I enter the reason for applying
    Then I click continue and expect URL "WHICH_GOV_DEPARTMENTS"

    Given I want to search other departments
    Then I click continue and expect URL "PARTNER_NAME_GOV_RECORDS"

    Given I enter their name for the search
    Then I click continue and expect URL "PARTNER_DOB_GOV_RECORDS"

    Given I do not know their date of birth
    Then I click continue and expect URL "PARTNER_NI_GOV_RECORDS"

    Given I select no
    Then I click continue and expect URL "PARTNER_ADDRESS_GOV_RECORDS"

    Given I enter their address
    And I enter the dates they lived at this address
    Then I click continue and expect URL "PARTNER_ADDRESS_ADDITIONAL_ADDRESSES"

    Given I select no
    Then I click continue and expect URL "CHECK_YOUR_ANSWERS_GOV_RECORDS"

    Given I confirm the statement of truth
    Then I click submit and expect URL "PAY_YOUR_GENERAL_APPLICATION_FEE"

    Then I pay and submit the general application

  Scenario: Search gov records help with fees happy path
    Given I click start and expect URL "SEARCH_GOV_RECORDS_HWF"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS"

    Given I enter my HWF reference number
    Then I click continue and expect URL "WHY_SEARCH_GOV_RECORDS"

    Given I enter the reason for applying
    Then I click continue and expect URL "WHICH_GOV_DEPARTMENTS"

    Given I want to search other departments
    Then I click continue and expect URL "PARTNER_NAME_GOV_RECORDS"

    Then I click continue and expect URL "PARTNER_DOB_GOV_RECORDS"

    Given I enter their date of birth for the search
    Then I click continue and expect URL "PARTNER_NI_GOV_RECORDS"

    Given I select yes
    And I enter their NI number for the search
    Then I click continue and expect URL "PARTNER_ADDRESS_GOV_RECORDS"

    Given I enter their address
    And I enter the dates they lived at this address
    Then I click continue and expect URL "PARTNER_ADDRESS_ADDITIONAL_ADDRESSES"

    Given I select yes
    Then I click continue and expect URL "PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS"

    Given I enter their additional address for the search
    Then I click continue and expect URL "CHECK_YOUR_ANSWERS_GOV_RECORDS"

    Given I confirm the statement of truth
    Then I click continue and expect URL "GENERAL_APPLICATION_SUBMITTED"
