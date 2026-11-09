Feature: Bailiff service journey

  Background:
    Given I prep the case for an interim application

    Given I don't know my partner's contact details
    Then I click continue and expect URL "NO_NEW_ADDRESS"

    Given I select in person service
    Then I click continue and expect URL "PARTNER_IN_PERSON"

    Given I select bailiff service
    Then I click continue and expect URL "BAILIFF_SERVICE_APPLICATION"

  Scenario: Bailiff service happy path
    Given I click start and expect URL "HELP_WITH_FEES_BAILIFF"

    Given I select no
    Then I click continue and expect URL "ENTER_PARTNERS_NAME_BAILIFF"

    Given I enter their name for the bailiff
    Then I click continue and expect URL "PARTNER_IN_REFUGE_BAILIFF"

    Given I select no
    Then I click continue and expect URL "PARTNER_ADDRESS_BAILIFF"

    Then I click continue and expect URL "PARTNER_PHONE_NUMBER_BAILIFF"

    Given I select yes
    And I enter their phone number for the bailiff
    Then I click continue and expect URL "PARTNER_DATE_OF_BIRTH_BAILIFF"

    Given I select no
    And I enter their approximate age
    Then I click continue and expect URL "PARTNER_HEIGHT_BAILIFF"

    Given I enter their height
    Then I click continue and expect URL "PARTNER_HAIR_COLOUR_BAILIFF"

    Given I enter their hair colour
    Then I click continue and expect URL "PARTNER_EYE_COLOUR_BAILIFF"

    Given I enter their eye colour
    Then I click continue and expect URL "PARTNER_ETHNIC_GROUP_BAILIFF"

    Given I enter their ethnic group
    Then I click continue and expect URL "PARTNER_DISTINGUISHING_FEATURES_BAILIFF"

    Given I enter their distinguishing features
    Then I click continue and expect URL "ABLE_TO_UPLOAD_PARTNER_PHOTO"

    Given I select no
    Then I click continue and expect URL "WHEN_IS_BEST_TO_SERVE"

    Given I enter the best time to serve the papers
    Then I click continue and expect URL "DOES_PARTNER_HAVE_A_VEHICLE"

    Given I select yes
    Then I click continue and expect URL "PARTNER_VEHICLE_DETAILS"

    Given I enter details of their vehicle
    Then I click continue and expect URL "HAS_PARTNER_BEEN_VIOLENT"

    Given my partner has been violent
    Then I click continue and expect URL "HAS_PARTNER_MADE_THREATS"

    Given my partner has made threats
    Then I click continue and expect URL "HAVE_POLICE_BEEN_INVOLVED"

    Given the police have been involved
    Then I click continue and expect URL "HAVE_SOCIAL_SERVICES_BEEN_INVOLVED"

    Given social services have been involved
    Then I click continue and expect URL "ARE_THERE_DANGEROUS_ANIMALS"

    Given my partner keeps dangerous animals
    Then I click continue and expect URL "PARTNER_MENTAL_HEALTH_BAILIFF"

    Given my partner has a history of mental health issues
    Then I click continue and expect URL "PARTNER_FIREARMS_LICENSE_BAILIFF"

    Given my partner has a firearms licence
    Then I click continue and expect URL "CHECK_ANSWERS_BAILIFF"

    Given I confirm the statement of truth
    Then I click submit and expect URL "PAY_YOUR_SERVICE_FEE"

    Given I pay and submit the service application

    Given I click return to hub
    Then the page should include element "#awaitingServiceConsiderationOrBailiffReferralLine1"

  @nightly
  Scenario: Bailiff service HWF journey
    Given I click start and expect URL "HELP_WITH_FEES_BAILIFF"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_BAILIFF"

    Given I select yes
    Then I click continue and expect URL "HWF_REFERENCE_NUMBER_INPUT_BAILIFF"

    Given I enter my HWF reference number
    Then I click continue and expect URL "ENTER_PARTNERS_NAME_BAILIFF"

    Given I enter their name for the bailiff
    Then I click continue and expect URL "PARTNER_IN_REFUGE_BAILIFF"

    Given I select no
    Then I click continue and expect URL "PARTNER_ADDRESS_BAILIFF"

    Then I click continue and expect URL "PARTNER_PHONE_NUMBER_BAILIFF"

    Given I select yes
    And I enter their phone number for the bailiff
    Then I click continue and expect URL "PARTNER_DATE_OF_BIRTH_BAILIFF"

    Given I select no
    And I enter their approximate age
    Then I click continue and expect URL "PARTNER_HEIGHT_BAILIFF"

    Given I enter their height
    Then I click continue and expect URL "PARTNER_HAIR_COLOUR_BAILIFF"

    Given I enter their hair colour
    Then I click continue and expect URL "PARTNER_EYE_COLOUR_BAILIFF"

    Given I enter their eye colour
    Then I click continue and expect URL "PARTNER_ETHNIC_GROUP_BAILIFF"

    Given I enter their ethnic group
    Then I click continue and expect URL "PARTNER_DISTINGUISHING_FEATURES_BAILIFF"

    Given I enter their distinguishing features
    Then I click continue and expect URL "ABLE_TO_UPLOAD_PARTNER_PHOTO"

    Given I select no
    Then I click continue and expect URL "WHEN_IS_BEST_TO_SERVE"

    Given I enter the best time to serve the papers
    Then I click continue and expect URL "DOES_PARTNER_HAVE_A_VEHICLE"

    Given I select yes
    Then I click continue and expect URL "PARTNER_VEHICLE_DETAILS"

    Given I enter details of their vehicle
    Then I click continue and expect URL "HAS_PARTNER_BEEN_VIOLENT"

    Given my partner has been violent
    Then I click continue and expect URL "HAS_PARTNER_MADE_THREATS"

    Given my partner has made threats
    Then I click continue and expect URL "HAVE_POLICE_BEEN_INVOLVED"

    Given the police have been involved
    Then I click continue and expect URL "HAVE_SOCIAL_SERVICES_BEEN_INVOLVED"

    Given social services have been involved
    Then I click continue and expect URL "ARE_THERE_DANGEROUS_ANIMALS"

    Given my partner keeps dangerous animals
    Then I click continue and expect URL "PARTNER_MENTAL_HEALTH_BAILIFF"

    Given my partner has a history of mental health issues
    Then I click continue and expect URL "PARTNER_FIREARMS_LICENSE_BAILIFF"

    Given my partner has a firearms licence
    Then I click continue and expect URL "CHECK_ANSWERS_BAILIFF"

    Given I confirm the statement of truth
    Then I click submit and expect URL "SERVICE_APPLICATION_SUBMITTED"

    Given I click return to hub
    Then the page should include element "#serviceApplicationSubmittedIntroLine1"
