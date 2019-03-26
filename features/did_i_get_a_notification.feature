Feature: Did i get a notification?
  We want to check if a notification pops up

  Scenario Outline: Did a notification pop up
	Given I am chatting
    When I receive a new message from "<friend>"
    Then I receive a "<notification>" from "<friend>"
	
  Examples:
    | Pedro | Alerta | Pedro |
	| Juan | Nuevo mensaje | Pedro |
	| Alberto | Alerta | Alberto |
    | Pepe || Pepe |