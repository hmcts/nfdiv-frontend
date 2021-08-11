Feature: Upload your documents

  Background:
    Given I login

  @flaky
  Scenario: They upload documents
    Given I go to "/upload-your-documents"
    And I delete any previously uploaded files
    And the page should include "No files uploaded"
    When I upload the file "fixtures/larry-the-cat.jpg"
    Then I wait until the page contains image "larry-the-cat.jpg"
    And I click "Delete"
    And I wait until the page doesn't contain "larry-the-cat.jpg"

  Scenario: They cannot upload documents
    Given I go to "/in-the-uk"
    And I select "Yes"
    And I click "Continue"
    And I go to "/changes-to-your-name"
    And I select "No" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"
    And I click "Continue"
    And I go to "/upload-your-documents"
    And the page should include "Upload your documents"
    And I clear the form
    When I select "I cannot upload my original marriage certificate"
    And I click "Continue"
    Then the page should include "Check your answers"

  @nightly
  Scenario: They have not uploaded any documents and have not selected that they can't upload
    Given I go to "/upload-your-documents"
    And I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
    And the page should include "You have not uploaded anything. Either upload your document or select that you cannot upload your documents."
