Feature: Did i get a notification?
  We want to check if a notification pops up

  Scenario: Did a notification pop up
	Given I am chatting
    When I receive a new message from partner
    Then I receive a notification 
	
