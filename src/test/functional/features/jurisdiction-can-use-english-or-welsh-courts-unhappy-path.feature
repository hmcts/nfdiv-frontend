Feature: Jurisdiction unhappy path

  Background:
    Given I create a new user and login
    And I've completed all questions correctly to get to the jurisdiction section

  @nightly
  Scenario: Jurisdiction Applicant1 and Applicant2 Domiciled and Last Resident unhappy paths
    # B Applicant1 and Applicant2 were last habitually resident in England and Wales, Applicant1 habitually resident
    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given neither of us are domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_LAST_RESIDENT"


    # F Applicant1 and Applicant2 are both domiciled in England and Wales, neither habitually resident (mixed sex marriage)
    Given I reset the jurisdiction connections
    And neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_DOMICILED"


    # G residual jurisdiction applies (Applicant1 not resident, same sex couple)
    Given I reset the jurisdiction connections
    Then I go to 'YOUR_DETAILS_URL'

    Given we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    And neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given neither of us are domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "RESIDUAL_JURISDICTION"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "RESIDUAL_JURISDICTION_D"


    # F Applicant1 and Applicant2 domiciled (Applicant1 resident, same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_DOMICILED"


    # F Applicant1 and Applicant2 domiciled (Applicant1 not resident, same sex couple)
    Given I reset the jurisdiction connections
    Then I go to 'WHERE_YOUR_LIVES_ARE_BASED_URL'

    Given neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_DOMICILED"


    # F, B Applicant1 and Applicant2 domiciled and both last habitually resident (Applicant1 resident, same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_LAST_RESIDENT, APP_1_APP_2_DOMICILED"


    # F, B Applicant1 and Applicant2 domiciled and both last habitually resident (Applicant1 not resident, same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_LAST_RESIDENT, APP_1_APP_2_DOMICILED"


    # F, C Applicant1 and Applicant2 domiciled and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_RESIDENT_SOLE, APP_1_APP_2_DOMICILED"


    # F, C, B Applicant1 and Applicant2 domiciled, Applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given we are both domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_APP_2_DOMICILED, APP_2_RESIDENT_SOLE, APP_1_APP_2_LAST_RESIDENT"


  @nightly
  Scenario: Jurisdiction Applicant1 Domiciled unhappy paths
    # H, E Applicant1 domiciled and Applicant1 habitually resident for 6 months
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "LIVING_ENGLAND_WALES_SIX_MONTHS"

    Given I select yes
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED, APP_1_RESIDENT_SIX_MONTHS"


    # H, B Applicant1 domiciled and both last habitually resident
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "LIVING_ENGLAND_WALES_SIX_MONTHS"

    Given I select no
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED, APP_1_APP_2_LAST_RESIDENT"


    # H Applicant1 domiciled (Applicant1 resident)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "LIVING_ENGLAND_WALES_SIX_MONTHS"

    Given I select no
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED"


# H Applicant1 domiciled (Applicant1 not resident)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED"


  # B, H Applicant1 domiciled and both last habitually resident
    Given I reset the jurisdiction connections
    Then I go to 'YOUR_DETAILS_URL'

    Given we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    And neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED, APP_1_APP_2_LAST_RESIDENT"


    # B, H, C Applicant1 domiciled, both last habitually resident and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED, APP_2_RESIDENT_SOLE, APP_1_APP_2_LAST_RESIDENT"


    # H, C Applicant1 domiciled and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only I am domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_1_DOMICILED, APP_2_RESIDENT_SOLE"


  @nightly
  Scenario: Jurisdiction Applicant2 Domiciled unhappy paths
    # I Applicant2 domiciled (Applicant1 not resident)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only my partner is domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_DOMICILED"


    # I, B Applicant2 domiciled and both last habitually resident (Applicant1 resident)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given only I live in England or Wales
    Then I click continue and expect URL "JURISDICTION_LAST_TWELVE_MONTHS"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only my partner is domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_DOMICILED, APP_1_APP_2_LAST_RESIDENT"


    # I, B Applicant2 domiciled and both last habitually resident (Applicant1 not resident)
    Given I reset the jurisdiction connections
    Then I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"

    Given neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only my partner is domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_DOMICILED, APP_1_APP_2_LAST_RESIDENT"


    # I, C Applicant2 domiciled and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    Then I go to "YOUR_DETAILS_URL"

    Given we were a same-sex couple when we got married
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Given I go to 'WHERE_YOUR_LIVES_ARE_BASED_URL'
    And only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only my partner is domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_DOMICILED, APP_2_RESIDENT_SOLE"


    # I, B, C Applicant2 domiciled, Applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    Then I go to 'WHERE_YOUR_LIVES_ARE_BASED_URL'

    Given only my partner lives in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given only my partner is domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select yes
    Then I click continue and expect URL "JURISDICTION_INTERSTITIAL_URL"
    And the page should include sole divorce connection content "APP_2_DOMICILED, APP_2_RESIDENT_SOLE, APP_1_APP_2_LAST_RESIDENT"
