Feature: Footer Links

  Background:
    Given I am on divorce homepage
    And I am on the admin portal sign in page
    When I fill in the Username and Password fields with a valid login
    And I click "Sign in"

  Scenario: Load privacy policy
    When I click "Privacy policy"
    Then the page should include "This privacy policy explains why we collect your personal data"

  Scenario: Load Terms and Conditions Page
    When I click "Terms and conditions"
    Then the page should include "This page explains this service’s terms of use"

  Scenario: Load Cookies Page
    When I click "Cookies"
    Then the page should include "A cookie is a small piece of data that’s stored on your computer"

  Scenario: Load Accessibility Statement Page
    When I click "Accessibility statement"
    Then the page should include "We want as many people as possible to be able to use this website"
