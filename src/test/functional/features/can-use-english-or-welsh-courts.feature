Feature: Can use English or Welsh courts

  Background:
    Given I login
    When I've completed all questions correctly to get to the jurisdiction section
    Then I go to '/where-your-lives-are-based'

  Scenario: A Applicant 1 and Applicant 2 are habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: B Applicant 1 and Applicant 2 were last habitually resident in England and Wales
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you were last 'habitually resident' and one of you still lives here"
    And the page should include "Read more about habitual residence"

  Scenario: C Applicant 2 habitually resides in England and Wales
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because your husband is 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: D Applicant 1 is habitually resident in England and Wales and has been for 12 months
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you are 'habitually resident' and have lived here for at least 12 months"
    And the page should include "Read more about habitual residence"

  Scenario: E Applicant 1 is habitually resident in England and Wales and has been for 6 months
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you’re domiciled and habitually resident and have lived here for at least 6 months"
    And the page should include "Read more about your connections"

  Scenario: F Applicant 1 and Applicant 2 are both domiciled in England and Wales
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'habitually resident'"
    And the page should include "Read more about domicile"

  Scenario: G Eligible for Residual Jurisdiction
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Are you eligible for residual jurisdiction?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because the courts of England and Wales have jurisdiction on a residual basis."
    And the page should include "Read more about your connections"

  Scenario: G Eligible for Residual Jurisdiction Your life based in England or Wales
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Are you eligible for residual jurisdiction?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because the courts of England and Wales have jurisdiction on a residual basis."
    And the page should include "Read more about your connections"

# TODO connections H and I only appear on the connection summary page (not yet implemented)
#  Scenario: H Applicant 1 is domiciled in England and Wales
#    Given I select "No" for "Is your life mainly based in England or Wales?"
#    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
#    And I click "Continue"
#    And I select "Yes" for "Is your domicile in England or Wales?"
#    And I select "No" for "Is your husband’s domicile in England or Wales?"
#    When I click "Continue"
#    And I select "No"
#    And I click "Continue"
#    Then the page should include "You can use English or Welsh courts to apply for a divorce"
#    And the page should include "you are 'domiciled' in England or Wales."
#    And the page should include "Read more about domicile"
#
#  Scenario: I Applicant 2 is domiciled in England and Wales
#    Given I select "No" for "Is your life mainly based in England or Wales?"
#    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
#    And I click "Continue"
#    And I select "No" for "Is your domicile in England or Wales?"
#    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
#    When I click "Continue"
#    And I select "No"
#    And I click "Continue"
#    Then the page should include "You can use English or Welsh courts to apply for a divorce"
#    And the page should include "your husband is 'domiciled' in England or Wales."
#    And the page should include "Read more about domicile"

  Scenario: Clicking Back takes them to the start of the jurisdiction flow
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    When I click "Back"
    Then the page should include "Check if you can get a divorce in England and Wales"
