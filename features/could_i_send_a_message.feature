Feature: Could i send a message?
  We want to send a message on the chat

  Scenario Outline: Could the user send a message
	Given I am chatting
    When I send a message "<message>"
    Then My friend gets a message "<message>" from me
	
  Examples:
    | Hola | Hola |
	| Como estas | Como estas |
	| Igual | Distinto y no pasa |
	| Mismo | Mismo |