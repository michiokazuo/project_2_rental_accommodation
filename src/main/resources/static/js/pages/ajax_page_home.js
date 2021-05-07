let contentCategory, listP1;
let listCategory = [], listMotelRoomDTO = [];

$(document).ready(async function () {
    contentCategory = $("#specialoffer .container .row");
    listP1 = $("#proseller .carousel-inner .carousel-item .row .p-1");

    await getUserInSystem();
    await loadCategory();
    await loadMotelRoom();
    showCategory();
    showMotelRoom();

    $(document).scroll(function () {
        createNewInner("#proseller .carousel-inner", "#proseller .carousel-inner .carousel-item .row .p-1");
        // showMotelRoom();
    })

    var li = document.querySelectorAll("section#bestsellers .container .row .menu .bs-list li");
    for (let i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            for (let k = 0; k < li.length; k++) {
                li[k].classList.remove("actived");
            }
            this.classList.add("actived");
        }
    }
});

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

function showCategory() {
    let head = `<div class="col-12 text-center header">
                    <h3>Danh mục tìm kiếm</h3>
                </div>`;
    let content = `<div class="col-12 text-center header">
                    <h5>Có lỗi phát sinh. Không có dữ liệu hiển thị</h5>
                </div>`;

    if (listCategory && listCategory.length > 0) {
        content = listCategory.map((data, index) => {
            if (index < 3)
                return `<div class="part col-12 col-md-4 ">
                        <div class="row col-12 mx-auto" style="height: 375px;">
                            <div class="bg-${index + 1} bg-default"></div>
                            <a href="/tim-kiem?c_id=${data.id}"
                               class="mx-auto w-100 justify-content-center align-items-center d-flex">
                                <div class="text-content flex-column d-flex text-center">
                                    <p>${data.name}</p>
                                    <button class="btn" type="button"> Xem ngay
                                        <i class="fas fa-long-arrow-alt-right"></i>
                                    </button>
                                </div>
                            </a>
                        </div>
                    </div>`;
            return ``;
        }).join("");

        contentCategory.html(head + content);
    }
}

async function loadMotelRoom() {
    await motelRoomFindNewToHome('page=0&size=6&sort=createDate,desc')
        .then(rs => {
            if (rs.status === 200) {
                listMotelRoomDTO = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function showMotelRoom() {
    let content = `<div class="col-12 text-center header">
                    <h5>Có lỗi phát sinh. Không có dữ liệu hiển thị</h5>
                </div>`;

    if (listMotelRoomDTO && listMotelRoomDTO.length > 0) {
        for (let i = 0; i < listMotelRoomDTO.length; i++) {
            let room = listMotelRoomDTO[i].motelRoom;
            content = `<div class="card add-id-cart">
                            <a target="_blank" href="/thong-tin-thue?id_room=${room.id}">
                                                <div class="card-img click-product-cart col-12 mx-auto">
                                                    <img src="${room.images.split('<>')[0]}" alt="">
                                                    <i class="fas fa-eye"></i>
                                                </div>
                                            </a>

                                            <div class="card-body">
                                                <h5 class="card-title text-center">${room.title}</h5>
                                                <div class="info w-100 mx-auto row justify-content-center">
                                                    <div class="person">
                                                        <span>${numberFilter(listMotelRoomDTO[i].personIn)
                                                + "/" + numberFilter(room.maxPerson)}</span>
                                                        <i class="fas fa-user-alt"></i>
                                                    </div>
                                                    <div class="report ml-1">
                                                        <span>${numberFilter(listMotelRoomDTO[i].countReport)}</span>
                                                        <i class="far fa-comment"></i>
                                                    </div>
                                                    <div class="rating w-100 text-center">
                                                        <span>Đánh giá : ${checkRating(listMotelRoomDTO[i].ratings)}<span>
                                                        <span>(${numberFilter(listMotelRoomDTO[i].countRated)})</span>
                                                    </div>
                                                </div>
                                                <p class="card-text text-center">
                                                    ${formatMoney(numberFilter(room.price))} VNĐ/tháng
                                                    </p>
                                                <div class="card-wp">
                                                    <a target="_blank" href="/thong-tin-thue?id_room=${room.id}" 
                                                    class="click-add-cart btn" data-id="4">Xem</a>
                                                </div>
                                            </div>          
                       </div>`;
            listP1[i].innerHTML = content;
        }
    }
}

function divideitem(link, number) {
    var listitem = document.querySelectorAll(link);
    var content_cover = "";
    for (let i = 0; i < number; i++) {
        var content = "";
        for (let k = (6 / number) * i; k < (6 / number) * (i + 1); k++) {
            content += `<div class="p-1"> ${$(listitem[k]).html()} </div>`;
        }
        if (i === 0) {
            content_cover += `<div class="carousel-item active">
        <div class="row d-flex justify-content-center">
        ${content}
        </div></div>`;
        } else {
            content_cover += `<div class="carousel-item">
        <div class="row d-flex justify-content-center">
        ${content}
        </div></div>`;
        }
    }
    return content_cover;
}

function createNewInner(link1, link2) {
    var coverlist = document.querySelector(link1);
    if ($(window).width() > 991) {
        coverlist.innerHTML = divideitem(link2, 2);
    } else if ($(window).width() > 768 && $(window).width() <= 991) {
        coverlist.innerHTML = divideitem(link2, 3);
    } else if ($(window).width() < 768) {
        coverlist.innerHTML = divideitem(link2, 6);
    }
}

