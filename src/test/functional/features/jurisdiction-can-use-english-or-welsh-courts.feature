Feature: Jurisdiction - can use English or Welsh courts

  Background:
    Given I create a new user and login
    And I've completed all questions correctly to get to the jurisdiction section

  Scenario: Jurisdiction happy path tests, part one
    # A Applicant1 and Applicant2 are habitually resident
    Given we both live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_RESIDENT"


    # B Applicant1 and Applicant2 were last habitually resident in England and Wales, neither habitually resident
    Given I reset the jurisdiction connections
    And neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given neither of us are domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_LAST_RESIDENT"


    # C The Applicant2 habitually resides in England and Wales (mixed sex marriage)
    Given I reset the jurisdiction connections
    And only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_RESIDENT_SOLE"


    # D Applicant1 is habitually resident in England and Wales and has been for 12 months
    Given I reset the jurisdiction connections
    And only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_RESIDENT_TWELVE_MONTHS"


    # F Applicant1 and Applicant2 are both domiciled in England and Wales, Applicant1 habitually resident (mixed sex marriage)
    Given I reset the jurisdiction connections
    And only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"
    And we are both domiciled in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_DOMICILED"


    # G residual jurisdiction applies (Applicant1 resident, same sex couple)
    Given I reset the jurisdiction connections
    Then I go to 'YOUR_DETAILS_URL'

    Given we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    And only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given neither of us are domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "RESIDUAL_JURISDICTION"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "RESIDUAL_JURISDICTION_D"


    # H, E, B Applicant1 domiciled, Applicant1 habitually resident for 6 months and both last habitually resident
  Scenario: Jurisdiction happy path tests, part two
    Given I reset the jurisdiction connections
    Then I go to 'YOUR_DETAILS_URL'

    Given we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    And only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "LIVING_ENGLAND_WALES_SIX_MONTHS"

    Given I select yes
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED, APP_1_RESIDENT_SIX_MONTHS, APP_1_APP_2_LAST_RESIDENT"


    # I Applicant2 domiciled (Applicant1 resident)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only my partner is domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_DOMICILED"


    # J Applicant1 habitually resides in England and Wales (joint application)
    Given I reset the jurisdiction connections
    And I've said I'm making a joint application
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include joint divorce connection content "APP_1_RESIDENT_JOINT"


  @nightly
  Scenario: Clicking Back takes them to the start of the jurisdiction flow
    Given we both live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"

    Then I click back and expect URL "CHECK_JURISDICTION"

  @nightly
  Scenario: The user changes their answer to same-sex or application type
    Given we both live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"

    Given I go to "YOUR_DETAILS_URL"
    And we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to "HOME_URL"
    Then I click continue and expect URL "CHECK_JURISDICTION"

    Then I click continue and expect URL "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given we both live in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"

    Given I go to "HOW_DO_YOU_WANT_TO_APPLY"
    And I want to apply jointly
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Given I enter their email address
    Then I click continue and expect URL "IN_THE_UK"

    Given I go to "HOME_URL"
    Then I click continue and expect URL "CHECK_JURISDICTION"
