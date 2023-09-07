Feature: Joint hub page

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "/"
    When I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

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
    And the page should include "You can view and download your 'conditional order'."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have been granted a 'conditional order' by the court."
    And the page should include "You are not divorced yet."
    And the page should include "You can view and download your 'conditional order'."

    Given I set the case state to "AwaitingPronouncement"
    Then the page should include "You and your wife have applied for a 'conditional order'."
    Then the page should include "The court will check your application and send it to a judge."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You and your husband have applied for a 'conditional order'."
    Then the page should include "The court will check your application and send it to a judge."

    And a case worker updates court case hearing
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 10 November 2021 at 12:00AM."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 10 November 2021 at 12:00AM."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."

    Given I set the case state to "AwaitingClarification"
    Then the page should include "Either you or your wife can provide the information requested by the court"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Either you or your husband can provide the information requested by the court"

    Given I set the case state to "AwaitingFinalOrder"
    And I go to "/"
    Then the page should include "You can now apply for a ‘final order’."
    And the page should include "Apply for final order"

    Given I set the case state to "AwaitingJointFinalOrder"
    And I go to "/"
    Then the page should include "You can now apply for a ‘final order’."
    And the page should include "Apply for final order"

    Given I set the case state to "FinalOrderRequested"
    And I go to "/"
    Then the page should include "You and your wife have both confirmed you want to finalise the divorce"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    Then the page should include "You and your husband have both confirmed you want to finalise the divorce"


  Scenario: Joint hub applicant 1 and applicant 2 submitted documents
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    And I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"

    When I click "Continue"
    Then the page URL should be "/hub-page"
    And the page should include "You have provided the information requested by the court."

    When I click "Sign out"
    And I login with applicant "1"
    And the page should include "You have provided the information requested by the court."


  Scenario: Joint hub applicant 1 and applicant 2 documents not submitted
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    And I select "I cannot upload some or all of my documents"
    Then the page should include "You can post your documents to the court if you cannot upload them"
    When I click "Continue"
    Then the page should include "You or your husband need to post the documents requested by the court:"

    When I click "Sign out"
    And I login with applicant "1"
    And the page should include "You or your husband need to post the documents requested by the court:"

