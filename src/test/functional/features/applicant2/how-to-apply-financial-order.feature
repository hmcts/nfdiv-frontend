Feature: Applicant 2 how to apply for a financial order

  Background:
    Given I login
    And I am reviewing an application for divorce created by my wife
    When I go to "/applicant2/how-to-apply-financial-order"
    Then the page should include "How to apply for a financial order"
    And the page should include "You will need to complete another form (Form A or Form A1) and pay an additional fee."

  @nightly
  Scenario: They click Continue on the "How to apply for a financial order" page and have changed their names
    When I go to "/applicant2/changes-to-your-name"
    Given I select "Yes" for "Did you change your last name when you got married?"
    And I select "Yes" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    And I select "By deed poll or ‘statutory declaration’"
    When I click "Continue"
    Then the page URL should be "/applicant2/how-the-court-will-contact-you"
    When I go to "/applicant2/how-to-apply-financial-order"
    When I click "Continue"
    Then the page URL should be "/applicant2/upload-your-documents"

  @nightly
  Scenario: They click Continue on the "How to apply for a financial order" page and have not changed their names
    When I go to "/applicant2/changes-to-your-name"
    Given I select "No" for "Did you change your last name when you got married?"
    And I select "No" for "Have you changed any part of your name since getting married?"
    When I click "Continue"
    Then the page URL should be "/applicant2/how-the-court-will-contact-you"
    When I go to "/applicant2/how-to-apply-financial-order"
    When I click "Continue"
    Then the page URL should be "/applicant2/check-your-joint-application"
