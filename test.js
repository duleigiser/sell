// 圆环
setInterval(huanxingshuju, 60 * 1000)
$.ajaxSetup({
  cache: false
})

function huanxingshuju() {
  var url2 = ctx + '/syzb.do?method=getAmounts';
  $.ajax({
    url: url2,
    type: 'get',
    success: function (data) {
      var zong = document.getElementsByClassName('zong');


      zong[0].innerHTML = fixNumber(data[0].value)
      zong[1].innerHTML = fixNumber(data[3].value)
      zong[2].innerHTML = fixNumber(data[6].value)
      //console.log(data[2].ration)
      var a = baoliuliangwei(data[2].ration)
      var b = baoliuliangwei(data[5].ration)
      var c = baoliuliangwei(data[8].ration)
      //console.log(data[2].ration.toFixed(2))
      var d = data[1].value
      var e = data[4].value
      var f = data[7].value


      var da = new Date()
      var currentDay = da.getDate()
      var currentMonth = da.getMonth() + 1
      var currentYear = da.getFullYear()
      var curHour = da.getHours()

      var dayNum = DayNumOfMonth(currentYear, currentMonth)

      var dayPercent = (currentDay * 24 + curHour - 24) / (dayNum * 24)

      var monthPercent = (currentMonth / 12).toFixed(2) * 100

      var nowTime = new Date().getTime()
      var oldTime = new Date(currentYear + "-01-01").getTime() - 8 * 60 * 60 * 1000

      var res = (nowTime - oldTime) * 100 / (60 * 60 * 24 * 1000 * 365)
      $("#totalFHL").html("<a onclick=show('JNJT:AF:FHLV')  href='javascript:void(0)' >" + a + "%</a>")
      $("#nd1").html("<a onclick=show('JNJT:AF:FDWCL_YEAR')  href='javascript:void(0)' >" + b + "%</a>")
      $("#yd1").html("<a onclick=show('JNJT:AF:FDWCL_MONTH')  href='javascript:void(0)' >" + c + "%</a>")
      $("#nd").html(Number(res).toFixed(1) + "%")
      $("#yd").html(Number(dayPercent * 100).toFixed(1) + "%")

      jt_huanxing0(0, Number(a))
      if (Number(b) > 100) {
        b = 100
      }
      jt_huanxing(parseInt(res), Number(b))
      //jt_huanxing(Number(monthPercent),Number(b))
      if (Number(c) > 100) {
        c = 100
      }

      jt_huanxing1(Math.round(dayPercent * 100), Number(c))
    }
  })
}

function DayNumOfMonth (Year, Month) {
  var d = new Date(Year, Month, 0)
  var day = d.getDate()
  return day
}



function baoliuliangwei (data) {
  var a = data.split(".")
  var b = a[1].split('')
  if (b.length <= 1) {
    return a[0] + '.' + 0
  } else {
    return a[0] + "." + b[0]
  }

}

function fixNumber (data) {
  if (data.toString().indexOf('%') >= 0) {

    return Number(data.split('%')[0]).toFixed(2)
  } else {
    return Number(data).toFixed(2)
  }

}

//昨日今日发电量
function zuojin() {
  var url2 = ctx + '/syzb.do?method=getFDL&tt=' + new Date().getTime();
  $.ajax({
    url: url2,
    type: 'get',
    success: function (data) {
      var zuori = document.getElementById('zuori');
      var jinri = document.getElementById('jinri');
      zuori.innerHTML = fixNumber(data[1].value) + '<br>' + '万kWh';
      jinri.innerHTML = fixNumber(data[0].value) + '<br>' + '万kWh';
    }
  })
}
zuojin()




//heightchart折线图

function shijianchuo (str){

  var a = str.split(':')
  return a;

}

function hightshujuchulis(data) {
  var jishu = 0
  var mark = false
  var date = []
  var val = []
  var date2 = []
  var val2 = []
  var resultY = []
  var resultT = []
  var temp

  for (var i = 0; i < data.length; i++) {
    if (data[i].name !== 0 && mark === false) {
      jishu++;
      var time = shijianchuo(data[i].name)
      var d = new Date()
      date[i] = Date.UTC(d.getFullYear(), (d.getMonth() + 1), d.getDate(), time[0] - 8, time[1].toString(), time[2]);
      val[i] = data[i].value
      temp = new Array(date[i], val[i])
      resultY[i] = temp

    }
    if (data[i].name === 0) {
      mark = true;
    }
  }



  for (var j = jishu++; j < data.length; j++) {

    if (mark == true) {
      var time2 = shijianchuo(data[j].name);
      var d2 = new Date;
      date2[j] = Date.UTC(d2.getFullYear(), d2.getMonth() + 1, d2.getDate(), time2[0] - 8, time2[1], time2[2]);
      val2[j] = data[j].value;
      temp2 = new Array(date2[j], val2[j]);
      resultT[j] = temp2;

    }
  }
  var arr = [];

  for (var s = jishu++; s < resultT.length; s++) {
    arr.push(resultT[s])

  }
  //console.log(resultY)
  return {
    jinri: resultY,
    zuori: arr,
  }
}
Highcharts.setOptions({
  lang: {
    numericSymbols: null
  },
  global: {
    useUTC: false //关闭UTC                
  }
});

