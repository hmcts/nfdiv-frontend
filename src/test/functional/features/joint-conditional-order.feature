Feature: Joint conditional order

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant 2
    When I go to "/"
    Then the page should include "Check your answers"

  Scenario: Applicant 1 is first in time applicant for conditional order journey
    Given I set the case state to "AwaitingConditionalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"
    And the page should include "This is a joint application so your husband will also have to apply. They have been sent an email to tell them."
    Given I select "I want to continue with my divorce application"
    When I click "Continue"
    Then the page URL should be "/review-your-joint-application"
    And the page should include "Read your joint application for divorce and confirm the information is still correct."
    Given I select "Yes"
    When I click "Continue"
    Then the page URL should be "/check-your-conditional-order-answers"
    Given I select "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/hub-page"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"
    When I click "Apply for conditional order"
    Then the page URL should be "/applicant2/continue-with-your-application"

  Scenario: Applicant 2 is first in time applicant for conditional order journey
    Given I set the case state to "AwaitingConditionalOrder"
    Given I go to "/"
    Then the page URL should be "/applicant2/hub-page"
    When I click "Apply for conditional order"
    Then the page URL should be "/applicant2/continue-with-your-application"
    And the page should include "This is a joint application so your wife will also have to apply. They have been sent an email to tell them."
    Given I select "I want to continue with my divorce application"
    When I click "Continue"
    Then the page URL should be "review-your-joint-application"

  Scenario: Applicants CO entitlement granted
    Given I set the case state to "AwaitingPronouncement"
    And a case worker updates court case hearing
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 6:46PM."
    When I click "Sign out"
    And I login with applicant "2"
    Given I go to "/"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 6:46PM."
