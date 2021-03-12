Feature: Country and Place

  Background:
    Given I login
    And I go to '/in-the-uk'
    Then the page should include "Did you get married in the UK?"
    And I click "No"
    And I click "Continue"
    When the page should include "Is your original marriage certificate in English?"

  @nightly
  Scenario: Error when missing a required field
    Given I click "Yes"
    And I click "Continue"
    And the page should include "Where you got married"
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You need to enter the country"
    And the page should include "You need to enter the place"

  Scenario: Successfully completing the form (with certificate in English)
    Given I click "Yes"
    And I click "Continue"
    And the page should include "Where you got married"
    And the page should include "For example, Australia"
    And the page should include "the place, exactly as it appears on your certificate."
    When I select "Enter the country where you got married"
    And I type "Australia"
    And I select "Enter the place where you got married"
    And I type "Sydney"
    Then I click "Continue"
    And the page should include "Check if you can get a divorce in England and Wales"

  Scenario: Successfully completing the form (with certificate not in English)
    Given I click "No"
    And I click "Continue"
    And the page should include "Do you have a ‘certified translation’ of your marriage certificate?"
    And I click "Yes, I have a certified translation"
    And I click "Continue"
    And the page should include "Where you got married"
    And the page should include "For example, France"
    And the page should include "the place, exactly as it appears on your translated certificate"
    When I select "Enter the country where you got married"
    And I type "Thailand"
    And I select "Enter the place where you got married"
    And I type "Bangkok"
    Then I click "Continue"
    And the page should include "Check if you can get a divorce in England and Wales"