function d(data, w) {

  var sc = hightshujuchulis(data);

  var chart;
  var options = {
    chart: {
      renderTo: 'd',
      type: 'spline',
      marginTop: 45,
      marginBottom: 40,
      marginLeft: 50,
      marginRight: 25,
      width: w
    },
    title: {
      text: '',
      style: {
        fontSize: '14px',
        fontWeight: 'bold'
      }
    },
    legend: {
      verticalAlign: 'top',
      align: 'right',
      floating: true,
      shadow: true,
      itemStyle: {
        fontWeight: ''
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%H:%M', this.value);
        }
      }
    },
    yAxis: [{
      floor: 0,
      title: {
        text: '单位：MW',
        align: 'high',
        rotation: 0,
        offset: 0,
        x: 20,
        y: -20
      },
      labels: {}

    }],
    tooltip: {
      formatter: function () {
        var s = '<b>' + this.series.name + '</b><br/>' + '时间:' + Highcharts.dateFormat('%H:%M:%S', this.point.x) + '<br/>' + this.point.y + 'MW'
        return s
      }
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      },
      turboThreshold: 4000
    },
    credits: {
      enabled: false
    },
    series: [{
        data: sc.zuori,
        name: '昨日负荷 ',
        color: '#8DB6CD',
        tooltip: {
          valueSuffix: ' 万kwh'
        }
      },
      {
        data: sc.jinri,
        name: '今日负荷 ',
        color: '#EE0000',
        tooltip: {
          valueSuffix: ' 万kwh'
        }
      },


    ]
  }
  chart = new Highcharts.Chart(options);
}

function hightjiaohu () {
  var url2 = ctx + '/syzb.do?method=getOnus&tt=' + new Date().getTime();
  $.ajax({
    url: url2,
    type: 'get',
    success: function (data) {
      var kuan = kuandu()
      d(data, kuan)
    }
  })
}
// 默认是集团的时候调用



hightjiaohu()
//切换电厂是集团的时候调用
$(function () {
  qiehuan.change(function () {
    var xuanzhong = $("#org option:selected");
    if (xuanzhong.val() == 'a61365e2-969d-4352-b3f8-805027ab9f1d') {
      hightjiaohu()
    }
  })
})

//定时器两分钟刷新一次
var timer_d = null
timer = setInterval(function () {

  hightjiaohu()

}, 60 * 1000)

//折线图的宽度
function kuandu() {
  var a = $(window).width();
  //console.log(a);

  if (a < 1366 && a > 900) {
    return 335
  } else if (a <= 1670 && a > 1366) {
    return 405

  } else if (a < 1920 && a > 1670) {
    return 455

  }
}









function creatjgeOption(jsonData) {
  var jgmyChart = echarts.init(document.getElementById("myChart_"));
  var jtChart = echarts.init(document.getElementById("jt_myChart_"));
  jgoption = {
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    legend: {
      show: false,
      data: ['111']
    },
    toolbox: {
      show: false,
      feature: {
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: function () {
        var res = [];
        for (var i = 0; i < jsonData.length; i++) {
          res[i] = new Date(jsonData[i].profit_date).format('yyyy-MM-dd hh:mm:ss');
        }
        return res
      }()
    }],

    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
        name: '综合收益',
        type: 'line',
        data: function () {
          var res = []
          for (var i = 0; i < jsonData.length; i++) {
            res[i] = jsonData[i].comperhensive
          }
          // console.log(res);
          return res
        }()

      }

    ]
  }
  jgmyChart.setOption(jgoption)
  jtChart.setOption(jgoption)
}




