let tableRent, btnDelete, modalDelete, modalTenant, textName, textEmail, textPhone, dateBirthday, selectJob,
    textWorkplace, selectGender, selectStatus, textHomeTown, imgAvatar;

let indexTenant = 0;
let tenant;
let sortTenant = [
    {id: "1", name: "Có nhiều trọ nhất"},
    {id: "2", name: "Có ít trọ nhất"}
]

$(async function () {
    btnDelete = $("#btn-rent");
    modalDelete = $("#modal-rent");
    modalTenant = $("#modal-tenant");
    selectSort = $("#sort");
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

    await getUserInSystem();
    await loadAdminDTO();
    showDataTableRent();
    showSelectCustom(selectSort, sortTenant, "Sắp xếp");
    confirmDeleteRent();
    sortRoom();
})

function showDataTableRent() {
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listHost && listHost.length > 0)
        rs = listHost.map((data, index) => {
            let user = data.host;
            if (user)
                return `<tr data-index="${index}">
                                <th>${index + 1}</th>
                                <td>
                                    <button type="button" class="btn btn-success m-1 detail-user">
                                        <i class="fas fa-info-circle"></i> ${dataFilter(user.name)}
                                    </button>
                                </td>
                                <td><a target="_blank" href="phong-so-huu?id_host=${user.id}" 
                                class="text-decoration-none text-light btn btn-primary m-1">
                                        <i class="fas fa-tasks"></i>
                                        <span class="text-light"> Xem (${numberFilter(data.owned)})</span>
                                </a></td>
                                <td>
                                    <button type="button" class="btn btn-danger m-1 delete-rent">
                                        <i class="fas fa-trash-alt"></i> Xóa
                                    </button>
                                </td>
                            </tr>`;
            return ``;
        })
    tableRent.html(rs);
    viewUser();
    deleteTenant();
}

function viewUser() {
    $(".detail-user").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listHost[indexTenant - 0];
        let user = tenant.host;
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
        modalTenant.modal("show");
    })
}

function deleteTenant() {
    $(".delete-rent").click(function () {
        indexTenant = $(this).parents("tr").attr("data-index");
        tenant = listHost[indexTenant - 0];
        modalDelete.modal("show");
    })
}

function confirmDeleteRent() {
    btnDelete.click(async function () {
        let check = false, email;
        await userDelete(tenant.host)
            .then(rs => {
                if (rs.status === 200) {
                    check = true;
                    email = tenant.host.email;
                    listHost = listHost.filter((data, index) => {
                        return index !== (indexTenant - 0);
                    })
                }
            })
            .catch(e => {
                console.log(e);
            });

        showDataTableRent();
        modalDelete.modal("hide");
        alertReport(check, check ? "Xóa thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        if (check)
            await notify_impl(email, "Xóa tài khoản khỏi hệ thống", `Bạn đã bị quản lý xóa khỏi hệ thống.
             Bạn có thể trao đổi với quản lý qua <a href="tel:0564099372" class="btn btn-sm btn-info mr-4" 
             id="call-phone">0564 099 372</a> hoặc <a href="mailto:thienbinh2102000@gmail" 
             class="btn btn-sm btn-default float-right" id="mail-email">project2@gmail.com</a>.`);
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
            listHost.sort((a, b) => {
                return numberFilter(b.owned) - numberFilter(a.owned);
            });
            break;
        case 2:
            listHost.sort((a, b) => {
                return numberFilter(a.owned) - numberFilter(b.owned);
            });
            break;
        default:
            break;
    }
}