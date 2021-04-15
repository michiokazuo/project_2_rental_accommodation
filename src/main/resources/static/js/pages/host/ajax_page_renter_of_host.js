let tableRent, btnDelete, modalDelete, modalRoom, modalTenant, selectCategory, checkBoxPriority, checkBoxConvenient,
    textTitle, textareaDescription, textAddress, numberArea, textLocation, numberPrice, dateCreateDate, dateModifyDate,
    numberMaxPerson, images, numberFloor, textName, textEmail, textPhone, dateBirthday, selectJob, textWorkplace,
    selectGender, selectStatus, textHomeTown, imgAvatar;

let indexTenant = 0;
let tenant;
let sortTenant = [
    {id: "1", name: "Theo người dùng"},
    {id: "2", name: "Theo phòng/nhà trọ"}
]

$(async function () {
    btnDelete = $("#btn-rent");
    modalDelete = $("#modal-rent");
    modalRoom = $("#modal-room");
    modalTenant = $("#modal-tenant");
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
    tableRent = $("#table-rented");

    await getUserInSystem();
    await loadRoomDTO();
    await loadCategory();
    await loadTenant();
    showDataTableRent();
    showSelectCustom(selectSort, sortTenant, "Sắp xếp");
    confirmDeleteRent();
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

async function loadTenant() {
    if (USER_IN_SYSTEM)
        await tenantFindByHost(USER_IN_SYSTEM.id)
            .then(rs => {
                if (rs.status === 200) {
                    listTenant = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
}

function showDataTableRent() {
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listTenant && listTenant.length > 0)
        rs = listTenant.map((data, index) => {
            let room = data.room;
            let user = data.user;
            if (room && user)
                return `<tr data-index="${index}">
                                <th>${index + 1}</th>
                                <td>
                                    <button type="button" class="btn btn-success m-1 detail-user">
                                        <i class="fas fa-info-circle"></i> ${dataFilter(user.name)}
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary m-1 detail-room">
                                        <i class="fas fa-info"></i> ${dataFilter(room.id + "." + room.title)}
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger m-1 delete-rent">
                                        <i class="fas fa-trash-alt"></i> Xóa
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableRent.html(rs);
    viewUser();
    viewRoom();
    deleteTenant();
}

function viewRoom() {
    $(".detail-room").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listTenant[indexTenant - 0];
        let roomSave = tenant.room;
        textTitle.val(dataFilter(roomSave.title));
        textareaDescription.val(dataFilter(roomSave.description));
        textAddress.val(dataFilter(roomSave.address));
        numberArea.val(numberFilter(roomSave.area));
        textLocation.val(dataFilter(roomSave.location).replace("<>", ";"));
        numberPrice.val(numberFilter(roomSave.price));
        dateCreateDate.val(dataFilter(new Date(roomSave.createDate).toLocaleDateString('fr-CA')));
        dateModifyDate.val(dataFilter(new Date(roomSave.modifyDate).toLocaleDateString('fr-CA')));
        selectCategory.val(roomSave.category.name);

        let priority = dataFilter(roomSave.priorityObject).split("<>").map((data, index) => {
            var tmp = listPriority.find(p => p.id === data);
            return tmp ? tmp.name : '';
        }).join(", ");
        checkBoxPriority.val(priority);

        checkBoxConvenient.val(numberFilter(listRoomHost.find(r => r.motelRoom.id === roomSave.id).personIn));

        if (listCategory.find(c => c.id === (roomSave.category.id)).name.toUpperCase()
            .search("nhà".toUpperCase()) >= 0) {
            $("#h-floor").removeClass("d-none");
            $("#maxPerson").removeClass("d-none");
        } else {
            var paPerson = $("#maxPerson");
            paPerson.addClass("d-none");
            $("#h-floor").addClass("d-none");
            if (listCategory.find(c => c.id === (roomSave.category.id)).name.toUpperCase()
                .search("ghép".toUpperCase()) >= 0)
                paPerson.removeClass("d-none");
            else
                paPerson.addClass("d-none");
        }

        numberMaxPerson.val(numberFilter(roomSave.maxPerson));
        numberFloor.val(numberFilter(roomSave.floors));
        dataFilter(roomSave.images).split("<>").forEach((img, index) => {
            $("#img" + (index + 1)).attr("src", "." + img);
        })
        modalRoom.modal("show");
    })

}

function viewUser() {
    $(".detail-user").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listTenant[indexTenant - 0];
        let user = tenant.user;
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

function deleteTenant() {
    $(".delete-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listTenant[indexTenant - 0];
        modalDelete.modal("show");
    })
}

function confirmDeleteRent() {
    btnDelete.click(async function () {
        let check = false, email;
        await tenantDelete(tenant.id)
            .then(rs => {
                if (rs.status === 200) {
                    check = true;
                    email = tenant.user.email;
                    listTenant = listTenant.filter((data, index) => {
                        return index !== (indexTenant - 0);
                    })
                }
            })
            .catch(e => {
                console.log(e);
            });

        showDataTableRent();
        modalDelete.modal("hide");
        alertReport(check, check ? "Xóa thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        if (check)
            await notify_impl(email, "Xóa quyền thuê trọ", `Bạn đã bị chủ trọ xóa quyền sử dụng trọ 
            ${tenant.room.title}. Mong bạn thông cảm và tìm trọ khác phù hợp hơn.`);

    })
}

function sortRoom() {
    selectSort.change(function () {
        onChangeSort();
        showDataTableRent();
    })
}

function onChangeSort() {
    switch (selectSort.val() - 0) {
        case 1:
            listTenant.sort((a, b) => {
                return a.user.name.localeCompare(b.user.name);
            });

            break;
        case 2:
            listTenant.sort((a, b) => {
                return a.room.title.localeCompare(b.room.title);
            });
            break;
        default:
            break;
    }
}