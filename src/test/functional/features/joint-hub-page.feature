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

    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    And I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"

    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"

    And I select "I cannot upload some or all of my documents"
    Then the page should include "You can post your documents to the court if you cannot upload them"
    When I click "Continue"
    Then the page should include "You need to post the documents requested by the court"

    When I click "Continue"
    Then the page URL should be "/hub-page"
    And the page should include "You have provided the information requested by the court."

    Given I set the case state to "ClarificationSubmitted"
    When I click "Sign out"
    And I login with applicant "1"
    And the page should include "You have provided the information requested by the court."
    And I click "stop here"

  Scenario: Joint hub applicant 1 and applicant 2 submitted documents
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    And I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"

    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"

    When I click "Continue"
    Then the page URL should be "/hub-page"
    And the page should include "You have provided the information requested by the court."

    Given I set the case state to "ClarificationSubmitted"
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
    Then the page should include "You need to post the documents requested by the court"

    Given I set the case state to "ClarificationSubmitted"
    When I click "Sign out"
    And I login with applicant "1"
    And the page should include "You will receive an update when your documents have been received and checked."

