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

  Scenario: Sole hub Holding state
    Given I set the case state to "Holding"
    When I go to "/"
    Then the page should include "You have responded to the divorce application. You do not have to do anything further."
    And the page should include "The next step is for your wife to apply for a 'conditional order'."
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your divorce application. You can download and read their response (PDF)."
    Then the page should include "The next step is for you to apply for a ‘conditional order’."

  Scenario: Sole hub ConditionalOrderPronounced state
    Given I set the case state to "ConditionalOrderPronounced"
    When I go to "/"
    Then the page should include "You have been granted a 'conditional order' by the court."
    And the page should include "You can read and download your certificate of entitlement"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have been granted a 'conditional order' by the court."
    Then the page should include "You can view and download your 'certificate of entitlement for a conditional order'."

  Scenario: Sole hub AosAwaiting or AosDrafted state
    Given I set the case state to "AwaitingAos"
    When I go to "/"
    Then the page should include "Your wife has submitted an application for divorce."
    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your application for divorce has been submitted and checked by court staff. It's been ‘served’ (sent) to you and your husband by email."

  Scenario: Sole hub Holding and disputed application
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

  Scenario: Sole hub AwaitingGeneralConsideration state
    Given I set the case state to "AwaitingGeneralConsideration"
    When I go to "/"
    Then the page should include "You have responded to the divorce application and said that you want to dispute it."
    And the page should include "A judge will decide whether you and your wife need to attend a hearing."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your application and said they want to defend the divorce."
    And the page should include "A judge will decide whether you and your husband need to attend a hearing."

  Scenario: Sole hub AwaitingLegalAdvisorReferral state
    Given I set the case state to "AwaitingLegalAdvisorReferral"
    When I go to "/"
    Then the page should include "Your wife has applied for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot get a divorce"
    And the page should include "You will receive an email when the conditional order has been granted by the court."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have applied for a ‘conditional order’. The court will check your application and send it to a judge."
    And the page should include "After your conditional order is pronounced, you then have to apply for a ‘final order’."

  Scenario: Sole hub AwaitingConditionalOrder state
    Given I set the case state to "AwaitingConditionalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/"
    Then the page should include "You can now apply for a ‘conditional order’."
    Then the page should include "Apply for conditional order"

  Scenario: Sole hub AwaitingPronouncement and Update Court Case Hearing event
    Given I set the case state to "AwaitingPronouncement"
    And a case worker updates court case hearing
    When I click "Sign out"
    And I login with applicant "1"
    Then the page URL should be "/hub-page"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 3:30PM."
    Then the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
    When I click "Sign out"
    And I login with applicant "2"
    When I go to "/"
    Then the page URL should be "/respondent/hub-page"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 3:30PM."
    Then the page should include "You can view and download your 'certificate of entitlement for a conditional order'."

  Scenario: Sole hub Awaiting clarification state
    Given I set the case state to "AwaitingClarification"
    And a superuser updates "coRefusalClarificationAdditionalInfo" with "Refusal reason test"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Refusal reason test"
    And the page should include "What you need to do now"
    Given I click 'Respond to the court'
    Then the page URL should be '/provide-information-to-the-court'

  Scenario: Sole hub AosOverdue state
    Given I set the case state to "AosOverdue"
    When I click "Sign out"
    And I login with applicant "1"
    When I go to "/"
    Then the page should include "Your husband should have responded to your divorce application"
    Given I go to "/how-you-can-proceed"
    Then the page should include "How to proceed with your divorce"
    And the page should include "I have another email address or postal address for my husband"
    And the page should include "I have their email address but not their postal address"
    And the page should include "I need to search government records for my husband's postal address"
    And the page should include "I think my husband is receiving the application but is choosing not to respond"
    And the page should include "I have evidence that my husband has received the application, but will not or cannot respond"
    And the page should include "I've tried every possible way of delivering the application"
    When I click "Review your contact details"
    Then the page URL should be "/check-contact-details"

  Scenario: Sole hub AwaitingFinalOrder or FinalOrderOverdue state
    Given I set the case state to "AwaitingFinalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a 'final order'."
    Given I click "Apply for a final order"
    Then the page URL should be "/finalising-your-application"
    Given I click "Sign out"
    And I login with applicant "2"
    Then the page should include "Your wife can now apply for a 'final order'."

    Given I set the case state to "FinalOrderOverdue"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a 'final order'."
    Given I click "Apply for a final order"
    Then the page URL should be "/finalising-your-application"
    Given I click "Sign out"
    And I login with applicant "2"
    Then the page should include "Your wife can now apply for a 'final order'."

    Given a superuser updates "dateFinalOrderEligibleToRespondent" with "2021-05-05"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "Your wife has still not applied for a 'final order'"
    Given I click "Apply for a final order"
    Then the page URL should be '/respondent/finalising-your-application'
