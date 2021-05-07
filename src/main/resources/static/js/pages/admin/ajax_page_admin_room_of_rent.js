let tableDataNotFull, tableDataFull, btnDeleteRoom, modalDelete, modalSaveRoom, selectSort, selectCategory,
    checkBoxPriority, checkBoxConvenient, textTitle, textareaDescription, textAddress, numberArea, textLocation,
    numberPrice, dateCreateDate, dateModifyDate, numberMaxPerson, numberFloor, modalTenant, textName, textEmail,
    textPhone, dateBirthday, selectJob, textWorkplace, selectGender, selectStatus, textHomeTown, imgAvatar, rate;

let indexRoom = 0, checkDelete, checkRent;
let roomSave, idUser, renter, user;

let listRoomFull = [], listRoomNotFull = [];
let listCategory = [];

let sortRoomUser = [
    {id: "1", name: "Thuê gần đây"},
    {id: "2", name: "Thuê lâu nhất"}
]

$(async function () {
    tableDataFull = $("#table-full");
    tableDataNotFull = $("#table-not-full");
    btnDeleteRoom = $("#btn-delete-room");
    modalSaveRoom = $("#modal-room");
    textAddress = $("#address");
    modalDelete = $("#modal-delete");
    selectSort = $("#sort");
    selectCategory = $("#category");
    checkBoxConvenient = $("#check-convenient");
    checkBoxPriority = $("#check-priority");
    textTitle = $("#title");
    textareaDescription = $("#description");
    numberArea = $("#area");
    textLocation = $("#location");
    numberPrice = $("#price");
    dateCreateDate = $("#create-date");
    dateModifyDate = $("#modify-date")
    numberMaxPerson = $("#max_person");
    numberFloor = $("#floor");
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
    modalTenant = $("#modal-tenant");
    rate = $("#rate");

    let url = new URL(window.location.href);
    idUser = url.searchParams.get("id_user");

    if(!idUser)
        window.location.href = "/error";

    await getUserInSystem();
    await loadRenter();
    await getRoomRent();
    classifyRoom();
    showDataTableFull();
    showDataTableNotFull();
    await loadCategory();

    showSelectSort(selectSort, sortRoomUser, "Sắp xếp");

    confirmDeleteRoom();
    sortRoom();
})

