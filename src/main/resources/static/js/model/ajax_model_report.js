const URL_REPORT = URL_PUBlIC + "/report";

function reportFindAll() {
    return ajaxGet(`${URL_REPORT}/find-all`);
}

function reportFindById(q) {
    return ajaxGet(`${URL_REPORT}/find-by-id/` + `${q}`);
}

function reportInsert(e) {
    return ajaxPost(`${URL_REPORT}/insert/`, e);
}

function reportUpdate(e) {
    return ajaxPut(`${URL_REPORT}/update`, e);
}

function reportDelete(e) {
    return ajaxDelete(`${URL_REPORT}/delete/` + `${e.id}`, e);
}

function reportSearchSort(q) {
    return ajaxGet(`${URL_REPORT}/search-sort?` + `${q}`);
}

