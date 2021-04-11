let emailSignUpSuggest, btnSubmitSuggest;

$(async function () {
    emailSignUpSuggest = $("#email_suggest");
    btnSubmitSuggest = $("#btn-submit-suggest");

    await getUserInSystem();
    showUser();
    signUpSuggest();
})

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

function showUser() {
    if (USER_IN_SYSTEM) {
        $("#acc-top .title").text(USER_IN_SYSTEM.name);
        $("#content-menu-user").html(`<a class="item" href="/thong-tin-ca-nhan">Thông tin cá nhân</a>
                    <a class="item" href="/dang-xuat">Đăng xuất</a>`);
    }
}