Feature: Applicant 2 how to apply for a financial order

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to "/applicant2/how-to-apply-financial-order"
    Then the page should include "How to apply for a financial order"
    And the page should include "You will need to complete another form (Form A or Form A1) and pay an additional fee."

  Scenario: They click Continue on the "How to apply for a financial order" page
    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-joint-application"