async function loadCategory() {
    await categoryFindAll()
        .then(rs => {
            if (rs.status === 200) {
                listCategory = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

async function loadRenter() {
    await userFindById(idUser)
        .then(rs => {
            if (rs.status === 200) {
                renter = rs.data;
                $("#header").text("Quản lý trọ thuê của " + renter.name);
            }
        })
}

async function getRoomRent() {
    await motelRoomFindByUser(idUser)
        .then(rs => {
            if (rs.status === 200) {
                listTenant = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function classifyRoom() {
    if(listTenant) {
        listRoomNotFull = [];
        listRoomFull = [];
        for (const r of listTenant) {
            let tmp = r.tenantList.find(t =>t.user.id === renter.id);
            if (tmp && tmp.status)
                listRoomFull.push({roomDTO: r, tenant: tmp});
            else if(tmp && !tmp.status)
                listRoomNotFull.push({roomDTO: r, tenant: tmp});
        }
    }
}

function showDataTableFull() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRoomFull && listRoomFull.length > 0)
        rs = listRoomFull.map((data, index) => {
            let room = data.roomDTO.motelRoom;
            if (room)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><button type="button" class="btn btn-success m-1 detail-room-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.title)}
                                    </button></td>
                                <td><button type="button" class="btn btn-success m-1 detail-user-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.host.name)}
                                    </button></td>
                                <td>${dataFilter(new Date(data.tenant.modifyDate).toLocaleDateString())}</td>
                                <td>
                                    <button type="button" class="btn btn-danger m-1 delete-room-full">
                                    <i class="fas fa-trash-alt"></i> Xóa
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableDataFull.html(rs);
    updateRoom();
    deleteRoom();
    viewUser();
}

function showDataTableNotFull() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRoomNotFull && listRoomNotFull.length > 0)
        rs = listRoomNotFull.map((data, index) => {
            let room = data.roomDTO.motelRoom;
            if (room)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><button type="button" class="btn btn-success m-1 detail-room-not-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.title)}
                                    </button>
                                </td>
                                <td><button type="button" class="btn btn-success m-1 detail-user-not-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.host.name)}
                                    </button></td>
                                <td>${dataFilter(new Date(data.tenant.modifyDate).toLocaleDateString())}</td>
                                <td>
                                <button type="button" class="btn btn-primary m-1 accept-rent">
                                       <i class="far fa-check-circle"></i> Xác nhận
                                    </button>
                                    <button type="button" class="btn btn-danger m-1 delete-room-not-full">
                                        <i class="fas fa-trash-alt"></i> Xóa
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableDataNotFull.html(rs);
    updateRoom();
    deleteRoom();
    viewUser();
}

function viewUser() {
    $(".detail-user-full").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        user = listRoomFull[indexRoom - 0].roomDTO.motelRoom.host;
        showUser();
        modalTenant.modal("show");
    })
    $(".detail-user-not-full").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        user = listRoomNotFull[indexRoom - 0].roomDTO.motelRoom.host;
        showUser();
        modalTenant.modal("show");
    })
}

function showUser() {
    textName.val(dataFilter(user.name));
    textEmail.val(dataFilter(user.email));
    imgAvatar.attr("src", "." + dataFilter(user.avatar));
    textPhone.val(dataFilter(user.phone));
    textWorkplace.val(dataFilter(user.workplace));
    selectGender.val(dataFilter(listGender.find(s => s.id === user.gender).name));
    selectJob.val(dataFilter(listJob.find(j => j.id === user.job).name));
    selectStatus.val(dataFilter(listStatus.find(s => s.id === user.status).name));
    dateBirthday.val(dataFilter(new Date(user.birthday).toLocaleDateString('fr-CA')));
    textHomeTown.val(dataFilter(user.homeTown));
}

function showInfoModalRoom() {
    textTitle.val(dataFilter(roomSave.motelRoom.title));
    textareaDescription.val(dataFilter(roomSave.motelRoom.description));
    textAddress.val(dataFilter(roomSave.motelRoom.address));
    numberArea.val(numberFilter(roomSave.motelRoom.area));
    textLocation.val(dataFilter(roomSave.motelRoom.location).replace("<>", ";"));
    numberPrice.val(numberFilter(roomSave.motelRoom.price));
    dateCreateDate.val(dataFilter(new Date(roomSave.motelRoom.createDate).toLocaleDateString('fr-CA')));
    dateModifyDate.val(dataFilter(new Date(roomSave.motelRoom.modifyDate).toLocaleDateString('fr-CA')));
    selectCategory.val(roomSave.motelRoom.category.name);

    let priority = dataFilter(roomSave.motelRoom.priorityObject).split("<>").map((data, index) => {
        var tmp = listPriority.find(p => p.id === data);
        return tmp ? tmp.name : '';
    }).join(", ");
    checkBoxPriority.val(priority);

    checkBoxConvenient.val(numberFilter(roomSave.personIn));

    if (listCategory.find(c => c.id === (roomSave.motelRoom.category.id)).name.toUpperCase()
        .search("nhà".toUpperCase()) >= 0) {
        $("#h-floor").removeClass("d-none");
        $("#maxPerson").removeClass("d-none");
    } else {
        var paPerson = $("#maxPerson");
        paPerson.addClass("d-none");
        $("#h-floor").addClass("d-none");
        if (listCategory.find(c => c.id === (roomSave.motelRoom.category.id)).name.toUpperCase()
            .search("ghép".toUpperCase()) >= 0)
            paPerson.removeClass("d-none");
        else
            paPerson.addClass("d-none");
    }

    rate.val(roomSave.ratings
        ? (dataFilter(parseFloat(roomSave.ratings).toFixed(1)) + "/5") : "Chưa có.");
    numberMaxPerson.val(numberFilter(roomSave.motelRoom.maxPerson));
    numberFloor.val(numberFilter(roomSave.motelRoom.floors));
    dataFilter(roomSave.motelRoom.images).split("<>").forEach((img, index) => {
        $("#img" + (index + 1)).attr("src", "." + img);
    })
}

function updateRoom() {
    $(".detail-room-full").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomFull[indexRoom - 0].roomDTO;
        showInfoModalRoom();
        modalSaveRoom.modal("show");
    })

    $(".detail-room-not-full").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomNotFull[indexRoom - 0].roomDTO;
        showInfoModalRoom();
        modalSaveRoom.modal("show");
    })
}

