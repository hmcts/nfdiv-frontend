Feature: Applicant middleware

  Background:
    Given I create a new user and login
    Then the page URL should be "YOUR_DETAILS_URL"
    And the page should not include a back link

  @nightly
  Scenario: The applicants attempt to access the wrong page
    When I go to "APPLICANT_2" / "OTHER_COURT_CASES"
    Then the request should redirect to the page not found error page

    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "HOME_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    When I enter my valid case reference and valid access code
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    When I go to "APPLICANT_1" / "OTHER_COURT_CASES"
    Then the request should redirect to the page not found error page
