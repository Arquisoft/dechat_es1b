Feature: Did my friends got listed?
  User's friends should be listed on the chat

  Scenario: Were friends listed propertly
	Given I press List Friends button
    When My friends got listed
    Then I looked for Alberto 
	