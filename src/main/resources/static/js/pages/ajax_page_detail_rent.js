let modalEditCMT, btnEditCMT, modalRent, btnRent, imgZoom03, imgGallery, infoBasic, category, convenient, personIn,
    maxPerson, area, priorityObject, createDate, rating, tableHost, tablePersonIn, numberCmt, comments, btnSubmitRent,
    modalDeleteCMT, btnDeleteCMT, message, btnSaveCMT, contentRent, share, rate, bar5, bar4, bar3, bar2, bar1, numBar1,
    numBar2, numBar3, numBar4, numBar5, modifyDate, personReq, address, TXAEditCMT, star1, star2, star3, star4, star5,
    editStar1, editStar2, editStar3, editStar4, editStar5, map, curLat, curLng, roomLat, roomLng, distance, editRate;

let idRoom, indexCMT, checkRent = -1; // 1: rented / 0: request /  -1: nope
let roomDTO, room, tenantList, reportList, rentedPerson, reqPerson, hostRoom;
let listImg = [];
let rate5 = 0, rate1 = 0, rate2 = 0, rate3 = 0, rate4 = 0;

$(document).ready(async function () {
    modalEditCMT = $("#modal-edit-cmt");
    btnEditCMT = $("#btn-edit-cmt")
    modalRent = $("#modal-rent");
    btnRent = $("#btn-rent")
    imgZoom03 = $("#zoom_03");
    imgGallery = $("#gallery_01");
    infoBasic = $("#info-basic")
    category = $("#category");
    convenient = $("#convenient");
    personIn = $("#person_in");
    maxPerson = $("#max_person")
    area = $("#area");
    priorityObject = $("#priority-object");
    createDate = $("#create-date");
    rating = $("#rating");
    tableHost = $("#table-host");
    tablePersonIn = $("#table-person-in");
    numberCmt = $("#number-cmt");
    comments = $("#comments");
    btnSubmitRent = $("#btn-submit-rent");
    modalDeleteCMT = $("#modal-delete-cmt");
    btnDeleteCMT = $("#btn-delete-cmt");
    message = $("#message");
    contentRent = $("#content-rent");
    share = $("#share");
    bar5 = $("#bar-5");
    bar4 = $("#bar-4");
    bar3 = $("#bar-3");
    bar2 = $("#bar-2");
    bar1 = $("#bar-1");
    numBar1 = $("#num-bar-1");
    numBar2 = $("#num-bar-2");
    numBar3 = $("#num-bar-3");
    numBar4 = $("#num-bar-4");
    numBar5 = $("#num-bar-5");
    modifyDate = $("#modify-date");
    personReq = $("#person_req");
    btnSaveCMT = $("#btn-save-cmt");
    address = $("#address");
    TXAEditCMT = $("#edit_cmt");
    star1 = $("#star1");
    star2 = $("#star2");
    star3 = $("#star3");
    star4 = $("#star4");
    star5 = $("#star5");
    editStar1 = $("#edit-star1");
    editStar2 = $("#edit-star2");
    editStar3 = $("#edit-star3");
    editStar4 = $("#edit-star4");
    editStar5 = $("#edit-star5");
    map = $("#show-map");
    distance = $("#distance");
    editRate = $("#edit-rate");

    let url = new URL(window.location.href);
    idRoom = url.searchParams.get("id_room");

    if (!idRoom) {
        // window.location.href = "/error";
    }

    changeImg();
    await loadRoomDTO();
    classifyRate();
    classifyRent();
    showInfoBasic();
    confirmDeleteCmt();
    confirmEditCMT();
    confirmRent();
    saveNewCmt();
    showLocation();
});

function showLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // New Map
            curLat = position.coords.latitude;
            curLng = position.coords.longitude;
            // var myOptions = {
            //     center: new google.maps.LatLng(lat, lng),
            //     zoom: 20,
            //     mapTypeId: google.maps.MapTypeId.ROADMAP
            // };
            // var show_map = new google.maps.Map(document.getElementById("show-map"),myOptions);
            //
            // var myMarkerLatlng = new google.maps.LatLng(lat,lng);
            // var marker = new google.maps.Marker({
            //     position: myMarkerLatlng,
            //     map: show_map,
            //     title: 'Hello World!'
            // });
        });
    } else {
        map.text("Geolocation is not supported by this browser.");
    }

    if (room) {
        let tmp = room.location.split("<>");
        roomLat = parseFloat(tmp[0]);
        roomLng = parseFloat(tmp[1]);
        var myOptions = {
            center: new google.maps.LatLng(roomLat, roomLng),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var show_map = new google.maps.Map(document.getElementById("show-map"), myOptions);

        var myMarkerLatlng = new google.maps.LatLng(roomLat, roomLng);
        var marker = new google.maps.Marker({
            position: myMarkerLatlng,
            map: show_map,
            title: 'Hello World!'
        });
    }
}

function classifyRate() {
    let tmp = [];
    if (reportList)
        for (const r of reportList) {
            if (!tmp.find(t => t.user.id === r.user.id))
                switch (r.rate) {
                    case 1:
                        rate1++;
                        tmp.push(r);
                        break;
                    case 2:
                        rate2++;
                        tmp.push(r);
                        break;
                    case 3:
                        rate3++;
                        tmp.push(r);
                        break;
                    case 4:
                        rate4++;
                        tmp.push(r);
                        break;
                    case 5:
                        rate5++;
                        tmp.push(r);
                        break;
                    default:
                        tmp.push(r);
                        break;
                }
        }
}

function classifyRent() {
    if (tenantList)
        for (const t of tenantList) {
            switch (t.status) {
                case 1:
                    rentedPerson.push(t);
                    if (USER_IN_SYSTEM && t.user.id === USER_IN_SYSTEM.id)
                        checkRent = 1;
                    break;
                default:
                    reqPerson.push(t);
                    if (USER_IN_SYSTEM && t.user.id === USER_IN_SYSTEM.id)
                        checkRent = 0;
                    break;
            }
        }
}

function changeImg() {
    $("#gallery_01 img").click(function () {
        imgZoom03.attr("src", $(this).attr("src"));
    })
}

async function loadRoomDTO() {
    await motelRoomFindById(idRoom)
        .then(rs => {
            if (rs.data === 200) {
                roomDTO = rs.data;
                room = roomDTO.motelRoom;
                tenantList = roomDTO.tenantList;
                reportList = roomDTO.reportList;
                listImg = room.images.split("<>");
                hostRoom = room.host;
            }
        })
        .catch(e => {
            console.log(e);
        })

    if (!idRoom) {
        // window.location.href = "/error";
    }
}