function jt_huanxing0(percent, edata) {
  var colors = Highcharts.getOptions().colors,
    categories = ['目前', '剩余'],
    data = [{
      y: percent,
      color: '#008B00',
      drilldown: {
        name: '',
        categories: ['实时'],
        data: [edata],
        color: 'red'
      }
    }, {
      y: 100 - percent,
      color: "#9e9e9e",
      drilldown: {
        name: '剩余',
        categories: ['实时'],
        data: [100 - edata],
        color: 'red'
      }
    }];


  // Build the data arrays
  var browserData = [];
  var versionsData = [];
  for (var i = 0; i < data.length; i++) {

    // add browser data
    browserData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    });

    // add version data
    for (var j = 0; j < data[i].drilldown.data.length; j++) {
      var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
      versionsData.push({
        name: data[i].drilldown.categories[j],
        y: data[i].drilldown.data[j],
        color: Highcharts.Color(data[i].color).brighten(brightness).get()
      });
    }
  }

  // Create the chart
  $("#huanxing1").highcharts({
    chart: {
      type: 'pie'
    },
    credits: {
      enabled: false //不显示LOGO
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Total percent market share'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          formatter: function () {
            if (this.percentage > 4) return this.point.name;
          },
          color: '#f1f1f1',
          style: {
            font: '12px Trebuchet MS, Verdana, sans-serif'
          }
        }
      }
    },
    tooltip: {
      pointFormatter: function () {
        return '' + this.series.name + ''
      }
    },
    series: [{
      name: '运行机组负荷率',
      data: versionsData,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        formatter: function () {
          // display only if larger than 1
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
        }
      }
    }]
  });
}

function jt_huanxing(percent, edata) {
  //console.log(id,percent,edata);
  var colors = Highcharts.getOptions().colors,
    categories = ['当年', '当年'],
    //name = 'Browser brands',
    data = [{
      y: percent,
      color: '#1A76CB',
      drilldown: {
        name: '',
        categories: ['当年'],
        data: [edata],
        color: colors[0]
      }
    }, {
      y: 100 - percent,
      color: "#9e9e9e",
      drilldown: {
        name: '',
        categories: ['当年'],
        data: [100 - edata],
        color: 'red'
      }
    }];


  // Build the data arrays
  var browserData = [];
  var versionsData = [];
  for (var i = 0; i < data.length; i++) {

    // add browser data
    browserData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    });

    // add version data
    for (var j = 0; j < data[i].drilldown.data.length; j++) {
      var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
      versionsData.push({
        name: data[i].drilldown.categories[j],
        y: data[i].drilldown.data[j],
        color: Highcharts.Color(data[i].color).brighten(brightness).get()
      });
    }
  }

  // Create the chart
  $("#huanxing2").highcharts({
    chart: {
      type: 'pie'
    },
    credits: {
      enabled: false //不显示LOGO
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Total percent market share'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          formatter: function () {
            if (this.percentage > 4) return this.point.name;
          },
          color: '#f1f1f1',
          style: {
            font: '12px Trebuchet MS, Verdana, sans-serif'
          }
        }
      }
    },
    tooltip: {
      /* valueSuffix: '%'*/
      pointFormatter: function () {
        return '' + this.series.name + ''
      }
    },
    series: [{
      name: '时间进度',
      data: browserData,
      size: '60%',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        color: 'white',
        distance: -30
      }
    }, {
      name: '发电量完成率',
      data: versionsData,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        formatter: function () {
          // display only if larger than 1
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
        }
      }
    }]
  });
}

function jt_huanxing1(percent, edata) {
  var colors = Highcharts.getOptions().colors,
    categories = ['当月', '当月'],
    data = [{
      y: percent,
      color: '#1A76CB',
      drilldown: {
        name: '',
        categories: ['当月'],
        data: [edata],
        color: colors[0]
      }
    }, {
      y: 100 - percent,
      color: "#9e9e9e",
      drilldown: {
        name: '',
        categories: ['当月'],
        data: [100 - edata],
        color: 'red'
      }
    }]


  var browserData = [];
  var versionsData = [];
  for (var i = 0; i < data.length; i++) {

    // add browser data
    browserData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    })

    // add version data
    for (var j = 0; j < data[i].drilldown.data.length; j++) {
      var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
      versionsData.push({
        name: data[i].drilldown.categories[j],
        y: data[i].drilldown.data[j],
        color: Highcharts.Color(data[i].color).brighten(brightness).get()
      });
    }
  }

  // Create the chart
  $("#huanxing3").highcharts({
    chart: {
      type: 'pie'
    },
    credits: {
      enabled: false //不显示LOGO
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Total percent market share'
      }
    },
    plotOptions: {
      pie: {
        /*shadow: false,
                        center: ['50%', '50%']*/
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          formatter: function () {
            if (this.percentage > 4) return this.point.name;
          },
          color: '#f1f1f1',
          style: {
            font: '12px Trebuchet MS, Verdana, sans-serif'
          }
        }
      }
    },
    tooltip: {
      /* valueSuffix: '%'*/
      pointFormatter: function () {
        return '' + this.series.name + ''
      }
    },
    series: [{
      name: '时间进度',
      data: browserData,
      size: '60%',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        color: 'white',
        distance: -30
      }
    }, {
      name: '发电量完成率',
      data: versionsData,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        formatter: function () {
          // display only if larger than 1
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
        }
      }
    }]
  })
}
