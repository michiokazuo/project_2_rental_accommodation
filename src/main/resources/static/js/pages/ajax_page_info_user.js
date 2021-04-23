let nameSignUp, emailSignUp, passwordSignUp, passwordConfirmSignUp, avatarSignUp, btnSubmitSignUp, modalSignUp,
    textPhone, dateBirthday, numberJob, textWorkplace, numberGender, numberStatus, numberRole, linkSignUp,
    avatarUserShow, callPhone, mailEmail, rented, request, comment, inputName, inputBirthday, inputGender, inputStatus,
    inputJob, inputWorkplace, inputRole, inputEmail, inputPhone, tableRented, tableRequest, btnDelete, helloYou,
    nameShow, jobShow, workplaceShow, modalDelete, homeTown, inputHomeTown, tableData;
let idUser, checkDelete, index_now;
let reportList = [], rentList = [], requestList = [], listTenant = [];
let listRole = [];
let user_now = {};
let checkUserView = 0;
let listRoomHost = [], listRoomFull = [], listRoomNotFull = [];
let roomDTO;

$(async function () {
    linkSignUp = $("#btn-info-update");
    nameSignUp = $("#name-sign-up");
    inputName = $("#input-username");
    emailSignUp = $("#email-sign-up");
    passwordSignUp = $("#password-sign-up");
    passwordConfirmSignUp = $("#password-confirm-sign-up");
    avatarSignUp = $("#avatar");
    inputBirthday = $("#input-birthday");
    inputGender = $("#input-gender");
    btnSubmitSignUp = $("#btn-submit-sign-up");
    textPhone = $("#phone");
    textWorkplace = $("#workplace");
    numberGender = $("#gender");
    inputWorkplace = $("#input-workplace");
    inputRole = $("#input-role");
    numberJob = $("#job");
    numberStatus = $("#status");
    tableRented = $("#table-rented");
    tableRequest = $("#table-request");
    dateBirthday = $("#birthday");
    numberRole = $("#role");
    modalSignUp = $("#modal-sign-up");
    avatarUserShow = $("#avatar-user");
    callPhone = $("#call-phone");
    mailEmail = $("#mail-email");
    rented = $("#rented");
    request = $("#request");
    comment = $("#comment");
    inputStatus = $("#input-status");
    inputJob = $("#input-job");
    inputEmail = $("#input-email");
    inputPhone = $("#input-phone");
    btnDelete = $("#btn-delete");
    helloYou = $("#hello-you");
    nameShow = $("#name-show");
    workplaceShow = $("#workplace-show");
    jobShow = $("#job-show");
    modalDelete = $("#modal-delete");
    homeTown = $("#home-town");
    inputHomeTown = $("#input-home-town");
    tableData = $("#table-data");

    let url = new URL(window.location.href);
    idUser = url.searchParams.get("id_user");

    await getUserInSystem();
    await loadRole();
    await getUserNeedInfo();
    await getRoomRent();
    showSelectCustom(numberGender, listGender, "<>");
    showSelectCustom(numberJob, listJob, "<>");
    showSelectCustom(numberStatus, listStatus, "<>");
    showRoleList(numberRole, listRole, "<>");
    classifyRent();
    checkUser();
    showInfoStatic();

    if (!checkUserView) {
        showTableRent();
        showTableRequest();
        confirmDelete();
        signUp();
        submitSignUp();
    } else {
        linkSignUp.remove();
        if (checkUserView > 0 && checkRole(user_now, ROLE_HOST)) {
            await loadRoomDTO();
            classifyRoom();
            showTableData();
        }
    }
})

function checkUser() {
    if (USER_IN_SYSTEM)
        if (USER_IN_SYSTEM.id === user_now.id) {
            if (checkRole(user_now, ROLE_USER))
                checkUserView = 0;
            else if (checkRole(user_now, ROLE_HOST))
                window.location.href = "/host/thong-tin-ca-nhan";
            else if (checkRole(user_now, ROLE_ADMIN))
                window.location.href = "/admin/thong-tin-ca-nhan";
        } else {
            if (!checkRole(USER_IN_SYSTEM, ROLE_ADMIN) && checkRole(user_now, ROLE_ADMIN))
                window.location.href = "/error";
            else checkUserView = checkRole(user_now, ROLE_HOST) ? 1 : -1;
        }
    // 1 - user see host  // -1 host/user see user_diff
    else
        checkUserView = 1;
}

