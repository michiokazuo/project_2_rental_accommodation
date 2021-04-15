let req = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    report = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    room = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let tenantList = [];
let reportList = [];

let year_now, month_now;

$(async function () {
    await getUserInSystem();
    await loadAdminDTO();
    await loadTenant();
    await loadReport();

    if (!adminDTO)
        window.location.href = "/error";

    year_now = new Date().getFullYear();
    month_now = new Date().getMonth();

    classify();
    showChartRoom1();
    showChartRoom2();
})

async function loadTenant() {
    await tenantFindAll()
        .then(rs => {
            if (rs.status === 200)
                tenantList = rs.data;
        })
        .catch(e => {
            console.log(e);
        })
}

async function loadReport() {
    await reportFindAll()
        .then(rs => {
            if (rs.status === 200)
                reportList = rs.data;
        })
        .catch(e => {
            console.log(e);
        })
}

function classify() {
    if (adminDTO.motelRoomDTOS)
        for (const r of adminDTO.motelRoomDTOS)
            if (r.motelRoom && new Date(r.motelRoom.createDate).getFullYear() === year_now)
                room[new Date(r.motelRoom.createDate).getMonth()]++;

    if (tenantList)
        for (const r of tenantList)
            if (r && new Date(r.createDate).getFullYear() === year_now)
                req[new Date(r.createDate).getMonth()]++;

    if (reportList)
        for (const r of reportList)
            if (r && new Date(r.createDate).getFullYear() === year_now)
                report[new Date(r.createDate).getMonth()]++;
}

function showChartRoom1() {
    Highcharts.chart('content-chart-1', {
        chart: {
            type: 'column'
        },
        title: {
            text: (`Thống kê hệ thống`)
        },
        xAxis: {
            categories: [`Hệ thống`]
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'số lượng'
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
            name: 'Trọ đã thuê',
            data: [adminDTO.roomHasReq],
            stack: 'room'
        }, {
            name: 'Trọ chưa thuê',
            data: [adminDTO.motelRoomDTOS - adminDTO.roomHasReq],
            stack: 'room'
        }, {
            name: 'Chủ thuê đã tạo trọ',
            data: [adminDTO.hostHasRoom],
            stack: 'host'
        }, {
            name: 'Chủ thuê chưa tạo trọ',
            data: [listHost.length - adminDTO.hostHasRoom],
            stack: 'host'
        }, {
            name: 'Người đã thuê',
            data: [adminDTO.userRentRoom],
            stack: 'user'
        }, {
            name: 'Người chưa thuê',
            data: [listUser.length - adminDTO.userRentRoom],
            stack: 'user'
        }]
    });

    var hcCredit = $('.highcharts-credits');
    hcCredit ? hcCredit.remove() : {};
}

function showChartRoom2() {
    Highcharts.chart('content-chart-2', {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Thống kê theo tháng trong năm',
        },
        xAxis: [{
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6',
                'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            allowDecimals: false,
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: 'Trọ mới',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            allowDecimals: false,
            gridLineWidth: 0,
            title: {
                text: 'Yêu cầu thuê',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            allowDecimals: false,
            gridLineWidth: 0,
            title: {
                text: 'Bình luận',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Yêu cầu thuê',
            type: 'column',
            yAxis: 1,
            data: req.slice(0, month_now + 1),
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Bình luận',
            type: 'spline',
            yAxis: 2,
            data: report.slice(0, month_now + 1),
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Trọ mới',
            type: 'spline',
            data: room.slice(0, month_now + 1),
            tooltip: {
                valueSuffix: ''
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        floating: false,
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: 0,
                            y: -6
                        },
                        showLastLabel: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -6
                        },
                        showLastLabel: false
                    }, {
                        visible: false
                    }]
                }
            }]
        }
    });

    var hcCredit = $('.highcharts-credits');
    hcCredit ? hcCredit.remove() : {};
}