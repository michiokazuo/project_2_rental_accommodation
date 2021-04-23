const URL_CONVENIENT = URL_PUBlIC + "/convenient";

function convenientFindAll() {
    return ajaxGet(`${URL_CONVENIENT}/find-all`);
}

function convenientFindById(q) {
    return ajaxGet(`${URL_CONVENIENT}/find-by-id/` + `${q}`);
}

function convenientInsert(e) {
    return ajaxPost(`${URL_CONVENIENT}/admin/insert/`, e);
}

function convenientUpdate(e) {
    return ajaxPut(`${URL_CONVENIENT}/admin/update`, e);
}

function convenientDelete(e) {
    return ajaxDelete(`${URL_CONVENIENT}/admin/delete/` + `${e.id}`, e);
}

