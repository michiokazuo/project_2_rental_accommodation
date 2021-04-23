const URL_USER = URL_PUBlIC + "/user";

function userFindAll() {
    return ajaxGet(`${URL_USER}/admin/find-all`);
}

function userFindById(q) {
    return ajaxGet(`${URL_USER}/find-by-id/` + `${q ? q : ''}`);
}

function userInsert(e) {
    return ajaxPost(`${URL_USER}/insert/`, e);
}

function userUpdate(e) {
    return ajaxPut(`${URL_USER}/all-role/update/`, e);
}

function userDelete(e) {
    return ajaxDelete(`${URL_USER}/admin/delete/` + `${e.id}`, e);
}

function allRole(){
    return ajaxGet(`${URL_USER}/role`);
}

function adminFindAll() {
    return ajaxGet(`${URL_USER}/admin`);
}

