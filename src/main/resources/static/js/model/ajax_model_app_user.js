const URL_USER = URL_PUBlIC + "/user";

function userFindAll() {
    return ajaxGet(`${URL_USER}/find-all`);
}

function userFindById(q) {
    return ajaxGet(`${URL_USER}/find-by-id/` + `${q ? q : ''}`);
}

function userInsert(e) {
    return ajaxPost(`${URL_USER}/insert/`, e);
}

function userUpdate(e) {
    return ajaxPut(`${URL_USER}/update/`, e);
}

function userDelete(e) {
    return ajaxDelete(`${URL_USER}/delete/` + `${e.id}`, e);
}

function userSearchSort(q) {
    return ajaxGet(`${URL_USER}/search-sort?` + `${q}`);
}

function allRole(){
    return ajaxGet(`${URL_USER}/role`);
}

