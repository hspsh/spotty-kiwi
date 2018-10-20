const { formatStatus } = require('../src/whois.js');

describe("formatStatus", () => {
        it("0 registered, 0 unregistered", () => {
                expect(formatStatus({headcount: 0, unknown_devices: 0, users: []}, "test_user"))
                .toBe("<@test_user>, Hackerspace jest totalnie pusty.");
        });
        it("0 registered, 1 unregistered", () => {
                expect(formatStatus({headcount: 0, unknown_devices: 1, users: []}, "test_user"))
                .toBe("<@test_user>, Hackerspace jest oficjalnie pusty, natomiast jest 1 anonimowe urządzenie.");
        });
        it("0 registered, 2 unregistered", () => {
                expect(formatStatus({headcount: 0, unknown_devices: 2, users: []}, "test_user"))
                .toBe("<@test_user>, Hackerspace jest oficjalnie pusty, natomiast jest 2 anonimowe urządzenia.");
        });
        it("0 registered, 5 unregistered", () => {
                expect(formatStatus({headcount: 0, unknown_devices: 5, users: []}, "test_user"))
                .toBe("<@test_user>, Hackerspace jest oficjalnie pusty, natomiast jest 5 anonimowych urządzeń.");
        });
        it("1 registered, 0 unregistered", () => {
                expect(formatStatus({headcount: 1, unknown_devices: 0, users: ["test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest jedna osoba: test.");
        });
        it("2 registered, 0 unregistered", () => {
                expect(formatStatus({headcount: 2, unknown_devices: 0, users: ["test", "other_test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 2 osoby: test, other_test.");
        });
        it("4 registered, 0 unregistered", () => {
                expect(formatStatus({headcount: 4, unknown_devices: 0, users: ["test", "other_test", "hacker", "1337"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 4 osoby: test, other_test, hacker, 1337.");
        });
        it("5 registered, 0 unregistered", () => {
                expect(formatStatus({headcount: 5, unknown_devices: 0, users: ["test", "other_test", "hacker", "1337", "devops"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest 5 osób: test, other_test, hacker, 1337, devop.s");
        });
        it("1 registered, 1 unregistered", () => {
                expect(formatStatus({headcount: 1, unknown_devices: 1, users: ["test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest jedna osoba: test oraz 1 animowe urządzenie.");
        });
        it("2 registered, 1 unregistered", () => {
                expect(formatStatus({headcount: 2, unknown_devices: 1, users: ["test", "other_test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 2 osoby: test, other_test oraz 1 anonimowe urządzenie.");
        });
        it("4 registered, 1 unregistered", () => {
                expect(formatStatus({headcount: 4, unknown_devices: 1, users: ["test", "other_test", "hacker", "1337"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 4 osoby: test, other_test, hacker, 1337 oraz 1 anonimowe urządzenie.");
        });
        it("5 registered, 1 unregistered", () => {
                expect(formatStatus({headcount: 5, unknown_devices: 1, users: ["test", "other_test", "hacker", "1337", "devops"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest 5 osób: test, other_test, hacker, 1337, devops oraz 1 anonimowe urządzenie.");
        });
        it("1 registered, 2 unregistered", () => {
                expect(formatStatus({headcount: 1, unknown_devices: 2, users: ["test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest jedna osoba: test oraz 2 anonimowe urządzenia.");
        });
        it("2 registered, 2 unregistered", () => {
                expect(formatStatus({headcount: 2, unknown_devices: 2, users: ["test", "other_test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 2 osoby: test, other_test oraz 2 anonimowe urządzenia.");
        });
        it("4 registered, 2 unregistered", () => {
                expect(formatStatus({headcount: 4, unknown_devices: 2, users: ["test", "other_test", "hacker", "1337"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 4 osoby: test, other_test, hacker, 1337 oraz 2 anonimowe urządzenia.");
        });
        it("5 registered, 2 unregistered", () => {
                expect(formatStatus({headcount: 5, unknown_devices: 2, users: ["test", "other_test", "hacker", "1337", "devops"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest 5 osób: test, other_test, hacker, 1337, devops oraz 2 anonimowe urządzenia.");
        });
        it("1 registered, 5 unregistered", () => {
                expect(formatStatus({headcount: 1, unknown_devices: 5, users: ["test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest jedna osoba: test oraz 5 anonimowych urządzeń.");
        });
        it("2 registered, 5 unregistered", () => {
                expect(formatStatus({headcount: 2, unknown_devices: 5, users: ["test", "other_test"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 2 osoby: test, other_test oraz 5 anonimowych urządzeń.");
        });
        it("4 registered, 5 unregistered", () => {
                expect(formatStatus({headcount: 4, unknown_devices: 5, users: ["test", "other_test", "hacker", "1337"]}, "test_user"))
                .toBe("<@test_user>, w spejsie są 4 osoby: test, other_test, hacker, 1337 oraz 5 anonimowych urządzeń.");
        });
        it("5 registered, 5 unregistered", () => {
                expect(formatStatus({headcount: 5, unknown_devices: 5, users: ["test", "other_test", "hacker", "1337", "devops"]}, "test_user"))
                .toBe("<@test_user>, w spejsie jest 5 osób: test, other_test, hacker, 1337, devops oraz 5 anonimowych urządzeń.");
        });
})

