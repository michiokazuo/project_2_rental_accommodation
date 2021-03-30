const URL_CONVENIENT = URL_PUBlIC + "/convenient";

function convenientFindAll() {
    return ajaxGet(`${URL_CONVENIENT}/find-all`);
}

function convenientFindById(q) {
    return ajaxGet(`${URL_CONVENIENT}/find-by-id/` + `${q}`);
}

function convenientInsert(e) {
    return ajaxPost(`${URL_CONVENIENT}/insert/`, e);
}

function convenientUpdate(e) {
    return ajaxPut(`${URL_CONVENIENT}/update`, e);
}

function convenientDelete(e) {
    return ajaxDelete(`${URL_CONVENIENT}/delete/` + `${e.id}`, e);
}

function convenientSearchSort(q) {
    return ajaxGet(`${URL_CONVENIENT}/search-sort?` + `${q}`);
}

