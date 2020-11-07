<template>
    <div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
      <!-- <div @click="$router.push({name: 'orders', params: { pitem: 'Pending' }})"> -->
      <q-card class="my-card" bordered="" style="max-height:360px !important;">
      <q-card-section class="text-white" align="center" style="background: #338DFF;padding: 7px;">
        <div class="text-h6" style="font-size:18px;">Pending Sample Orders</div>
      </q-card-section>
      <q-card-actions class="q-pt-none" align="center">
        <div style="margin-top: 2px;">{{pendingsamples}}</div>
      </q-card-actions>
      <hr style="margin-top: -5px;">
      <div class="row" style="margin-top: -12px;">
      <div class="col-12 col-md-12 q-pa-xs">
      <q-card-section style="margin-top: -70px;">
        <canvas  id="CurrentOverduebarChart"></canvas>
      </q-card-section>
      </div>
      </div>
      <hr style="margin-top: -85px;">
      <div class="row" style="margin-top: -15px;">
      <div class="col-12 col-md-6 q-pa-xs">
        <!-- <div  @click="$router.push({name: 'orders', params: { pitem: 'Pending' }})"> -->
        <q-card-section class="text-white my-card text-center" align="center" style="padding: 0px;">
          <div class="text-h6" style="font-size:17px;color:#77cbcb;">Current</div>
        </q-card-section>
        <q-card-actions class="q-pt-none" align="center" style="padding: 0px;color:#77cbcb;">
          <div>{{pendingsamplecurrentdate}}</div>
        </q-card-actions>
        <!-- </div> -->
      </div>
       <span id="vertical-line" style="margin-left: -1px;margin-top: 6px;"></span>
      <div class="col-12 col-md-6 q-pa-xs">
        <!-- <div @click="$router.push({name: 'orders', params: { pitem: 'Pending' }})"> -->
        <q-card-section class="text-white my-card text-center" align="center" style="padding: 0px;">
          <div class="text-h6" style="font-size:16px;color:#edca6e">Overdue</div>
        </q-card-section>
        <q-card-actions class="q-pt-none" align="center" style="padding: 0px;color:#edca6e;">
          <div>{{pendingsamplesoverdue}}</div>
        </q-card-actions>
        <!-- </div> -->
      </div>
      </div>
    </q-card>
      <!-- </div> -->
      <br>
        <!-- <div @click="$router.push({name: 'orders', params: { pitem: 'Dispatched' }})"> -->
          <q-card class="my-card" bordered="">
          <q-card-section class="text-white" align="center" style="background: #338DFF;padding: 7px;">
            <div class="text-h6" style="font-size:18px;"> Samples Dispatched</div>
          </q-card-section>
          <q-card-actions class="q-pt-none" align="center">
            <div style="margin-left: -1px;margin-top: 2px;">{{dispatchedsamplespresentmonth}}</div>
          </q-card-actions>
          <hr style="margin-top: -5px;">
          <div class="row" style="margin-top: -12px;">
          <div class="col-12 col-md-12 q-pa-xs">
          <q-card-section style="margin-top: -70px;">
            <canvas id="LastMonthPresentMonthbarChart"></canvas>
          </q-card-section>
          </div>
          </div>
          <hr style="margin-top: -85px;">
          <div class="row" style="margin-top: -15px;">
          <div class="col-12 col-md-6 q-pa-xs">
             <!-- <div @click="$router.push({name: 'orders', params: { pitem: 'Dispatched' }})"> -->
            <q-card-section class="text-white my-card text-center" align="center" style="padding: 0px;">
              <div class="text-h6" style="font-size:17px;color:#edca6e;">Last Month</div>
            </q-card-section>
            <q-card-actions class="q-pt-none" align="center" style="padding: 0px;color:#edca6e;">
              <div>{{dispatchedsampleslastmonth}}</div>
            </q-card-actions>
             <!-- </div> -->
          </div>
          <span id="vertical-line" style="margin-left: -1px;margin-top: 6px;"></span>
          <div class="col-12 col-md-6 q-pa-xs">
             <!-- <div @click="$router.push({name: 'orders', params: { pitem: 'Dispatched' }})"> -->
            <q-card-section class="text-white my-card text-center" align="center" style="padding: 0px;">
              <div class="text-h6" style="font-size:17px;color:#77cbcb;">Present Month</div>
            </q-card-section>
            <q-card-actions class="q-pt-none" align="center" style="padding: 0px;color:#77cbcb;">
              <div>{{dispatchedsamplespresentmonth}}</div>
            </q-card-actions>
             <!-- </div> -->
          </div>
          </div>
        </q-card>
      <!-- </div> -->
        </div>
    <!-- <div style="height:320px !important;"> -->
    <div class="col-12 col-md-8 q-pa-xs">
      <q-card class="my-card" style="max-height:345px !important;">
        <div class="text-h6" style="text-align:center;">Sampling Done per month </div>
      <q-card-section>
        <canvas style="max-height:300px !important;" id="lineChart"></canvas>
      </q-card-section>
      </q-card>
      </div>
  </div>
    <div class="row">
    <div class="col-12 col-md-3 q-pa-xs">
    <q-card class="my-card">
      <q-card-section class="bg-white text-center" >
          <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'Order-form', params: { pitem: 'New' }})" label="New Sample Order" />
      </q-card-section>
   </q-card>
    </div>
  <div class="col-12 col-md-3 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'task-form', params: { pitem: 'New' }})" label="New Task" />
    </q-card-section>
    </q-card>
    </div>
  <div class="col-12 col-md-3 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'tasks', params: { pitem: 'Pending' }})" :label="GetPendingTaskCount()" />
    </q-card-section>
    </q-card>
    </div>
  <div class="col-12 col-md-3 q-pa-xs">
    <q-card class="my-card">
      <q-card-section class="bg-white text-center" >
          <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'orders', params: { pitem: 'Dispatched' }})" :label="GetOrdersFollowUpCounts()" />
      </q-card-section>
    </q-card>
    </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
      <q-card class="my-card">
        <div class="text-h6" style="text-align:center;">Samples Distributed Customer Vise </div>
      <q-card-section>
        <canvas  id="myChart"></canvas>
      </q-card-section>
      </q-card>
      </div>
    <div class="col-12 col-md-4 q-pa-xs">
      <q-card class="my-card">
        <div class="text-h6" style="text-align:center;">Product Vise Sample Distribution</div>
        <!-- <div class="text-h6;" style="text-align:center;">Sample Distribution by Product</div> -->
      <q-card-section>
          <canvas  id="quantitychart"></canvas>
      </q-card-section>
      </q-card>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
      <q-card class="my-card">
        <div class="text-h6" style="text-align:center;">Samples by Sales Representative</div>
      <q-card-section>
        <canvas  id="salesrepresentativechart"></canvas>
      </q-card-section>
      </q-card>
      </div>
    </div>
  <!-- <q-card class="my-card">
    <q-card-section>
   <div class="text-h6">Samples by Sales Representative</div>
    </q-card-section>
   </q-card> -->
  <br/>
    <!-- <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'customer', params: { pitem: 'New' }})" label="Add Customer" />
    </q-card-section>
    </q-card>
      </div>
    <div class="col-12 col-md-4 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'product-form', params: { pitem: 'New', pstatus: 0 }})" label="Add Product" />
    </q-card-section>
    </q-card>
      </div>
    <div class="col-12 col-md-4 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'salerepresentative-form', params: { pitem: 'New' }})" label="Add Sales Representative" />
    </q-card-section>
    </q-card>
    <br/>
      </div>
    </div> -->
  </div>
