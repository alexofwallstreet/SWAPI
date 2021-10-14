"use strict";

//Modules
import Swapi from "./swapi.js";
import Pagination from "./pagination.js";
import Item from "./item.js";

const swapi = new Swapi();
const pagination = new Pagination();
const item = new Item();

//DOM Elements
const paginationHTML = document.querySelector(".pagination");
const contentList = document.querySelector('.content__list');
const navbar = document.querySelector('.navbar-nav');

//Global Variables
let itemsToShow = [];
let currentPage = 1;
let totalPages = 1;
let currentTopic = 'people';



async function getItemsToShow(topic = "films", page = 1) {

    switch (topic) {

        case 'films': {
            return swapi.getAllFilms(page);
        }
        case 'people': {
            return swapi.getAllPeople(page);
        }
        case 'starships': {
            return swapi.getAllStarships(page);
        }
        case 'vehicles': {
            return swapi.getAllVehicles(page);
        }
        case 'species': {
            return swapi.getAllSpecies(page);
        }
        case 'planets': {
            return swapi.getAllPlanets(page);
        }
    }
}

async function changeTopic(targetTopic) {
    const res = await getItemsToShow(targetTopic, 1);
    currentTopic = targetTopic;
    itemsToShow = res.items;
    totalPages = res.pages;
    currentPage = 1;

    refreshContent();
    refreshPagination();
}

async function changePage(page) {
    const res = await getItemsToShow(currentTopic, page);
    itemsToShow = res.items;
    currentPage = page;

    refreshContent();
    refreshPagination();
}

function refreshPagination() {
    paginationHTML.innerHTML = pagination.render(totalPages, currentPage);
}

function refreshContent() {
    contentList.innerHTML = item.render(itemsToShow);
}


navbar.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();

        resetActiveLink();
        e.target.classList.add("active");
        changeTopic(e.target.dataset.topic);

        function resetActiveLink() {
            navbar.querySelectorAll("a").forEach(a => {
                a.classList.remove("active");
            })
        }
    }
});

paginationHTML.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        changePage(e.target.dataset.page);
    }
});


await changeTopic('films');











