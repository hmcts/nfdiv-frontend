#TODO step up login for respondent otherwise check your answers page isnt going to display respondent content.
#Feature: Respondent Check Your Answers
#
#  Background:
#    Given I login
#    And I've already completed the form using the fixture "completeCase"
#    And I've already completed the form using the fixture "respondentCompleteCase"
#    And I set the case state to "AosDrafted"
#    And I go to "/respondent/check-your-answers"
#
#  Scenario: Checking answers and submitting
#    Then the page should include "What language do you want to receive emails and documents in? English"
#    Then the page should include "Are there, or have there ever been, any other legal proceedings relating to your marriage, property or children? No"
#    And I select "I confirm that:"
#    When I click "Submit"
#    Then the page URL should be "/respondent/hub-page"
#
