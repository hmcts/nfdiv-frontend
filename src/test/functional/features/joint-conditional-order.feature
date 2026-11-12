Feature: Joint conditional order

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "HOME_URL"
    And I click send for review
    Then the page URL should be "SENT_TO_APPLICANT2_FOR_REVIEW"
    When I enter my valid case reference and valid access code
    Then the page URL should be "APPLICANT_2" / "YOU_NEED_TO_REVIEW_YOUR_APPLICATION"
#    Then the page should include "You need to review your joint application"
    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"
    Given I confirm the prayer and statement of truth
    Then I click submit and expect URL "RESPONSE_SUBMITTED"
#    Then the page URL should be "/applicant2/response-submitted"

  Scenario: Applicant 1 is first in time applicant for conditional order journey
    Given I progress the case to AwaitingConditionalOrder
#    Given I set the case state to "AwaitingConditionalOrder"
#    When I sign out
#    And I login with applicant "1"
#    Then the page URL should be "HUB_PAGE"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"
#    Then the page URL should be "/continue-with-your-application"
    And the page should not include a back link
#    And the page should include "This is a joint application so your husband will also have to apply. They have been sent an email to tell them."

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"
#    Then the page URL should be "/review-your-joint-application"
#    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"
#    Then the page URL should be "/check-your-conditional-order-answers"

    Given I confirm the statement of truth
    Then I click submit and expect URL "HUB_PAGE" with element "#jointCoPendingBeforeDueDateLine1"
#    Then the page URL should be "/hub-page"
#    And the page should include "You have applied for a conditional order. Your husband also needs to apply"

    Then I sign out then login with applicant "2" and expect URL "HUB_PAGE"
#    When I sign out
#    And I login with applicant "2"
#    Then the page URL should be "/applicant2/hub-page"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"
#    Then the page URL should be "/applicant2/continue-with-your-application"
#    And the page should include "Your wife has already confirmed this joint application."

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"
#    Then the page URL should be "/applicant2/review-your-joint-application"
#    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"
#    Then the page URL should be "/applicant2/check-your-conditional-order-answers"

    Given I confirm the statement of truth
    Then I click submit and expect URL "HUB_PAGE" with element "#awaitingLegalAdvisorReferralLine1"
#    Then the page URL should be "/applicant2/hub-page"
#    And the page should include "You and your wife have applied for a 'conditional order'"

  @nightly
  Scenario: Applicant 2 is first in time applicant for conditional order journey and responds with additional information
    Given I set the case state to "AwaitingConditionalOrder"
    And I go to "/"
    Then the page URL should be "/applicant2/hub-page"

    When I click "Apply for conditional order"
    Then the page URL should be "/applicant2/continue-with-your-application"
    And the page should include "This is a joint application so your wife will also have to apply. They have been sent an email to tell them."

    Given I select "I want to continue with my divorce application"
    When I click continue
    Then the page URL should be "/applicant2/review-your-joint-application"
    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select "Yes"
    When I click continue
    Then the page URL should be "/applicant2/check-your-conditional-order-answers"

    Given I confirm the statement of truth
    When I click submit
    Then the page URL should be "/applicant2/hub-page"
    And the page should include "You have applied for a conditional order. Your wife also needs to apply"
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    When I click "Apply for conditional order"
    Then the page URL should be "/continue-with-your-application"

    Given I select "I want to continue with my divorce application"
    When I click continue
    Then the page URL should be "/review-your-joint-application"
    And the page should include "Read your joint application for divorce and confirm the information is still correct."

    Given I select "Yes"
    When I click continue
    Then the page URL should be "/check-your-conditional-order-answers"

    Given I confirm the statement of truth
    When I click submit
    Then the page URL should be "/hub-page"
    And the page should include "You and your husband have applied for a 'conditional order'"

    Given I set the case state to "AwaitingClarification"
    When I sign out
    And I login with applicant "2"
    When I go to "/applicant2/provide-information-to-the-court"
    Then the page should include "Upload any documents"

    When I clear the form
    Given I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"
    And I select "I cannot upload some or all of my documents"
    Then the page should include "You can post your documents to the court"

    When I click continue
    Then the page URL should be "/applicant2/hub-page"

  @flaky
  Scenario: Applicant 2 response with additional information and uploads for condition order journey
    And I set the case state to "AwaitingClarification"
    When I sign out
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

    When I click continue
    Then the page URL should be "/applicant2/hub-page"