async function loadRole() {
    await allRole()
        .then(rs => {
            if (rs.status === 200) {
                listRole = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
            console.log("error load role");
        })
}

async function getUserNeedInfo() {
    user_now = USER_IN_SYSTEM;
    if (idUser) {
        await userFindById(idUser)
            .then(rs => {
                if (rs.status === 200) {
                    user_now = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    if (!user_now && !USER_IN_SYSTEM)
        window.location.href = "/dang-nhap";

    await reportFindByUser(user_now.id)
        .then(rs => {
            if (rs.status === 200) {
                reportList = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

async function getRoomRent() {
    await tenantFindByUser(user_now.id)
        .then(rs => {
            if (rs.status === 200) {
                listTenant = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function classifyRent() {
    for (const t of listTenant) {
        if (t.status) rentList.push(t);
        else requestList.push(t);
    }
}

function showInfoStatic() {
    if (user_now) {
        inputName.val(dataFilter(user_now.name));
        inputBirthday.val(dataFilter(new Date(user_now.birthday).toLocaleDateString('fr-CA')));
        inputGender.val(dataFilter(listGender.find(sex => sex.id === user_now.gender).name));
        inputWorkplace.val(dataFilter(user_now.workplace));
        inputRole.val(dataFilter(user_now.role.content));
        avatarUserShow.attr("src", dataFilter(user_now.avatar));
        callPhone.attr("href", "tel:" + user_now.phone);
        mailEmail.attr("href", "mailto:" + user_now.email);

        if (checkUserView < 1 || !checkRole(user_now, ROLE_HOST)) {
            rented.children(".heading").text(numberFilter(rentList.length));
            request.children(".heading").text(numberFilter(requestList.length));
            comment.children(".heading").text(numberFilter(reportList.length));
        } else {
            rented.remove();
            request.remove();
            comment.remove();
        }

        inputStatus.val(dataFilter(listStatus.find(s => s.id === user_now.status).name));
        inputJob.val(dataFilter(listJob.find(j => j.id === user_now.job).name));
        inputEmail.val(dataFilter(user_now.email));
        inputPhone.val(dataFilter(user_now.phone));
        nameShow.text(user_now.name);
        jobShow.text(dataFilter(listJob.find(j => j.id === user_now.job).name));
        workplaceShow.text(dataFilter(user_now.workplace));
        inputHomeTown.val(dataFilter(user_now.homeTown));
    }
}

function signUp() {
    linkSignUp.click(function () {
        nameSignUp.val(dataFilter(user_now.name));
        emailSignUp.val(dataFilter(user_now.email));
        // avatarSignUp.val(dataFilter(user_now.avatar));
        $("#avatar-photo").attr("src", dataFilter(user_now.avatar));
        textPhone.val(dataFilter(user_now.phone));
        textWorkplace.val(dataFilter(user_now.workplace));
        numberGender.val(dataFilter(user_now.gender));
        numberJob.val(dataFilter(user_now.job));
        numberStatus.val(dataFilter(user_now.status));
        dateBirthday.val(dataFilter(new Date(user_now.birthday).toLocaleDateString('fr-CA')));
        numberRole.val(dataFilter(user_now.role.id));
        homeTown.val(dataFilter(user_now.homeTown));
        modalSignUp.modal("show");
    })
}

function submitSignUp() {
    btnSubmitSignUp.click(async function () {
        let {
            val: valueName,
            check: checkName
        } = checkData(nameSignUp, /./, "Bạn chưa nhập tên.");
        let {
            val: valueEmailSignUp,
            check: checkEmailSignUp
        } = checkEmail(emailSignUp, "Email không hợp lệ.");
        let {
            val: valuePasswordSignUp,
            check: checkPasswordSignUp
        } = checkPassword(passwordSignUp,
            "Bạn nhập mật khẩu chưa đúng định dạng (tối thiểu 8 kí tự gồm cả số và chữ).");
        let {
            val: valuePasswordConfirmSignUp,
            check: checkPasswordConfirmSignUp
        } = checkPasswordConfirm(passwordConfirmSignUp, valuePasswordSignUp, "Mật khẩu không khớp.");
        let {
            val: valTextPhone,
            check: checkTextPhone
        } = checkPhone(textPhone, "SĐT không hợp lệ.");
        let {
            val: valBirthday,
            check: checkDateBirthday
        } = checkBirthday(dateBirthday, "Ngày sinh không hợp lệ(<18).");
        let {
            val: valJob,
            check: checkJob
        } = checkData(numberJob, /^\d+$/, "Bạn chưa chọn nghề nghiệp.");
        let {
            val: valWorkplace,
            check: checkWorkplace
        } = checkData(textWorkplace, /./, "Bạn chưa nhập nơi làm việc.");
        let {
            val: valGender,
            check: checkGender
        } = checkData(numberGender, /^\d+$/, "Bạn chưa chọn giới tính.");
        let {
            val: valStatus,
            check: checkStatus
        } = checkData(numberStatus, /^\d+$/, "Bạn chưa chọn tình trạng hôn nhân.");
        let {
            val: valRole,
            check: checkRole
        } = checkData(numberRole, /^\d+$/, "Bạn chưa chọn tư cách đăng ký.");
        let {
            val: valueAvatar,
            check: checkAvatar
        } = checkFile(avatarSignUp, "File ảnh phải nhỏ hơn 10MB.");
        let {
            val: valueHomeTown,
            check: checkHomeTown
        } = checkData(homeTown, /./, "Bạn chưa nhập quê quán.");

        if (checkName && checkEmailSignUp && checkPasswordSignUp && checkPasswordConfirmSignUp && checkTextPhone
            && checkDateBirthday && checkStatus && checkStatus && checkWorkplace && checkGender && checkRole
            && checkJob && checkHomeTown) {
            valueAvatar = user_now.avatar;
            let fileAvatar;
            if (checkAvatar) {
                fileAvatar = avatarSignUp.prop('files')[0];
                await uploadFile(Array.from(avatarSignUp.prop('files')))
                    .then(rs => {
                        if (rs.status === 200) {
                            valueAvatar = rs.data[0];
                        } else {
                            valueAvatar = user_now.avatar;
                        }
                    })
                    .catch(e => {
                        valueAvatar = user_now.avatar;
                        console.log(e)
                    })
            }

            user_now.name = valueName;
            user_now.email = valueEmailSignUp;
            user_now.password = valuePasswordSignUp;
            user_now.avatar = valueAvatar;
            user_now.phone = valTextPhone;
            user_now.job = valJob;
            user_now.gender = valGender;
            user_now.status = valStatus;
            user_now.workplace = valWorkplace;
            user_now.birthday = valBirthday;
            user_now.role = listRole.find(r => r.id === (valRole - 0));
            user_now.homeTown = valueHomeTown;

            let check = false;
            await userUpdate(user_now)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        user_now = rs.data;
                    }
                })
                .catch(e => {
                    console.log(e);
                })

            showInfoStatic();
            $("#acc-top .title").text(user_now.name);
            if (check && checkAvatar) {
                let img = document.getElementById("avatar-user");
                let reader = new FileReader();
                reader.addEventListener("load", function () {
                    img.src = reader.result;
                }, false);
                if (fileAvatar)
                    reader.readAsDataURL(fileAvatar);
            }

            modalSignUp.modal("hide");
            alertReport(check, check ? "Cập nhật thành công!!!" : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        }
    })
}

function showTableRent() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (rentList && rentList.length > 0) {
        rs = rentList.map((data, index) => {
            let room = data.room;
            if (room)
                return `<tr data-index="${index}">
                        <th scope="row">${index + 1}</th>
                        <td>
                            <a target="_blank" href="thong-tin-thue?id_room=${dataFilter(room.id)}" 
                            class="text-decoration-none text-light btn btn-success m-1">
                                        <i class="far fa-eye"></i>
                                        <span class="text-light"> Xem </span>
                            </a>
                        </td>
                        <td>${dataFilter(formatMoney(room.price))}</td>
                        <td>${dataFilter(new Date(data.createDate).toLocaleDateString())}</td>
                           <td>
                                <button type="button" class="btn btn-danger m-1 delete-rent">
                                    <i class="fas fa-trash-alt" ></i> Xóa
                                </button>
                           </td>
                        </tr>`;

            return ``;
        }).join("");
    }

    tableRented.html(rs);
    deleteRent();
}

function showTableRequest() {
    let rs = `<tr><td colspan='5'><strong>Không có dữ liệu</strong></td></tr>`;
    if (requestList && requestList.length > 0) {
        rs = requestList.map((data, index) => {
            let room = data.room;
            if (room)
                return `<tr data-index="${index}">
                        <th scope="row">${index + 1}</th>
                        <td>
                            <a target="_blank" href="/thong-tin-thue?id_room=${room.id}" 
                            class="text-decoration-none text-light btn btn-success m-1">
                                        <i class="far fa-eye"></i>
                                        <span class="text-light"> Xem </span>
                            </a>
                        </td>
                        <td>${dataFilter(formatMoney(room.price))}</td>
                        <td>${dataFilter(new Date(data.createDate).toLocaleDateString())}</td>
                           <td>
                                <button type="button" class="btn btn-danger m-1 delete-request">
                                    <i class="fas fa-trash-alt" ></i> Xóa
                                </button>
                           </td>
                        </tr>`;

            return ``;
        }).join("");
    }
    tableRequest.html(rs);

    deleteRequest();
}

function deleteRent() {
    $(".delete-rent").click(function () {
        index_now = $(this).parents("tr").attr("data-index");
        checkDelete = true;
        modalDelete.modal("show");
    })
}

function deleteRequest() {
    $(".delete-request").click(function () {
        index_now = $(this).parents("tr").attr("data-index");
        checkDelete = false;
        modalDelete.modal("show");
    })
}

function confirmDelete() {
    btnDelete.click(async function () {
        let test = false;
        let room = checkDelete ? rentList[index_now - 0] : requestList[index_now - 0];
        await tenantDelete(room.id)
            .then(function (rs) {
                if (rs.status === 200) {
                    test = true;
                }
            })
            .catch(function (e) {
                console.log(e);
            });

        if (test) {
            if (checkDelete)
                rentList = rentList.filter((data, index) => {
                    return index !== (index_now - 0);
                });
            else
                requestList = requestList.filter((data, index) => {
                    return index !== (index_now - 0);
                });
        }
        checkDelete ? showTableRent() : showTableRequest();
        modalDelete.modal("hide");
        alertReport(test, test ? "Huỷ thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        if (test)
            await notify_impl(room.host.email, checkDelete ? "Hủy thuê trọ" : "Hủy yêu cầu thuê trọ",
                `Vì lí do nào đó anh/chị ${user_now.name} đã hủy thuê/yêu cầu thuê trọ ${room.title} của bạn.
                Rất mong bạn thông cảm. Chúc bạn cho thuê trọ hiệu quả!!!`);
    })
}

async function loadRoomDTO() {
    if (user_now)
        await motelRoomFindByHost(user_now.id)
            .then(rs => {
                if (rs.status === 200) {
                    listRoomHost = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
}

function classifyRoom() {
    for (const r of listRoomHost)
        if (r.personIn === r.motelRoom.maxPerson)
            listRoomFull.push(r);
        else
            listRoomNotFull.push(r);
}

function showTableData() {
    tableData.empty();
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;
    let table;
    if (listRoomNotFull && listRoomNotFull.length > 0)
        rs = listRoomNotFull.map((data, index) => {
            let room = data.motelRoom;
            if (room)
                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>
                                <a target="_blank" href="/thong-tin-thue?id_room=${room.id}" 
                                        class="text-decoration-none text-light btn btn-primary m-1">
                                       <i class="far fa-eye"></i>
                                        <span class="text-light"> ${room.title} </span>
                                    </a>
                            </td>
                            <td>${numberFilter(formatMoney(room.price))}</td>
                            <td>${numberFilter(data.personIn) + "/" + numberFilter(room.maxPerson)}</td>
                        </tr>`;
            return ``;
        }).join("");
    table = `<table class="table table-bordered table-hover bg-white pt-2 pb-2">
                        <caption>Trọ còn trống</caption>
                        <thead>
                        <tr class=" text-success">
                            <th colspan="4">Trọ còn trống</th>
                        </tr>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Thông tin trọ</th>
                            <th scope="col">Giá tiền (VNĐ/tháng)</th>
                            <th scope="col">Số người hiện tại</th>
                        </tr>
                        </thead>
                        <tbody id="table-not-full">`
        + rs +
        `</tbody>
                    </table>
                    <hr>`;
    tableData.append(table);

    rs = `<tr><td colspan='3'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRoomFull && listRoomFull.length > 0)
        rs = listRoomFull.map((data, index) => {
            let room = data.motelRoom;
            if (room)
                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>
                                <a target="_blank" href="/thong-tin-thue?id_room=${room.id}" 
                                        class="text-decoration-none text-light btn btn-primary m-1">
                                        <i class="far fa-eye"></i>
                                        <span class="text-light"> ${room.title} </span>
                                    </a>
                            </td>
                            <td>${numberFilter(formatMoney(room.price))}</td>
                        </tr>`;
            return ``;
        }).join("");
    table = `<table class="table table-bordered table-hover bg-white pt-2 pb-2">
                        <caption>Trọ đầy</caption>
                        <thead>
                        <tr class=" text-success">
                            <th colspan="3">Trọ đầy</th>
                        </tr>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Thông tin trọ</th>
                            <th scope="col">Giá tiền (VNĐ/tháng)</th>
                        </tr>
                        </thead>
                        <tbody id="table-full">`
        + rs +
        `</tbody>
                    </table>
                    <hr>`;
    tableData.append(table);
}