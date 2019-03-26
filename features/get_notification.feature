Feature: Did i get a new message notification?
  We want to check if a notification pops up

  Scenario Outline: Did a notification pop up
	Given that I am chatting
    When I receive a new message
    Then I receive a "<notification>" from "<friend>"