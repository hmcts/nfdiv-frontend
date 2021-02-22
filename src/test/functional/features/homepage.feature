Feature: Homepage

  Background:
    Given I login
    When I go to '/your-details'
    Then the page should include "Apply for a divorce"

  Scenario: Load divorce homepage
    Then I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
    When I click "Cymraeg"
    Then the page should include "Mae hwn yn wasanaeth newydd"
    When I click "English"
    Then the page should include "This is a new service"

  Scenario: Save and sign out
    Given I click "Save and sign out"
    Then the page should include "Your application has been saved"
    When I go to '/your-details'
    Then the page should include "Sign in or create an account"
