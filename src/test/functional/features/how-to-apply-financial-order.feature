Feature: How to apply for a financial order

  Background:
    Given I login
    When I go to "/how-to-apply-financial-order"
    Then the page should include "How to apply for a financial order"
    And the page should include "You will need to complete another form (Form A or Form A1) and pay an additional fee."

  Scenario: They click Continue on the "How to apply for a financial order" page
    When I click "Continue"
    Then the page should include "Upload your documents"
