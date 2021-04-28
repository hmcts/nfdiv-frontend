Feature: Upload your documents

  Background:
    Given I login
    And I go to '/in-the-uk'
    And I select "Yes"
    And I click "Continue"
    When I go to '/upload-your-documents'
    And I clear the form
    Then the page should include "Upload your documents"

  Scenario: They cannot upload documents
    Given I select "I cannot upload some or all of my documents"
    And I select "My original marriage certificate"
    When I click "Continue"
    Then the page should include "Check your answers"

  @nightly
  Scenario: They have not uploaded any documents and have not selected that they can't upload
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not uploaded anything. Upload your documents or select ‘I cannot upload my document’"
