let listGender = [
    {id: "1", name: "Nam"},
    {id: "2", name: "Nữ"},
    {id: "0", name: "Khác"}
];

let listStatus = [
    {id: "0", name: "Độc thân"},
    {id: "1", name: "Đã kết hôn"}
];

let listJob = [
    {id: "1", name: "Đi làm"},
    {id: "2", name: "Sinh viên"},
    {id: "0", name: "Nghỉ hưu"}
]

let listPrice = [
    {id: "1", name: "Dưới 1 triệu"},
    {id: "2", name: "Từ 1 - 3 triệu"},
    {id: "3", name: "Từ 3 - 5 triệu"},
    {id: "4", name: "Trên 5 triệu"}
]

let listPriority = [
    {id: "1", name: "Nam"},
    {id: "2", name: "Nữ"},
    {id: "3", name: "Khác"},
    {id: "4", name: "Sinh viên"},
    {id: "5", name: "Đi làm"},
    {id: "6", name: "Nghỉ hưu"},
    {id: "7", name: "Độc thân"},
    {id: "8", name: "Đã kết hôn"}
]

let listSort = [
    {id: "1", name: "Mới nhất", isASC: true},
    {id: "1", name: "Cũ nhất", isASC: false},
    {id: "2", name: "Giá giảm dần", isASC: false},
    {id: "2", name: "Giá tăng dần", isASC: true},
    {id: "3", name: "Gần nhất", isASC: true},
    {id: "3", name: "Xa nhất", isASC: false},
    {id: "4", name: "Trọ rộng nhất", isASC: true},
    {id: "4", name: "Trọ nhỏ nhất", isASC: false},
    {id: "5", name: "Trọ trống nhiều nhất", isASC: true},
    {id: "5", name: "Trọ trống ít nhất", isASC: false},
    {id: "6", name: "Trọ nhiều yêu cầu nhất", isASC: true},
    {id: "6", name: "Trọ ít yêu cầu nhất nhất", isASC: false}
]

const REGEX_POSITIVE_NUMBER = /^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/;
const ROLE_USER = "ROLE_RENTER";
const ROLE_HOST = "ROLE_HOST";
const ROLE_ADMIN = "ROLE_ADMIN";

let USER_IN_SYSTEM = null;

let listHome = [
    {val: "ROLE_ADMIN", url: "admin/quan-ly"},
    {val: "ROLE_RENTER", url: "nguoi-thue"},
    {val: "ROLE_HOST", url: "/host/chu-tro"}
]

const DEFAULT_AVATAR = './files/image_config/avatar-user.png';

$(async function () {
    $(".modal").on("hidden.bs.modal", function () {
        $("form.form-post").trigger("reset");
        $("form.form-post input").removeClass("is-invalid");
    });
})

function showSelectSort(element, list, defaultVal) {
    if (list && list.length > 0) {
        element.empty();
        element.append($('<option></option>').val("").text("- " + defaultVal + " -"));
        list.forEach(function (e) {
            element.append($('<option></option>').val(e.id + "/" + e.isASC).text(e.name));
        });
    }
}

async function getUserInSystem() {
    if (!USER_IN_SYSTEM)
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

function checkRole(acc, name) {
    if (acc)
        return acc.role.name === name;
    return false;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function dataFilter(field) {
    return field ? field : "";
}

function numberFilter(field) {
    return field ? field : 0;
}

function checkRating(rate) {
    return rate ? (parseFloat(rate).toFixed(1) + "/5") : 'Chưa có';
}

function reloadImage() {
    let file = document.getElementById("avatar").files[0];
    let img = document.getElementById("avatar-photo");
    let reader = new FileReader();
    reader.addEventListener("load", function () {
        img.src = reader.result;
    }, false)
    if (file) {
        reader.readAsDataURL(file);
    }
}

function formatMoney(money) {
    if (money >= 0) {
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
        return form.substring(0, form.length - 1);
    } else {
        return 0;
    }
}

// function showSelectOption(element, list, defaultVal) {
//     if (list && list.length > 0) {
//         element.empty();
//         element.append($('<option></option>').val("").text("- " + defaultVal + " -"));
//         list.forEach(function (e) {
//             element.append($('<option></option>').val(e.val).text(e.text));
//         });
//     }
// }

function showSelectCustom(element, list, defaultVal) {
    if (list && list.length > 0) {
        element.empty();
        element.append($('<option></option>').val("-1").text("- " + defaultVal + " -"));
        list.forEach(function (e) {
            element.append($('<option></option>').val(e.id).text(e.name));
        });
    }
}

function showCheckBox(element, list) {
    if (list && list.length > 0) {
        element.empty();
        let tmp = (0 | Math.random() * 9e6).toString(36);
        list.forEach(e => {
            element.append(`<div class="form-check form-check-inline p-1 col-6 col-md-4 col-lg-3 mr-0 row justify-content-center">
                                        <input class="form-check-input" type="checkbox" id="${tmp + e.id}"
                                               value="${e.id}">
                                        <label class="form-check-label" for="${tmp + e.id}">${e.name}</label>
                                    </div>`);
        })
    }
}

function showRoleList(element, list, defaultVal) {
    if (list && list.length > 0) {
        element.empty();
        element.append($('<option></option>').val("").text("- " + defaultVal + " -"));
        list.forEach(function (e) {
            if (e.name !== "ROLE_ADMIN")
                element.append($('<option></option>').val(e.id).text(e.content));
        });
    }
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
    let cnt = 0;
    const regex = /./;
    if (val.length > 0 && regex.test(val)) {
        check = true;
        for (const img of selector.prop('files')) {
            if (img.size / (1024 * 1024) >= 10) {
                textError = "File bạn chọn không được quá 10MB.";
                check = false;
                break;
            }
            cnt++;
            if (cnt > 4) {
                textError = "Số lượng file chọn không được quá 4.";
                check = false;
                break;
            }
        }
        check ? hiddenError(selector) : viewError(selector, textError);
    } else {
        viewError(selector, "Bạn chưa chọn files.");
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

async function getLocationCurr() {
    let rs = null;

    const getCoords = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }

    const getLocation = async () => {
        let pos = {};
        let position = await getCoords();
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;
        return pos;
    };

    await getLocation()
        .then(res => {
            rs = res;
        })
        .catch(e => {
            console.log(e)
        });

    return rs;
}

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
    file.forEach(f => {
        formData.append("files", f);
    })

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