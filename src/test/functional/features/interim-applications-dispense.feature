Feature: Dispense with service journey

  Background:
    Given I create a new user and login
    Then I reject cookies
    And I've already completed the form using the fixture "issuedCase"
    Given a superuser updates "issueDate" with "2023-10-31"
    Then I set the case state to "AwaitingAos"
    When I sign out
    And I login with applicant "1"
    Then the page should include "Your application will be checked by court staff."

    Given I set the case state to "AosDrafted"
    And a superuser updates "aosIsDrafted" with "Yes"
    When I sign out
    And I login with applicant "1"
    Then the page should include element "#aosDueAndDraftedLine1"

    When I click element "#aosDueAndDraftedLink"
    Then the page should include element "#optionsForProgressingTitle"

    When I click start
    Then the page should include element "#haveTheyReceivedTitle"
    And the page should include element "#detailsProvided"

    Given I click element "#notKnown"
    When I click continue
    Then the page should include element "#noNewContactDetailsTitle"

    Given I click element "#noContactDetails"
    When I click continue
    Then the page should include element "#ownSearchesTitle"

    Given I click element "#notFound"
    When I click continue
    Then the page should include element "#isPartnerAbroadTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#dispenseWithServiceApplicationTitle"

  Scenario: Dispense with service happy path
    When I click start
    Then the page should include element "#helpWithFeesTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#hwfReferenceNumberInputTitle"

    Given I select element "#applicant1InterimAppsHwfRefNumber"
    And I type "HWF-A1B-23D"
    When I click continue
    Then the page should include element "#lastDateDispenseTitle"

    Given I click element "#yes"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-day"
    And I type "1"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-month"
    And I type "1"
    Then I select element "#applicant1DispenseLastLivedTogetherDate-year"
    And I type "2000"
    When I click continue
    Then the page should include element "#enterAddressTitle"
    # Fix and continue this scenario as the journey progresses
    And the page should include element "#STOP"
