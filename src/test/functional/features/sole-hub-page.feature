Feature: Sole hub page

  Background:
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

  Scenario: Sole hub applicant and respondent pages
    Given I set the case state to "AwaitingAos"
    When I go to "/"
    Then the page should include "Your wife has submitted an application for divorce."
    When I click "Respond to the application"
    Then the page URL should be "/respondent/review-the-application"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your application for divorce has been submitted and checked by court staff. It's been ‘served’ (sent) to you and your husband by email."

    Given I set the case state to "AosOverdue"
    When I click "Sign out"
    And I login with applicant "1"
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

    Given I set the case state to "Holding"
    When I go to "/"
    Then the page should include "You have responded to the divorce application. You do not have to do anything further."
    And the page should include "The next step is for your wife to apply for a 'conditional order'."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your divorce application. You can download and read their response (PDF)."
    Then the page should include "The next step is for you to apply for a ‘conditional order’."

    Given a superuser updates "disputeApplication" with "Yes"
    When I click "Sign out"
    And I login with applicant "2"
    Then the page should include "You have responded to the divorce application and said that you want to dispute it."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your application and said they want to defend the divorce. This means they want to try and prevent the divorce."

    Given I set the case state to "AwaitingConditionalOrder"
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You can now apply for a ‘conditional order’."
    Then the page should include "Apply for conditional order"

    Given I set the case state to "AwaitingGeneralConsideration"
    When I go to "/"
    Then the page should include "You have responded to the divorce application and said that you want to dispute it."
    And the page should include "A judge will decide whether you and your wife need to attend a hearing."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Your husband has responded to your application and said they want to defend the divorce."
    And the page should include "A judge will decide whether you and your husband need to attend a hearing."

    Given I set the case state to "AwaitingLegalAdvisorReferral"
    When I go to "/"
    Then the page should include "Your wife has applied for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot get a divorce"
    And the page should include "You will receive an email when the conditional order has been granted by the court."
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have applied for a ‘conditional order’. The court will check your application and send it to a judge."
    And the page should include "After your conditional order is pronounced, you then have to apply for a ‘final order’."

    Given I set the case state to "AwaitingPronouncement"
    And a case worker updates court case hearing
    When I click "Sign out"
    And I login with applicant "1"
    Then the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 3:30PM."
    And the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
    When I click "Sign out"
    And I login with applicant "2"
    When I go to "/"
    And the page should include "The hearing will take place at Birmingham Civil and Family Justice Centre on 29 September 2013 at 3:30PM."
    Then the page should include "You can view and download your 'certificate of entitlement for a conditional order'."

    Given I set the case state to "AwaitingClarification"
    And a superuser updates "coRefusalClarificationAdditionalInfo" with "Refusal reason test"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "Refusal reason test"
    And the page should include "What you need to do now"

    Given I click 'Respond to the court'
    Then the page URL should be '/provide-information-to-the-court'
    And the page should include "Respond to the court"
    Given I select "If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information."
    And I type "test details"
    And I select "I cannot upload some or all of my documents"
    Then the page should include "You can post your documents to the court if you cannot upload them"
    When I click "Continue"
    Then the page should include "You need to post the documents requested by the court"

    Given I set the case state to "ConditionalOrderPronounced"
    When I go to "/"
    Then the page should include "You have been granted a 'conditional order' by the court."
    And the page should include "You can read and download your certificate of entitlement"
    Given I click "Sign out"
    And I login with applicant "1"
    Then the page should include "You have been granted a 'conditional order' by the court."
    Then the page should include "You can view and download your 'certificate of entitlement for a conditional order'."