function showInfoBasic() {
    if (listImg && listImg.length > 0) {
        imgZoom03.attr("src", listImg[0]);
        for (let i = 0; i < listImg.length; i++)
            imgGallery.children()[i].attr("src", listImg[i]);
    }
    if (room) {
        infoBasic.html(`<span class="fp__cap">${dataFilter(room.title)}</span>
                            <i class="fp__price">
                                ${formatMoney(dataFilter(room.price))} VNĐ/tháng
                            </i>
                            <p class="text-secondary" style="font-size: var(--font-16);">${dataFilter(room.description)}</p>
                            <a class="fp__label click-add-cart btn" data-id="${room.id}" id="btn-rent"> 
                                ${checkRent ? (checkRent > 0 ? "Hủy thuê" : "Yêu cầu thuê") : "Hủy yêu cầu"}
                            </a>`);
        category.text(dataFilter(room.category.name));
        if (room.convenientList) {
            convenient.empty();
            for (let conv of room.convenientList)
                convenient.append(`<span class="badge bg-primary">${conv.name}</span>`);
        }
        share.html(`<a th:href="@{https://www.facebook.com/sharer/sharer.php?u=http://localhost:8080/thong-tin-thue?id_room=${room.id}}"
                                 title="chia sẻ trên Facebook" class="sicons"><i class="fab fa-facebook-f"></i></a>
                     <a th:href="@{https://twitter.com/share?text=Phòng trọ&amp;url=http://localhost:8080/thong-tin-thue?id_room=${room.id}"
                           title="chia sẻ trên Twitter" class="sicons"><i class="fab fa-twitter"></i></a>`);
        rate.html(`<h1 class="text-center p-0">${roomDTO.ratings}/5</h1>
                      <p class="text-center">(${roomDTO.countRated})</p>`);

        if (roomDTO.countRated) {
            numBar1.text(numberFilter(rate1));
            bar1.css("width", rate1 / roomDTO.countRated + "%");
            numBar2.text(numberFilter(rate2));
            bar2.css("width", rate2 / roomDTO.countRated + "%");
            numBar3.text(numberFilter(rate3));
            bar3.css("width", rate3 / roomDTO.countRated + "%");
            numBar4.text(numberFilter(rate4));
            bar4.css("width", rate4 / roomDTO.countRated + "%");
            numBar5.text(numberFilter(rate5));
            bar5.css("width", rate5 / roomDTO.countRated + "%");
        }

        personIn.text(numberFilter(roomDTO.personIn));
        maxPerson.text(numberFilter(room.maxPerson));
        area.html(`${numberFilter(room.area)}<sup>2</sup>`);
        priorityObject.text(dataFilter(room.priorityObject).replace("<>", ", "));
        createDate.text(dataFilter(new Date(room.createDate).toLocaleDateString()));
        modifyDate.text(dataFilter(new Date(room.modifyDate).toLocaleDateString()));
        address.text(dataFilter(room.address));
        personReq.text(numberFilter(reqPerson.length));
        distance.text(numberFilter(getDistanceFromLatLonInKm(curLat, curLng, roomLat, roomLng).toFixed(1)));

        let rs = `<tr><td colspan='6'><strong>Không có dữ liệu</strong></td></tr>`;
        if (hostRoom)
            rs = `<tr>
                     <th scope="row">${dataFilter(host.name)}</th>
                      <td><img src="${dataFilter(host.avatar)}"
                                 alt="" width="80px"></td>
                      <td><a href="tel:${dataFilter(host.phone)}">${dataFilter(host.phone)}</a></td>
                      <td><a href="mail:${dataFilter(host.email)}">${dataFilter(host.email)}</a></td>
                      <td>${listJob.find(j => j.val === host.job)}</td>
                       <td>
                       <a target="_blank" href="/thong-tin-ca-nhan?id_user=${dataFilter(host.id)}" 
                            class="text-decoration-none text-light btn btn-success m-1">
                                        <i class="fas fa-tasks"></i>
                                        <span class="text-light"> Xem </span>
                            </a>
                       </td>
                     </tr>`;

        tableHost.html(rs);
        rs = `<tr><td colspan='6'><strong>Không có dữ liệu</strong></td></tr>`;
        if (rentList && rentList > 0)
            rs = reportList.map((data, index) => {
                let user = data.user;
                if (user)
                    return `<tr>
                     <th scope="row">${dataFilter(user.name)}</th>
                      <td><img src="${dataFilter(user.avatar)}"
                                 alt="" width="80px"></td>
                      <td><a href="tel:${dataFilter(user.phone)}">${dataFilter(user.phone)}</a></td>
                      <td><a href="mail:${dataFilter(user.email)}">${dataFilter(user.email)}</a></td>
                      <td>${listJob.find(j => j.val === user.job)}</td>
                       <td>${dataFilter(user.homeTown)}</td>
                     </tr>`
                return ``;
            }).join("");

        tablePersonIn.html(rs);
    }
    editRent();
}

