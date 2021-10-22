"use strict";

//Modules
import Swapi from "./components/swapi.js";
import renderPagination from "./components/render-pagination.js";
import renderItems from "./components/render-item.js";
import preloader from "./components/preloader.js";
import { topics } from "./components/dictionaries.js";

const swapi = new Swapi();

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
let isLoading = false;



async function getItemsToShow(topic = topics.films, page = 1) {

    switch (topic) {

        case topics.films: {
            return swapi.getAllFilms(page);
        }
        case topics.people: {
            return swapi.getAllPeople(page);
        }
        case topics.starships: {
            return swapi.getAllStarships(page);
        }
        case topics.vehicles: {
            return swapi.getAllVehicles(page);
        }
        case topics.species: {
            return swapi.getAllSpecies(page);
        }
        case topics.planets: {
            return swapi.getAllPlanets(page);
        }
        case topics.search: {
            return swapi.getSearchResults(currentTopic, inputSearch.value, page);
        }
    }
}

async function changeTopic(targetTopic, page = 1, isSearch = false) {

    showPreloader();
    isLoading = true;

    try {
        const res = isSearch ? await getItemsToShow(topics.search, page) : await getItemsToShow(targetTopic, page);
        itemsToShow = res.items;
        totalPages = res.pages;
        refreshContent();
        refreshPagination();
    }
    catch {
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
    finally {
        currentSearch = isSearch;
        currentTopic = isSearch ? currentTopic : targetTopic;
        currentPage = page;
        isLoading = false;
    }

}


function refreshPagination() {
    paginationHTML.innerHTML = renderPagination(totalPages, currentPage);
}

function hidePagination() {
    paginationHTML.innerHTML = "";
}

function refreshContent() {
    contentList.innerHTML = renderItems(itemsToShow);
}

function showPreloader() {
    contentList.innerHTML = preloader;
}

function resetActiveLink() {
    navbar.querySelectorAll(".topic-link").forEach(a => {
        a.classList.remove("active");
    })
}

function navbarClickHandler(e) {
    if (e.target.classList.contains("topic-link") && !isLoading) {
        e.preventDefault();
        resetActiveLink();
        hidePagination();
        e.target.classList.add("active");
        changeTopic(e.target.dataset.topic);
    }
}

function paginationClickHandler(e) {
    if (e.target.classList.contains("pagaination-link") && !isLoading) {
        e.preventDefault();
        document.querySelector('.pagination-active').classList.remove('active');
        e.target.closest('li').classList.add("active");
        changeTopic(currentTopic, e.target.dataset.page, currentSearch);
    }
}

function searchClickHandler(e) {
    e.preventDefault();
    changeTopic(currentTopic, 1, true);
}


async function appInit() {
    navbar.addEventListener("click", navbarClickHandler);
    paginationHTML.addEventListener("click", paginationClickHandler);
    btnSearch.addEventListener("click", searchClickHandler);
    await changeTopic(topics.films);
}

appInit();













