const URL_FILE = URL_PUBlIC + "/file";

function uploadFile(file) {
    return ajaxUploadFile(`${URL_FILE}/upload-file`, file);
}