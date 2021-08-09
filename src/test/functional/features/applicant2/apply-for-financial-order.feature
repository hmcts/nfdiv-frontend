Feature: Applicant 2 apply for a financial order

  Background:
    Given I login
    When I am reviewing an application for divorce created by my wife
    Then I go to '/applicant2/do-you-want-to-apply-financial-order'

  Scenario: They want to apply for a financial order
    Given I go to '/dividing-money-property'
    And the page should include "Dividing your money and property"
    And I click "Continue"
    And I clear the form
    When I select "Yes"
    And I select "The children"
    And I click "Continue"
    Then the page URL should be "/how-to-apply-financial-order"


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
