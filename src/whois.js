const axios = require("axios");
const { polishPlurals: _polishPlural } = require("polish-plurals");
const polishPlural = (a, b, c) => x => _polishPlural(a, b, c, x);

const personPlural = polishPlural("osoba", "osoby", "osób");
const existPlural = polishPlural("jest", "są", "jest");
const devicePlural = polishPlural("urządzenie", "urządzenia", "urządzeń");
const anonymousPlural = polishPlural("anonimowe", "anonimowe", "anonimowych");
const anonymouDevicePlural = devices => `${anonymousPlural(devices)} ${devicePlural(devices)}`;

const deviceCountMessage = devices => `${devices} ${anonymouDevicePlural(devices)}`;
const manyPeopleCountMessage = people => `${existPlural(people)} ${people} ${personPlural(people)}`;

const existDeviceCountMessage = devices => `${existPlural(devices)} ${deviceCountMessage(devices)}`;
const andDeviceCountMessage = devices => devices ? ` oraz ${deviceCountMessage(devices)}` : "";
const peopleListMessage = (people, peopleList) =>
    `${manyPeopleCountMessage(people)}: ${peopleList.join(", ")}`;

const userMention = user => `<@${user}>`;
const core_message = data =>
{
    const { headcount, users, unknown_devices } = data;

    return headcount 
    ? `w spejsie ${peopleListMessage(headcount, users)}${andDeviceCountMessage(unknown_devices)}.`
    : unknown_devices
        ? `Hackerspace jest oficjalnie pusty, natomiast ${existDeviceCountMessage(unknown_devices)}.`
        : "Hackerspace jest totalnie pusty.";
};

const formatStatus = (data, user) => `${userMention(user)}, ${core_message(data)}`;

const getWhois = async user => {
    const { data } = (await axios.get('https://whois.at.hs3.pl/api/now'))
    return formatStatus(data, user)
}

module.exports = {
    getWhois,
    formatStatus,
}
