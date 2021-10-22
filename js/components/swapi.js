import { topics, keys } from "./dictionaries.js";

export default class Swapi {

    constructor(baseURL = "https://swapi.dev/api", items_per_page = 10) {
        this.baseURL = baseURL;
        this.items_per_page = items_per_page;
    }

    getResource = async (url) => {
        const res = await fetch(`${this.baseURL}/${url}`);
        if (!res.ok) {
            Promise.reject(`Could not fetch ${url}, status ${res.status}`)
                .catch(error => {
                    console.error(error);
                });
        }
        return await res.json();
    };

    getPages(count) {
        return Math.ceil(count / this.items_per_page);
    }

    getAllPeople = async (page = 1) => {
        const res = await this.getResource(`/people/?page = ${page}`);

        return {
            items: res.results.map(this.parsePerson),
            pages: this.getPages(res.count)
        };
    };

    getAllFilms = async (page = 1) => {
        const res = await this.getResource(`/films/?page = ${page}`);

        return {
            items: res.results.map(this.parseFilm),
            pages: this.getPages(res.count)
        };
    };

    getAllStarships = async (page = 1) => {
        const res = await this.getResource(`/starships/?page = ${page}`);

        return {
            items: res.results.map(this.parseStarship),
            pages: this.getPages(res.count)
        };
    };

    getAllVehicles = async (page = 1) => {
        const res = await this.getResource(`/vehicles/?page = ${page}`);

        return {
            items: res.results.map(this.parseVehicle),
            pages: this.getPages(res.count)
        };
    };

    getAllSpecies = async (page = 1) => {
        const res = await this.getResource(`/species/?page = ${page}`);

        return {
            items: res.results.map(this.parseSpecies),
            pages: this.getPages(res.count)
        };
    };

    getAllPlanets = async (page = 1) => {
        const res = await this.getResource(`/planets/?page = ${page}`);

        return {
            items: res.results.map(this.parsePlanet),
            pages: this.getPages(res.count)
        };
    };

    getSearchResults = async (topic, search, page) => {
        const res = await this.getResource(`/${topic}/?search=${search}&page=${page}`);

        switch (topic) {

            case topics.films: {
                return {
                    items: res.results.map(this.parseFilm),
                    pages: this.getPages(res.count)
                };
            }
            case topics.people: {
                return {
                    items: res.results.map(this.parsePerson),
                    pages: this.getPages(res.count)
                };
            }
            case topics.starships: {
                return {
                    items: res.results.map(this.parseStarship),
                    pages: this.getPages(res.count)
                };
            }
            case topics.vehicles: {
                return {
                    items: res.results.map(this.parseVehicle),
                    pages: this.getPages(res.count)
                };
            }
            case topics.species: {
                return {
                    items: res.results.map(this.parseSpecies),
                    pages: this.getPages(res.count)
                };
            }
            case topics.planets: {
                return {
                    items: res.results.map(this.parsePlanet),
                    pages: this.getPages(res.count)
                };
            }
        }
    };


    getItemId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    parsePerson = (person) => {
        return {
            [keys.id]: this.getItemId(person),
            [keys.name]: person.name,
            [keys.gender]: person.gender,
            [keys["birth year"]]: person.birth_year,
            [keys["eye colour"]]: person.eye_color,
            [keys.header]: person.name
        }
    }

    parseFilm = (film) => {
        return {
            [keys.id]: this.getItemId(film),
            [keys.title]: film.title,
            [keys.director]: film.director,
            [keys.producer]: film.producer,
            [keys["release date"]]: film.release_date,
            [keys.about]: film.opening_crawl,
            [keys.header]: film.title,
        }
    }

    parseStarship = (starship) => {
        return {
            [keys.id]: this.getItemId(starship),
            [keys.name]: starship.name,
            [keys.length]: starship.length,
            [keys.passengers]: starship.passengers,
            [keys.class]: starship.starship_class,
            [keys.header]: starship.name
        }
    }

    parseVehicle = (vehicle) => {
        return {
            [keys.id]: this.getItemId(vehicle),
            [keys.name]: vehicle.name,
            [keys.length]: vehicle.length,
            [keys.model]: vehicle.model,
            [keys.price]: vehicle.cost_in_credits + " credits",
            [keys.passengers]: vehicle.passengers,
            [keys.class]: vehicle.vehicle_class,
            [keys.header]: vehicle.name
        }
    }

    parseSpecies = (species) => {
        return {
            [keys.id]: this.getItemId(species),
            [keys.name]: species.name,
            [keys.classification]: species.classification,
            [keys.language]: species.language,
            [keys["hair color"]]: species.hair_colors,
            [keys.skin]: species.skin_colors,
            [keys.header]: species.name
        }
    }

    parsePlanet = (planet) => {
        return {
            [keys.id]: this.getItemId(planet),
            [keys.name]: planet.name,
            [keys.diameter]: planet.diameter,
            [keys["orbital period"]]: planet.orbital_period,
            [keys.gravity]: planet.gravity,
            [keys.population]: planet.population,
            [keys.terrain]: planet.terrain,
            [keys.header]: planet.name
        }
    }
}

