Feature: Joint hub page

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "/"
    When I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code

  Scenario: Joint hub applicant 1 and applicant 2 pages
    Given I set the case state to "Holding"
    And I go to "/"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."
    And the page should not include "Confirm receipt"

    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."
    And the page should not include "Confirm receipt"

    Given I set the case state to "AwaitingConditionalOrder"
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a ‘conditional order’"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"

    Given I set the case state to "ConditionalOrderPronounced"
    When I go to "/"
    Then the page should include "You have been granted a 'conditional order' by the court."
    And the page should include "You are not divorced yet."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have been granted a 'conditional order' by the court."
    And the page should include "You are not divorced yet."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."

    Given I set the case state to "AwaitingPronouncement"
    And a case worker updates court case hearing
    When I click "Sign out"
    And I login with applicant "1"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 3:30PM."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
    When I click "Sign out"
    And I login with applicant "2"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 3:30PM."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
