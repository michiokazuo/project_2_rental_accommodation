let numRoom, numRent, numCmt;

$(async function () {
    numCmt = $("#num-cmt");
    numRoom = $("#num-room");
    numRent = $("#num-rent");

    await getUserInSystem();
    await loadRoomDTO();
    showInfoHome();
})

function showInfoHome() {
    let valRoom = 0, valRent = 0, valCmt = 0;
    if (listRoomHost && listRoomHost.length > 0) {
        valRoom = listRoomHost.length;
        let rent = [];
        for (const room of listRoomHost) {
            valCmt += room.countReport;
            for (const t of room.tenantList) {
                if (!rent.find(a => a.id === t.user.id))
                    rent.push(t.user);
            }
        }

        valRent = rent.length;
    }

    numRent.text(valRent);
    numRoom.text(valRoom);
    numCmt.text(valCmt);
}