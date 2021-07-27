Feature: Applicant 2 Upload your documents

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to "/applicant2/upload-your-documents"
    And the page should include "Upload your documents"

  @nightly
  Scenario: Applicant 2 - They upload documents
    Given I delete any previously uploaded files
    And the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains "larry-the-cat.jpg"
    And I click "Delete"
    And I wait until the page doesn't contain "larry-the-cat.jpg"

  Scenario: Applicant 2 - They cannot upload documents
    Given I clear the form
    When I select "I cannot upload my original marriage certificate"
    And I click "Continue"
    Then the page should include "Check your wife's answers"

  @nightly
  Scenario: Applicant 2 - They have not uploaded any documents and have not selected that they can't upload
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not uploaded anything. Either upload your document or select that you cannot upload your documents."
