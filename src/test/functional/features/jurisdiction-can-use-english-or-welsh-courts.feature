Feature: Jurisdiction - can use English or Welsh courts

  Background:
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section

  Scenario: Jurisdiction happy path tests
    # A Applicant1 and Applicant2 are habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband are habitually resident in England and Wales"

    # B Applicant1 and Applicant2 were last habitually resident in England and Wales, neither habitually resident
    Given I reset the jurisdiction connections
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/your-domicile"
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # C The Applicant2 habitually resides in England and Wales (mixed sex marriage)
    Given I reset the jurisdiction connections
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because your husband is habitually resident in England and Wales"

    # D Applicant1 is habitually resident in England and Wales and has been for 12 months
    Given I reset the jurisdiction connections
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you are habitually resident in England and Wales and have resided there for at least one year immediately before making this application"

    # F Applicant1 and Applicant2 are both domiciled in England and Wales, Applicant1 habitually resident (mixed sex marriage)
    Given I reset the jurisdiction connections
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband are domiciled in England and Wales"
    And the page should include "Read more about domicile"

    # G residual jurisdiction applies (Applicant1 resident, same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    When I click "Continue"
    Then the page URL should be '/are-you-eligible-for-residual-jurisdiction'
    Given I select "Yes"
    When I click "Continue"
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband married each other in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case"

    # H, E, B Applicant1 domiciled, Applicant1 habitually resident for 6 months and both last habitually resident
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page URL should be "/living-england-wales-six-months"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "only you are domiciled in England and Wales"
    And the page should include "you are domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # I Applicant2 domiciled (Applicant1 resident)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
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
    Then the page URL should be "/habitually-resident-england-wales"
    And I select "No"
    When I click "Continue"
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because only your husband is domiciled in England and Wales"

    # J Applicant1 habitually resides in England and Wales (joint application)
    Given I reset the jurisdiction connections
    And I've said I'm applying as a joint application
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you are habitually resident in England and Wales"

  @now
  Scenario: Clicking Back takes them to the start of the jurisdiction flow
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    When I click "Back"
    Then the page should include "Check if you can get a divorce in England or Wales"

  @nightly
  Scenario: Checking additional connections on you-can-use-english-or-welsh-courts page
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband are habitually resident in England and Wales"
    When I click for more details
    Then the page should not include 'My husband and I are habitually resident in England and Wales'
    Given I select "My husband is habitually resident in England and Wales"
    When I click "Continue"
    Then the page should include "Enter your name"
    When I go to "/"
    Then the page should include "you and your husband are habitually resident in England and Wales"
    And the page should include "your husband is habitually resident in England and Wales"

  @nightly
  Scenario: The user changes their answer to same-sex or application type
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    Given I go to "/your-details"
    And I select "We were a same-sex couple when we got married"
    When I click "Continue"
    Then the page URL should be "/irretrievable-breakdown"
    Given I go to "/"
    When I click "Continue"
    Then the page URL should be "/check-jurisdiction"

    When I click "Continue"
    Then the page should include "Where your lives are based"
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    Given I go to "/how-do-you-want-to-apply"
    And I select "I want to apply jointly, with my husband"
    When I click "Continue"
    Then the page URL should be "/their-email-address"
    Given I select "Your husband's email address"
    And I type "simulate-delivered@notifications.service.gov.uk"
    When I click "Continue"
    Then the page URL should be "/in-the-uk"
    Given I go to "/"
    When I click "Continue"
    Then the page URL should be "/check-jurisdiction"


  @nightly
  Scenario: Jurisdiction unhappy paths
    # B Applicant1 and Applicant2 were last habitually resident in England and Wales, Applicant1 habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-twelve-months"
    Given I select "No"
    When I click "Continue"
    Then the page should include "Your domicile"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # F Applicant1 and Applicant2 are both domiciled in England and Wales, neither habitually resident (mixed sex marriage)
    Given I reset the jurisdiction connections
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband are domiciled in England and Wales"
    And the page should include "Read more about domicile"

    # G residual jurisdiction applies (Applicant1 not resident, same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    When I click "Continue"
    Then the page URL should be "/are-you-eligible-for-residual-jurisdiction"
    Given I select "Yes"
    When I click "Continue"
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband married each other in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case"

    # F Applicant1 and Applicant2 domiciled (Applicant1 resident, same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband are domiciled in England and Wales"

    # F Applicant1 and Applicant2 domiciled (Applicant1 not resident, same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you and your husband are domiciled in England and Wales"

    # F, B Applicant1 and Applicant2 domiciled and both last habitually resident (Applicant1 resident, same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"
    And the page should include "you and your husband are domiciled in England and Wales"

    # F, B Applicant1 and Applicant2 domiciled and both last habitually resident (Applicant1 not resident, same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"
    And the page should include "you and your husband are domiciled in England and Wales"

    # F, C Applicant1 and Applicant2 domiciled and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "your husband is habitually resident in England and Wales"
    And the page should include "you and your husband are domiciled in England and Wales"

    # F, C, B Applicant1 and Applicant2 domiciled, Applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "you and your husband are domiciled in England and Wales"
    And the page should include "your husband is habitually resident in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # H, E Applicant1 domiciled and Applicant1 habitually resident for 6 months
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only you are domiciled in England and Wales"
    And the page should include "you are domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application"

    # H, B Applicant1 domiciled and both last habitually resident
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "only you are domiciled in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # H Applicant1 domiciled (Applicant1 resident)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because only you are domiciled in England and Wales"

    # I Applicant2 domiciled (Applicant1 not resident)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    Then the page should include "Your answers indicate that you can apply for a divorce in England and Wales because only your husband is domiciled in England and Wales"

    # I, B Applicant2 domiciled and both last habitually resident (Applicant1 resident)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only your husband is domiciled in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # I, B Applicant2 domiciled and both last habitually resident (Applicant1 not resident)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only your husband is domiciled in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # I, C Applicant2 domiciled and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only your husband is domiciled in England and Wales"
    And the page should include "your husband is habitually resident in England and Wales"

    # I, B, C Applicant2 domiciled, Applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only your husband is domiciled in England and Wales"
    And the page should include "your husband is habitually resident in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # B, H Applicant1 domiciled and both last habitually resident
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only you are domiciled in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # B, H, C Applicant1 domiciled, both last habitually resident and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only you are domiciled in England and Wales"
    And the page should include "your husband is habitually resident in England and Wales"
    And the page should include "you and your husband were last habitually resident in England and Wales and one of you continues to reside there"

    # H Applicant1 domiciled (Applicant1 not resident)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "only you are domiciled in England and Wales"

    # H, C Applicant1 domiciled and Applicant2 habitually resident (same sex couple)
    Given I reset the jurisdiction connections
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
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
    And the page should include "only you are domiciled in England and Wales"
    And the page should include "your husband is habitually resident in England and Wales"
