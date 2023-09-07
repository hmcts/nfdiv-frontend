Feature: Homepage


  Scenario: Test pages that don't require sign in
    Given I go to "/contact-us"
    Then the page should include "0300 303 0642"
    When I click "Cookies"
    Then the page should include "A cookie is a small piece of data that’s stored on your computer"
    When I click "Privacy policy"
    Then the page should include "This privacy policy explains why we collect your personal data"

  Scenario: Switch language to Welsh and back to English
    Given I login
    When I click "Cymraeg"
    Then the page should include "Mae hwn yn wasanaeth newydd"
    When I click "English"
    Then the page should include "This is a new service"

    When I click "Accessibility statement"
    Then the page should include "This accessibility statement applies to the website available at"
    When I click "Terms and conditions"
    Then the page should include "This page explains this service’s terms of use"


  Scenario: Test save and sign out
    Given I login
    When I go to '/your-details'
    Then the page should include "Apply for a divorce"
    And the page should include "Who are you applying to divorce?"
    And I click "Save and sign out"
    Then the page should include "Your application has been saved"
    And I expect the page title to be "Your application has been saved - GOV.UK"
    And the page should not include "Apply for a divorce"
    And the page should not include "Back"
