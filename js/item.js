export default class Item {
    render(arr) {
        let itemsHTML = "";

        arr.forEach((item, idx) => {
            const ul = Object.entries(item).reduce((html, li) => {
                if (li[0] !== "id" && li[0] !== "header") {
                    html += `
                        <li>
                            <span class="item-prop">${li[0]}: </span>
                            ${li[1]}
                        </li>
                    `
                }
                return html;
            }, "")

            itemsHTML += `
                <div class="col">
                <div class="card">
                    <div class="card-body">
                        <a class="btn btn-primary w-100 card-title" data-bs-toggle="collapse"
                            href="#collapseExample${idx}" role="button" aria-expanded="false"
                            aria-controls="collapseExample${idx}">
                            ${item.header}
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
        });
        return itemsHTML;
    }
}