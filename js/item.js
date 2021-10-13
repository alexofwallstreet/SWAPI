export default class Item {
    render(arr) {
        let itemsHTML = "";

        arr.forEach((item, idx) => {
            const ul = Object.entries(item).reduce((html, li) => {
                if (li[0] !== "id") {
                    html += `<li>${li[0]}: ${li[1]}</li>`
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
                            ${item.name}
                        </a>
                        <div class="collapse" id="collapseExample${idx}">
                            <p class="card-text">
                            <div class="card card-body">
                                <ul>
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