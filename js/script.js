"use strict";
import Swapi from "./swapi.js";
import Pagination from "./pagination.js";
import Item from "./item.js";

const swapi = new Swapi();
const pagination = new Pagination();
const item = new Item();

const paginationHTML = document.querySelector(".pagination");
const contentList = document.querySelector('.content__list');

let itemsToShow = [];
let currentPage = 1;
let totalPages = 1;
let currentTopic = 'people';


async function getItemsToShow(topic = "films", page = 1) {
    switch (topic) {
        case 'people': {
            return swapi.getAllPeople();
        }
    }
}

async function changeTopic(targetTopic) {
    const res = await getItemsToShow(targetTopic, 1);
    itemsToShow = res.items;
    totalPages = res.pages;
    currentPage = 1;

    refreshContent();
    refreshPagination();
}

function refreshPagination() {
    paginationHTML.innerHTML = pagination.render(totalPages, currentPage);
}

function refreshContent() {
    contentList.innerHTML = item.render(itemsToShow);
}


await changeTopic('people');


console.log(itemsToShow);












