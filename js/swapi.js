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

    getAllFilms = async (page = 1) => {
        const res = await this.getResource(`/films/?page=${page}`);

        return {
            items: res.results.map(film => this.parseFilm(film)),
            pages: this.getPages(res.count)
        };
    };

    getAllStarships = async (page = 1) => {
        const res = await this.getResource(`/starships/?page=${page}`);

        return {
            items: res.results.map(starship => this.parseStarship(starship)),
            pages: this.getPages(res.count)
        };
    };

    getAllVehicles = async (page = 1) => {
        const res = await this.getResource(`/vehicles/?page=${page}`);

        return {
            items: res.results.map(vehicle => this.parseVehicle(vehicle)),
            pages: this.getPages(res.count)
        };
    };

    getAllSpecies = async (page = 1) => {
        const res = await this.getResource(`/species/?page=${page}`);

        return {
            items: res.results.map(species => this.parseSpecies(species)),
            pages: this.getPages(res.count)
        };
    };

    getAllPlanets = async (page = 1) => {
        const res = await this.getResource(`/planets/?page=${page}`);

        return {
            items: res.results.map(species => this.parsePlanet(species)),
            pages: this.getPages(res.count)
        };
    };

    getSearchResults = async (topic, search, page) => {
        const res = await this.getResource(`/${topic}/?search=${search}&page=${page}`);

        switch (topic) {

            case 'films': {
                return {
                    items: res.results.map(film => this.parseFilm(film)),
                    pages: this.getPages(res.count)
                };
            }
            case 'people': {
                return {
                    items: res.results.map(person => this.parsePerson(person)),
                    pages: this.getPages(res.count)
                };
            }
            case 'starships': {
                return {
                    items: res.results.map(starship => this.parseStarship(starship)),
                    pages: this.getPages(res.count)
                };
            }
            case 'vehicles': {
                return {
                    items: res.results.map(vehicle => this.parseVehicle(vehicle)),
                    pages: this.getPages(res.count)
                };
            }
            case 'species': {
                return {
                    items: res.results.map(species => this.parseSpecies(species)),
                    pages: this.getPages(res.count)
                };
            }
            case 'planets': {
                return {
                    items: res.results.map(planet => this.parsePlanet(planet)),
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
            id: this.getItemId(person),
            name: person.name,
            gender: person.gender,
            "birth year": person.birth_year,
            "eye colour": person.eye_color,
            header: person.name
        }
    }

    parseFilm = (film) => {
        return {
            id: this.getItemId(film),
            title: film.title,
            director: film.director,
            producer: film.producer,
            "release date": film.release_date,
            about: film.opening_crawl,
            header: film.title,
        }
    }

    parseStarship = (starship) => {
        return {
            id: this.getItemId(starship),
            name: starship.name,
            length: starship.length,
            passengers: starship.passengers,
            class: starship.starship_class,
            header: starship.name
        }
    }

    parseVehicle = (vehicle) => {
        return {
            id: this.getItemId(vehicle),
            name: vehicle.name,
            length: vehicle.length,
            model: vehicle.model,
            price: vehicle.cost_in_credits + " credits",
            passengers: vehicle.passengers,
            class: vehicle.vehicle_class,
            header: vehicle.name
        }
    }

    parseSpecies = (species) => {
        return {
            id: this.getItemId(species),
            name: species.name,
            classification: species.classification,
            language: species.language,
            "hair color": species.hair_colors,
            skin: species.skin_colors,
            header: species.name
        }
    }

    parsePlanet = (planet) => {
        return {
            id: this.getItemId(planet),
            name: planet.name,
            diameter: planet.diameter,
            "orbital period": planet.orbital_period,
            gravity: planet.gravity,
            population: planet.population,
            terrain: planet.terrain,
            header: planet.name
        }
    }
}

