let nameFB, emailFB, phoneFB, btnFB, textUFB;
$(async function () {
    nameFB = $("#ufullname");
    emailFB = $("#umail");
    phoneFB = $("#uphone");
    textUFB = $("#ufb");
    btnFB = $("#contact-send");

    await getUserInSystem();
    feedback();
})

function feedback() {
    btnFB.click(async function () {
        let {
            val: valueNameFB,
            check: checkNameFB
        } = checkDataTool(nameFB, /./, "Bạn chưa nhập tên.");
        let {
            val: valueEmailFB,
            check: checkEmailFB
        } = checkDataTool(emailFB, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Email không hợp lệ");
        let {
            val: valTextPhone,
            check: checkTextPhone
        } = checkDataTool(phoneFB, /((09|03|07|08|05)+([0-9]{8})\b)/g, "SĐT không hợp lệ.");
        let {
            val: valFB,
            check: checkFB
        } = checkDataTool(textUFB, /./, "Bạn chưa nhập nội dung feedback.");

        if (checkEmailFB && checkNameFB && checkFB && checkTextPhone) {
            alertReport(true, "Cảm ơn bạn đã góp ý cho chúng tôi!!!");
            let check = await notify_impl(valueEmailFB, "Feedback thành công",
                "Chào bạn, chúng tôi rất cảm ơn vì bạn đã góp ý cho chúng tôi. Chúng tôi sẽ trả lời bạn trong " +
                "thời gian sớm nhất. Chúc bạn có 1 ngày tốt lành!");

            // alertReport(check, check ? "Feedback thành công." : "Có lỗi xảy ra. Vui lòng thử lại!!!");
        }
    })
}