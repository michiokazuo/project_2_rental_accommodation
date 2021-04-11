const URL_TENANT = URL_PUBlIC + "/tenant";

function tenantInsert(e) {
    return ajaxPost(`${URL_TENANT}/insert/`, e);
}

function tenantUpdate(e) {
    return ajaxPut(`${URL_TENANT}/update`, e);
}

function tenantDelete(e) {
    return ajaxDelete(`${URL_TENANT}/delete/`, e);
}

function tenantSearchSort(q) {
    return ajaxGet(`${URL_TENANT}/search-sort?` + `${q}`);
}

function tenantFindByUser(q) {
    return ajaxGet(`${URL_TENANT}/find-by-user/` + `${q}`);
}

function tenantFindByHost(q) {
    return ajaxGet(`${URL_TENANT}/find-by-host/` + `${q}`);
}

function tenantFindReqByHost(q) {
    return ajaxGet(`${URL_TENANT}/find-req-by-host/` + `${q}`);
}

