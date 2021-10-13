export default class Pagination {
    render(total, current) {
        let paginationHTML = "";

        for (let i = 1; i <= total; i++) {

            if (i === current) {
                paginationHTML += `
                    <li class="page-item active" aria-current="page">
                        <span class="page-link">${i}</span>
                    </li>
                `;
                continue;
            }

            paginationHTML += `
                <li class="page-item"><a class="page-link" href="#">${i}</a></li>
            `
        }

        return paginationHTML;
    }
}