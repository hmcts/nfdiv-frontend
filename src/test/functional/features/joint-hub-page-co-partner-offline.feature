Feature: Joint hub page co partner offline

  Background:
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    Given I go to "/"
    When I click send for review
    Then the page URL should be "/application-sent-for-review"
    Given I enter my valid case reference and valid access code
    And a superuser updates "issueDate" with "2020-01-01"

    Given I set the case state to "Holding"
    And I go to "/"
    Then the page should include element "#applicantSubmittedContent"
    When I click element "#confirmReceiptButton"
    Then the page should include element "#applicantConfirmedReceiptContent"
    And the page should not include element "#confirmReceiptButton"

    Given I sign out
    And I login with applicant "1"
    Then the page should include element "#applicantSubmittedContent"
    When I click element "#confirmReceiptButton"
    Then the page should include element "#applicantConfirmedReceiptContent"
    And the page should not include element "#confirmReceiptButton"

    Given I set the case state to "AwaitingConditionalOrder"
    Then I sign out

  Scenario: Joint hub both applicants apply for co page when partner is offline
    Given a superuser updates "applicant2Offline" with "Yes"
    And I login with applicant "1"

    When I go to "/"
    Then the page should include element "#applicantNotYetAppliedForConditionalOrderContent"
    And the page should include element "#partnerIsOfflineContent"
    And the page should not include element "#applyForConditionalOrderButton"

    When I click "Sign out"
    Given a superuser updates "applicant1Offline" with "Yes"
    And I login with applicant "2"

    When I go to "/"
    Then the page should include element "#applicantNotYetAppliedForConditionalOrderContent"
    And the page should include element "#partnerIsOfflineContent"
    And the page should not include element "#applyForConditionalOrderButton"
