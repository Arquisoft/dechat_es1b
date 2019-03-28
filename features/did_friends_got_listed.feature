Feature: Did my friends got listed?
  User's friends should be listed on the chat

  Scenario Outline: Were friends listed propertly
	Given I press List Friends button
    When My friends "<friends>" got listed
    Then I looked for "<name>" 
	
  Examples:
    | Fernando-Alberto | Alberto |
	| Fernando-Alberto-JoseLuis | JoseLuis |