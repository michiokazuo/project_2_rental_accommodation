let emailLogin, passwordLogin, btnLogin, linkForgotPassword, linkSignUp, emailForgotPassword, btnSubmitForgotPassword,
    nameSignUp, emailSignUp, passwordSignUp, passwordConfirmSignUp, avatarSignUp, btnSubmitSignUp, modalForgotPassword,
    modalSignUp, textPhone, dateBirthday, numberJob, textWorkplace, numberGender, numberStatus, numberRole, homeTown,
    load;
let listRole = [];
let user_now = {};

$(async function () {
    emailLogin = $("#username");
    passwordLogin = $("#password");
    btnLogin = $("#btn-log-in");
    linkForgotPassword = $("#btn-forgot");
    linkSignUp = $("#btn-sign-up");
    emailForgotPassword = $("#email-forgot-password");
    btnSubmitForgotPassword = $("#btn-submit-forgot-password");
    nameSignUp = $("#name-sign-up");
    emailSignUp = $("#email-sign-up");
    passwordSignUp = $("#password-sign-up");
    passwordConfirmSignUp = $("#password-confirm-sign-up");
    avatarSignUp = $("#avatar");
    btnSubmitSignUp = $("#btn-submit-sign-up");
    textPhone = $("#phone");
    textWorkplace = $("#workplace");
    numberGender = $("#gender");
    numberJob = $("#job");
    numberStatus = $("#status");
    dateBirthday = $("#birthday");
    numberRole = $("#role");
    modalForgotPassword = $("#modal-forgot-password");
    modalSignUp = $("#modal-sign-up");
    homeTown = $("#home-town");
    load = $("#load");

    await loadRole();
    login();
    signUp();
    submitSignUp();
    forgotPassword();
    submitForgotPassword();
    showSelectCustom(numberGender, listGender, "<>");
    showSelectCustom(numberJob, listJob, "<>");
    showSelectCustom(numberStatus, listStatus, "<>");
    showRoleList(numberRole, listRole, "<>");

    let url = new URL(window.location.href);
    var userSignUp = url.searchParams.get("dang-ky");
    if (userSignUp)
        linkSignUp.click();
})

async function loadRole() {
    await allRole()
        .then(rs => {
            if (rs.status === 200) {
                listRole = rs.data;
            }
        })
        .catch(e => {
            console.log("error load role")
        })
}

function forgotPassword() {
    linkForgotPassword.click(function () {
        modalForgotPassword.modal("show");
    })
}

function submitForgotPassword() {
    btnSubmitForgotPassword.click(async function () {
        let {val: valueEmailForgotPassword, check: checkEmailForgotPassword}
            = checkEmail(emailForgotPassword, "Email không hợp lệ.");
        if (checkEmailForgotPassword) {
            load.removeClass("d-none");
            await userForgotPassword(valueEmailForgotPassword)
                .then(rs => {
                    if (rs.status === 200) {
                        alertReport(true,
                            "Mật khẩu của bạn đã được thay đổi. Hãy vào email để biết mật khẩu mới!!!");
                    } else {
                        alertReport(false, "Có lỗi xảy ra. Mời kiểm tra lại email và gửi lại yêu cầu!!!");
                    }
                })
                .catch(e => {
                    alertReport(false, "Có lỗi xảy ra. Mời kiểm tra lại email và gửi lại yêu cầu!!!");
                    console.log(e);
                });
            modalForgotPassword.modal("hide");
            load.addClass("d-none");
        }
    })
}

function signUp() {
    linkSignUp.click(function () {
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
            valueAvatar = DEFAULT_AVATAR;
            if (checkAvatar) {
                await uploadFile(Array.from(avatarSignUp.prop('files')))
                    .then(rs => {
                        if (rs.status === 200) {
                            valueAvatar = rs.data[0];
                        } else {
                            valueAvatar = DEFAULT_AVATAR;
                        }
                    })
                    .catch(e => {
                        valueAvatar = DEFAULT_AVATAR;
                        console.log(e)
                    })
            }
            let user = {
                name: valueName,
                email: valueEmailSignUp,
                password: valuePasswordSignUp,
                avatar: valueAvatar,
                phone: valTextPhone,
                job: valJob,
                gender: valGender,
                status: valStatus,
                workplace: valWorkplace,
                birthday: valBirthday,
                role: listRole.find(r => r.id === (valRole - 0)),
                homeTown: valueHomeTown
            }

            let check = false;
            await userInsert(user)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                        user_now = rs.data;
                    }
                })
                .catch(e => {
                    console.log(e);
                })

            modalSignUp.modal("hide");
            if (check) {
                alertReport(check, "Đăng ký thành công. Vui lòng đợi giây lát...");
                check = false;
                let formData = new FormData();
                formData.append("username", valueEmailSignUp);
                formData.append("password", valuePasswordSignUp);

                await ajaxUploadFormData("/security-login", formData)
                    .then((rs) => {
                        if (rs.status === 200) {
                            check = true;
                            window.location.href = listHome.find(h => h.val === user_now.role.name).url;
                        }
                    }).catch(e => {
                        console.log(e);
                    });
                if (check) {
                    alertReport(true, "Đăng nhập thành công!!!");
                    await notify_impl(valueEmailSignUp, "Đăng ký thành công",
                        `Chào mừng bạn đến với hệ thống của chúng thôi.<br>
                         Click vào đây để vào <a href="http://localhost:8080/"><b>Trang chủ</b></a><br>
                         Chúc bạn tìm được phòng mà mình mong muốn!!!`);

                    window.location.href = listHome.find(h => h.val === user_now.role.name).url;
                } else
                    alertReport(false, "Có lỗi xảy ra. Vui lòng đăng nhập lại!!!");
            } else
                alertReport(check, "Đăng ký không thành công!!!");
        }
    })
}


function login() {
    btnLogin.click(async function () {
        let {
            val: valueEmailLogin,
            check: checkEmailLogin
        } = checkEmail(emailLogin, "Email không hợp lệ.");
        let {
            val: valuePasswordLogin,
            check: checkPasswordLogin
        } = checkPassword(passwordLogin,
            "Bạn nhập mật khẩu chưa đúng định dạng (tối thiểu 8 kí tự gồm cả số và chữ)");

        if (checkEmailLogin && checkPasswordLogin) {
            let formData = new FormData();
            formData.append("username", valueEmailLogin);
            formData.append("password", valuePasswordLogin);

            let check = false;
            await ajaxUploadFormData("/security-login", formData)
                .then((rs) => {
                    if (rs.status === 200) {
                        check = true;
                        user_now = rs.data;
                        window.location.href = listHome.find(h => h.val === user_now.role.name).url;
                    }
                }).catch(e => {
                    console.log(e);
                });

            alertReport(check,
                check ? "Đăng nhập thành công" : "Thông tin đăng nhập không chính xác. Mời kiểm tra lại!!!");
        }
    })
}