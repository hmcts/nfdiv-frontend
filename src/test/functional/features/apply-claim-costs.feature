Feature: Apply claim costs

  Background:
    Given I login
    And I've said I'm divorcing my husband
    And I go to '/apply-claim-costs'
    Then the page should include "Do you want to claim divorce costs from your husband?"

  Scenario: Successfully completing the form (apply claim costs)
    And I select "Yes, I want to apply to claim costs"
    And I click "Continue"
    Then the page URL should be "/upload-your-documents"

  @nightly
  Scenario: Error when not answering Do you want to claim divorce costs from your husband?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"
