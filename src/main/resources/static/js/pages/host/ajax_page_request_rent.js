let tableRent, btnDelete, modalDelete, modalRoom, modalTenant, selectCategory, checkBoxPriority, checkBoxConvenient,
    textTitle, textareaDescription, textAddress, numberArea, textLocation, numberPrice, dateCreateDate, dateModifyDate,
    numberMaxPerson, images, numberFloor, textName, textEmail, textPhone, dateBirthday, selectJob, textWorkplace,
    selectGender, selectStatus, textHomeTown, imgAvatar, role;

let indexTenant = 0, checkRent;
let tenant;
let sortTenant = [
    {id: "1", name: "Theo người dùng"},
    {id: "2", name: "Theo phòng/nhà trọ"}
]

let listCategory;

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
    role = $("#role");

    await getUserInSystem();
    await loadTenantReq();
    await loadRoomDTO();
    await loadCategory();
    // classifyReq();
    showDataTableRent();
    showSelectCustom(selectSort, sortTenant, "Sắp xếp");
    confirmRent();
    sortRoom();
})

// function classifyReq() {
//     if (listRoomHost && listRoomHost.length > 0)
//         for (const r of listRoomHost)
//             for (const t of r.tenantList)
//                 if (!t.status)
//                     listTenantReq.push({room: r.motelRoom, user: t.user, convenientList: r.convenientList});
// }

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
                                    <button type="button" class="btn btn-primary m-1 detail-user">
                                        <i class="far fa-eye"></i> ${dataFilter(user.name)}
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning m-1 detail-room">
                                        <i class="far fa-eye"></i> ${dataFilter(room.id + "." + room.title)}
                                    </button>
                                </td>
                                <td>
                                <button type="button" class="btn btn-success m-1 accept-rent">
                                        <i class="far fa-check-circle"></i> Xác nhận
                                    </button>
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
        numberPrice.val(numberFilter(formatMoney(roomSave.price)));
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
        role.val(dataFilter(user.role.content));
        modalTenant.modal("show");
    })
}

function deleteTenant() {
    $(".accept-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listTenant[indexTenant - 0];
        checkRent = true;
        $("#content").text("Bạn có chắc chắn muốn xác nhận người thuê này không?");
        btnDelete.removeClass("btn-danger");
        btnDelete.addClass("btn-primary");
        modalDelete.modal("show");
    })
    $(".delete-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listTenant[indexTenant - 0];
        checkRent = false;
        $("#content").text("Bạn có chắc chắn muốn xóa người thuê này không?");
        btnDelete.addClass("btn-danger");
        btnDelete.removeClass("btn-primary");
        modalDelete.modal("show");
    })
}

function confirmRent() {
    btnDelete.click(async function () {
        let check = false, email = tenant.user.email;
        if (checkRent) {
            let tmp = {
                user: tenant.user,
                room: tenant.room,
                deleted: false,
                status: true,
                id:{
                    idUser: tenant.user.id,
                    idRoom: tenant.room.id
                }
            }
            await tenantUpdate(tmp)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        listTenant = listTenant.filter((data, index) => {
                            return index !== (indexTenant - 0);
                        })
                    }
                })
                .catch(e => {
                    console.log(e);
                })

        } else {
            await tenantDelete({idUser: tenant.user.id, idRoom: tenant.room.id})
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

        }
        modalDelete.modal("hide");
        alertReport(check, check ? (checkRent ? "Xác nhận thành công." : "Xóa thành công.")
            : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        if (check) {
            showReq();
            showDataTableRent();
            await notify_impl(email, checkRent ? "Xác nhận thuê trọ" : "Xóa quyền thuê trọ",
                checkRent ? `Bạn đã được chủ trọ xác nhận yêu cầu thuê trọ ${tenant.room.title}. Chúc bạn sẽ thấy phù hợp với trọ này.`
                    : (`Bạn đã bị chủ trọ xóa quyền sử dụng trọ ${tenant.room.title}
                    . Mong bạn thông cảm và tìm trọ khác phù hợp hơn.`));
        }
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