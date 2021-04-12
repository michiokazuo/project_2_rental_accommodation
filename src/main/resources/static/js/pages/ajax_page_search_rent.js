let grid, list, textSearch, selectCategory, maxPerson, selectPrice, checkBoxPriority, checkBoxConvenient, resetForm,
    btnSearch, result, selectSort, gridShow, listShow, dataGrid, dataList, pagination, numberInPage, curLat, curLng,
    floor;

const MAX_SIZE_GRID = 9;
const MAX_SIZE_LIST = 6;

let typeShow = 1;// 1- grid, -1 - list
let idCategory, indexPag = 1, pageGrid, pageList;

let listRoomNow = [];
let listCategory = [], listMotelRoomDTO = [], listConvenient = [];

$(async function () {
    grid = $("#grid");
    list = $("#list");
    textSearch = $("#search");
    selectCategory = $("#category");
    maxPerson = $("#max_person");
    selectPrice = $("#price");
    checkBoxPriority = $("#check-priority");
    checkBoxConvenient = $("#check-convenient");
    resetForm = $("#delete");
    btnSearch = $("#btn-search");
    result = $("#result");
    selectSort = $("#sort");
    gridShow = $("#grid-show");
    listShow = $("#list-show");
    dataGrid = $("#data-grid");
    dataList = $("#data-list");
    pagination = $("#num_pagi");
    numberInPage = $("#tt-list");
    floor = $("#floor");

    let url = new URL(window.location.href);
    idCategory = url.searchParams.get("c_id");
    await getUserInSystem();
    await loadCategory();
    await loadMotelRoom();
    await loadConvenient();
    await getLocationUser();

    showSelectCustom(selectCategory, listCategory, "Danh mục");
    showSelectCustom(selectPrice, listPrice, "Giá thuê");
    showSelectSort(selectSort, listSort, "Sắp xếp");
    showCheckBox(checkBoxPriority, listPriority);
    showCheckBox(checkBoxConvenient, listConvenient);
    search();
    if (idCategory) {
        selectCategory.val(idCategory);
        if (listCategory.find(c => c.id === (selectCategory.val() - 0)).name.toUpperCase()
            .search("nhà".toUpperCase()) >= 0) {
            $("#pa_floor").removeClass("d-none");
            $("#pa_person").removeClass("d-none");
        } else {
            var paPerson = $("#pa_person");
            $("#pa_floor").addClass("d-none");
            paPerson.addClass("d-none");
            if (listCategory.find(c => c.id === (selectCategory.val() - 0)).name.toUpperCase()
                .search("ghép".toUpperCase()) >= 0)
                paPerson.removeClass("d-none");
            else paPerson.addClass("d-none");
        }
        btnSearch.click();
    }

    selectCategory.change(function () {
        var categorySearch = listCategory.find(c => c.id === (selectCategory.val() - 0));
        if (categorySearch && categorySearch.name.toUpperCase().search("nhà".toUpperCase()) >= 0) {
            $("#pa_floor").removeClass("d-none");
            $("#pa_person").removeClass("d-none");
        } else {
            var paPerson = $("#pa_person");
            $("#pa_floor").addClass("d-none");
            paPerson.addClass("d-none");
            if (categorySearch && categorySearch.name.toUpperCase().search("ghép".toUpperCase()) >= 0)
                paPerson.removeClass("d-none");
            else paPerson.addClass("d-none");
        }

    })

    choice();
    loadLRNow();
    showMotelRoom();
    showPag();
    changeView();
    resetFormSearch();
    sort();
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

async function loadMotelRoom() {
    await motelRoomFindAll()
        .then(rs => {
            if (rs.status === 200) {
                listMotelRoomDTO = rs.data;
                pageGrid = Math.ceil(listMotelRoomDTO.length / MAX_SIZE_GRID);
                pageList = Math.ceil(listMotelRoomDTO.length / MAX_SIZE_LIST);
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function showPag() {
    let tmp = typeShow > 0 ? pageGrid : pageList;
    pagination.empty();
    pagination.append(`<li class="page-item paginationjs-prev" data-item="0"><button class="page-link">«</button>
    </li>`);
    for (let i = 1; i <= tmp; i++)
        pagination.append(`<li class="page-item ${indexPag === i ? "active" : ""}" data-item="${i}"><button class="page-link" >${i}</button></li>`);
    pagination.append(`<li class="page-item paginationjs-next" data-item="${tmp + 1}"><button class="page-link">»</button></li>`);

    movePage();
}

function movePage() {
    $(".page-item").click(function () {
        let tmp = typeShow > 0 ? pageGrid : pageList;
        let index = $(this).attr("data-item") - 0;
        if (index !== indexPag) {
            if (!(index === 0 && indexPag === 1) && !(index === tmp + 1 && indexPag === tmp)) {
                if (index === 0) {
                    indexPag--;
                } else if (index === tmp + 1) {
                    indexPag++;
                } else {
                    indexPag = index;
                }
                $(".page-item").removeClass("active");
                if (indexPag)
                    $('.page-item[data-item=' + indexPag + ']').addClass("active");
                loadLRNow();
                showMotelRoom();
            }
        }
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

function changeView() {
    grid.click(function () {
        if (typeShow < 0) {
            typeShow = 1;
            grid.addClass("displayed");
            list.removeClass("displayed");
            gridShow.removeClass("d-none");
            listShow.addClass("d-none");
            showPag();
            loadLRNow();
            showMotelRoom();
        }
    })

    list.click(function () {
        if (typeShow > 0) {
            typeShow = -1;
            list.addClass("displayed");
            grid.removeClass("displayed");
            listShow.removeClass("d-none");
            gridShow.addClass("d-none");
            showPag();
            loadLRNow();
            showMotelRoom();
        }
    })
}

function choice() {
    const customSelects = document.querySelectorAll("select");
    const deleteBtn = document.getElementById('delete')
    const choices = new Choices('select',
        {
            searchEnabled: false,
            itemSelectText: '',
            removeItemButton: true,
        });
    for (let i = 0; i < customSelects.length; i++) {
        customSelects[i].addEventListener('addItem', function (event) {
            if (event.detail.value) {
                let parent = this.parentNode.parentNode
                parent.classList.add('valid')
                parent.classList.remove('invalid')
            } else {
                let parent = this.parentNode.parentNode
                parent.classList.add('invalid')
                parent.classList.remove('valid')
            }
        }, false);
    }
    // deleteBtn.addEventListener("click", function (e) {
    //     e.preventDefault()
    //     const deleteAll = document.querySelectorAll('.choices__button')
    //     for (let i = 0; i < deleteAll.length; i++) {
    //         deleteAll[i].click();
    //     }
    // });
}

function resetFormSearch() {
    resetForm.click(function () {
        $("form.form-post").trigger("reset");
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

function distance(room) {

    let tmp = room.location.split("<>");
    roomLat = parseFloat(tmp[0]);
    roomLng = parseFloat(tmp[1]);

    return parseFloat(getDistanceFromLatLonInKm(curLat, curLng, roomLat, roomLng)).toFixed(1);
}

function search() {
    btnSearch.click(async function () {
        listMotelRoomDTO = [];
        let valAddress = textSearch.val().trim();
        let valCategory = selectCategory.val().trim();
        let valPrice = selectPrice.val().trim();
        let valMaxPerson = maxPerson.val().trim();
        let valFloor = floor.val().trim();
        let valPriority = "", valConvenient = "";
        Array.from(checkBoxPriority.children()).forEach(cb => {
            if ($(cb).children("input:checkbox").prop("checked"))
                valPriority += ($(cb).children("input:checkbox")[0].value + "<>");
        });
        Array.from(checkBoxConvenient.children()).forEach(cb => {
            if ($(cb).children("input:checkbox").prop("checked"))
                valConvenient += ($(cb).children("input:checkbox")[0].value + ",");
        });

        let q = (valAddress && valAddress.length ? ("address=" + valAddress + "&") : "")
            + (REGEX_POSITIVE_NUMBER.test(valCategory) ? ("category=" + valCategory + "&") : "")
            + (REGEX_POSITIVE_NUMBER.test(valMaxPerson) ? ("max_person=" + valMaxPerson + "&") : "")
            + (REGEX_POSITIVE_NUMBER.test(valFloor) ? ("floor=" + valFloor + "&") : "")
            + (REGEX_POSITIVE_NUMBER.test(valPrice) ? ("price=" + valPrice + "&") : "")
            + (valPriority && valPriority.length ? ("priority=" +
                valPriority.substring(0, valPriority.length - 2) + "&") : "")
            + (valConvenient && valConvenient.length ? ("convenient=" +
                valConvenient.substring(0, valConvenient.length - 1) + "&") : "");
        console.log(q);

        let check = false;
        await motelRoomSearchSort(q)
            .then(rs => {
                if (rs.status === 200) {
                    listMotelRoomDTO = rs.data;
                    check = true;
                }
            })
            .catch(e => {
                console.log(e);
            })

        if (check)
            onChangeSort();

        loadLRNow();
        showMotelRoom();
        showPag();
    })
}

function sort() {
    selectSort.change(function () {
        onChangeSort();
        loadLRNow();
        showMotelRoom();
        showPag();
    })
}

function onChangeSort() {
    var valSort = selectSort.val().split("/");
    if (valSort[1])
        switch (valSort[0] - 0) {
            case 1:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listMotelRoomDTO.sort((a, b) => {
                        return new Date(b.motelRoom.createDate) - new Date(a.motelRoom.createDate);
                    });
                else
                    listMotelRoomDTO.sort((a, b) => {
                        return new Date(a.motelRoom.createDate) - new Date(b.motelRoom.createDate);
                    });
                break;
            case 2:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listMotelRoomDTO.sort((a, b) => {
                        return a.motelRoom.price - b.motelRoom.price;
                    });
                else
                    listMotelRoomDTO.sort((a, b) => {
                        return b.motelRoom.price - a.motelRoom.price;
                    });
                break;
            case 3:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listMotelRoomDTO.sort((a, b) => {
                        return distance(a.motelRoom) - distance(b.motelRoom);
                    });
                else
                    listMotelRoomDTO.sort((a, b) => {
                        return distance(b.motelRoom) - distance(a.motelRoom);
                    });
                break;
            case 4:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listMotelRoomDTO.sort((a, b) => {
                        return b.motelRoom.area - a.motelRoom.area;
                    });
                else
                    listMotelRoomDTO.sort((a, b) => {
                        return a.motelRoom.area - b.motelRoom.area;
                    });
                break;
            case 5:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listMotelRoomDTO.sort((a, b) => {
                        return (b.motelRoom.maxPerson - b.personIn) - (a.motelRoom.maxPerson - a.personIn);
                    });
                else
                    listMotelRoomDTO.sort((a, b) => {
                        return (a.motelRoom.maxPerson - a.personIn) - (b.motelRoom.maxPerson - b.personIn);
                    });
                break;
            case 6:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listMotelRoomDTO.sort((a, b) => {
                        return b.personAsk - a.personAsk;
                    });
                else
                    listMotelRoomDTO.sort((a, b) => {
                        return a.personAsk - b.personAsk;
                    });
                break;
            default:
                break;
        }
}

function loadLRNow() {
    let size = typeShow > 0 ? MAX_SIZE_GRID : MAX_SIZE_LIST;
    listRoomNow = [];
    for (let i = (indexPag - 1) * size; i < indexPag * size; i++) {
        if (!listMotelRoomDTO[i]) break;
        listRoomNow.push(listMotelRoomDTO[i]);
    }
}

function showMotelRoom() {
    let rs = `<span> Không tìm thấy sản phẩm phù hợp. </span>`;
    if (listRoomNow && listRoomNow.length > 0) {
        rs = listRoomNow.map((data, index) => {
            let room = data.motelRoom;
            if (room)
                return typeShow > 0 ? `<div class="col-md-4">
                                        <div class="card border mb-3">
                                        <img src="${dataFilter(room.images).split("<>")[0]}" alt="" 
                                        class="w-100" height="200">
                                           <div class="card-body">
                                              <div class="d-flex justify-content-between">
                                                 <span class="font-weight-bold col-md-6 card-title">${dataFilter(room.title)}
                                                 </span> 
                                                   <span class="font-weight-bold col-md-6">
                                                        ${numberFilter(formatMoney(room.price))} VNĐ</span>
                                                        </div>
                                                     <p class="card-text mb-1 mt-1">${dataFilter(room.description)}</p>
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">
                                                            ${dataFilter(room.category.name)}</h5>
                                                            <div class="info w-100 mx-auto row justify-content-center">
                                                                <div class="person">
                                                                    <span>${numberFilter(data.personIn)
                    + "/" + numberFilter(room.maxPerson)}</span>
                                                                    <i class="fas fa-user-alt"></i>
                                                                </div>
                                                                <div class="report ml-1">
                                                                    <span>${numberFilter(data.countReport)}</span>
                                                                    <i class="far fa-comment"></i>
                                                                </div>
                                                                <div class="rating w-100 text-center">
                                                              <span>Đánh giá : ${checkRating(data.ratings)}<span>
                                                        <span>(${numberFilter(data.countRated)})</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr>
                                                    <div class="card-body">
                                                        <div class="text-right buttons">
                                                            <button class="btn btn-outline-dark" disabled>
                                                                ${numberFilter(distance(room))}km
                                                            </button>
                                                            <a target="_blank" class="btn btn-dark" 
                                                            href="/thong-tin-thue?id_room=${room.id}">
                                                            Xem thêm</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                    :
                    `<li class="list-group-item  border">
                                <!-- Custom content-->
                                <div 
                                class="media align-items-lg-center justify-content-center flex-column flex-lg-row p-3">
                                    <div class="col-lg-8 media-body order-2 order-lg-1 text-center">
                                        <h5 class="mt-0 font-weight-bold m-2 card-title">${dataFilter(room.title)}</h5>
                                        <p class="font-italic text-muted mb-0 small card-text">${dataFilter(room.description)}</p>

                                        <div class="row align-items-center justify-content-between mt-1">
                                            <div class="text-center col-sm-6"><h6 class="font-weight-bold my-2">
                                                ${numberFilter(formatMoney(room.price))} VNĐ</h6>
                                                <h6 class="card-title text-center">${dataFilter(room.category.name)}
                                                </h6></div>

                                            <div class="info col-sm-6 mx-auto row justify-content-center">
                                                <div class="person">
                                                    <span>${numberFilter(data.personIn)
                    + "/" + numberFilter(room.maxPerson)}</span>
                                                    <i class="fas fa-user-alt"></i>
                                                </div>
                                                <div class="report ml-1">
                                                    <span>${numberFilter(data.countReport)}</span>
                                                    <i class="far fa-comment"></i>
                                                </div>
                                                <div class="rating w-100 text-center">
                                                    <span>Đánh giá : ${checkRating(data.ratings)}<span>
                                                        <span>(${numberFilter(data.countRated)})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-wp text-center">
                                            <a href="/thong-tin-thue?id_room=${room.id}" target="_blank"
                                               class="btn click-add-cart mt-1" data-id="6">Xem thêm</a>
                                            <div class="text-center text-secondary">(${numberFilter(distance(room))}km)
                                            </div>
                                        </div>
                                    </div>
                                    <img src="${dataFilter(room.images).split("<>")[0]}" alt="image"
                                        class="col-lg-4 ml-lg-5 order-1 order-lg-2 mr-0 mx-auto">
                                </div> <!-- End -->
                            </li>`;
            return ``;
        }).join("");
        numberInPage.html(`<span> Hiển thị ${listRoomNow.length} sản phẩm của kết quả. </span>`)
        result.html(`<span>${listRoomNow.length} </span> kểt quả`);
        typeShow > 0 ? dataGrid.html(rs) : dataList.html(rs);
    } else {
        dataGrid.empty();
        dataList.empty();
        numberInPage.html(rs);
        result.html(`<span>0 </span> kểt quả`);
    }
}