"use strict";

//Modules
import Swapi from "./components/swapi.js";
import Pagination from "./components/pagination.js";
import Item from "./components/item.js";
import Preloader from "./components/preloader.js";

const swapi = new Swapi();
const pagination = new Pagination();
const item = new Item();
const preloader = new Preloader();

//DOM Elements
const paginationHTML = document.querySelector(".pagination");
const contentList = document.querySelector('.content__list');
const navbar = document.querySelector('.navbar-nav');
const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector(".input-search");

//Global Variables
let itemsToShow = [];
let currentPage = 1;
let totalPages = 1;
let currentTopic = 'people';
let currentSearch = false;



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
        case 'search': {
            return swapi.getSearchResults(currentTopic, inputSearch.value, page);
        }
    }
}

async function changeTopic(targetTopic, page = 1, isSearch = false) {

    hidePagination();
    showPreloader();

    const res = isSearch ? await getItemsToShow("search", page) : await getItemsToShow(targetTopic, page);

    currentSearch = isSearch;
    currentTopic = isSearch ? currentTopic : targetTopic;
    itemsToShow = res.items;
    totalPages = res.pages;
    currentPage = page;

    refreshContent();
    refreshPagination();
}


function refreshPagination() {
    paginationHTML.innerHTML = pagination.render(totalPages, currentPage);
}

function hidePagination() {
    paginationHTML.innerHTML = "";
}

function refreshContent() {
    contentList.innerHTML = item.render(itemsToShow);
}

function showPreloader() {
    contentList.innerHTML = preloader.render();
}



function resetActiveLink() {
    navbar.querySelectorAll("a").forEach(a => {
        a.classList.remove("active");
    })
}


navbar.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {

        e.preventDefault();
        resetActiveLink();
        e.target.classList.add("active");
        changeTopic(e.target.dataset.topic);
    }
});

paginationHTML.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        changeTopic(currentTopic, e.target.dataset.page, currentSearch);
    }
});

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    changeTopic(currentTopic, 1, true);
})


await changeTopic('films');











