const pod = require("../src/lib/POD-handler")
const auth = require("solid-auth-client")
const assert = require("assert")



describe("Probando si los test funcionan", function(){
    const WebID = "https://samuelcifuentes.solid.community/profile/card#me"
    beforeEach(async () => {
        auth.currentsession = jest.fn(x => {WebID = WebID})
    })
    it("Dime que sí", function(done){
        console.log(auth.currentsession())
        done();
    })
})