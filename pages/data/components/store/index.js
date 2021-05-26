// pages/data/components/base/index.js
import {userModel} from '../../../../models/user.js';
const user = new userModel()
import {login} from '../../../../utils/login.js';
const Login = new login();
import * as echarts from '../../../../ec-canvas/echarts';

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
    shopName: {
      type: String
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
        prop: 'mt_valiOrder',
        label: '美团'
      },
      {
        prop: 'eleme_valiOrder',
        label: '饿了么'
      },
      {
        prop: 'order_total',
        label: '总计'
      }
    ],
    border: true,
    orderData: [],
    exposureHeader: [
      {
        prop: 'datetime',
        label: '日期'
      },
      {
        prop: 'mt_exposure',
        label: '美团'
      },
      {
        prop: 'eleme_exposure',
        label: '饿了么'
      },
      {
        prop: 'exposure_total',
        label: '总计'
      }
    ],
    exposureData: [],
    ec1: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },
    ec3: {
      lazyLoad: true
    },
    ec4: {
      lazyLoad: true
    },
    ec5: {
      lazyLoad: true
    },
    ec6: {
      lazyLoad: true
    },
    ec7: {
      lazyLoad: true
    },
    exposureCount: {},
    visitCount: {},
    buyer: {},
    dates: ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25']
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
  observers: {
    'shopName': function(newVal) {
      if (newVal) {
        this.getData()
        this.getEvaluate()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      // tabsData
      Login.checkLogin(() => {
        const time = this.getTime()
        const startTime = time[0]
        const endTime = time[1]
        user.getShopInfo(startTime, endTime).then(res => {
          this.setData({
            orderData: this.handleOrderData(res.order_count),
            exposureData: this.handleOrderData(res.exposure_count)
          })
          this.initChart(res.order_count)
          this.initChartBar(res.order_count)
          this.initChartBar2(res.exposure_count)
          this.initChartLine(res.visitConvRate_count)
          this.initChartLine2(res.buyerConvRate)
          this.initChartPie(res.order_count)
        })
      }, false)
    },
    getEvaluate() {
      // tabsData
      Login.checkLogin(() => {
        user.getShopReview().then(res => {
          this.initChartBar3(res)
        })
      }, false)
    },
    handleOrderData(orderData) {
      const arr = []
      for (let k in orderData) {
        arr.push(Object.assign({}, orderData[k], {datetime: k}))
      }
      return arr
    },
    initChart(orderData) {
      const dates = []
      const orders = []
      for (let k in orderData) {
        dates.push(k)
        orders.push(orderData[k]['order_total'])
      }
      const ecComponent = this.selectComponent('#mychart-dom-line'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
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
            right: 15,
            bottom: 40
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: dates
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }, {
            start: 0,
            end: 100
          }],
          series: [{
            name: '外卖单量',
            type: 'line',
            smooth: true,
            data: orders
          }]
        };
        echart.setOption(option, true); //赋值渲染

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    initChartLine(rateData) {
      const dates = []
      const dates2 = []
      const mj_data = []
      const eleme_data = []
      for (let k in rateData.eleme) {
        dates.push(k)
        eleme_data.push(rateData.eleme[k])
      }
      for (let k in rateData.mt) {
        dates2.push(k)
        mj_data.push(rateData.mt[k])
      }
      const ecComponent = this.selectComponent('#mychart-dom-line2'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
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
            top: 50,
            right: 15,
            bottom: 40
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          xAxis: {
            data: dates.length > dates2.length ? dates : dates2,
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
            end: 100
          }, {
            start: 0,
            end: 100
          }],
          series: [{
            name: '美团',
            type: 'line',
            data: mj_data,
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
            data: eleme_data,
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
        echart.setOption(option, true); //赋值渲染
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    initChartLine2(buyerData) {
      const dates = []
      const dates2 = []
      const mj_data = []
      const eleme_data = []
      for (let k in buyerData.eleme) {
        dates.push(k)
        eleme_data.push(buyerData.eleme[k])
      }
      for (let k in buyerData.mt) {
        dates2.push(k)
        mj_data.push(buyerData.mt[k])
      }
      const ecComponent = this.selectComponent('#mychart-dom-line3'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
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
            top: 50,
            right: 15,
            bottom: 40
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          xAxis: {
            data: dates.length > dates2.length ? dates : dates2,
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
            end: 100
          }, {
            start: 0,
            end: 100
          }],
          series: [{
            name: '美团',
            type: 'line',
            data: mj_data,
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
            data: eleme_data,
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
        echart.setOption(option, true); //赋值渲染
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    initChartBar(orderData) {
      const dates = []
      const mj_data = []
      const eleme_data = []
      for (let k in orderData) {
        dates.push(k)
        mj_data.push(orderData[k]['mt_valiOrder'])
        eleme_data.push(orderData[k]['eleme_valiOrder'])
      }
      const ecComponent = this.selectComponent('#mychart-dom-bar'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
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
            right: 15,
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
            data: dates,
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
              'color': '#1e90ff'
            },
            data: eleme_data
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
              'color': '#ffd700'
            },
            data: mj_data
          }]
        };
        echart.setOption(option, true); //赋值渲染

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    initChartBar2(exposureData) {
      const dates = []
      const mj_data = []
      const eleme_data = []
      for (let k in exposureData) {
        dates.push(k)
        mj_data.push(exposureData[k]['mt_exposure'])
        eleme_data.push(exposureData[k]['eleme_exposure'])
      }
      const ecComponent = this.selectComponent('#mychart-dom-bar2'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
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
            right: 15,
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
            data: dates,
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
              'color': '#1e90ff'
            },
            data: eleme_data
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
              'color': '#ffd700'
            },
            data: mj_data
          }]
        };
        echart.setOption(option, true); //赋值渲染

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    initChartBar3(evaluateData) {
      const dates = []
      const bad_data = []
      const medium_data = []
      const good_data = []
      for (let k in evaluateData) {
        dates.push(
          k == 'eleme' ?
          '饿了么 ' + evaluateData[k]['score'] + '分'
          :
          '美团 ' + evaluateData[k]['score'] + '分'
        )
        bad_data.push(evaluateData[k]['bad_rate'])
        medium_data.push(evaluateData[k]['medium_rate'])
        good_data.push(evaluateData[k]['good_rate'])
      }
      const ecComponent = this.selectComponent('#mychart-dom-bar3'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
          color: ['#d87c7c', '#919e8b', '#d7ab82'],
          legend: {
            data: ['差评(1-2星)', '中评(3星)', '好评(4-5星)'],
            show: true,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            top: 5
          },
          grid: {
            containLabel: true,
            left: 0,
            top: 40,
            right: 0,
            bottom: 5
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
            data: dates
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
            data: bad_data
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
            data: medium_data
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
            data: good_data
          }]
        };
        echart.setOption(option, true); //赋值渲染
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    initChartPie(orderData) {
      let mj_count = 0
      let eleme_count = 0
      for (let k in orderData) {
        mj_count += Number(orderData[k]['mt_valiOrder'])
        eleme_count += Number(orderData[k]['eleme_valiOrder'])
      }
      const ecComponent = this.selectComponent('#mychart-dom-pie'); //获取组件
      ecComponent.init((canvas, width, height, dpr) => {       //初始化
        // 初始化图表
        const echart = echarts.init(canvas, null, {  //初始化图表
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {   //数据配置
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
            right: 0,
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
                value: mj_count
              }, {
                name: '饿了么',
                value: eleme_count
              }
            ],
            center: ['50%', '50%'],
            radius: '84%',
            label: {
              show: true,
              position: 'inside', //inside
              margin: 8,
              formatter: "{b}:{c}\n{d}%"
            }
          }]
        };
        echart.setOption(option, true); //赋值渲染
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return echart;
      });
    },
    getTime() {
      // 在组件实例进入页面节点树时执行
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      //获取年份
      var Y = date.getFullYear();
      //获取月份
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var date2 = new Date(timestamp - 7 * 24 * 60 * 60 * 1000);
      //获取年份
      var Y2 = date2.getFullYear();
      //获取月份
      var M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1);
      //获取当日日期
      var D2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate()
      return [Y2 + '-' + M2 + '-' + D2, Y + '-' + M + '-' + D]
    }
  }
})
