let reqNew, newReq;

let idHost;
let listRoomHost = [];
let listTenant = [];

let sortRoomHost = [
    {id: "1", name: "Mới nhất", isASC: true},
    {id: "1", name: "Cũ nhất", isASC: false},
    {id: "2", name: "Giá giảm dần", isASC: false},
    {id: "2", name: "Giá tăng dần", isASC: true},
    {id: "3", name: "Trọ trống nhiều nhất", isASC: true},
    {id: "3", name: "Trọ trống ít nhất", isASC: false},
    {id: "4", name: "Trọ nhiều yêu cầu nhất", isASC: true},
    {id: "4", name: "Trọ ít yêu cầu nhất nhất", isASC: false},
    {id: "5", name: "Đánh giá cao nhất", isASC: true},
    {id: "5", name: "Đánh giá thấp nhất", isASC: false}
]

$(async function () {
    reqNew = $("#request_new");
    newReq = $("#new-request");

    let url = new URL(window.location.href);
    idHost = url.searchParams.get("id_host");

    let url_link = $("a[href$='" + window.location.pathname.split('/')[2] + "']")
    if (url_link)
        url_link.addClass("active");

    await getUserInSystem();
    await loadTenantReq();
    showReq();
    showHost();
    var hcCredit = $('.highcharts-credits');
    hcCredit ? hcCredit.remove() : {};
})

function showHost() {
    if (USER_IN_SYSTEM) {
        $("#avatar-host").attr("src", "." + USER_IN_SYSTEM.avatar);
        $("#name-host").text(USER_IN_SYSTEM.name);
    }
}

async function loadTenantReq() {
    if (USER_IN_SYSTEM)
        await tenantFindReqByHost(USER_IN_SYSTEM.id)
            .then(rs => {
                if (rs.status === 200) {
                    listTenant = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
}

async function loadRoomDTO() {
    if (USER_IN_SYSTEM || idHost)
        await motelRoomFindByHost(idHost ? idHost : USER_IN_SYSTEM.id)
            .then(rs => {
                if (rs.status === 200) {
                    listRoomHost = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
}

function showReq() {
    let valReq = listTenant.length;
    newReq.text(valReq);
    reqNew.text(valReq);
}

function showCheckBoxRoom(element, list) {
    if (list && list.length > 0) {
        element.empty();
        let tmp = (0 | Math.random() * 9e6).toString(36);
        list.forEach(e => {
            element.append(`<div class="form-check form-check-inline p-1 col-6 col-lg-4 mr-0 d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" id="${tmp + e.id}" data-id="${e.id}"
                                               value="${e.id}">
                                        <label class="form-check-label" for="${tmp + e.id}">${e.name}</label>
                                    </div>`);
        })
    }
}

function reloadImages() {
    let files = document.getElementById("images").files;
    for (let i = 0; i < files.length; i++) {
        if (i === 4) break;
        let file = files[i];
        let img = document.getElementById("img" + (i + 1));
        let reader = new FileReader();
        reader.addEventListener("load", function () {
            img.src = reader.result;
        }, false)
        if (file) {
            reader.readAsDataURL(file);
        }
    }
}