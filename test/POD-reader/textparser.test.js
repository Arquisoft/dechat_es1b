const parser = require("../../src/lib/POD-reader/TextParser")
const builder = require("../../src/lib/textFileBuilder")
const Message = require("../../src/model/message");

describe('TextParser tests', () => {
    const user = "https://example.org/user";
    const target = "https://example.org/target";
    var msg = new Message(user, target, "Nothing to see here folks");
    msg.timestamp =  new Date(2018, 12, 12);
    var messages = [msg]
    const input = builder.buildJSONmessages(user, target, messages);
    it('Parse valid input', () => {
        const parsed = parser.parseString(input); 
        expect(parsed).toEqual({
            webid_sender: "example.org/user",
            webid_receiver: "example.org/target",
            lastupdate: expect.any(Number),
            messages: [
                {
                    date: "2019-01-11T23:00:00.000Z",
                    message: "Nothing to see here folks"
                }]
        })
    }),
    it('Parse invalid input', () =>{
        // Create a non-JSON string to parse
        function toTest(){
            parser.parseString("Hi, I'm a bug");
        }
        expect(toTest).toThrowError(SyntaxError);
    }),
    it('Prevent injection', () => {
        // Create a "problematic" message
        injectedMessage = new Message(user, target, "It's a //// trap!");
        injectedMessage.timestamp =  new Date(2018, 12, 12);
        var messages = [injectedMessage];
        const input = builder.buildJSONmessages(user, target, messages);

        const parsed = parser.parseString(input);
        expect(parsed).toEqual({
            webid_sender: "example.org/user",
            webid_receiver: "example.org/target",
            lastupdate: expect.any(Number),
            messages: [
                {
                    date: "2019-01-11T23:00:00.000Z",
                    message: "It's a //// trap!"
                }]
        })
    });;
});