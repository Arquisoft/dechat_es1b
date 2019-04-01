Feature: Could i read a received message?
  We want to be able to read interchanged messages
  

  Scenario: Chatting with Jose
	Given I am using the app
    When I am chatting with "Jose"
    Then I can read he has sent me "Hola que tal?"
	 
  Scenario: Chatting with Jesus
	Given I am using the app
    When I am chatting with "Jesus"
    Then I can read he has sent me "Hoy no atendi en clase, estaba descentralizado"
	 
	 
	 
