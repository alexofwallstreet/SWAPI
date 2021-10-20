export default function renderPagination(total, current) {
    let paginationHTML = "";

    const getActiveLink = (i) => {
        return `
            <li class="page-item pagination-active active" aria-current="page">
                <span class="page-link">${i}</span>
            </li>
        `
    }

    const getDefaultLink = (i) => {
        return `
            <li class="page-item"><a class="page-link pagaination-link" data-page="${i}">${i}</a></li>
        `
    }

    for (let i = 1; i <= total; i++) {
        paginationHTML += (i == current) ? getActiveLink(i) : getDefaultLink(i);
    }

    return paginationHTML;
}