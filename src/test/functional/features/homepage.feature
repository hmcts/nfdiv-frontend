Feature: Homepage

  @nightly
  Scenario: Test pages that don't require sign in
    Given I go to "CONTACT_US"
    Then the page should include element "#contactUsTitle"
    Then I click element "#cookiesLink" and expect URL "COOKIES_URL"
    Then I click element "#privacyPolicyLink" and expect URL "PRIVACY_POLICY_URL"

  Scenario: Switch language to Welsh and back to English
    Given I login with applicant "1"
    Then I toggle language to Welsh
    Then I toggle language to English

    Then I click element "#accessibilityStatementLink" and expect URL "ACCESSIBILITY_STATEMENT_URL"
    Then I click element "#termsAndConditionsLink" and expect URL "TERMS_AND_CONDITIONS_URL"

  @nightly
  Scenario: Test save and sign out
    Given I login with applicant "1"
    Then I click save and sign out and expect URL "DRAFT_SAVE_AND_SIGN_OUT"
    And the page should not include a back link
