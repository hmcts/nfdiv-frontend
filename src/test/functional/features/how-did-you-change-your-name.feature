Feature: How did you change your name

  Background:
    Given I login
    When I go to '/how-did-you-change-your-name'
    Then the page should include "How did you change your name?"

  Scenario: They changed their name by sending of their certificate
    Given I select "By sending off my marriage certificate"
    When I click "Continue"
    Then the page should include "How the court will contact you"

  Scenario: They changed their name by deed poll or statutory declaration
    Given I select "By deed poll or ‘statutory declaration’"
    When I click "Continue"
    Then the page should include "How the court will contact you"

  @nightly
  Scenario: They changed their name another way but did not indicate how
    Given I select "Another way"
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: They changed their name another way
    Given I select "Another way"
    And I select "Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here."
    And I type "Test Another Way"
    When I click "Continue"
    Then the page should include "How the court will contact you"

  @nightly
  Scenario: They have not indicated how they changed their name
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