function showCMT() {
    let rs = `<h3>Hiện tại chưa có bình luận nào</h3>`;
    if (reportList && reportList.length > 0) {
        numberCmt.text(reportList.length + " Comments.");
        rs = reportList.map((data, index) => {
            let user = data.user;
            return `<div class="media p-2 row justify-content-center align-items-center">
                            <a class="media col-md-2 mx-auto row flex-column justify-content-center align-items-center">
                                <img class="media-object" src="${dataFilter(user.avatar)}"
                                     alt="">
                                <div class="text-center">
                                    <p class="text-left ">
                                        <span class="fa fa-star ${data.rate >= 4 ? "star-active" : "star-inactive"}"></span>
                                        <span class="fa fa-star ${data.rate >= 4 ? "star-active" : "star-inactive"}"></span>
                                        <span class="fa fa-star ${data.rate >= 4 ? "star-active" : "star-inactive"}"></span>
                                        <span class="fa fa-star ${data.rate >= 4 ? "star-active" : "star-inactive"}"></span>
                                        <span class="fa fa-star ${data.rate >= 4 ? "star-active" : "star-inactive"}"></span>
                                    </p>
                                </div>
                            </a>
                            <div class="media-body col-md-10 mx-auto row">
                                <h4 class="media-heading col-12">${dataFilter(user.name)}</h4>
                                <p class="col-12">${dataFilter(data.comment)}</p>
                                <ul class="list-unstyled list-inline media-detail col-sm-6 row">
                                    <li><i class="fa fa-calendar pr-1"></i>
                            ${dataFilter(new Date(data.modifyDate).toLocaleDateString())}</li>
                                </ul>
                                <ul class="list-unstyled list-inline media-detail col-sm-6 row justify-content-end" 
                                data-index="${index}" 
                                style="${USER_IN_SYSTEM && USER_IN_SYSTEM.id === user.id ? "" : "display:none"}">
                                    <li class=""><a th:href="#" class="edit-cmt">Chỉnh sửa</a></li>
                                    <li class=""><a th:href="#" class="delete-cmt">Xóa</a></li>
                                </ul>
                            </div>
                        </div>`;
        }).join("");
    }

    comments.html(rs);

    editReport();
    deleteCmt();
}

function editRent() {
    btnRent.click(function () {
        contentRent.text(checkRent ? (checkRent > 0 ? "Bạn có thực sự muốn hủy thuê trọ này không ?"
            : "Bạn có thực sự muốn yêu cầu thuê trọ này không ?")
            : "Bạn có thực sự muốn hủy yêu cầu thuê trọ này không ?");
        modalRent.modal("show");
    })
}

