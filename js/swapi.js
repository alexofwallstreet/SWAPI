export default class Swapi {

    getResource = async (url) => {
        const res = await fetch(`https://swapi.dev/api/${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
        return await res.json();
    };

    getPages(count) {
        return Math.ceil(count / 10);
    }

    getAllPeople = async (page = 1) => {
        const res = await this.getResource(`/people/?page=${page}`);

        return {
            items: res.results.map(person => this.parsePerson(person)),
            pages: this.getPages(res.count)
        };
    };

    getPersonId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    parsePerson = (person) => {
        return {
            id: this.getPersonId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}

