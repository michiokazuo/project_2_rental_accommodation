let tableDataNotFull, tableDataFull, btnSaveRoom, btnDeleteRoom, btnAddNewRoom, modalDelete, modalSaveRoom, selectSort,
    selectCategory, checkBoxPriority, checkBoxConvenient, textTitle, textareaDescription, textAddress, numberArea,
    textLocation, numberPrice, dateCreateDate, dateModifyDate, numberMaxPerson, images, numberFloor, load;

let indexRoom = 0, checkSave = false, curLat, curLng, checkDelete;
let roomSave;

let listRoomFull = [], listRoomNotFull = [];
let listCategory = [], listConvenient = [];

$(async function () {
    tableDataFull = $("#table-full");
    tableDataNotFull = $("#table-not-full");
    btnSaveRoom = $("#btn-submit-room");
    btnDeleteRoom = $("#btn-delete-room");
    btnAddNewRoom = $("#btn-add-room");
    modalDelete = $("#modal-delete");
    modalSaveRoom = $("#modal-room");
    selectSort = $("#sort");
    selectCategory = $("#category");
    checkBoxConvenient = $("#check-convenient");
    checkBoxPriority = $("#check-priority");
    textTitle = $("#title");
    textareaDescription = $("#description");
    textAddress = $("#address");
    numberArea = $("#area");
    textLocation = $("#location");
    numberPrice = $("#price");
    dateCreateDate = $("#create-date");
    dateModifyDate = $("#modify-date")
    numberMaxPerson = $("#max_person");
    images = $("#images");
    numberFloor = $("#floor");
    load = $("#load");

    await getUserInSystem();
    await loadRoomDTO();
    classifyRoom();
    showDataTableFull();
    showDataTableNotFull();
    await loadConvenient();
    await loadCategory();
    await getLocationUser();
    showSelectCustom(selectCategory, listCategory, "Danh mục");
    showSelectSort(selectSort, sortRoomHost, "Sắp xếp");
    showCheckBoxRoom(checkBoxPriority, listPriority);
    showCheckBoxRoom(checkBoxConvenient, listConvenient);
    showMaxPerson_Floor();

    addNewRoom();
    confirmDeleteRoom();
    confirmUpdate();
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

async function loadConvenient() {
    await convenientFindAll()
        .then(rs => {
            if (rs.status === 200) {
                listConvenient = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function showMaxPerson_Floor() {
    selectCategory.change(function () {
        var categorySearch = listCategory.find(c => c.id === (selectCategory.val() - 0));
        if (categorySearch && categorySearch.name.toUpperCase()
            .search("nhà".toUpperCase()) >= 0) {
            $("#h-floor").removeClass("d-none");
            $("#maxPerson").removeClass("d-none");
        } else {
            var paPerson = $("#maxPerson");
            paPerson.addClass("d-none");
            $("#h-floor").addClass("d-none");
            if (categorySearch && categorySearch.name.toUpperCase()
                .search("ghép".toUpperCase()) >= 0)
                paPerson.removeClass("d-none");
            else
                paPerson.addClass("d-none");
        }
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
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRoomFull && listRoomFull.length > 0)
        rs = listRoomFull.map((data, index) => {
            let room = data.motelRoom;
            if (room)
                return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><button type="button" class="btn btn-success m-1 detail-room-full">
                                        <i class="fas fa-edit"></i> ${dataFilter(room.title)}
                                    </button></td>
                                <td><a target="_blank" href="chi-tiet-thue?id_room=${room.id}" 
                                class="text-decoration-none text-light btn btn-primary m-1">
                                        <i class="fas fa-tasks"></i>
                                        <span class="text-light"> Xem </span>
                                    </a></td>
                                <td>
                                    <a target="_blank" href="/thong-tin-thue?id_room=${room.id}" 
                                        class="text-decoration-none text-light btn btn-warning m-1">
                                        <i class="fas fa-eye"></i>
                                        <span class="text-light"> Góc nhìn người dùng </span>
                                    </a>
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
}

function showDataTableNotFull() {
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;
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
                                <td><a target="_blank" href="chi-tiet-thue?id_room=${room.id}" 
                                class="text-decoration-none text-light btn btn-primary m-1">
                                        <i class="fas fa-tasks"></i>
                                        <span class="text-light"> Xem (${numberFilter(data.personIn) + "/"
                + numberFilter(room.maxPerson)})</span>
                                </a></td>
                                <td>
                                    <a target="_blank" href="/thong-tin-thue?id_room=${room.id}" 
                                        class="text-decoration-none text-light btn btn-warning m-1">
                                        <i class="fas fa-eye"></i>
                                        <span class="text-light"> Góc nhìn người dùng </span>
                                    </a>
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
}

function addNewRoom() {
    btnAddNewRoom.click(function () {
        checkSave = true;
        roomSave = {};
        roomSave.motelRoom = {};
        modalSaveRoom.modal("show");
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
    selectCategory.val(roomSave.motelRoom.category.id);
    let priority = dataFilter(roomSave.motelRoom.priorityObject).split("<>");
    Array.from(checkBoxPriority.children()).forEach(cb => {
        if (priority.find(p => p === $(cb).children("input:checkbox")[0].value))
            $(cb).children("input:checkbox")[0].checked = true;
    });
    let convenient = dataFilter(roomSave.convenientList);
    Array.from(checkBoxConvenient.children()).forEach(cb => {
        if (convenient.find(p => p.id === ($(cb).children("input:checkbox")[0].value - 0)))
            $(cb).children("input:checkbox")[0].checked = true;
    });

    if (listCategory.find(c => c.id === (selectCategory.val() - 0)).name.toUpperCase()
        .search("nhà".toUpperCase()) >= 0) {
        $("#h-floor").removeClass("d-none");
        $("#maxPerson").removeClass("d-none");
    } else {
        var paPerson = $("#maxPerson");
        paPerson.addClass("d-none");
        $("#h-floor").addClass("d-none");
        if (listCategory.find(c => c.id === (selectCategory.val() - 0)).name.toUpperCase()
            .search("ghép".toUpperCase()) >= 0)
            paPerson.removeClass("d-none");
        else
            paPerson.addClass("d-none");
    }

    numberMaxPerson.val(numberFilter(roomSave.motelRoom.maxPerson));
    numberFloor.val(numberFilter(roomSave.motelRoom.floors));
    dataFilter(roomSave.motelRoom.images).split("<>").forEach((img, index) => {
        $("#img" + (index + 1)).attr("src", "." + img);
    })
}

function updateRoom() {
    $(".detail-room-full").click(function () {
        checkSave = false;
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomFull[indexRoom - 0];
        showInfoModalRoom();
        modalSaveRoom.modal("show");
    })

    $(".detail-room-not-full").click(function () {
        checkSave = false;
        indexRoom = $(this).parents("tr").attr("data-index");
        roomSave = listRoomNotFull[indexRoom - 0];
        showInfoModalRoom();
        modalSaveRoom.modal("show");
    })
}

async function getLocationUser() {
    await getLocationCurr()
        .then(rs => {
            curLat = rs.lat;
            curLng = rs.lng;
        })
        .catch(e => {
            console.log(e);
        })
}

function confirmUpdate() {
    btnSaveRoom.click(async function () {
        let {
            val: valueTitle,
            check: checkTitle
        } = checkData(textTitle, /./, "Bạn chưa tiêu đề cho phòng trọ.");
        let {
            val: valueArea,
            check: checkArea
        } = checkData(numberArea, /^\d+$/, "Bạn chưa nhập diện tích trọ.");
        let {
            val: valuePrice,
            check: checkPrice
        } = checkData(numberPrice, /^\d+$/, "Bạn chưa nhập giá thuê.");
        let {
            val: valTextCategory,
            check: checkCategory
        } = checkData(selectCategory, /^\d+$/, "Bạn cần chọn danh mục.");
        let {
            val: valAddress,
            check: checkAddress
        } = checkData(textAddress, /./, "Bạn chưa nhập địa chỉ.");
        let {
            val: valueImg,
            check: checkImg
        } = checkFile(images, "File ảnh phải nhỏ hơn 10MB. Số lượng ảnh <= 4.");

        let valPriority = "", valConvenient = "";
        let valImages = ["./files/image_config/rental.svg",
            "./files/image_config/rental.svg",
            "./files/image_config/rental.svg",
            "./files/image_config/rental.svg"];
        Array.from(checkBoxPriority.children()).forEach(cb => {
            if ($(cb).children("input:checkbox").prop("checked"))
                valPriority += ($(cb).children("input:checkbox")[0].value + "<>");
        });
        Array.from(checkBoxConvenient.children()).forEach(cb => {
            if ($(cb).children("input:checkbox").prop("checked"))
                valConvenient += ($(cb).children("input:checkbox")[0].value + ",");
        });

        let checkUpImg = true;
        if (checkSave) {
            checkUpImg = checkImg;
        } else {
            valImages = roomSave.motelRoom.images.split("<>");
        }

        if (checkUpImg && checkAddress && checkPrice && checkCategory && checkTitle && checkArea) {
            if (checkImg) {
                await uploadFile(Array.from(images.prop('files')))
                    .then(rs => {
                        if (rs.status === 200) {
                            for (let i = 0; i < rs.data.length; i++)
                                valImages[i] = rs.data[i];
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
            let valMaxPerson = 1, checkMPerson = false, valFloor = 1, checkFloor = false;
            let checkHasMP = false, checkHasF = false;

            if (listCategory.find(c => c.id === (selectCategory.val() - 0)).name.toUpperCase()
                .search("ghép".toUpperCase()) >= 0) {
                checkHasMP = true;
                let {
                    val: val,
                    check: check
                } = checkData(numberMaxPerson, /^\d+$/, "Bạn chưa nhập số người tối đa.");
                valMaxPerson = val;
                checkMPerson = check;
            } else if (listCategory.find(c => c.id === (selectCategory.val() - 0)).name.toUpperCase()
                .search("nhà".toUpperCase()) >= 0) {
                checkHasF = true;
                checkHasMP = true;
                let {
                    val: valF,
                    check: checkF
                } = checkData(numberFloor, /^\d+$/, "Bạn chưa nhập số tầng.");
                let {
                    val: val,
                    check: check
                } = checkData(numberMaxPerson, /^\d+$/, "Bạn chưa nhập số người tối đa.");
                valMaxPerson = val;
                checkMPerson = check;
                valFloor = valF;
                checkFloor = checkF;
            }
            let convenientL = valConvenient.substring(0, valConvenient.length - 1).split(",");
            if ((!checkHasMP || (checkHasMP && checkMPerson))
                && (!checkHasF || (checkHasF && checkFloor && checkMPerson))) {
                roomSave.motelRoom.title = valueTitle;
                roomSave.motelRoom.description = textareaDescription.val().trim();
                roomSave.motelRoom.images = valImages.join("<>");
                roomSave.motelRoom.area = valueArea - 0;
                roomSave.motelRoom.maxPerson = valMaxPerson;
                roomSave.motelRoom.floors = valFloor;
                roomSave.motelRoom.price = valuePrice - 0;
                roomSave.motelRoom.address = valAddress;
                roomSave.motelRoom.category = listCategory.find(c => c.id === (valTextCategory - 0));
                roomSave.motelRoom.priorityObject = valPriority.substring(0, valPriority.length - 2);
                roomSave.convenientList = convenientL.map((data, index) => {
                    return listConvenient.find(conv => conv.id === (data - 0));
                })
                roomSave.motelRoom.host = USER_IN_SYSTEM;

                let checkStatus = false, valStatus;
                selectSort.prop('selectedIndex', 0);

                let valLocation = curLat + "<>" + curLng;
                load.removeClass("d-none");
                await motelRoomGetLocation(valAddress)
                    .then(rs => {
                        console.log(rs);
                        if (rs.status === 200 && rs.data.data[0] && Object.keys(rs.data.data[0]).length > 0)
                            valLocation = (rs.data.data[0].latitude + "<>" + rs.data.data[0].longitude);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                roomSave.motelRoom.location = valLocation;
                if (checkSave) {
                    roomSave.motelRoom.id = null;
                    roomSave.motelRoom.createDate = null;
                    roomSave.motelRoom.modifyDate = null;
                    roomSave.motelRoom.createBy = null;
                    roomSave.motelRoom.modifyBy = null;
                    valStatus = "Thêm thành công.";
                    await motelRoomInsert(roomSave)
                        .then(rs => {
                            if (rs.status === 200) {
                                checkStatus = true;
                                listRoomNotFull.push(rs.data);
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        })
                    if (checkStatus)
                        showDataTableNotFull();
                } else {
                    valStatus = "Sửa thành công.";
                    load.removeClass("d-none");
                    await motelRoomUpdate(roomSave)
                        .then(rs => {
                            if (rs.status === 200) {
                                checkStatus = true;
                                roomSave = rs.data;
                                listRoomFull = listRoomFull.filter((data, index) => {
                                    return index !== (indexRoom - 0);
                                });
                                listRoomNotFull = listRoomNotFull.filter((data, index) => {
                                    return index !== (indexRoom - 0);
                                })
                                if (roomSave.personIn >= roomSave.motelRoom.maxPerson) {
                                    listRoomFull.push(roomSave);
                                } else {
                                    listRoomNotFull.push(roomSave);
                                }
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        })

                    // await loadRoomDTO();
                    // classifyRoom();
                    if (checkStatus) {
                        showDataTableFull();
                        showDataTableNotFull();
                    }
                }

                modalSaveRoom.modal("hide");
                alertReport(checkStatus, checkStatus ? valStatus : "Có lỗi xảy ra. Vui lòng thử lại!!!");
                load.addClass("d-none");
            }
        }
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
            let emails = "";
            roomSave.tenantList.forEach(t => {
                emails += t.user.email + " ";
            })
            checkDelete ? showDataTableFull() : showDataTableNotFull();
            await notify_impl(emails.substring(0, emails.length - 1), "Xóa phòng/nhà trọ",
                `Trọ ${roomSave.motelRoom.title} mà bạn thuê/đang yêu cầu thuê đã bị chủ trọ xóa đi. 
                Mong bạn thông cảm và tìm trọ khác phù hợp hơn.`);
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