function confirmRent() {
    btnSubmitRent.click(async function () {
        let check = false;
        let tenant = {
            id: {idUser: USER_IN_SYSTEM.id, idRoom: room.id},
            user: USER_IN_SYSTEM,
            room: room,
            status: false,
            delete: false
        }
        if (!checkRent || checkRent > 0) {
            await tenantDelete(tenant.id)
                .then(function (rs) {
                    if (rs.status === 200) {
                        check = true;
                    }
                })
                .catch(function (e) {
                    console.log(e);
                });

            if (check) {
                alertReport(check, check ? "Huỷ thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
                await notify_impl(room.host.email, checkRent > 0 ? "Hủy thuê trọ" : "Hủy yêu cầu thuê trọ",
                    "Vì lí do nào đó anh/chị " + user_now.name + " đã hủy thuê/yêu cầu thuê trọ của bạn. " +
                    "Rất mong bạn thông cảm. Chúc bạn cho thuê trọ hiệu quả!!!");
                await loadRoomDTO();
            }
        } else {
            await tenantInsert(tenant)
                .then(function (rs) {
                    if (rs.status === 200) {
                        check = true;
                    }
                })
                .catch(function (e) {
                    console.log(e);
                });

            if (check) {
                alertReport(check, check ? "Yêu cầu thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
                await notify_impl(room.host.email, "Yêu cầu thuê trọ",
                    "Anh/chị " + USER_IN_SYSTEM.name + " đã yêu cầu thuê trọ của bạn. " +
                    "Mong bạn xem xét. Chúc bạn cho thuê trọ hiệu quả!!!");
                await loadRoomDTO();
            }
        }

        modalRent.modal("hide");
        showInfoBasic();
        showCMT();
    })
}

function editReport() {
    $(".edit-cmt").click(function () {
        indexCMT = $(this).parents("ul").attr("data-index") - 0;
        TXAEditCMT.val(dataFilter(reportList[indexCMT].comment));
        switch (reportList[indexCMT].rate) {
            case 1:
                editStar1.prop("checked", true);
                break;
            case 2:
                editStar2.prop("checked", true);
                break;
            case 3:
                editStar3.prop("checked", true);
                break;
            case 4:
                editStar4.prop("checked", true);
                break;
            case 5:
                editStar5.prop("checked", true);
                break;
            default:
                break;
        }
        modalEditCMT.modal("show");
    })
}

function confirmEditCMT() {
    btnEditCMT.click(async function () {
        let {
            val: valueCmt,
            check: checkCmt
        } = checkData(TXAEditCMT, /./, "Bạn chưa nhập nội dung bình luận.");
        let valRate = 0;
        if (editStar5.is(":checked"))
            valRate = 5;
        else if (editStar4.is(":checked"))
            valRate = 4;
        else if (editStar3.is(":checked"))
            valRate = 3;
        else if (editStar2.is(":checked"))
            valRate = 2;
        else if (editStar1.is(":checked"))
            valRate = 1;
        // Array.from(editRate).forEach(e => {
        //     if (e.is("input") && e.is(":checked"))
        //         valRate = valRate > (e.val() - 0) ? valRate : (e.val() - 0);
        // })


        if (!valRate)
            viewError(editStar5, "Bạn chưa đánh giá trọ thuê.");
        else if (checkCmt) {
            let check = false;
            let report_up = reportList[indexCMT];
            report_up.comment = valueCmt;
            report_up.rate = valRate;
            await reportUpdate(report_up)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            modalEditCMT.modal("hide");
            alertReport(check, check ? "Chỉnh sửa bình luận thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
            if (check)
                await loadRoomDTO();
            showInfoBasic();
            showCMT();
        }
    })
}

function deleteCmt() {
    $(".delete-cmt").click(function () {
        indexCMT = $(this).parents("ul").attr("data-index") - 0;
        modalDeleteCMT.modal("show");
    })
}

function confirmDeleteCmt() {
    btnDeleteCMT.click(async function () {
        let check = false;
        await reportDelete(reportList[indexCMT])
            .then(rs => {
                if (rs.status === 200) {
                    check = true;
                }
            })
            .catch(e => {
                console.log(e);
            })
        modalDeleteCMT.modal("hide");
        alertReport(check, check ? "Xóa bình luận thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        if (check)
            await loadRoomDTO();
        showInfoBasic();
        showCMT();
    })
}

function saveNewCmt() {
    btnSaveCMT.click(async function () {
        let {
            val: valueCmt,
            check: checkCmt
        } = checkData(message, /./, "Bạn chưa nhập nội dung bình luận.");
        let valRate = 0;
        if (star5.is(":checked"))
            valRate = 5;
        else if (star4.is(":checked"))
            valRate = 4;
        else if (star3.is(":checked"))
            valRate = 3;
        else if (star2.is(":checked"))
            valRate = 2;
        else if (star1.is(":checked"))
            valRate = 1;

        if (!valRate)
            viewError(star5, "Bạn chưa đánh giá trọ thuê.");
        else if (checkCmt) {
            let check = false;
            let report_new = {
                user: USER_IN_SYSTEM,
                room: room,
                rate: valRate,
                comment: valueCmt
            }
            await reportInsert(report_new)
                .then(rs => {
                    if (rs.status === 200) {
                        check = true;
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            alertReport(check, check ? "Thêm bình luận thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
            if (check)
                await loadRoomDTO();
            showInfoBasic();
            showCMT();
        }
    })
}