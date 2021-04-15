let numRoom, numRent, numCmt;

$(async function () {
    numCmt = $("#num-cmt");
    numRoom = $("#num-room");
    numRent = $("#num-rent");

    await getUserInSystem();
    await loadAdminDTO();
    showInfoHome();
})

function showInfoHome() {
    numRent.text(dataFilter(adminDTO.userList).length);
    numRoom.text(dataFilter(adminDTO.motelRoomDTOS).length);
    numCmt.text(dataFilter(adminDTO.hostList).length);
}