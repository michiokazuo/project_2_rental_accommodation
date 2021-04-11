let selectSort, tableData;

let sortStatistic = [
    {name: "Đánh giá cao nhất", id: "1", isASC: true},
    {name: "Đánh giá thấp nhất", id: "1", isASC: false}
]
let indexRoom, roomShow;

$(async function () {
    selectSort = $("#sort");
    tableData = $("#table-data");

    await getUserInSystem();
    await loadRoomDTO();
    showSelectSort(selectSort, sortStatistic, "Sắp xếp");
    showChartRoom();
    showTableData();
    sort();
})

function showChartRoom() {
    let notFullRoom = 0, notRentRoom = 0;
    let num_of_room = 0;
    if (listRoomHost && listRoomHost.length > 0) {
        num_of_room = listRoomHost.length;
        for (const dto of listRoomHost) {
            if (dto.personIn < dto.motelRoom.maxPerson)
                notFullRoom++;
            if (!dto.personIn && !dto.personAsk)
                notRentRoom++;
        }
    }

    Highcharts.chart('content-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: (`Thống kê trọ hiện tại của bạn`)
        },
        xAxis: {
            categories: [`Trọ của bạn`]
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'số phòng/nhà trọ'
            },
            labels: {
                overflow: 'justify'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }

            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: ' +
                '<b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: false,
            useHTML: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Trọ đầy',
            data: [(num_of_room - notFullRoom) ? (num_of_room - notFullRoom) : ''],
            stack: 'Full'
        }, {
            name: 'Trọ chưa đầy',
            data: [notFullRoom ? notFullRoom : ''],
            stack: 'Full'
        }, {
            name: 'Chưa có người thuê',
            data: [notRentRoom ? notRentRoom : ''],
            stack: 'Request'
        }, {
            name: 'Có người thuê',
            data: [(num_of_room - notRentRoom) ? (num_of_room - notRentRoom) : ''],
            stack: 'Request'
        }]
    });

    var hcCredit = $('.highcharts-credits');
    hcCredit ? hcCredit.remove() : {};
}

function showTableData() {
    let rs = `<tr><td colspan='4'><strong>Không có dữ liệu</strong></td></tr>`;
    if (listRoomHost && listRoomHost.length > 0)
        rs = listRoomHost.map((data, index) => {
            let room = data.motelRoom;
            if (room)
                return `<tr data-index="${index}" data-index-room=${room.id} data-bs-toggle="collapse" 
                            role="button" aria-expanded="false" aria-controls="collapseExample" href="#chart${index}">
                                <th scope="row">${index + 1}</th>
                                <td><img src=".${dataFilter(room.images).split("<>")[0]}"
                                 alt="" width="80px"></td>
                                <td>${dataFilter(room.id + "." + room.title)}</td>
                                <td>
                                    ${data.ratings
                    ? (dataFilter(parseFloat(data.ratings).toFixed(1)) + "/5") : "Chưa có."}
                                </td>
                            </tr>
                         <tr>
                                <td colspan="4">
                              <div class="collapse" id="chart${index}">
                                <div class="card card-body">
                                  <figure class="highcharts-figure w-100">
                                        <div id="content-chart-${index}" class="chart w-100"></div>
                                    </figure>
                                </div>
                              </div>
                            </td>
                            </tr>`;
            return ``;
        })
    tableData.html(rs);
    showChartReprort();
}

function sort() {
    selectSort.change(function () {
        onChangeSort();
        showTableData();
    })
}

function onChangeSort() {
    var valSort = selectSort.val().split("/");
    if (valSort[1])
        switch (valSort[0] - 0) {
            case 1:
                if (JSON.parse(valSort[1].toLowerCase()))
                    listRoomHost.sort((a, b) => {
                        return b.ratings - a.ratings;
                    });
                else
                    listRoomHost.sort((a, b) => {
                        return a.ratings - b.ratings;
                    });
                break;
            default:
                break;
        }
}

function showChartReprort() {
    $('[data-index]').click(function () {
        indexRoom = $(this).attr("data-index");
        roomShow = listRoomHost[indexRoom - 0];
        let rate = [0, 0, 0, 0, 0, 0];
        let tmp = [];
        if (roomShow.reportList)
            for (const r of roomShow.reportList) {
                if (!tmp.find(t => t.user.id === r.user.id))
                    switch (r.rate) {
                        case 1:
                            rate[0]++;
                            tmp.push(r);
                            break;
                        case 2:
                            rate[1]++;
                            tmp.push(r);
                            break;
                        case 3:
                            rate[2]++;
                            tmp.push(r);
                            break;
                        case 4:
                            rate[3]++;
                            tmp.push(r);
                            break;
                        case 5:
                            rate[4]++;
                            tmp.push(r);
                            break;
                        default:
                            tmp.push(r);
                            break;
                    }
            }

        Highcharts.chart(`content-chart-${indexRoom}`, {
            chart: {
                type: 'column'
            },
            title: {
                text: ('Tổng số đánh giá : ' + numberFilter(roomShow.countRated))
            },

            xAxis: {
                categories: [
                    '1*',
                    '2*',
                    '3*',
                    '4*',
                    '5*'
                ],
                crosshair: true
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'số lượt đánh giá'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    colorByPoint: true
                }
            },
            series: [{
                name: roomShow.motelRoom.title,
                data: rate
            }]
        });

        var hcCredit = $('.highcharts-credits');
        hcCredit ? hcCredit.remove() : {};

        $('.collapse').collapse("hide");
    })
}