function deleteRoom() {
    $(".delete-room-full").click(function () {
        checkRent = true;
        checkDelete = true;
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomFull[indexRoom - 0].roomDTO;
        $("#content").text("Bạn có chắc chắn muốn xóa người thuê này không?");
        btnDeleteRoom.addClass("btn-danger");
        btnDeleteRoom.removeClass("btn-primary");
        modalDelete.modal("show");
    })
    $(".delete-room-not-full").click(function () {
        checkRent = false;
        checkDelete = true;
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomNotFull[indexRoom - 0].roomDTO;
        $("#content").text("Bạn có chắc chắn muốn xóa người thuê này không?");
        btnDeleteRoom.addClass("btn-danger");
        btnDeleteRoom.removeClass("btn-primary");
        modalDelete.modal("show");
    });
    $(".accept-rent").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomNotFull[indexRoom - 0].roomDTO;
        user = roomSave.user;
        checkRent = false;
        checkDelete = false;
        $("#content").text("Bạn có chắc chắn muốn xác nhận người thuê này không?");
        btnDeleteRoom.removeClass("btn-danger");
        btnDeleteRoom.addClass("btn-primary");
        modalDelete.modal("show");
    })
}

function confirmDeleteRoom() {
    btnDeleteRoom.click(async function () {
        let check = false;
        if (checkDelete) {
            await tenantDelete({idRoom: roomSave.motelRoom.id, idUser: renter.id})
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        checkRent ? listRoomFull = listRoomFull.filter((data, index) => {
                            return index !== (indexRoom - 0);
                        }) : listRoomNotFull = listRoomNotFull.filter((data, index) => {
                            return index !== (indexRoom - 0);
                        })
                    }
                })
                .catch(e => {
                    console.log(e);
                });

            modalDelete.modal("hide");
            alertReport(check, check ? "Xóa thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
            if (check) {
                checkRent ? showDataTableFull() : showDataTableNotFull();
                await notify_impl(roomSave.user.email, "Xóa thuê/yêu cầu trọ",
                    `Bạn đã bị quản lý xóa yêu cầu/thuê trọ ${roomSave.room.title}
                    . Mong bạn thông cảm và có thể trao đổi lại với chúng tôi qua <a href="tel:0564099372" 
                class="btn btn-sm btn-info mr-4" 
             id="call-phone">0564 099 372</a> hoặc <a href="mailto:thienbinh2102000@gmail" 
             class="btn btn-sm btn-default float-right" id="mail-email">project2@gmail.com</a>.`);
            }
        } else {
            roomSave.status = true;
            let tenant = {
                id: {idUser: renter.id, idRoom: roomSave.motelRoom.id},
                room: roomSave.motelRoom,
                user: renter,
                status: true
            }
            await tenantUpdate(tenant)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        listRoomFull.push(roomSave);
                        listRoomNotFull = listRoomNotFull.filter((data, index) => {
                            return index !== (indexRoom - 0);
                        });
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            modalDelete.modal("hide");
            alertReport(check, check ? "Xác nhận thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
            if (check) {
                showDataTableFull();
                showDataTableNotFull();
                await notify_impl(user.email, "Xác nhận yêu cầu thuê trọ", `Bạn đã được quản lý xác nhận
                    yêu cầu thuê trọ ${roomSave.room.title}. Chúc bạn sẽ thấy phù hợp với trọ này.`);
            }
        }
    })
}

function sortRoom() {
    selectSort.change(function () {
        onChangeSort();
        classifyRoom();
        showDataTableNotFull();
        showDataTableFull();
    })
}

function onChangeSort() {
    if (selectSort.val() - 0)
        switch (selectSort.val() - 0) {
            case 1:
                listTenant.sort((a, b) => {
                    return new Date(b.motelRoom.createDate) - new Date(a.motelRoom.createDate);
                });
                break;
            case 2:
                listTenant.sort((a, b) => {
                    return new Date(a.motelRoom.createDate) - new Date(b.motelRoom.createDate);
                });
                break;
            default:
                break;
        }
}