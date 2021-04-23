const URL_CATEGORY = URL_PUBlIC + "/category";

function categoryFindAll() {
    return ajaxGet(`${URL_CATEGORY}/find-all`);
}

function categoryFindById(q) {
    return ajaxGet(`${URL_CATEGORY}/find-by-id/` + `${q}`);
}

function categoryInsert(e) {
    return ajaxPost(`${URL_CATEGORY}/admin/insert/`, e);
}

function categoryUpdate(e) {
    return ajaxPut(`${URL_CATEGORY}/admin/update`, e);
}

function categoryDelete(e) {
    return ajaxDelete(`${URL_CATEGORY}/admin/delete/` + `${e.id}`, e);
}

