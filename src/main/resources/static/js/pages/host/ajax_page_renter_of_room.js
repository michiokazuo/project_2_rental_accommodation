let tableDataRented, tableDataRequest, tableDataCmt, btnDeleteRent, modalRent, modalTenant, textName, textEmail,
    textPhone, dateBirthday, selectJob, textWorkplace, selectGender, selectStatus, textHomeTown, imgAvatar;

let indexTenant = 0, tenant, user, checkDelete = true, checkRent = false;

let roomDTO = {}, listRented = [], listRequest = [];
let listReport = [];

$(async function () {
    tableDataRented = $("#table-rented");
    tableDataRequest = $("#table-request");
    tableDataCmt = $("#table-cmt");
    btnDeleteRent = $("#btn-rent");
    modalRent = $("#modal-rent");
    modalTenant = $("#modal-tenant");
    textName = $("#name-sign-up");
    textEmail = $("#email-sign-up");
    textPhone = $("#phone");
    dateBirthday = $("#birthday");
    selectJob = $("#job");
    textWorkplace = $("#workplace");
    selectGender = $("#gender");
    selectStatus = $("#status");
    textHomeTown = $("#home-town");
    imgAvatar = $("#avatar");

    let url = new URL(window.location.href);
    idRoom = url.searchParams.get("id_room");

    await getUserInSystem();
    await loadRoomDTO();
    await loadMotelRoomDTO();
    showSelectCustom(selectGender, listGender, "<>");
    showSelectCustom(selectJob, listJob, "<>");
    showSelectCustom(selectStatus, listStatus, "<>");
    classifyRent();

    showDataTableRented();
    showDataTableRequest();
    showDataTableCMT();
    confirmRent();
})

async function loadMotelRoomDTO() {
    await motelRoomFindById(idRoom)
        .then(rs => {
            if (rs.status === 200) {
                roomDTO = rs.data;
                $("#title-room").text(`Quản lý trọ số ${roomDTO.motelRoom.host.id} . ${roomDTO.motelRoom.id}`);
                listReport = roomDTO.reportList;
            } else window.location.href = "/error";
        })
        .catch(e => {
            console.log(e);
            // window.location.href = "/error";
        })
}

function classifyRent() {
    if (roomDTO)
        for (const r of roomDTO.tenantList)
            if (r.status)
                listRented.push(r);
            else
                listRequest.push(r);
}

function showDataTableRented() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRented && listRented.length > 0)
        rs = listRented.map((data, index) => {
            let u = data.user;
            if (u)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><img src=".${dataFilter(u.avatar).split("<>")[0]}"
                                 alt="" width="80px"></td>
                                <td>${dataFilter(u.name)}</td>
                                <td><button type="button" class="btn btn-success m-1 detail-user-rent">
                                        <i class="fas fa-eye"></i> Xem
                                    </button></td>
                                <td>
                                    <button type="button" class="btn btn-danger m-1 delete-rent">
                                    <i class="fas fa-trash-alt"></i> Xóa
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableDataRented.html(rs);
    viewUser();
    modifyRent();
}

function showDataTableRequest() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRequest && listRequest.length > 0)
        rs = listRequest.map((data, index) => {
            let u = data.user;
            if (u)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><img src=".${dataFilter(u.avatar).split("<>")[0]}"
                                 alt="" width="80px"></td>
                                <td>${dataFilter(u.name)}</td>
                                <td><button type="button" class="btn btn-success m-1 detail-user-request">
                                        <i class="fas fa-eye"></i> Xem
                                    </button></td>
                                <td>
                                    <button type="button" class="btn btn-primary m-1 accept-rent">
                                       <i class="far fa-check-circle"></i> Xác nhận
                                    </button>
                                    <button type="button" class="btn btn-danger m-1 delete-request">
                                    <i class="fas fa-trash-alt"></i> Xóa
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableDataRequest.html(rs);
    viewUser();
    modifyRent();
}

function showDataTableCMT() {
    $("#cmt").text(`Bình luận (${roomDTO.ratings ?
        dataFilter(parseFloat(roomDTO.ratings).toFixed(1) + "/5") : "Chưa có đánh giá"})`);
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listReport && listReport.length > 0)
        rs = listReport.map((data, index) => {
            let room = data.user;
            if (room)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                               
                                <td>${dataFilter(room.name)}</td>
                                <td>${dataFilter(data.comment)}</td>
                                <td>${numberFilter(data.rate)}/5</td>
                                <td>
                                    <button type="button" class="btn btn-success m-1 detail-user-cmt">
                                        <i class="fas fa-info-circle"></i> Thông tin
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableDataCmt.html(rs);
    viewUser();
}

function setInfoUser() {
    textName.val(dataFilter(user.name));
    textEmail.val(dataFilter(user.email));
    imgAvatar.attr("src", "." + dataFilter(user.avatar));
    textPhone.val(dataFilter(user.phone));
    textWorkplace.val(dataFilter(user.workplace));
    selectGender.val(dataFilter(user.gender));
    selectJob.val(dataFilter(user.job));
    selectStatus.val(dataFilter(user.status));
    dateBirthday.val(dataFilter(new Date(user.birthday).toLocaleDateString('fr-CA')));
    textHomeTown.val(dataFilter(user.homeTown));
    modalTenant.modal("show");
}

function viewUser() {
    $(".detail-user-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listReport[indexTenant - 0];
        user = tenant.user;
        setInfoUser();
    })

    $(".detail-user-request").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listReport[indexTenant - 0];
        user = tenant.user;
        setInfoUser();
    })

    $(".detail-user-cmt").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listReport[indexTenant - 0];
        user = tenant.user;
        setInfoUser();
    })
}

