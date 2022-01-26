Feature: Joint hub page

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "/"
    When I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code

  Scenario: Applicant 1 confirms receipt
    Given I click "Sign out"
    And I login with applicant "1"
    And I set the case state to "Holding"
    When I go to "/"
    Then the page URL should be "/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."
    And the page should not include "Confirm receipt"

  Scenario: Applicant 2 confirms receipt
    And I set the case state to "Holding"
    And I go to "/"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."
    And the page should not include "Confirm receipt"

  Scenario: Applicant 1 draft conditional order from AwaitingConditionalOrder state
    And I set the case state to "AwaitingConditionalOrder"
    And I click "Sign out"
    And I login with applicant "1"
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"

  Scenario: Applicant 2 draft conditional order from AwaitingConditionalOrder state
    And I set the case state to "AwaitingConditionalOrder"
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"

  Scenario: AwaitingPronouncement state
    And I set the case state to "AwaitingPronouncement"
    When I go to "/"
    Then the page should include "Your application for a 'conditional order' has been accepted."
    And the page should include "A judge will 'pronounce' (read out) your conditional order at a hearing."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your application for a 'conditional order' has been accepted."
    And the page should include "A judge will 'pronounce' (read out) your conditional order at a hearing."
