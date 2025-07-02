Feature: Bailiff service journey

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

    Given I click element "#inPersonService"
    When I click continue
    Then the page should include element "#partnerInPersonTitle"

    Given I click element "#bailiffService"
    Given I click element "#respondentAddressInEnglandWales"
    When I click continue
    Then the page should include element "#bailiffServiceApplicationTitle"

  Scenario: Bailiff service happy path
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
    Then the page should include element "#bailiffPartnersNameTitle"

    Given I select element "#applicant1BailiffPartnersName"
    And I type "test name"
    When I click continue
    Then the page should include element "#bailiffPartnerInRefugeTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#bailiffPartnersAddressTitle"

    When I click continue
    Then the page should include element "#bailiffPartnerPhoneTitle"

    Given I click element "#yes"
    Then I select element "#applicant1BailiffPartnersPhone"
    And I type "07777777777"
    When I click continue
    Then the page should include element "#bailiffPartnersDateOfBirthTitle"

    Given I click element "#no"
    And I select element "#applicant1BailiffPartnersApproximateAge"
    And I type "52"
    When I click continue
    Then the page should include element "#bailiffPartnersHeightTitle"

    Given I select element "#applicant1BailiffPartnersHeight"
    And I type "6 feet"
    When I click continue
    Then the page should include element "#bailiffPartnersHairColourTitle"

    Given I select element "#applicant1BailiffPartnersHairColour"
    And I type "brown"
    When I click continue
    Then the page should include element "#bailiffPartnersEyeColourTitle"

    Given I select element "#applicant1BailiffPartnersEyeColour"
    And I type "green"
    When I click continue
    Then the page should include element "#bailiffPartnersEthnicGroupTitle"

    Given I select element "#applicant1BailiffPartnersEthnicGroup"
    And I type "Bangladeshi"
    When I click continue
    Then the page should include element "#bailiffPartnersDistinguishingFeaturesTitle"

    Given I select element "#applicant1BailiffPartnersDistinguishingFeatures"
    And I type "none"
    When I click continue
    Then the page should include element "#bailiffAbleToUploadPhotoTitle"

    Given I click element "#no"
    When I click continue
    Then the page should include element "#bailiffBestTimeToServeTitle"

    Given I select element "#applicant1BailiffBestTimeToServe"
    And I type "Saturday afternoon"
    When I click continue
    Then the page should include element "#bailiffDoesPartnerHaveVehicleTitle"

    Given I click element "#yes"
    When I click continue
    Then the page should include element "#bailiffPartnerVehicleDetailsTitle"

    Given I select element "#applicant1BailiffPartnerVehicleModel"
    And I type "A car"
    When I click continue
    Then the page should include element "#bailiffHasPartnerBeenViolentTitle"

    Given I click element "#yes"
    Then I select element "#applicant1BailiffPartnerViolenceDetails"
    And I type "example"
    When I click continue
    Then the page should include element "#bailiffPartnerMadeThreatsTitle"

    Given I click element "#yes"
    Then I select element "#applicant1BailiffPartnerThreatsDetails"
    And I type "example"
    When I click continue
    Then the page should include element "#bailiffHavePoliceBeenInvolvedTitle"

    Given I click element "#yes"
    Then I select element "#applicant1BailiffPoliceInvolvedDetails"
    And I type "example"
    When I click continue
    Then the page should include element "#bailiffHaveSocialServicesBeenInvolvedTitle"

    Given I click element "#yes"
    Then I select element "#applicant1BailiffSocialServicesInvolvedDetails"
    And I type "example"
    When I click continue
    Then the page should include element "#bailiffDangerousAnimalsTitle"

    Given I click element "#yes"
    Then I select element "#applicant1BailiffDangerousAnimalsDetails"
    And I type "example"

