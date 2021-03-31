let listGender = [
    {val: "1", text: "Nam"},
    {val: "2", text: "Nữ"},
    {val: "0", text: "Khác"}
];

let listStatus = [
    {val: "0", text: "Độc thân"},
    {val: "1", text: "Đã kết hôn"}
];

let listJob = [
    {val: "1", text: "Đi làm"},
    {val: "2", text: "Sinh viên"},
    {val: "0", text: "Nghỉ hưu"}
]

let USER_IN_SYSTEM = null;
let emailSignUpSuggest, btnSubmitSuggest;

let listHome = [
    {val: "ROLE_ADMIN", url: "/quan-ly"},
    {val: "ROLE_RENTER", url: "/nguoi-thue"},
    {val: "ROLE_HOST", url: "/chu-tro"}
]

const DEFAULT_AVATAR = './files/image_config/avatar-user.png';

$(async function () {
    emailSignUpSuggest = $("#email_suggest");
    btnSubmitSuggest = $("#btn-submit-suggest");

    $(".modal").on("hidden.bs.modal", function () {
        $("form.form-post").trigger("reset");
        $("form.form-post input").removeClass("is-invalid");
    });

    await getUserInSystem();
    showUer();
    signUpSuggest();
})

async function getUserInSystem() {
    await userFindById(null)
        .then(rs => {
            if (rs.status === 200) {
                USER_IN_SYSTEM = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function signUpSuggest() {
    btnSubmitSuggest.click(async function () {
        let {
            val: valueEmailSuggest,
            check: checkEmailSuggest
        } = checkDataTool(emailSignUpSuggest, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Email không hợp lệ");

        if (checkEmailSuggest) {
            alertReport(true, "Cảm ơn bạn đã đăng ký!!!");
            let check = await notify_impl(valueEmailSuggest, "Đăng ký nhận tin tức mới",
                "Chào bạn! Chúc mừng bạn đã đăng kí thành công và sẽ được nhận tin tức mới thường từ chúng tôi."
                + "Chúc bạn có 1 ngày làm việc hiệu quả!!!");

            // alertReport(check, check ? "Bạn đã đăng ký thành công. Thường xuyên kiểm tra email nhé!!!"
            //     : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        }
    })
}

function showUer() {
    if (USER_IN_SYSTEM) {
        $("#acc-top .title").text(USER_IN_SYSTEM.name);
        $("#content-menu-user").html(`<a class="item" href="/thong-tin-ca-nhan">Thông tin cá nhân</a>
                    <a class="item" href="/dang-xuat">Đăng xuất</a>`);
    }
}

function dataFilter(field) {
    return field ? field : "";
}

function numberFilter(field) {
    return field ? field : 0;
}

function checkRating(rate) {
    return rate ? (rate + "/5") : 'Chưa có';
}

function formatMoney(money) {
    if (money !== 0) {
        money = String(money);

        var form = "";
        for (let i = 0; i < money.length % 3; i++) {
            form += money.substring(0, money.length % 3) + ".";
            i = i + money.length % 3;
        }
        for (let i = money.length % 3; i < money.length; i++) {
            form += money.substring(i, i + 3) + ".";

            i = i + 2;
        }
        return form + "000";
    } else {
        return 0;
    }
}

function showSelectOption(element, list, defaultVal) {
    element.empty();
    element.append($('<option></option>').val("").text("- " + defaultVal + " -"));
    list.forEach(function (e) {
        element.append($('<option></option>').val(e.val).text(e.text));
    });
}

function showRoleList(element, list, defaultVal) {
    element.empty();
    element.append($('<option></option>').val("").text("- " + defaultVal + " -"));
    list.forEach(function (e) {
        if (e.name !== "ROLE_ADMIN")
            element.append($('<option></option>').val(e.id).text(e.content));
    });
}

function checkData(selector, regex, textError) {
    let val = $(selector).val().trim();
    let check = false;
    if (val.length > 0 && regex.test(val)) {
        check = true;
        hiddenError(selector);
    } else {
        viewError(selector, textError);
    }

    return {val, check};
}

function checkDataTool(selector, regex, textError) {
    let val = $(selector).val().trim();
    let check = false;
    if (val.length > 0 && regex.test(val)) {
        check = true;
        hiddenError(selector);
    } else {
        viewErrorTool(selector, textError);
    }

    return {val, check};
}

function checkEmail(selector, textError) {
    let val = $(selector).val().trim();
    let check = false;
    if (val.length > 0 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)) {
        check = true;
        hiddenError(selector);
    } else {
        viewError(selector, textError);
    }

    return {val, check};
}

function checkPhone(selector, textError) {
    let val = $(selector).val().trim().replace('+84', '0');
    let check = false;
    if (val.length > 0 && /((09|03|07|08|05)+([0-9]{8})\b)/g.test(val)) {
        check = true;
        hiddenError(selector);
    } else {
        viewError(selector, textError);
    }

    return {val, check};
}

function checkPassword(selector, textError) {
    let val = $(selector).val();
    let check = false;
    const regex_password = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (val.length > 0 && regex_password.test(val)) {
        check = true;
        hiddenError(selector);
    } else {
        viewError(selector, textError);
    }
    return {val, check};
}

function checkPasswordConfirm(selector, password, textError) {
    let val = $(selector).val();
    let check = false;
    if (val.length > 0 && val === password) {
        check = true;
        hiddenError(selector);
    } else {
        viewError(selector, textError);
    }
    return {val, check};
}

function checkBirthday(selector, textError) {
    let val = $(selector).val();
    let check = false;
    const regex_birthday = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    if (val.length > 0 && regex_birthday.test(val) && age(new Date(val), new Date()) >= 18) {
        check = true;
        hiddenError(selector);
    } else {
        viewError(selector, textError);
    }
    return {val, check};
}

function checkFile(selector, textError) {
    let val = $(selector).val();
    let check = false;
    const regex = /./;
    if (val.length > 0 && regex.test(val)) {
        check = true;
        for (const img of selector.prop('files')) {
            if (img.size / (1024 * 1024) >= 10) {
                check = false;
                break;
            }
        }
        check ? hiddenError(selector) : viewError(selector, textError);
    }
    return {val, check};
}

function viewError(selector, text) {
    $(selector).addClass("is-invalid");
    $(selector).siblings(".invalid-feedback").html(text + " Mời nhập lại!!!");
}

function viewErrorTool(selector, text) {
    $(selector).addClass("is-invalid");
    $(selector).siblings(".invalid-tooltip").html(text + " Mời nhập lại!!!");
}

function hiddenError(selector) {
    $(selector).removeClass("is-invalid");
}

function age(start, end) {
    return new Date(end).getFullYear() - new Date(start).getFullYear();
}

async function notify_impl(emails, header, content) {
    let formData = new FormData();
    formData.append("emails", emails);
    formData.append("header", header);
    formData.append("content", content);

    let check = false;
    await notify(formData).then((rs) => {
        if (rs.status === 200) {
            check = true;
            console.log(rs.data);
        } else console.log("no content");
    }).catch(e => {
        console.log(e);
    });

    return check;
}

const URL_API = "/api";
const URL_PUBlIC = "/public";
const URL_PRIVATE = "/private";

async function ajaxGet(url) {
    let rs = null;
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + url,
        timeout: 30000,
        cache: false,
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

async function ajaxPost(url, data) {
    let rs = null;
    await $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: URL_API + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

async function ajaxPut(url, data) {
    let rs = null;
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        url: URL_API + url,
        timeout: 30000,
        contentType: "application/json",
        miniType: "application/json",
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

async function ajaxDelete(url, data) {
    let rs = null;
    await $.ajax({
        type: 'DELETE',
        data: JSON.stringify(data),
        url: URL_API + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

async function ajaxUploadFormData(url, formData) {
    let rs = null;
    await $.ajax({
        type: "POST",
        url: URL_API + url,
        data: formData,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        processData: false,
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

async function ajaxUploadFile(url, file) {
    let formData = new FormData();
    formData.append("files", file);
    let rs = null;
    await $.ajax({
        type: "POST",
        url: URL_API + url,
        data: formData,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        processData: false,
        success: function (result, textStatus, xhr) {
            rs = {
                data: result,
                status: xhr.status
            }
        }
    });
    return rs;
}

function alertReport(isSuccess, text) {
    let alert = $("#alert-report");
    let result = `<div class="alert alert-${isSuccess ? "success" : "danger"} animate-report">
                    <strong>!</strong> ${text}
                  </div>`;
    alert.prepend(result);
    let firstElement = alert.children().first();
    setTimeout(function () {
        firstElement.remove();
    }, 3000);
}