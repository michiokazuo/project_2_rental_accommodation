let selectSearchSort, textSearchName, tableData, textName, btnSave, btnDeleted;
let listCategory = []
let indexCategory, elementCategory, checkAction;

$(async function () {
    selectSearchSort = $("#sort");
    textSearchName = $("#name-search");
    btnSave = $("#btn-save");
    btnDeleted = $("#btn-delete");
    textName = $("#name");
    tableData = $("#table-data");

    await loadCategory();
    showSelectSort(selectSearchSort, sortControl, "Sắp xếp");

    viewCategory();
    confirmDeleteCategory();
    saveCategory();
    addCategory();
    sortCategory();
})

function viewCategory() {
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;

    if (listCategory && listCategory.length > 0)
        rs = dataFilter(listCategory).map((data, index) => {
            return `<tr data-index="${index}">
            <th scope="row">${index + 1}</th>
            <td>${dataFilter(data.name)}</td>
            <td>${dataFilter(new Date(data.modifyDate).toLocaleDateString())}</td>
            <td>
                <button type="button" class="btn btn-warning update-category">
                    <i class="fas fa-pencil-alt"></i>
                    Sửa
                </button>
                <button type="button" class="btn btn-danger delete-category">
                    <i class="far fa-trash-alt"></i>
                    Xóa
                </button>
            </td></tr>`;
        }).join("");

    tableData.html(rs);
    deleteCategory();
    updateCategory();
}

function deleteCategory() {
    $(".delete-category").click(function () {
        indexCategory = $(this).parents("tr").attr("data-index");

        $("#modal-delete").modal("show");
    })
}

function confirmDeleteCategory() {
    btnDeleted.click(async function () {
        let check = false;
        let category = listCategory[indexCategory - 0];

        await categoryDelete(category).then(rs => {
            if (rs.status === 200) {
                check = true;
                listCategory = listCategory.filter((data, index) => {
                    return index !== (indexCategory - 0);
                })
            }
        }).catch(e => {
            console.log(e);
        });


        viewCategory();
        $("#modal-delete").modal("hide");
        alertReport(check, check ? "Xóa thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
    })
}

function updateCategory() {
    $(".update-category").click(function () {
        indexCategory = $(this).parents("tr").attr("data-index");
        elementCategory = listCategory[indexCategory - 0];
        textName.val(elementCategory.name);
        checkAction = true;
        $("#modal-category").modal("show");
    })
}

function saveCategory() {
    btnSave.click(async function () {
        let check = false, valSuccess;
        let {val: valName, check: checkName} = checkData(textName, /./, "Định dạng tên chưa đúng");

        if (checkName) {
            elementCategory.name = valName;

            if (checkAction) {
                await categoryUpdate(elementCategory)
                    .then(rs => {
                        if (rs.status === 200) {
                            check = true;
                            valSuccess = "Cập nhật thành công.";
                            listCategory[indexCategory - 0] = rs.data;
                        }
                    }).catch(e => {
                        console.log(e);
                    });
            } else {
                await categoryInsert(elementCategory)
                    .then(rs => {
                        if (rs.status === 200) {
                            check = true;
                            valSuccess = "Thêm mới thành công.";
                            listCategory.push(rs.data);
                        }
                    }).catch(e => {
                        console.log(e);
                    });
            }

            selectSearchSort.prop('selectedIndex', 0);
            viewCategory();
            $("#modal-category").modal("hide");
            alertReport(check, check ? valSuccess : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        }
    })
}

function sortCategory() {
    selectSearchSort.change(async function () {
        var valSort = selectSearchSort.val().split("/");
        if (valSort[1])
            switch (valSort[0] - 0) {
                case 1:
                    if (JSON.parse(valSort[1].toLowerCase()))
                        listCategory.sort((a, b) => {
                            return dataFilter(a.name).localeCompare(dataFilter(b.name));
                        });
                    else
                        listCategory.sort((a, b) => {
                            return dataFilter(b.name).localeCompare(dataFilter(a.name));
                        });
                    break;
                case 2:
                    if (JSON.parse(valSort[1].toLowerCase()))
                        listCategory.sort((a, b) => {
                            return new Date(b.modifyDate) - new Date(a.modifyDate);
                        });
                    else
                        listCategory.sort((a, b) => {
                            return new Date(a.modifyDate) - new Date(b.modifyDate);
                        });
                    break;
                default:
                    break;
            }

        viewCategory();
    });
}

function addCategory() {
    $("#add-category").click(function () {
        elementCategory = {};
        checkAction = false;
        $("#modal-category").modal("show");
    })
}

async function loadCategory() {
    await categoryFindAll()
        .then(rs => {
            listCategory = [];
            if (rs.status === 200) {
                listCategory = rs.data;
            }
        }).catch(e => {
            console.log(e);
        });
}