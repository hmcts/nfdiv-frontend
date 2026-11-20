Feature: Jurisdiction - may not be able to get a divorce in England and Wales

  @nightly
  Scenario: May not have jurisdiction
    Given I create a new user and login
    And I've completed all questions correctly to get to the jurisdiction section

    # Was not last habitually resident in England or Wales and is not same sex
    Given neither of us live in England or Wales
    Then I click continue and expect URL "JURISDICTION_DOMICILE"

    Given neither of us are domiciled in England or Wales
    Then I click continue and expect URL "HABITUALLY_RESIDENT_ENGLAND_WALES"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_MAY_NOT_BE_ABLE_TO"

    # Not eligible for residual jurisdiction
    Given I reset the jurisdiction connections
    Then I go to "RESIDUAL_JURISDICTION"

    Given I select no
    Then I click continue and expect URL "JURISDICTION_MAY_NOT_BE_ABLE_TO"

    Then I click to check how we are connected to England or Wales again
