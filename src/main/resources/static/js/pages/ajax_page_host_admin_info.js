let nameSignUp, emailSignUp, passwordSignUp, passwordConfirmSignUp, avatarSignUp, btnSubmitSignUp, modalSignUp,
    textPhone, dateBirthday, numberJob, textWorkplace, numberGender, numberStatus, numberRole, linkSignUp,
    avatarUserShow, callPhone, mailEmail, inputName, inputBirthday, inputGender, inputStatus, inputJob, inputWorkplace,
    inputRole, inputEmail, inputPhone, btnDelete, helloYou, nameShow, jobShow, workplaceShow, homeTown, inputHomeTown;

let listRole = [];
let user_now = {};

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
    inputStatus = $("#input-status");
    inputJob = $("#input-job");
    inputEmail = $("#input-email");
    inputPhone = $("#input-phone");
    btnDelete = $("#btn-delete");
    helloYou = $("#hello-you");
    nameShow = $("#name-show");
    workplaceShow = $("#workplace-show");
    jobShow = $("#job-show");
    homeTown = $("#home-town");
    inputHomeTown = $("#input-home-town");

    await getUserInSystem();
    await loadRole();
    await getUserNeedInfo();
    showSelectCustom(numberGender, listGender, "<>");
    showSelectCustom(numberJob, listJob, "<>");
    showSelectCustom(numberStatus, listStatus, "<>");
    showRoleList(numberRole, listRole, "<>");
    showInfoStatic();
    signUp();
    submitSignUp();
})

async function loadRole() {
    await allRole()
        .then(rs => {
            if (rs.status === 200) {
                listRole = rs.data;
            }
        })
        .catch(e => {
            console.log("error load role");
        })
}

async function getUserNeedInfo() {
    user_now = USER_IN_SYSTEM;
    if (!USER_IN_SYSTEM) {
        await userFindById(null)
            .then(rs => {
                if (rs.status === 200) {
                    user_now = rs.data;
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}

function showInfoStatic() {
    if (user_now) {
        inputName.val(dataFilter(user_now.name));
        inputBirthday.val(dataFilter(new Date(user_now.birthday).toLocaleDateString('fr-CA')));
        inputGender.val(dataFilter(listGender.find(sex => sex.id === user_now.gender).name));
        inputWorkplace.val(dataFilter(user_now.workplace));
        inputRole.val(dataFilter(user_now.role.content));
        avatarUserShow.attr("src", dataFilter("." + user_now.avatar));
        callPhone.attr("href", "tel:" + user_now.phone);
        mailEmail.attr("href", "mailto:" + user_now.email);
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
        $("#avatar-photo").attr("src", dataFilter("." + user_now.avatar));
        textPhone.val(dataFilter(user_now.phone));
        textWorkplace.val(dataFilter(user_now.workplace));
        numberGender.val(dataFilter(user_now.gender));
        numberJob.val(dataFilter(user_now.job));
        numberStatus.val(dataFilter(user_now.status));
        dateBirthday.val(dataFilter(new Date(user_now.birthday).toLocaleDateString('fr-CA')));
        numberRole.val(dataFilter(user_now.role.content));
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
            val: valueAvatar,
            check: checkAvatar
        } = checkFile(avatarSignUp, "File ảnh phải nhỏ hơn 10MB.");
        let {
            val: valueHomeTown,
            check: checkHomeTown
        } = checkData(homeTown, /./, "Bạn chưa nhập quê quán.");

        if (checkName && checkEmailSignUp && checkPasswordSignUp && checkPasswordConfirmSignUp && checkTextPhone
            && checkDateBirthday && checkStatus && checkStatus && checkWorkplace && checkGender && checkJob
            && checkHomeTown) {
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
