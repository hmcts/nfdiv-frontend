# TODO uncomment when joint application can be submitted
#Feature: Pay and submit
#
#  Background:
#    Given I login
#
#  Scenario: Pay and Submit
#    Given I've already completed the form using the fixture "completeCase"
#    When I go to '/pay-and-submit'
#    And the page should include "Pay and submit"
#    And I click "Pay and submit"
#    Then the page URL should be "/card_details"
#
#  Scenario: Cannot pay
#    Given I've already completed the form using the fixture "completeCase"
#    When I go to '/help-with-your-fee'
#    Given I select "I need help paying the fee"
#    And I click "Continue"
#    Then the page should include "Have you already applied for help with your divorce fee?"
#    And I clear the form
#    And I select "Yes"
#    And I select "Enter your Help With Fees reference number"
#    And I type "HWF-ABC-123"
#    When I click "Continue"
#    When I go to '/pay-and-submit'
#    And the page should include "Pay and submit"
#    And I click "If you cannot pay"
#    And I click "submit a sole application here"
#    Then the page URL should be "/submit-sole-application"
