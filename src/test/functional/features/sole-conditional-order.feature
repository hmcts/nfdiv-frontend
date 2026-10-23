Feature: Sole conditional order

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"
    And I confirm the prayer and statement of truth

    When I click continue to payment
    And I pay and submit the application
    Then the page should include element "#applicationSavedTitle"

    Given a case worker issues the application
    And I enter my valid case reference and valid access code
    Then the page URL should be "RESPONDENT" / "HUB_PAGE"

    When I click respond to the application
    Then the page URL should be "RESPONDENT" / "REVIEW_THE_APPLICATION"
    And the page should include element "#reviewTheApplicationTitle"
    Given I have read the application for divorce

    When I click continue
    Then the page URL should be "RESPONDENT" / "HOW_DO_YOU_WANT_TO_RESPOND"
    Given I've already completed the form using the fixture "respondentCompleteCase" for "respondent"
    And I go to "RESPONDENT" / "CHECK_ANSWERS_URL"
    And I confirm the statement of truth

    When I click submit
    Then the page URL should be "RESPONDENT" / "RESPONSE_SUBMITTED"

  Scenario: Applicant 1 applies for conditional order and responds with additional information
    Given I set the case state to "AwaitingConditionalOrder"
    When I sign out
    And I login with applicant "1"
    When I go to "HOME_URL"
    Then the page should include element "#awaitingConditionalOrderStatement"

    When I click apply for conditional order
    Then the page URL should be "READ_THE_RESPONSE"
    And the page should include element "#readTheResponseTitle"

    When I click continue
    Then the page URL should be "CONTINUE_WITH_YOUR_APPLICATION"
    And I click yes

    When I click continue
    Then the page URL should be "REVIEW_YOUR_APPLICATION"
    Given I click yes
    And I click continue
    And I confirm the statement of truth
    And I click submit
    Then the page URL should be "HUB_PAGE"

  @flaky
  Scenario: Applicant 1 response with additional information and uploads for condition order
    And I set the case state to "AwaitingClarification"
    When I sign out
    And I login with applicant "1"
    When I go to "PROVIDE_INFORMATION_TO_THE_COURT"
    Then the page should include element "#provideInformationToTheCourtTitle"

    When I clear the form
    And I enter "test details" into "#coClarificationResponses"

    Given I delete any previously uploaded files
    Then the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"

    When I click continue
    Then the page URL should be "HUB_PAGE"
    And the page should include "You have provided the information requested by the court."
    And the page should include "This was the court’s feedback, explaining what was needed"

    Given I sign out
    And I login with applicant "2"
    Then the page should include "Your wife has provided the information requested by the court."
    And the page should include "This was the court’s feedback, explaining the information which was needed"