function modifyRent() {
    $(".delete-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listRented[indexTenant - 0];
        checkRent = true;
        checkDelete = true;
        user = tenant.user;
        $("#content").text("Bạn có chắc chắn muốn xóa người thuê này không?");
        btnDeleteRent.addClass("btn-danger");
        btnDeleteRent.removeClass("btn-primary");
        modalRent.modal("show");
    })
    $(".delete-request").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listRequest[indexTenant - 0];
        user = tenant.user;
        checkDelete = true;
        checkRent = false;
        $("#content").text("Bạn có chắc chắn muốn xóa người thuê này không?");
        btnDeleteRent.addClass("btn-danger");
        btnDeleteRent.removeClass("btn-primary");
        modalRent.modal("show");
    })
    $(".accept-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listRequest[indexTenant - 0];
        user = tenant.user;
        checkRent = false;
        checkDelete = false;
        $("#content").text(`Bạn có chắc chắn muốn xác nhận ${user.name} thuê này không?`);
        btnDeleteRent.removeClass("btn-danger");
        btnDeleteRent.addClass("btn-primary");
        modalRent.modal("show");
    })
}

function confirmRent() {
    btnDeleteRent.click(async function () {
        let check = false;
        if (checkDelete) {
            await tenantDelete(tenant.id)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        checkRent ? listRented = listRented.filter((data, index) => {
                            return index !== (indexTenant - 0);
                        }) : listRequest = listRequest.filter((data, index) => {
                            return index !== (indexTenant - 0);
                        });
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            modalRent.modal("hide");
            alertReport(check, check ? "Xóa thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
            if (check) {
                if(checkRole(USER_IN_SYSTEM, ROLE_HOST)) showReq();
                checkRent ? showDataTableRented() : showDataTableRequest();
                await notify_impl(user.email, "Xóa thuê/yêu cầu trọ",
                    `Bạn đã bị chủ trọ/quản lý xóa yêu cầu/thuê trọ ${tenant.room.title}
                    . Mong bạn thông cảm và tìm trọ khác phù hợp hơn.`);
            }

        } else {
            tenant.status = true;
            await tenantUpdate(tenant)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        listRented.push(tenant);
                        listRequest = listRequest.filter((data, index) => {
                            return index !== (indexTenant - 0);
                        });
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            modalRent.modal("hide");
            alertReport(check, check ? "Xác nhận thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
            if (check) {
                showDataTableRented();
                showDataTableRequest();
                await notify_impl(user.email, "Xác nhận yêu cầu thuê trọ", `Bạn đã được chủ trọ xác nhận
                    yêu cầu thuê trọ ${tenant.room.title}. Chúc bạn sẽ thấy phù hợp với trọ này.`);
            }
        }
    })
}