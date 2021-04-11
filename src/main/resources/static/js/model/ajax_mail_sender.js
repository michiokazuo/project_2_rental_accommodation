const URL_MAIL_API = URL_PUBlIC + "/mail";

function notify(formData) {
    return ajaxUploadFormData(`${URL_MAIL_API}/notify`, formData);
}

function userForgotPassword(email) {
    let formData = new FormData();
    formData.append("email", email);
    return ajaxUploadFormData(`${URL_MAIL_API}/forgot-password`, formData);
}