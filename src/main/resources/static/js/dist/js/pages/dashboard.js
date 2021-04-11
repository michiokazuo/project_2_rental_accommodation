let checkMenu = false;

$(function () {
  'use strict'
  // $('a[data-widget=pushmenu]').click(function (){
  //   var body = $("body");
  //   checkMenu ? body.removeClass("sidebar-collapse") : body.addClass("sidebar-collapse");
  //   checkMenu = !checkMenu;
  // })

  $('.daterange').daterangepicker({
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate: moment()
  }, function (start, end) {
    // eslint-disable-next-line no-alert
    alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  // The Calender
  $('#calendar').datetimepicker({
    format: 'L',
    inline: true
  })
})
