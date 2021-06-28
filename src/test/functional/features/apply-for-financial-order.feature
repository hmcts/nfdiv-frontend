@nightly
Feature: Apply for a financial order

  Background:
    Given I login

  Scenario: They want to apply for a financial order
    Given I go to '/dividing-money-property'
    And the page should include "Dividing your money and property"
    And I click "Continue"
    And I clear the form
    When I select "Yes"
    And I select "Our children"
    And I click "Continue"
    Then the page URL should be "/how-to-apply-financial-order"
    And the page should include "How to apply for a financial order"
    And I click "Continue"
    Then the page URL should be "/upload-your-documents"

  Scenario: Error when not answering if they want to apply for a financial order
    Given I go to '/do-you-want-to-apply-financial-order'
    And I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not answered the question"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You need to select who the financial order is for"
