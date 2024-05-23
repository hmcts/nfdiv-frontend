Feature: Joint conditional order

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    When I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "/applicant2/confirm-your-joint-application"
    Given I select "I confirm that I’m applying to the court to dissolve my marriage (get a divorce)"
    And I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/applicant2/needs-to-confirm-joint-application"

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
    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You have applied for a conditional order. Your husband also needs to apply"

    When I click "Sign out"
    And I login with applicant "2"
    Then the page URL should be "/applicant2/hub-page"

    When I click "Apply for conditional order"
    Then the page URL should be "/applicant2/continue-with-your-application"
    And the page should include "Your wife has already confirmed this joint application."

    Given I select "I want to continue with my divorce application"
    When I click "Continue"
    Then the page URL should be "/applicant2/review-your-joint-application"
    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select "Yes"
    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-conditional-order-answers"

    Given I select "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You and your wife have applied for a 'conditional order'"

  @nightly
  Scenario: Applicant 2 is first in time applicant for conditional order journey and responds with additional information
    Given I set the case state to "AwaitingConditionalOrder"
    And I go to "/"
    Then the page URL should be "/applicant2/hub-page"

    When I click "Apply for conditional order"
    Then the page URL should be "/applicant2/continue-with-your-application"
    And the page should include "This is a joint application so your wife will also have to apply. They have been sent an email to tell them."

    Given I select "I want to continue with my divorce application"
    When I click "Continue"
    Then the page URL should be "/applicant2/review-your-joint-application"
    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select "Yes"
    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-conditional-order-answers"

    Given I select "I believe that the facts stated in this application are true"
    When I click "Continue"
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have applied for a conditional order. Your wife also needs to apply"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"

    Given I select "I want to continue with my divorce application"
    When I click "Continue"
    Then the page URL should be "/review-your-joint-application"
    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select "Yes"
    When I click "Continue"
    Then the page URL should be "/check-your-conditional-order-answers"

    Given I select "I believe that the facts stated in this application are true"
    When I click "Submit"
    Then the page URL should be "/hub-page"
    And the page should include "You and your husband have applied for a 'conditional order'"

    Given I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "2"
    When I go to "/applicant2/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    Given I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"
    And I select "I cannot upload some or all of my documents"
    Then the page should include "You can post your documents to the court"

    When I click "Continue"
    Then the page URL should be "/applicant2/hub-page"

  @flaky
  Scenario: Applicant 2 response with additional information and uploads for condition order journey
    And I set the case state to "AwaitingClarification"
    When I click "Sign out"
    And I login with applicant "2"
    When I go to "/applicant2/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    And I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"

    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"

    When I click "Continue"
    Then the page URL should be "/applicant2/hub-page"
