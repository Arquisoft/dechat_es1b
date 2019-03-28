Feature: Could i read the name of my chat-friend?
  We want to know who are chatting with

  Scenario Outline: Could we get the name of our partner
	Given I am in the app
    When I am into a chat 
    Then I can see the name "<name>" of my partner
	
  Examples:
    | Luis | Luis |
	| Samuel | Samuel |
	| Javier | Javier |
	| Marcos | Martin |