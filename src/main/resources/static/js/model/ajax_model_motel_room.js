const URL_MOTEL_ROOM = URL_PUBlIC + "/motelRoom";

function motelRoomFindAll() {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-all`);
}

function motelRoomFindById(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-by-id/` + `${q}`);
}

function motelRoomFindByUser(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-by-id/` + `${q}`);
}

function motelRoomFindByHost(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-by-id/` + `${q}`);
}

function motelRoomInsert(e) {
    return ajaxPost(`${URL_MOTEL_ROOM}/insert/`, e);
}

function motelRoomUpdate(e) {
    return ajaxPut(`${URL_MOTEL_ROOM}/update`, e);
}

function motelRoomDelete(e) {
    return ajaxDelete(`${URL_MOTEL_ROOM}/delete/` + `${e.id}`, e);
}

function motelRoomSearchSort(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/search-sort?` + `${q}`);
}

function motelRoomFindNewToHome(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-new-to-home-page?` + `${q}`);
}

