let listRoomHost = [];
let listHost = [];
let listUser = [];
let adminDTO;
let listTenant = [];
let idHost;

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

let sortControl = [
    {id: "1", name: "Tên A -> Z", isASC: true},
    {id: "1", name: "Tên Z -> A", isASC: false},
    {id: "2", name: "Tạo gần đây", isASC: true},
    {id: "2", name: "Tạo lâu nhất", isASC: false},
]

$(async function () {
    $("#notify-report").addClass("d-none");

    let url_link = $("a[href$='" + window.location.pathname.split('/')[2] + "']")
    if (url_link)
        url_link.addClass("active");

    await getUserInSystem();
    await loadAdminDTO();
    showAdmin();
    var hcCredit = $('.highcharts-credits');
    hcCredit ? hcCredit.remove() : {};
})

function showAdmin() {
    if (USER_IN_SYSTEM) {
        $("#avatar-host").attr("src", "." + USER_IN_SYSTEM.avatar);
        $("#name-host").text(USER_IN_SYSTEM.name);
    }
}

async function loadAdminDTO() {
    await adminFindAll()
        .then(rs => {
            if (rs.status === 200) {
                adminDTO = rs.data;
                listRoomHost = adminDTO.motelRoomDTOS;
                listHost = adminDTO.hostList;
                listUser = adminDTO.userList;
            }
        })
        .catch(e => {
            console.log(e);
            window.location.href = "/error";
        })
}

async function loadRoomDTO() {
        await motelRoomFindByHost(idHost)
            .then(rs => {
                if (rs.status === 200) {
                    listRoomHost = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
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