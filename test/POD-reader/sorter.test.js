const sorter = require("../../src/lib/POD-reader/Sorter");
const Message = require("../../src/model/message");

describe('Sorter tests', () => {
    var ms1 = new Message("McTestface", "Testy", "What's updog?");
    ms1.timestamp = new Date(2016, 11, 24, 10, 33, 30, 0);
    var ms2 = new Message("Testy", "McTestface", "Not much, u?");
    ms2.timestamp = new Date(2017, 11, 24, 10, 33, 30, 0);
    var ms3 = new Message("McTestface", "Testy", "You're looking updog today")
    ms3.timestamp = new Date(2018, 11, 24, 10, 33, 30, 0);
    var ms4 = new Message("Testy", "McTestface", "Why do I ever bother talking to you?");
    ms4.timestamp = new Date(2018, 11, 25, 10, 33, 30, 0);
    it('Order arbitrary list', () => {
        var list = [ms2, ms1, ms4, ms3];

        var result = sorter.sort(list);
        expect(result).toEqual([ms1, ms2, ms3, ms4]);
    }),
    it('Order already ordered list', () =>{
        var list = [ms1, ms2, ms3, ms4];

        var result = sorter.sort(list);
        expect(result).toEqual([ms1, ms2, ms3, ms4]);
    }),
    it('Order reversed list', () =>{
        var list = [ms4, ms3, ms2, ms1];

        var result = sorter.sort(list);
        expect(result).toEqual([ms1, ms2, ms3, ms4]);
    })
});