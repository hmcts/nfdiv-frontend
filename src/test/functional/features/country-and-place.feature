Feature: Country and Place

  Background:
    Given I login
    And I go to '/in-the-uk'
    Then the page should include "Did you get married in the UK?"
    And I click "No"
    And I click "Continue"
    When the page should include "Is your original marriage certificate in English?"


  Scenario: Not completing where the union happened
    Given I click "Yes"
    And I click "Continue"
    And the page should include "Where you got married"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You need to enter the country"
    And the page should include "You need to enter the place"

  Scenario: Their union certificate is in English, but didn't happen in the UK
    Given I click "Yes"
    And I click "Continue"
    And the page should include "Where you got married"
    And the page should include "For example, Australia"
    And the page should include "the place, exactly as it appears on your certificate."
    And I clear the form
    When I select "Enter the country where you got married"
    And I type "Australia"
    And I select "Enter the place where you got married"
    And I type "Sydney"
    And I click "Continue"
    Then the page URL should be "/check-jurisdiction"
    And the page should include "Check if you can get a divorce in England and Wales"

  Scenario: Their union certificate is not in English, but they have a certified translation
    Given I click "No"
    And I click "Continue"
    And the page should include "Do you have a ‘certified translation’ of your marriage certificate?"
    And I click "Yes, I have a certified translation"
    And I click "Continue"
    And the page should include "Where you got married"
    And the page should include "For example, France"
    And the page should include "the place, exactly as it appears on your translated certificate"
    And I clear the form
    When I select "Enter the country where you got married"
    And I type "Thailand"
    And I select "Enter the place where you got married"
    And I type "Bangkok"
    Then I click "Continue"
    Then the page URL should be "/check-jurisdiction"
    And the page should include "Check if you can get a divorce in England and Wales"
