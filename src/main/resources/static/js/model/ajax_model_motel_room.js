const URL_MOTEL_ROOM = URL_PUBlIC + "/motel-room";
const API_KEY = "14f5e8ec53d70b0dab57fec209d71c98";
const URL_LOCATION = `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=`;

function motelRoomFindAll() {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-all`);
}

function motelRoomFindById(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-by-id/` + `${q}`);
}

function motelRoomFindByUser(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/admin/find-all-by-user/` + `${q}`);
}

function motelRoomFindByHost(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-all-by-host/` + `${q}`);
}

function motelRoomFindAdmin(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/admin/find-all-by-admin/` + `${q}`);
}

function motelRoomInsert(e) {
    return ajaxPost(`${URL_MOTEL_ROOM}/host/insert`, e);
}

function motelRoomUpdate(e) {
    return ajaxPut(`${URL_MOTEL_ROOM}/host/update`, e);
}

function motelRoomDelete(e) {
    return ajaxDelete(`${URL_MOTEL_ROOM}/admin-host/delete/` + `${e.id}`, e);
}

function motelRoomSearchSort(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/search-sort?` + `${q}`);
}

function motelRoomFindNewToHome(q) {
    return ajaxGet(`${URL_MOTEL_ROOM}/find-new-to-home-page?` + `${q}`);
}

async function motelRoomGetLocation(q) {
    let rs = null;
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_LOCATION + q,
        timeout: 30000,
        cache: false,
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

