Feature: Can use English or Welsh courts

  Background:
    Given I login
    When I've completed all questions correctly to get to the jurisdiction section
    Then I click "Continue"

  Scenario: A The Petitioner and Respondent are habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: B The Petitioner and Respondent were last habitually resident in England and Wales, neither habitually resident
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you were last 'habitually resident' and one of you still lives here"
    And the page should include "Read more about habitual residence"

  Scenario: B The Petitioner and Respondent were last habitually resident in England and Wales, Petitioner habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you were last 'habitually resident' and one of you still lives here"
    And the page should include "Read more about habitual residence"

  Scenario: C The Respondent habitually resides in England and Wales (mixed sex marriage)
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because your husband is 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: D The Petitioner is habitually resident in England and Wales and has been for 12 months
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you are 'habitually resident' and have lived here for at least 12 months"
    And the page should include "Read more about habitual residence"

  Scenario: F The Petitioner and Respondent are both domiciled in England and Wales, Petitioner habitually resident (mixed sex marriage)
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'domiciled' in England or Wales."
    And the page should include "Read more about domicile"

  Scenario: F The Petitioner and Respondent are both domiciled in England and Wales, neither habitually resident (mixed sex marriage)
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to apply for a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'domiciled' in England or Wales."
    And the page should include "Read more about domicile"

  Scenario: G residual jurisdiction applies (applicant1 resident, same sex couple)
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
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "the courts of England and Wales have jurisdiction on a residual basis"

  Scenario: G residual jurisdiction applies (applicant1 not resident, same sex couple)
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
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "the courts of England and Wales have jurisdiction on a residual basis"

  Scenario: F applicant1 and applicant2 domiciled (applicant1 resident, same sex couple)
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
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "Read more about your connections"

  Scenario: F applicant1 and applicant2 domiciled (applicant1 not resident, same sex couple)
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
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "Read more about your connections"

  Scenario: F, B applicant1 and applicant2 domiciled and both last habitually resident (applicant1 resident, same sex couple)
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
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: F, B applicant1 and applicant2 domiciled and both last habitually resident (applicant1 not resident, same sex couple)
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
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: F, C applicant1 and applicant2 domiciled and applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "your husband is habitually resident"
    And the page should include "Read more about your connections"

  Scenario: F, C, B applicant1 and applicant2 domiciled, applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "your husband is habitually resident"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: H, E, B applicant1 domiciled, applicant1 habitually resident for 6 months and both last habitually resident
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you’re domiciled and habitually resident and have lived here for at least 6 months"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: H, E applicant1 domiciled and applicant1 habitually resident for 6 months
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you’re domiciled and habitually resident and have lived here for at least 6 months"
    And the page should include "Read more about your connections"

  Scenario: H, B applicant1 domiciled and both last habitually resident
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: H applicant1 domiciled (applicant1 resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "Read more about your connections"

  Scenario: I applicant2 domiciled (applicant1 resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "Read more about your connections"

  Scenario: I applicant2 domiciled (applicant1 not resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "Read more about your connections"

  Scenario: I, B applicant2 domiciled and both last habitually resident (applicant1 resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: I, B applicant2 domiciled and both last habitually resident (applicant1 not resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: I, C applicant2 domiciled and applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "Read more about your connections"

  Scenario: I, B, C applicant2 domiciled, applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: B, H applicant1 domiciled and both last habitually resident
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
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: B, H, C applicant1 domiciled, both last habitually resident and applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: H applicant1 domiciled (applicant1 not resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "Read more about your connections"

  Scenario: H, C applicant1 domiciled and applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "Read more about your connections"

  Scenario: Clicking Back takes them to the start of the jurisdiction flow
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    When I click "Back"
    Then the page should include "Check if you can get a divorce in England and Wales"
