let tableDataNotFull, tableDataFull, btnDeleteRoom, modalDelete, modalSaveRoom, selectSort, selectCategory,
    checkBoxPriority, checkBoxConvenient, textTitle, textareaDescription, textAddress, numberArea, textLocation,
    numberPrice, dateCreateDate, dateModifyDate, numberMaxPerson, numberFloor, modalTenant, textName, textEmail,
    textPhone, dateBirthday, selectJob, textWorkplace, selectGender, selectStatus, textHomeTown, imgAvatar, rate;

let indexRoom = 0, checkDelete;
let roomSave;

let listRoomFull = [], listRoomNotFull = [];
let listCategory = [];

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

    await getUserInSystem();
    await loadAdminDTO();
    classifyRoom();
    showDataTableFull();
    showDataTableNotFull();
    await loadCategory();

    showSelectSort(selectSort, sortRoomHost, "Sắp xếp");

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

function classifyRoom() {
    listRoomFull = [];
    listRoomNotFull = [];
    for (const r of listRoomHost)
        if (r.personIn === r.motelRoom.maxPerson)
            listRoomFull.push(r);
        else
            listRoomNotFull.push(r);
}

function showDataTableFull() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRoomFull && listRoomFull.length > 0)
        rs = listRoomFull.map((data, index) => {
            let room = data.motelRoom;
            if (room)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><button type="button" class="btn btn-success m-1 detail-room-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.title)}
                                    </button></td>
                                <td><button type="button" class="btn btn-success m-1 detail-user">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.host.name)}
                                    </button></td>
                                <td><a target="_blank" href="chi-tiet-thue?id_room=${room.id}" 
                                class="text-decoration-none text-light btn btn-primary m-1">
                                        <i class="fas fa-tasks"></i>
                                        <span class="text-light"> Xem </span>
                                    </a></td>
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
            let room = data.motelRoom;
            if (room)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><button type="button" class="btn btn-success m-1 detail-room-not-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.title)}
                                    </button>
                                </td>
                                <td><button type="button" class="btn btn-success m-1 detail-user">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.host.name)}
                                    </button></td>
                                <td><a target="_blank" href="chi-tiet-thue?id_room=${room.id}" 
                                class="text-decoration-none text-light btn btn-primary m-1">
                                        <i class="fas fa-tasks"></i>
                                        <span class="text-light"> Xem (${numberFilter(data.personIn) + "/"
                + numberFilter(room.maxPerson)})</span>
                                </a></td>
                                <td>
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
    $(".detail-user").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        let user = listRoomHost[indexRoom - 0].motelRoom.host;
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
        modalTenant.modal("show");
    })
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

    let convenient = dataFilter(roomSave.convenientList).map(data => data.name).join(", ");
    checkBoxConvenient.val(convenient);

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
        roomSave = listRoomFull[indexRoom - 0];
        showInfoModalRoom();
        modalSaveRoom.modal("show");
    })

    $(".detail-room-not-full").click(function () {
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomNotFull[indexRoom - 0];
        showInfoModalRoom();
        modalSaveRoom.modal("show");
    })
}

function deleteRoom() {
    $(".delete-room-full").click(function () {
        checkDelete = true;
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomFull[indexRoom - 0];
        modalDelete.modal("show");
    })
    $(".delete-room-not-full").click(function () {
        checkDelete = false;
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomNotFull[indexRoom - 0];
        modalDelete.modal("show");
    })
}

function confirmDeleteRoom() {
    btnDeleteRoom.click(async function () {
        let check = false;
        await motelRoomDelete(roomSave.motelRoom)
            .then(rs => {
                if (rs.status === 200) {
                    check = true;
                    checkDelete ? listRoomFull = listRoomFull.filter((data, index) => {
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
            let emails = roomSave.motelRoom.host.email + " ";
            roomSave.tenantList.forEach(t => {
                emails += t.user.email + " ";
            })
            checkDelete ? showDataTableFull() : showDataTableNotFull();
            await notify_impl(emails.substring(0, emails.length - 1), "Xóa phòng/nhà trọ",
                `Trọ ${roomSave.motelRoom.title} mà bạn thuê/đang yêu cầu thuê/sở hữu đã bị quản lý xóa đi. 
                Mong bạn thông cảm và có thể trao đổi lại với chúng tôi qua <a href="tel:0564099372" 
                class="btn btn-sm btn-info mr-4" 
             id="call-phone">0564 099 372</a> hoặc <a href="mailto:thienbinh2102000@gmail" 
             class="btn btn-sm btn-default float-right" id="mail-email">project2@gmail.com</a>.`);
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
    var valSort = selectSort.val().split("/");
    if (valSort[1])
        switch (valSort[0] - 0) {
            case 1:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listRoomHost.sort((a, b) => {
                        return new Date(b.motelRoom.createDate) - new Date(a.motelRoom.createDate);
                    });
                else
                    listRoomHost.sort((a, b) => {
                        return new Date(a.motelRoom.createDate) - new Date(b.motelRoom.createDate);
                    });
                break;
            case 2:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listRoomHost.sort((a, b) => {
                        return a.motelRoom.price - b.motelRoom.price;
                    });
                else
                    listRoomHost.sort((a, b) => {
                        return b.motelRoom.price - a.motelRoom.price;
                    });
                break;
            case 3:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listRoomHost.sort((a, b) => {
                        return (b.motelRoom.maxPerson - b.personIn) - (a.motelRoom.maxPerson - a.personIn);
                    });
                else
                    listRoomHost.sort((a, b) => {
                        return (a.motelRoom.maxPerson - a.personIn) - (b.motelRoom.maxPerson - b.personIn);
                    });
                break;
            case 4:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listRoomHost.sort((a, b) => {
                        return b.personAsk - a.personAsk;
                    });
                else
                    listRoomHost.sort((a, b) => {
                        return a.personAsk - b.personAsk;
                    });
                break;
            case 5:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listRoomHost.sort((a, b) => {
                        return b.ratings - a.ratings;
                    });
                else
                    listRoomHost.sort((a, b) => {
                        return a.ratings - b.ratings;
                    });
                break;
            default:
                break;
        }
}