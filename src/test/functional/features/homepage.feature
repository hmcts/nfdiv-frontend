Feature: Homepage

  Background:
    Given I login
    When I go to '/your-details'
    Then the page should include "Apply for a divorce"
    And the page should include "Who are you applying to divorce?"

  Scenario: Load divorce homepage with footer links then save and sign out
    Then I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
    When I click "Cymraeg"
    Then the page should include "Mae hwn yn wasanaeth newydd"
    When I click "English"
    Then the page should include "This is a new service"

    When I click "Accessibility statement"
    Then the page should include "We want as many people as possible to be able to use this website"
    Given I go to "/your-details"
    When I click "Privacy policy"
    Then the page should include "This privacy policy explains why we collect your personal data"
    Given I go to "/your-details"
    When I click "Terms and conditions"
    Then the page should include "This page explains this service’s terms of use"
    Given I go to "/your-details"
    When I click "Cookies"
    Then the page should include "A cookie is a small piece of data that’s stored on your computer"
    Given I go to "/your-details"
    When I click "Accessibility statement"
    Then the page should include "We want as many people as possible to be able to use this website"

    Given I click "Save and sign out"
    Then the page should include "Your application has been saved"
    And I expect the page title to be "Your application has been saved - GOV.UK"
    And the page should not include "Apply for a divorce"
    And the page should not include "Back"
    When I click "Sign back in and continue"
    Then the page should include "Sign in or create an account"
