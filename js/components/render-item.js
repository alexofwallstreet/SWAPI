import { keys } from "./dictionaries.js";

export default function renderItems(arr) {

    const createList = (html, item) => {

        const key = item[0];
        const value = item[1];

        if (key !== keys.id && key !== keys.header) {
            html += `
                <li>
                    <span class="item-prop">${key}: </span>
                    ${value}
                </li>
            `;
        }
        return html;
    };

    const cardTemplate = (idx, header, ul) => {
        return `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <a class="btn btn-primary w-100 card-title" data-bs-toggle="collapse"
                            href="#collapseExample${idx}" role="button" aria-expanded="false"
                            aria-controls="collapseExample${idx}">
                            ${header}
                        </a>
                        <div class="collapse" id="collapseExample${idx}">
                            <p class="card-text">
                            <div class="card card-body">
                                <ul class="card-list">
                                ${ul}
                                </ul>
                            </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const generateHTML = (result, item, idx) => {

        const arrayFromObj = Object.entries(item);

        const list = arrayFromObj.reduce(createList, "");

        return result += cardTemplate(idx, item.header, list);
    };

    return arr.reduce(generateHTML, "");

}