</template>
<script src="chartjs-plugin-datalabels.js"></script>
<script>
import 'chartjs-plugin-datalabels'
import Chart from 'chart.js'
export default {
  data () {
    return {
      pendingsamples: 0,
      labelData: [],
      QuantitylabelData: [],
      SetGraph: [],
      GraphData: [],
      chartOptions: [],
      CountPendingTask: '',
      CountofSamplesFollowup: '',
      myChart: null,
      dispatchedsampleslastmonth: '',
      dispatchedsamplespresentmonth: '',
      barchartLastMonthData: [],
      pendingsamplecurrentdate: '',
      salesrepresentativechart: null,
      quantitychart: null,
      lineChart: null,
      CurrentbarChart: null,
      LastMonthPresentMonthbarChart: null,
      barchartPresentMonthData: [],
      PresentMonthbarChart: null,
      CurrentOverduebarChart: null,
      linechartlabelData: [],
      linechartGraphData: [],
      barchartlabelData: [],
      barchartCurrentsample: [],
      barchartOverdue: [],
      pendingsamplesoverdue: '',
      SalesRepresetativelabelData: [],
      SalesRepresetativeGraphData: [],
      QuantityGraphData: [],
      checkdata: [],
      dispatchedsamples: 0,
      CustomerTask: 0
    }
  },
  created () {
    this.fetchsamplescount()
    this.$c.showLoader()
  },
  mounted () {
    this.getOverduegraphondashboard()
  },
  methods: {
    fetchsamplescount: function () {
      var self = this
      self.Team = []
      self.$c.getData('Orders/loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        self.pendingsamples = data[0].salesrepresentativecode
        self.pendingsamplecurrentdate = data[0].samplingdate
        self.pendingsamplesoverdue = data[0].customercode
        self.dispatchedsamplespresentmonth = data[0].dispatchdate
        self.dispatchedsampleslastmonth = data[0].zipcode
        self.$c.hideLoader()
      })
      self.fetchTeamAndFollowUpCOuntOnDashboard()
    },
    fetchTeamAndFollowUpCOuntOnDashboard: function () {
      var self = this
      self.$c.getData('Tasks/fetchTaskAndFollowUpCOuntOnDashboard/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        self.CountPendingTask = data[0].status
        self.CountofSamplesFollowup = data[0].tasktype
        self.$c.hideLoader()
      })
    },
    GetPendingTaskCount: function () {
      return 'Pending Tasks :' + ' ' + this.CountPendingTask
    },
    GetOrdersFollowUpCounts: function () {
      return 'Follow Ups needed :' + ' ' + this.CountofSamplesFollowup
    },
    getOverduegraphondashboard: function () {
      var self = this
      self.$c.showLoader()
      if (self.CurrentOverduebarChart !== null) {
        self.CurrentOverduebarChart.destroy()
      }
      self.barchartOverdue = []
      self.barchartCurrentsample = []
      self.$c.getData('Orders/' + 'loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        if (data.length !== 0) {
          data.forEach(function (item, index, array) {
            self.barchartOverdue.push(item.customercode)
            self.barchartCurrentsample.push(item.samplingdate)
          })
            var ctx = document.getElementById("CurrentOverduebarChart").getContext('2d');
            var chart = new Chart(ctx, {
              type: 'horizontalBar',
              data: {
                labels: [''],
                datasets: [{
                  label: 'Current',
                  data: self.barchartCurrentsample,
                  backgroundColor: '#338DFF'
                }, {
                  label: 'Overdue',
                  data: self.barchartOverdue,
                  backgroundColor: 'rgb(237,202,110)'
                }]
            },
            options: {
                responsive: false,
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display:false
                    },
                    ticks: {
                      // min: 0,
                      // max: 25,
                      // stepSize: 1,
                      display: false,
                    },
                      stacked: true // this should be set to make the bars stacked
                  }],
                  yAxes: [{
                    stacked: true,
                    barPercentage: 0.2,
                    ticks: {
                      display: false,
                    },
                    gridLines: {
                          display:false
                      }
                  }]
                }
            }
        })
        self.GetLastMonthGraphonDashboard()
      }
    })
},
    GetLastMonthGraphonDashboard: function () {
      var self = this
            self.$c.showLoader()
      if (self.LastMonthPresentMonthbarChart !== null) {
        self.LastMonthPresentMonthbarChart.destroy()
      }
      self.barchartLastMonthData = []
      self.PresentMonthbarChart = []
      self.$c.getData('Orders/' + 'loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        if (data.length !== 0) {
          data.forEach(function (item, index, array) {
            self.barchartLastMonthData.push(item.zipcode)
            self.barchartPresentMonthData.push(item.dispatchdate)
          })
            var ctx = document.getElementById("LastMonthPresentMonthbarChart").getContext('2d');
            var chart = new Chart(ctx, {
              type: 'horizontalBar',
              data: {
                labels: [''],
                datasets: [{
                  label: 'Last Month',
                  data: self.barchartLastMonthData,
                  backgroundColor: 'rgb(237,202,110)'
                }, {
                  label: 'Present Month',
                  data: self.barchartPresentMonthData,
                  backgroundColor: '#338DFF'
                }]
            },
            options: {
                responsive: false,
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display:false
                    },
                    ticks: {
                      // min: 0,
                      // max: 25,
                      // stepSize: 1,
                      display: false,
                    },
                      stacked: true // this should be set to make the bars stacked
                  }],
                  yAxes: [{
                    stacked: true,
                    barPercentage: 0.2,
                    ticks: {
                      display: false,
                    },
                    gridLines: {
                          display:false
                      }
                  }]
                }
            }
        })
        self.GetLineGraphonDashboard()()
      }
    })
    },
    GetLineGraphonDashboard: function () {
      var self = this
      self.$c.showLoader()
      if (self.lineChart !== null) {
        self.lineChart.destroy()
      }
      self.linechartlabelData = []
      self.linechartGraphData = []
      self.$c.getData('Orders/' + 'GetLineGraphOnDashboard/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        if (data.length !== 0) {
          data.forEach(function (item, index, array) {
            self.linechartlabelData.push(item.states)
            self.linechartGraphData.push(item.country)
          })
          console.log(JSON.stringify(self.linechartlabelData))
          var ctx = document.getElementById('lineChart').getContext('2d');
            var lineChart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: self.linechartlabelData,
                    datasets: [{
                        // label: 'Sampling Done',
                        // backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(95, 154, 212)',
                        data: self.linechartGraphData
                    }]
                },

                // Configuration options go here
                options: {
                legend: {
                    display: false
                },
                  scales: {
                    xAxes: [{
                      gridLines: {
                          display:false
                      }
                  }],
                    yAxes: [{
                      stacked: true,
                      gridLines: {
                        display:false
                    }
                  }]
                }
                }
            });
          self.GetCustomerGraphonDashboard()
        }
      })
    },
    GetCustomerGraphonDashboard: function () {
      var self = this
      self.$c.showLoader()
      if (self.myChart !== null) {
        self.myChart.destroy()
      }
      self.labelData = []
      self.GraphData = []
      self.$c.getData('Orders/' + 'GetCustomersGraphOnDashboard/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        if (data.length !== 0) {
          // console.log(data)
          data.forEach(function (item, index, array) {
            self.labelData.push(item.customercode)
            self.GraphData.push(item.salesrepresentativecode)
          })
          console.log(JSON.stringify(self.labelData))
          var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                      labels: self.labelData,
                      datasets: [{
                            data: self.GraphData,
                            backgroundColor: ["#356798", "#FF4136", "#6598cd", "#9dc8cb", "#f0cde1", "#d69fc7", "#c677b0", "#663a93", "#382662"],
                            // backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                          borderWidth: 1
                      }]
                  },
                  options: {
                    legend: {
                      position: 'right'
                    },
                    scales: {
                    yAxes: [{
                    ticks: {
                    display: false,
                  },
                    gridLines: {
                      drawBorder: false,
                      display: false,
                    },
                }]
              }
            }
          })
          self.GetQuantityGraphonDashboard()
        }
      })
    },
    GetQuantityGraphonDashboard: function () {
      var self = this
      self.$c.showLoader()
      if (self.quantitychart !== null) {
        self.quantitychart.destroy()
      }
      self.QuantitylabelData = []
      self.QuantityGraphData = []
      self.$c.getData('Orders/' + 'GetQuantityGraphonDashboard/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        if (data.length !== 0) {
          data.forEach(function (item, index, array) {
            self.QuantitylabelData.push(item.updateuser)
            self.QuantityGraphData.push(item.insertuser)
          })
          var ctx = document.getElementById('quantitychart').getContext('2d');
          self.quantitychart = new Chart(ctx, {
            type: 'pie',
            data: {
                      labels: self.QuantitylabelData,
                      datasets: [{
                          label: 'Customers',
                            data: self.QuantityGraphData,
                            backgroundColor: ["#346699", "#6799cb", "#76cddd", "#d2edf3", "#70c066", "#369946", "#026666"],
                            // backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                          borderWidth: 1
                      }]
                  },
                  options: {
                    legend: {
                      position: 'right'
                    },
                    scales: {
                    yAxes: [{
                    ticks: {
                    display: false,
                  },
                    gridLines: {
                      drawBorder: false,
                      display: false,
                    },
                }]
              }
            }
          })
        }
        self.GetSalesRepresetativeGraphonDashboard()
      })
    },
    GetSalesRepresetativeGraphonDashboard: function () {
      var self = this
      self.$c.showLoader()
      if (self.salesrepresentativechart !== null) {
        self.salesrepresentativechart.destroy()
      }
      self.SalesRepresetativelabelData = []
      self.SalesRepresetativeGraphData = []
      self.$c.getData('Orders/' + 'GetSalesRepresetativeGraphonDashboard/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        if (data.length !== 0) {
          data.forEach(function (item, index, array) {
            self.SalesRepresetativelabelData.push(item.addressline1)
            self.SalesRepresetativeGraphData.push(item.status)
          })
          var ctx = document.getElementById('salesrepresentativechart').getContext('2d');
          self.salesrepresentativechart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                      labels: self.SalesRepresetativelabelData,
                      datasets: [{
                          label: 'Customers',
                            data: self.SalesRepresetativeGraphData,
                            backgroundColor: ["#6699cc", "#333399", "#333366", "#cccc33", "#ffcc99", "#ffffcc", "#ccffff"],
                            // backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                          borderWidth: 1
                      }]
                  },
                  options: {
                    legend: {
                      position: 'right'
                    },
                    scales: {
                    yAxes: [{
                    ticks: {
                    display: false,
                  },
                  gridLines: {
                    drawBorder: false,
                    display: false,
                  },
                }]
              }
            }
          })
        }
        self.$c.hideLoader()
      })
    }
  }
}
</script>
<style scoped>
.my-card {
  /* padding: -10px; */
  border-radius: 25px;
  /* border-block-end-color: #338DFF; */
}
body {
  line-height: 0;
}
.q-card__section--vert {
    padding: 16px;
}
#vertical-line {
  float: left;
  height: auto;
  width: 1px;
  background-color: grey;
}
</style>
