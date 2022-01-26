Feature: Sole hub page

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "completeCase"
    And I go to '/check-your-answers'
    And I click "I confirm"
    And I click "I believe that the facts stated in this application are true"
    When I click "Continue to payment"
    And I pay and submit the application
    Then the page should include "Application submitted"
    Given a case worker issues the application
    And I enter my valid case reference and valid access code

  Scenario: Hub Holding state
    Given I set the case state to "Holding"
    When I go to "/"
    Then the page should include "You have responded to the divorce application. You do not have to do anything further."
    And the page should include "The next step is for your wife to apply for a 'conditional order'."
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your divorce application. You can download and read their response (PDF)."
    Then the page should include "The next step is for you to apply for a ‘conditional order’."

  Scenario: Hub ConditionalOrderPronounced state
    Given I set the case state to "ConditionalOrderPronounced"
    When I go to "/"
    Then the page should include "You have been granted a ‘conditional order’ by the court."
    And the page should include "You can read and download your certificate of entitlement"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have been granted a ‘conditional order’ by the court."
    Then the page should include "You can view and download your 'certificate of entitlement for a conditional order'."

  Scenario: Hub AosAwaiting or AosDrafted state
    Given I set the case state to "AwaitingAos"
    When I go to "/"
    Then the page should include "Your wife has submitted an application for divorce."
    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your application for divorce has been submitted and checked by court staff. It's been ‘served’ (sent) to you and your husband by email."

  Scenario: Hub Holding and disputed application
    Given I set the case state to "AwaitingAos"
    When I go to "/"
    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    Given I've already completed the form using the fixture "respondentCompleteCaseWithDispute" for respondent
    And I set the case state to "AosDrafted"
    And I go to "/respondent/check-your-answers"
    And I select "I confirm that"
    When I click "Submit"
    Then the page should include "You have responded to the divorce application and said that you want to dispute it."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your application and said they want to defend the divorce. This means they want to try and prevent the divorce."

  Scenario: Hub AwaitingGeneralConsideration state
    Given I set the case state to "AwaitingGeneralConsideration"
    When I go to "/"
    Then the page should include "You have responded to the divorce application and said that you want to dispute it."
    And the page should include "A judge will decide whether you and your wife need to attend a hearing."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your application and said they want to defend the divorce."
    And the page should include "A judge will decide whether you and your husband need to attend a hearing."

  Scenario: Hub AwaitingLegalAdvisorReferral state
    Given I set the case state to "AwaitingLegalAdvisorReferral"
    When I go to "/"
    Then the page should include "Your wife has applied for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot get a divorce"
    And the page should include "You will receive an email when the conditional order has been granted by the court."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have applied for a ‘conditional order’. The court will check your application and send it to a judge."
    And the page should include "After your conditional order is pronounced, you then have to apply for a ‘final order’."

  Scenario: Hub AwaitingConditionalOrder state
    Given I set the case state to "AwaitingConditionalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’."
    Then the page should include "Apply for conditional order"
