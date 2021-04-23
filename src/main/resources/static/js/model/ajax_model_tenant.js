const URL_TENANT = URL_PUBlIC + "/tenant";

function tenantInsert(e) {
    return ajaxPost(`${URL_TENANT}/user/insert/`, e);
}

function tenantUpdate(e) {
    return ajaxPut(`${URL_TENANT}/admin-host/update`, e);
}

function tenantDelete(e) {
    return ajaxDelete(`${URL_TENANT}/all-role/delete/`, e);
}

function tenantFindAll() {
    return ajaxGet(`${URL_TENANT}/admin/find-all`);
}

function tenantFindByUser(q) {
    return ajaxGet(`${URL_TENANT}/user/find-by-user/` + `${q}`);
}

function tenantFindByHost(q) {
    return ajaxGet(`${URL_TENANT}/admin-host/find-by-host/` + `${q}`);
}

function tenantFindReqByHost(q) {
    return ajaxGet(`${URL_TENANT}/host/find-req-by-host/` + `${q}`);
}

