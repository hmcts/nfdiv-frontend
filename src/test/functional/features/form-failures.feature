Feature: Form failures

  Background:
    Given I create a new user and login

  @nightly
  Scenario: They fail to fill out the applicant 1 forms
    Given I go to "HAS_RELATIONSHIP_BROKEN_URL"
    Then I click continue and expect error elements

    Given I go to "RELATIONSHIP_DATE_URL"
    Then I click continue and expect error elements
    Given I enter an invalid relationship date
    Then I click continue and expect error elements
    Given I enter a relationship date that is 2 years in the future
    Then I click continue and expect error elements
    Given I enter a relationship date that is 6 months in the past
    Then I click continue and expect URL "RELATIONSHIP_NOT_LONG_ENOUGH_URL"

    Given I go to "CERTIFICATE_URL"
    Then I click continue and expect error elements

    Given I go to "HELP_WITH_YOUR_FEE_URL"
    Then I click continue and expect error elements

    Given I go to "HELP_PAYING_HAVE_YOU_APPLIED"
    Then I click continue and expect error elements
    Given I select yes
    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Then I click continue and expect error elements
    Given I enter an invalid HWF reference number
    Then I click continue and expect error elements

    Given I go to "HOW_DO_YOU_WANT_TO_APPLY"
    Then I click continue and expect error elements

    Given I go to "THEIR_EMAIL_ADDRESS"
    Then I click continue and expect error elements
    Given I enter "test.com" as their email address
    Then I click continue and expect error elements
    Given I enter their email address
    And I do not have their email address
    Then I click continue and expect error elements
    Given I clear the form
    And I enter my email address as their email address
    Then I click continue and expect error elements

    Given I go to "DO_YOU_HAVE_ADDRESS"
    Then I click continue and expect error elements

    Given I go to "NEED_TO_GET_ADDRESS"
    Then I click continue and expect error elements

    Given I go to "OTHER_COURT_CASES"
    And I clear the form
    Then I click continue and expect error elements

    Given I go to "DETAILS_OTHER_PROCEEDINGS"
    And I clear the form
    Then I click continue and expect error elements

    Given I go to "ENTER_THEIR_ADDRESS"
    Then I click find address and expect error elements
    Given I reset the postcode lookup form
    And I enter an invalid postcode
    Then I click find address and expect error elements
    Given I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    Given I wait for the postcode lookup to return results
    And I cannot find the address in the list
    Then I click continue and expect error elements
    Given I click back
    Then I reset the postcode lookup form
    And I have an international address
    Then I click continue and expect error elements

    Given I go to "IN_THE_UK"
    Then I click continue and expect error elements

    Given I go to "CERTIFICATE_IN_ENGLISH"
    Then I click continue and expect error elements

    Given I go to "CERTIFIED_TRANSLATION"
    Then I click continue and expect error elements

    Given I go to "COUNTRY_AND_PLACE"
    Then I click continue and expect error elements

    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    Then I click continue and expect error elements

    Given I go to "ENTER_YOUR_NAME"
    And I clear the form
    Then I click continue and expect error elements
    Given I enter invalid characters in my name
    And I click continue and expect error elements

    Given I go to "CHECK_YOUR_NAME"
    And I clear the form
    Then I click continue and expect error elements

    Given I go to "THEIR_NAME"
    And I clear the form
    When I click continue and expect error elements
    Given I enter invalid characters in their name
    Then I click continue and expect error elements

    Given I go to "CHECK_THEIR_NAME"
    And I clear the form
    Then I click continue and expect error elements

    Given I go to "YOUR_CERTIFICATE_NAME"
    Then I click continue and expect error elements

    Given I go to "CHANGES_TO_YOUR_NAME_URL"
    Then I click continue and expect error elements
    Given I select other
    Then I click continue and expect error elements

    Given I go to "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Then I click continue and expect error elements
    Given I agree that the court can contact me by email
    And I enter an invalid phone number
    Then I click continue and expect error elements

    Given I go to "ADDRESS_PRIVATE"
    Then I click continue and expect error elements

    Given I go to "ENTER_YOUR_ADDRESS"
    Then I click find address and expect error elements
    Given I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    Given I wait for the postcode lookup to return results
    And I cannot find the address in the list
    Then I click continue and expect error elements
    Given I click back
    Then I reset the postcode lookup form
    And I enter the default UK postcode
    Given I click find address
    And I wait for the postcode lookup to return results
    Then I click continue and expect an error summary

    Given I go to "DO_THEY_HAVE_A_SOLICITOR"
    Then I click continue and expect error elements

    Given I go to "ENTER_SOLICITOR_DETAILS"
    And I enter 'test' as their solicitor email address
    Then I click continue and expect error elements

    Given I go to "DETAILS_OTHER_PROCEEDINGS"
    Then I click continue and expect error elements

    Given I go to "MONEY_PROPERTY"
    When I click continue and expect error elements

    Given I go to "WHO_IS_THE_FINANCIAL_ORDER_FOR"
    Then I click continue and expect error elements

    Given I go to "UPLOAD_YOUR_DOCUMENTS"
    Then I click continue and expect error elements

    Given I go to "HOW_DO_YOU_WANT_TO_APPLY"
    And I want to apply jointly
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Then I click continue and expect error elements

    Given I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"
    Then I click continue and expect error elements

    Given I set the case state to "AwaitingFinalOrder"
    And I go to "FINALISING_YOUR_APPLICATION"
    Then I click submit and expect error elements

    Given I go to "EXPLAIN_THE_DELAY"
    Then I click submit and expect error elements


  @nightly
  Scenario: They fail to fill out the applicant 1 joint application forms
    Given I go to "HOW_DO_YOU_WANT_TO_APPLY"
    And I want to apply jointly
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"
    Then I click continue and expect error elements

  @nightly
  Scenario: They fail to fill out the respondent forms
    Given I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"
    And I confirm the prayer and statement of truth
    When I click continue to payment
    And I pay and submit and expect the application to be saved
    Given a case worker issues the application
    And I as respondent enter my valid case reference and valid access code
    Then the page URL should be "RESPONDENT" / "HUB_PAGE"

    Given I click respond to the application
    Then I click continue and expect error elements
    Given I have read the application for divorce

    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"
    Then I click continue and expect error elements

    Given I go to "RESPONDENT" / "DISPUTING_THE_APPLICATION"
    Then I click continue and expect error elements

    Given I go to "RESPONDENT" / "LEGAL_JURISDICTION_OF_THE_COURTS"
    Then I click continue and expect error elements
    Given I do not agree the courts have jurisdiction
    Then I click continue and expect error elements

    Given I go to "RESPONDENT" / "OTHER_COURT_CASES"
    Then I click continue and expect error elements

    Given I go to "RESPONDENT" / "DETAILS_OTHER_PROCEEDINGS"
    Then I click continue and expect error elements

    Given I go to "RESPONDENT" / "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Then I click continue and expect error elements

    Given I've already completed the form using the fixture "respondentCompleteCase" for "respondent"
    And I go to "RESPONDENT" / "LEGAL_JURISDICTION_OF_THE_COURTS"
    Then I click continue and expect URL "INTEND_TO_DELAY"

    Given I select no
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I go to "RESPONDENT" / "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I go to "RESPONDENT"
    Then I click submit and expect error elements

    Given I go to "RESPONDENT" / "FINALISING_YOUR_APPLICATION"
    Then I click continue and expect error elements

  @nightly
  Scenario: They fail to fill out the applicant 2 forms
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "HOME_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    Given I enter my valid case reference and valid access code
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "HELP_WITH_YOUR_FEE_URL"
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "HELP_PAYING_HAVE_YOU_APPLIED"
    Then I click continue and expect error elements
    Given I select yes
    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "ENTER_YOUR_NAME"
    And I clear the form
    Then I click continue and expect error elements
    Given I enter invalid characters in my name
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "CHANGES_TO_YOUR_NAME_URL"
    Then I click continue and expect error elements
    Given I select other
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "HOW_THE_COURTS_WILL_CONTACT_YOU"
    And I enter an invalid phone number
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "ADDRESS_PRIVATE"
    When I click continue and expect error elements

    Given I go to "APPLICANT_2" / "ENTER_YOUR_ADDRESS"
    Then I click find address and expect error elements

    Given I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    And I cannot find the address in the list
    Then I click continue and expect error elements
    Then I click back
    Given I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    Given I wait for the postcode lookup to return results
    Then I click continue and expect an error summary

    Given I go to "APPLICANT_2" / "OTHER_COURT_CASES"
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "DETAILS_OTHER_PROCEEDINGS"
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "MONEY_PROPERTY"
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "UPLOAD_YOUR_DOCUMENTS"
    And I cannot upload some or all of my documents
    Then I click continue and expect error elements

    Given I go to "APPLICANT_2" / "CHECK_JOINT_APPLICATION"
    Then I click continue and expect error elements
    Given I select no
    Then I click continue and expect error elements

    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for "applicant2"
    And I go to "APPLICANT_2" / "UPLOAD_YOUR_DOCUMENTS"
    Then I click continue

    Given I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"
    Then I click submit and expect error elements


  @nightly
  Scenario: They fail to fill out joint conditional order questions
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "HOME_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    When I enter my valid case reference and valid access code
    Given I set the case state to "AwaitingConditionalOrder"
    When I sign out
    And I login with applicant "1"
    Then the page URL should be "HUB_PAGE"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Then I click continue and expect error elements

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"

    Then I click continue and expect error elements
    Given I select no
    Then I click continue and expect an error summary
    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Then I click submit and expect error elements
    Given I confirm the statement of truth
    Then I click submit and expect URL "HUB_PAGE"

    When I sign out
    And I login with applicant "2"
    And I set the case state to "ConditionalOrderPending"
    Then I go to "APPLICANT_2" / "HUB_PAGE"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Then I click continue and expect error elements

    Given I set the case state to "AwaitingClarification"
    When I sign out
    And I login with applicant "1"
    Then I go to "PROVIDE_INFORMATION_TO_THE_COURT"

    Then I click continue and expect error elements

    When I sign out
    And I login with applicant "2"
    Then I go to "APPLICANT_2" / "PROVIDE_INFORMATION_TO_THE_COURT"

    Then I click continue and expect error elements

  @nightly
  Scenario: Jurisdiction form failures
    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    Then I click continue and expect error elements

    Given I go to "JURISDICTION_DOMICILE"
    Then I click continue and expect error elements

    Given I go to "JURISDICTION_LAST_TWELVE_MONTHS"
    Then I click continue and expect error elements

    Given I go to "LIVING_ENGLAND_WALES_SIX_MONTHS"
    Then I click continue and expect error elements

    Given I go to "HABITUALLY_RESIDENT_ENGLAND_WALES"
    Then I click continue and expect error elements

  @nightly
  Scenario: Enter your access code form failures
    Given I go to "YOUR_DETAILS_URL"
    And I sign out
    When I create a new user and login as applicant 2
    And I clear the form
    Then I enter an invalid reference number and invalid access code
    Then I click continue and expect error elements

    Given I clear the form
    And I enter an invalid access code
    Then I click continue and expect error elements

    Given I clear the form
    And I enter an invalid reference number
    Then I click continue and expect error elements

    Given I clear the form
    Then I click continue and expect error elements
