// pages/data/components/base/index.js
import * as echarts from '../../../../ec-canvas/echarts';
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ["#4169E1", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['外卖单量'],
      top: 10,
      left: 'center',
      show: false,
      z: 100
    },
    grid: {
      containLabel: true,
      left: 15,
      top: 30,
      right: 4,
      bottom: 40
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      data: ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 20
    }, {
      start: 0,
      end: 20
    }],
    series: [{
      name: '外卖单量',
      type: 'line',
      smooth: true,
      data: [40, 27, 29, 38, 36, 30, 33]
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartLine(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ["#4169E1", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['美团', '饿了么'],
      top: 10,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14
    },
    grid: {
      containLabel: true,
      left: 15,
      top: 30,
      right: 4,
      bottom: 40
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      data: ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      show: true,
      splitLine: {
        show: false
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 20
    }, {
      start: 0,
      end: 20
    }],
    series: [{
      name: '美团',
      type: 'line',
      data: [7.8, 7.91, 8.07, 7.67, 8.06, 7.03, 7.71],
      label: {
        show: true,
        position: 'top',
        margin: 8,
        formatter: params => params.value + '%'
      },
      lineStyle: {
        show: true,
        width: 3,
        color: '#ffd700'
      },
      itemStyle: {
        color: '#ffd700'
      }
    }, {
      name: '饿了么',
      type: 'line',
      data: [8.01, 6.47, 7.47, 7.58, 6.73, 7.35, 6.13],
      label: {
        show: true,
        position: 'top',
        margin: 8,
        formatter: params => params.value + '%'
      },
      lineStyle: {
        show: true,
        width: 3,
        color: '#1e90ff'
      },
      itemStyle: {
        color: '#1e90ff'
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartLine2(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ["#4169E1", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['美团', '饿了么'],
      top: 10,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14
    },
    grid: {
      containLabel: true,
      left: 15,
      top: 30,
      right: 4,
      bottom: 40
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      data: ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      show: true,
      splitLine: {
        show: false
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 20
    }, {
      start: 0,
      end: 20
    }],
    series: [{
      name: '美团',
      type: 'line',
      data: [7.8, 7.91, 8.07, 7.67, 8.06, 7.03, 7.71],
      label: {
        show: true,
        position: 'top',
        margin: 8,
        formatter: params => params.value + '%'
      },
      lineStyle: {
        show: true,
        width: 3,
        color: '#ffd700'
      },
      itemStyle: {
        color: '#ffd700'
      }
    }, {
      name: '饿了么',
      type: 'line',
      data: [8.01, 6.47, 7.47, 7.58, 6.73, 7.35, 6.13],
      label: {
        show: true,
        position: 'top',
        margin: 8,
        formatter: params => params.value + '%'
      },
      lineStyle: {
        show: true,
        width: 3,
        color: '#1e90ff'
      },
      itemStyle: {
        color: '#1e90ff'
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartBar(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    legend: {
      data: ['美团', '饿了么'],
      show: true,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      top: 10,
      left: 'center',
    },
    grid: {
      containLabel: true,
      left: 0,
      top: 30,
      right: 4,
      bottom: 0
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      show: true,
      splitLine: {
        show: false
      }
    },
    yAxis: {
      show: true,
      data: ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '饿了么',
      type: 'bar',
      legendHoverLink: true,
      stack: 'stack1',
      barCategoryGap: '50%',
      barGap: '30%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'inside',
        margin: 8
      },
      itemStyle: {
        'color': '#ffd700'
      },
      data: [71, 69, 71, 56, 63, 73, 61]
    }, {
      name: '美团',
      type: 'bar',
      legendHoverLink: true,
      stack: 'stack1',
      barCategoryGap: '50%',
      barGap: '30%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'inside',
        margin: 8
      },
      itemStyle: {
        'color': '#1e90ff'
      },
      data: [19, 16, 18, 21, 17, 24, 13]
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartBar2(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    legend: {
      data: ['美团', '饿了么'],
      show: true,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      top: 10,
      left: 'center',
    },
    grid: {
      containLabel: true,
      left: 0,
      top: 30,
      right: 4,
      bottom: 0
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      show: true,
      splitLine: {
        show: false
      }
    },
    yAxis: {
      show: true,
      data: ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '饿了么',
      type: 'bar',
      legendHoverLink: true,
      stack: 'stack1',
      barCategoryGap: '50%',
      barGap: '30%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'inside',
        margin: 8
      },
      itemStyle: {
        'color': '#ffd700'
      },
      data: [71, 69, 71, 56, 63, 73, 61]
    }, {
      name: '美团',
      type: 'bar',
      legendHoverLink: true,
      stack: 'stack1',
      barCategoryGap: '50%',
      barGap: '30%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'inside',
        margin: 8
      },
      itemStyle: {
        'color': '#1e90ff'
      },
      data: [19, 16, 18, 21, 17, 24, 13]
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartBar3(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ['#d87c7c', '#919e8b', '#d7ab82'],
    legend: {
      data: ['差评(1-2星)', '中评(3星)', '好评(4-5星)'],
      show: true,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      top: 10
    },
    grid: {
      containLabel: true,
      left: 0,
      top: 30,
      right: 4,
      bottom: 0
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      show: true,
      splitLine: {
        show: false
      },
      data: [ '美团 4.8分', '饿了么 4.6分']
    },
    yAxis: {
      show: true,
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '差评(1-2星)',
      type: 'bar',
      legendHoverLink: true,
      barCategoryGap: '20%',
      barGap: '0%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'top',
        margin: 8
      },
      data: [2, 4]
    }, {
      name: '中评(3星)',
      type: 'bar',
      legendHoverLink: true,
      barCategoryGap: '20%',
      barGap: '0%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'top',
        margin: 8
      },
      data: [1, 0]
    }, {
      name: '好评(4-5星)',
      type: 'bar',
      legendHoverLink: true,
      barCategoryGap: '20%',
      barGap: '0%',
      seriesLayoutBy: 'column',
      label: {
        show: true,
        position: 'top',
        margin: 8
      },
      data: [57, 18]
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartPie(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ['#ffd700', '#1e90ff'],
    legend: {
      data: ['美团', '饿了么'],
      show: false,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      top: 10
    },
    grid: {
      containLabel: true,
      left: 0,
      top: 30,
      right: 4,
      bottom: 0
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    series: [{
      type: 'pie',
      clockwise: true,
      data: [
        {
          name: '美团',
          value: 464
        }, {
          name: '饿了么',
          value: 128
        }
      ],
      center: ['50%', '50%'],
      radius: '80%',
      label: {
        show: true,
        position: 'top',
        margin: 8,
        formatter: "{b}:{c}\n{d}%"
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: () => { }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tableHeader: [
      {
        prop: 'datetime',
        label: '日期'
      },
      {
        prop: 'sign_in',
        label: '美团'
      },
      {
        prop: 'sign_out',
        label: '饿了么'
      },
      {
        prop: 'work_hour',
        label: '总计'
      }
    ],
    border: true,
    row: [
      {
        "id": 1,
        "status": '正常',
        "datetime": "2021-04-01",
        "sign_in_time": '09:30:00',
        "sign_out_time": '18:30:00',
        "work_hour": 8,
      }, {
        "id": 2,
        "status": '迟到',
        "datetime": "2021-04-02",
        "sign_in_time": '10:30:00',
        "sign_out_time": '18:30:00',
        "work_hour": 7,
      }
    ],
    ec: {
      onInit: initChart
    },
    ecLine: {
      onInit: initChartLine
    },
    ecLine2: {
      onInit: initChartLine2
    },
    ecBar: {
      onInit: initChartBar
    },
    ecBar2: {
      onInit: initChartBar2
    },
    ecBar3: {
      onInit: initChartBar3
    },
    ecPie: {
      onInit: initChartPie
    }
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
