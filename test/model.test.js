/**
 * Tests for models classes
 */
const Person = require("../src/model/person");
const Message = require("../src/model/message");

describe('Model tests', () => {
    describe('Person', () => {
        let instance;
        beforeAll(() => {
            instance = new Person("https://example.org/profile/card#me",
            "Paco", "https://example.org/inbox")
        });
        it('A person should be created', () => {
            expect(instance).toBeInstanceOf(Person);
        }),
        it('Attributes should match', () => {
            expect(instance.id).toBe("https://example.org/profile/card#me");
            expect(instance.name).toBe("Paco");
            expect(instance.inbox).toBe("https://example.org/inbox");
        });
    }),
    describe('Message', () => {
        let instance;
        let user, target;
        beforeAll(() => {
           user = new Person("https://paco.solid.community/profile/card#me", "Paco", "https://paco.solid.community/inbox")
           target = new Person("https://carmen.solid.community/profile/card#me", "Carmen", "https://carmen.solid.community/inbox")
           instance = new Message(user, target, "yo, waddup");
        }),
        it('Message should be created', () => {
            expect(instance).toBeInstanceOf(Message)
        }),
        it('Attributes should match', () => {
            expect(instance.user).toBe(user);
            expect(instance.partner).toBe(target);
            expect(instance.content).toBe("yo, waddup");
            expect(instance.timestamp).toBeDefined();
        });
    });
    describe('Message file', () => {
        let instance;
        let user, target;
        beforeAll(() => {
           user = new Person("https://paco.solid.community/profile/card#me", "Paco", "https://paco.solid.community/inbox")
           target = new Person("https://carmen.solid.community/profile/card#me", "Carmen", "https://carmen.solid.community/inbox")
           instance = new Message(user, target, "http://example.org/file.pdf", "file");
        }),
        it('Message should be created', () => {
            expect(instance).toBeInstanceOf(Message)
        }),
        it('Attributes should match', () => {
            expect(instance.user).toBe(user);
            expect(instance.partner).toBe(target);
            expect(instance.content).toBe("http://example.org/file.pdf");
            expect(instance.type).toBe("file");
            expect(instance.timestamp).toBeDefined();
        });
    });
    describe('Message image', () => {
        let instance;
        let user, target;
        beforeAll(() => {
           user = new Person("https://paco.solid.community/profile/card#me", "Paco", "https://paco.solid.community/inbox")
           target = new Person("https://carmen.solid.community/profile/card#me", "Carmen", "https://carmen.solid.community/inbox")
           instance = new Message(user, target, "http://example.org/image.jpg", "image");
        }),
        it('Message should be created', () => {
            expect(instance).toBeInstanceOf(Message)
        }),
        it('Attributes should match', () => {
            expect(instance.user).toBe(user);
            expect(instance.partner).toBe(target);
            expect(instance.content).toBe("http://example.org/image.jpg");
            expect(instance.type).toBe("image");
            expect(instance.timestamp).toBeDefined();
        });
    });
});