const URL_REPORT = URL_PUBlIC + "/report";

function reportFindAll() {
    return ajaxGet(`${URL_REPORT}/admin/find-all`);
}

function reportFindById(q) {
    return ajaxGet(`${URL_REPORT}/find-by-id/` + `${q}`);
}

function reportFindByIRoom(q) {
    return ajaxGet(`${URL_REPORT}/find-by-room/` + `${q}`);
}

function reportFindByUser(q) {
    return ajaxGet(`${URL_REPORT}/find-by-user/` + `${q}`);
}

function reportInsert(e) {
    return ajaxPost(`${URL_REPORT}/all-role/insert/`, e);
}

function reportUpdate(e) {
    return ajaxPut(`${URL_REPORT}/all-role/update`, e);
}

function reportDelete(e) {
    return ajaxDelete(`${URL_REPORT}/all-role/delete/` + `${e.idCmt}`, e);
}

