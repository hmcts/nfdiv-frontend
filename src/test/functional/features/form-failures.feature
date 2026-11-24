Feature: Form failures

  Background:
    Given I create a new applicant "1" user and login

  @nightly
  Scenario: They fail to fill out the applicant 1 forms
    Given I go to "HAS_RELATIONSHIP_BROKEN_URL"
    Then I click continue and expect an error for field "applicant1ScreenHasUnionBroken"

    Given I go to "RELATIONSHIP_DATE_URL"
    Then I click continue and expect an error for field "relationshipDate"
    Given I enter an invalid relationship date
    Then I click continue and expect an error for field "relationshipDate"
    Given I enter a relationship date that is 2 years in the future
    Then I click continue and expect an error for field "relationshipDate"
    Given I enter a relationship date that is 6 months in the past
    Then I click continue and expect URL "RELATIONSHIP_NOT_LONG_ENOUGH_URL"

    Given I go to "CERTIFICATE_URL"
    Then I click continue and expect an error for field "hasCertificate"

    Given I go to "HELP_WITH_YOUR_FEE_URL"
    Then I click continue and expect an error for field "applicant1HelpPayingNeeded"

    Given I go to "HELP_PAYING_HAVE_YOU_APPLIED"
    Then I click continue and expect an error for field "applicant1AlreadyAppliedForHelpPaying"
    Given I select yes
    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Then I click continue and expect an error for field "applicant1HelpWithFeesRefNo"
    Given I enter an invalid HWF reference number
    Then I click continue and expect an error for field "applicant1HelpWithFeesRefNo"

    Given I go to "HOW_DO_YOU_WANT_TO_APPLY"
    Then I click continue and expect an error for field "applicationType"

    Given I go to "THEIR_EMAIL_ADDRESS"
    Then I click continue and expect an error for field "applicant2EmailAddress"
    Given I enter "test.com" as their email address
    Then I click continue and expect an error for field "applicant2EmailAddress"
    Given I enter their email address
    And I do not have their email address
    Then I click continue and expect an error for field "applicant2EmailAddress"
    Given I clear the form
    And I enter my email address as their email address
    Then I click continue and expect an error for field "applicant2EmailAddress"

    Given I go to "DO_YOU_HAVE_ADDRESS"
    Then I click continue and expect an error for field "applicant1KnowsApplicant2Address"

    Given I go to "NEED_TO_GET_ADDRESS"
    Then I click continue and expect an error for field "iWantToHavePapersServedAnotherWay"

    Given I go to "OTHER_COURT_CASES"
    And I clear the form
    Then I click continue and expect an error for field "applicant1LegalProceedings"

    Given I go to "DETAILS_OTHER_PROCEEDINGS"
    And I clear the form
    Then I click continue and expect an error for field "applicant1LegalProceedingsDetails"

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
    Then I click continue and expect errors for fields "address1, addressTown, addressPostcode"
    Given I click back
    Then I reset the postcode lookup form
    And I have an international address
    Then I click continue and expect an error for field "address1"

    Given I go to "IN_THE_UK"
    Then I click continue and expect an error for field "inTheUk"

    Given I go to "CERTIFICATE_IN_ENGLISH"
    Then I click continue and expect an error for field "certificateInEnglish"

    Given I go to "CERTIFIED_TRANSLATION"
    Then I click continue and expect an error for field "certifiedTranslation"

    Given I go to "COUNTRY_AND_PLACE"
    Then I click continue and expect errors for fields "ceremonyCountry, ceremonyPlace"

    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    Then I click continue and expect errors for fields "applicant1LifeBasedInEnglandAndWales, applicant2LifeBasedInEnglandAndWales"

    Given I go to "ENTER_YOUR_NAME"
    And I clear the form
    Then I click continue and expect errors for fields "applicant1FirstNames, applicant1LastNames"
    Given I enter invalid characters in my name
    Then I click continue and expect errors for fields "applicant1FirstNames, applicant1LastNames"

    Given I go to "CHECK_YOUR_NAME"
    And I clear the form
    Then I click continue and expect an error for field "applicant1NameDifferentToMarriageCertificate"

    Given I go to "THEIR_NAME"
    And I clear the form
    When I click continue and expect errors for fields "applicant2FirstNames, applicant2LastNames"
    Given I enter invalid characters in their name
    Then I click continue and expect errors for fields "applicant2FirstNames, applicant2LastNames"

    Given I go to "CHECK_THEIR_NAME"
    And I clear the form
    Then I click continue and expect an error for field "applicant2NameDifferentToMarriageCertificate"

    Given I go to "YOUR_CERTIFICATE_NAME"
    Then I click continue and expect an error for field "applicant1FullNameOnCertificate"

    Given I go to "CHANGES_TO_YOUR_NAME_URL"
    Then I click continue and expect an error for field "applicant1WhyNameDifferent"
    Given I select other
    Then I click continue and expect an error for field "applicant1WhyNameDifferent"

    Given I go to "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Then I click continue and expect an error for field "applicant1AgreeToReceiveEmails"
    Given I agree that the court can contact me by email
    And I enter an invalid phone number
    Then I click continue and expect an error for field "applicant1PhoneNumber"

    Given I go to "ADDRESS_PRIVATE"
    Then I click continue and expect an error for field "applicant1AddressPrivate"

    Given I go to "ENTER_YOUR_ADDRESS"
    Then I click find address and expect error elements
    Given I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    Given I wait for the postcode lookup to return results
    And I cannot find the address in the list
    Then I click continue and expect errors for fields "address1, addressTown, addressPostcode"
    Given I click back
    Then I reset the postcode lookup form
    And I enter the default UK postcode
    Given I click find address
    And I wait for the postcode lookup to return results
    Then I click continue and expect an error summary for field "selectAddressInput"

    Given I go to "DO_THEY_HAVE_A_SOLICITOR"
    Then I click continue and expect an error for field "applicant1IsApplicant2Represented"

    Given I go to "ENTER_SOLICITOR_DETAILS"
    And I enter 'test' as their solicitor email address
    Then I click continue and expect an error for field "applicant2SolicitorEmail"

    Given I go to "DETAILS_OTHER_PROCEEDINGS"
    Then I click continue and expect an error for field "applicant1LegalProceedingsDetails"

    Given I go to "MONEY_PROPERTY"
    When I click continue and expect an error for field "applicant1ApplyForFinancialOrder"

    Given I go to "WHO_IS_THE_FINANCIAL_ORDER_FOR"
    Then I click continue and expect an error for field "applicant1WhoIsFinancialOrderFor"

    Given I go to "UPLOAD_YOUR_DOCUMENTS"
    Then I click continue and expect uploadedFiles error elements

    Given I go to "HOW_DO_YOU_WANT_TO_APPLY"
    And I want to apply jointly
    Then I click continue and expect URL "THEIR_EMAIL_ADDRESS"

    Then I click continue and expect an error for field "applicant2EmailAddress"

    Given I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"
    Then I click submit and expect prayer and statement of truth error elements

    Given I set the case state to "AwaitingFinalOrder"
    And I go to "FINALISING_YOUR_APPLICATION"
    Then I click submit and expect an error for field "doesApplicant1WantToApplyForFinalOrder"

    Given I go to "EXPLAIN_THE_DELAY"
    Then I click submit and expect final order delay explanation error elements

  @nightly
  Scenario: They fail to fill out the respondent forms
    Given I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"
    And I confirm the prayer and statement of truth
    When I click continue to payment
    And I pay and submit and expect the application to be saved
    Given a case worker issues the application
    And I login as the respondent and link to the case
    Then the page URL should be "RESPONDENT" / "HUB_PAGE"

    Given I click respond to the application
    Then I click continue and expect confirmReadPetition error elements
    Given I have read the application for divorce

    Then I click continue and expect URL "HOW_DO_YOU_WANT_TO_RESPOND"
    Then I click continue and expect an error for field "disputeApplication"

    Given I go to "RESPONDENT" / "DISPUTING_THE_APPLICATION"
    Then I click continue and expect an error for field "confirmDisputeApplication"

    Given I go to "RESPONDENT" / "LEGAL_JURISDICTION_OF_THE_COURTS"
    Then I click continue and expect an error for field "jurisdictionAgree"
    Given I do not agree the courts have jurisdiction
    Then I click continue and expect errors for fields "reasonCourtsOfEnglandAndWalesHaveNoJurisdiction, inWhichCountryIsYourLifeMainlyBased"

    Given I go to "RESPONDENT" / "OTHER_COURT_CASES"
    Then I click continue and expect an error for field "applicant2LegalProceedings"

    Given I go to "RESPONDENT" / "DETAILS_OTHER_PROCEEDINGS"
    Then I click continue and expect an error for field "applicant2LegalProceedingsDetails"

    Given I go to "RESPONDENT" / "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Then I click continue and expect an error for field "applicant2AgreeToReceiveEmails"

    Given I've already completed the form using the fixture "respondentCompleteCase" for the respondent
    And I go to "RESPONDENT" / "LEGAL_JURISDICTION_OF_THE_COURTS"
    Then I click continue and expect URL "INTEND_TO_DELAY"

    Given I select no
    Then I click continue and expect URL "OTHER_COURT_CASES"

    Given I go to "RESPONDENT" / "HOW_THE_COURTS_WILL_CONTACT_YOU"
    Then I click continue and expect URL "ENGLISH_OR_WELSH"

    Given I go to "RESPONDENT"
    Then I click submit and expect error elements

    Given I go to "RESPONDENT" / "FINALISING_YOUR_APPLICATION"
    Then I click continue and expect errors for fields "doesApplicant2WantToApplyForFinalOrder, applicant2FinalOrderExplanation"

  @nightly
  Scenario: They fail to fill out the applicant 2 forms
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"

    Given I login as applicant "2" and link to the case
    Then I click continue and expect URL "HAS_RELATIONSHIP_BROKEN_URL"

    Then I click continue and expect an error for field "applicant2ScreenHasUnionBroken"

    Given I go to "APPLICANT_2" / "HELP_WITH_YOUR_FEE_URL"
    Then I click continue and expect an error for field "applicant2HelpPayingNeeded"

    Given I go to "APPLICANT_2" / "HELP_PAYING_HAVE_YOU_APPLIED"
    Then I click continue and expect an error for field "applicant2AlreadyAppliedForHelpPaying"
    Given I select yes
    Then I click continue and expect URL "ENTER_HWF_NUMBER_URL"

    Then I click continue and expect an error for field "applicant2HelpWithFeesRefNo"

    Given I go to "APPLICANT_2" / "ENTER_YOUR_NAME"
    And I clear the form
    Then I click continue and expect errors for fields "applicant2FirstNames, applicant2LastNames"
    Given I enter invalid characters in my name
    Then I click continue and expect errors for fields "applicant2FirstNames, applicant2LastNames"

    Given I go to "APPLICANT_2" / "CHANGES_TO_YOUR_NAME_URL"
    Then I click continue and expect an error for field "applicant2WhyNameDifferent"
    Given I select other
    Then I click continue and expect an error for field "applicant2WhyNameDifferent"

    Given I go to "APPLICANT_2" / "HOW_THE_COURTS_WILL_CONTACT_YOU"
    And I enter an invalid phone number
    Then I click continue and expect an error for field "applicant2PhoneNumber"

    Given I go to "APPLICANT_2" / "ADDRESS_PRIVATE"
    Then I click continue and expect an error for field "applicant2AddressPrivate"

    Given I go to "APPLICANT_2" / "ENTER_YOUR_ADDRESS"
    Then I click find address and expect error elements
    Given I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    Given I wait for the postcode lookup to return results
    And I cannot find the address in the list
    Then I click continue and expect errors for fields "address1, addressTown, addressPostcode"
    Given I click back
    Then I reset the postcode lookup form
    And I enter the default UK postcode
    Then I click find address
    Given I wait for the postcode lookup to return results
    Then I click continue and expect an error summary for field "selectAddressInput"

    Given I go to "APPLICANT_2" / "OTHER_COURT_CASES"
    Then I click continue and expect an error for field "applicant2LegalProceedings"

    Given I go to "APPLICANT_2" / "DETAILS_OTHER_PROCEEDINGS"
    Then I click continue and expect an error for field "applicant2LegalProceedingsDetails"

    Given I go to "APPLICANT_2" / "MONEY_PROPERTY"
    When I click continue and expect an error for field "applicant2ApplyForFinancialOrder"

    Given I go to "APPLICANT_2" / "UPLOAD_YOUR_DOCUMENTS"
    And I cannot upload some or all of my documents
    Then I click continue and expect uploadedFiles error elements

    Given I go to "APPLICANT_2" / "CHECK_JOINT_APPLICATION"
    Then I click continue and expect an error for field "applicant2Confirmation"
    Given I select no
    Then I click continue and expect an error for field "applicant2Explanation"

    Given I've already completed the form using the fixture "jointApplicant2CompleteCase" for applicant "2"
    And I go to "APPLICANT_2" / "UPLOAD_YOUR_DOCUMENTS"
    Then I click continue

    Given I go to "APPLICANT_2" / "CONFIRM_JOINT_APPLICATION"
    Then I click submit and expect prayer and statement of truth error elements


  @nightly
  Scenario: They fail to fill out the joint conditional order questions
    Given I've already completed the form using the fixture "jointApplicant1CompleteCase"
    When I go to "CHECK_ANSWERS_URL"
    Then I click send for review and expect URL "SENT_TO_APPLICANT2_FOR_REVIEW"
    Given I login as applicant "2" and link to the case
    Then I set the case state to "AwaitingConditionalOrder" then login as applicant "1" and expect hub element "#applicantNotYetAppliedForJointConditionalOrderContent"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Then I click continue and expect an error for field "applicant1ApplyForConditionalOrder"

    Given I want to continue with my divorce application
    Then I click continue and expect URL "REVIEW_YOUR_JOINT_APPLICATION"

    Then I click continue and expect an error for field "applicant1ConfirmInformationStillCorrect"
    Given I select no
    Then I click continue and expect an error summary for field "applicant1ReasonInformationNotCorrect"
    Given I select yes
    Then I click continue and expect URL "CHECK_CONDITIONAL_ORDER_ANSWERS_URL"

    Then I click submit and expect conditional order statement of truth error elements
    Given I confirm the statement of truth
    Then I click submit and expect URL "HUB_PAGE"

    Given I set the case state to "AwaitingClarification"
    Then I go to "PROVIDE_INFORMATION_TO_THE_COURT"

    Then I click continue and expect an error for field "coClarificationResponses"

    Given I login as applicant "2"
    Then I go to "APPLICANT_2" / "PROVIDE_INFORMATION_TO_THE_COURT"

    Then I click continue and expect an error for field "coClarificationResponses"

    Given I set the case state to "ConditionalOrderPending"
    Then I go to "APPLICANT_2" / "HUB_PAGE"

    Then I click apply for conditional order and expect URL "CONTINUE_WITH_YOUR_APPLICATION"

    Then I click continue and expect an error for field "applicant2ApplyForConditionalOrder"

  @nightly
  Scenario: Jurisdiction form failures
    Given I go to "WHERE_YOUR_LIVES_ARE_BASED_URL"
    Then I click continue and expect errors for fields "applicant1LifeBasedInEnglandAndWales, applicant2LifeBasedInEnglandAndWales"

    Given I go to "JURISDICTION_DOMICILE"
    Then I click continue and expect errors for fields "applicant1DomicileInEnglandWales, applicant2DomicileInEnglandWales"

    Given I go to "JURISDICTION_LAST_TWELVE_MONTHS"
    Then I click continue and expect an error for field "applicant1LivingInEnglandWalesTwelveMonths"

    Given I go to "LIVING_ENGLAND_WALES_SIX_MONTHS"
    Then I click continue and expect an error for field "applicant1LivingInEnglandWalesSixMonths"

    Given I go to "HABITUALLY_RESIDENT_ENGLAND_WALES"
    Then I click continue and expect an error for field "bothLastHabituallyResident"

  @nightly
  Scenario: Enter your access code form failures
    Given I've already completed the form using the fixture "completeCase"
    And I go to "CHECK_ANSWERS_URL"
    And I confirm the prayer and statement of truth
    When I click continue to payment
    And I pay and submit and expect the application to be saved
    Then a case worker issues the application
    Given I create a new respondent user and login
    Then I get the case reference and access code

    Given I enter an invalid case reference
    Then I click continue and expect errors for fields "caseReference"

    Given I clear the form
    And I enter an invalid access code
    Then I click continue and expect an error for field "accessCode"

    Given I clear the form
    And I enter an invalid access code and no case reference
    Then I click continue and expect errors for fields "caseReference"

    Given I clear the form
    And I enter an invalid case reference and no access code
    Then I click continue and expect errors for fields "caseReference, accessCode"

    Given I clear the form
    And I enter an invalid case reference and invalid access code
    Then I click continue and expect an error for field "caseReference"

    Given I clear the form
    Then I click continue and expect errors for fields "caseReference, accessCode"
