<template>
    <div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
      <div @click="$router.push({name: 'orders', params: { pitem: 'Pending', pstatus: 1 }})">
      <q-card class="my-card">
      <q-card-section class="text-white" style="background: #338DFF">
        <div class="text-h6"> Pending Samples the Month</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn flat>{{pendingsamples}}</q-btn>
      </q-card-actions>
    </q-card>
      </div>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
      <div @click="$router.push({name: 'orders', params: { pitem: 'Dispatched', pstatus: 1 }})">
      <q-card class="my-card">
      <q-card-section class="text-white" style="background: #338DFF">
        <div class="text-h6">Samples Dispatched this Month </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn flat>{{dispatchedsamples}}</q-btn>
      </q-card-actions>
    </q-card>
      </div>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
      <div @click="$router.push({name: 'tasks', params: { pitem: 'Completed', pstatus: 1 }})">
      <q-card class="my-card">
      <q-card-section class="text-white" style="background: #338DFF">
        <div class="text-h6"> Customer Visits Done</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn flat>{{CustomerTask}}</q-btn>
      </q-card-actions>
    </q-card>
      </div>
    </div>
  </div>
  <br/>
   <q-card class="my-card">
    <q-card-section>
   <div class="text-h6">Samples by Customer </div>
     </q-card-section>
   </q-card>
    <div class="row">
      <div class="col-12 col-md-6 q-pa-xs">
      <q-card class="my-card">
      <q-card-section>
        <canvas  id="myChart"></canvas>
      </q-card-section>
      </q-card>
      </div>
    <div class="col-12 col-md-6 q-pa-xs">
      <q-card class="my-card">
      <q-card-section>
          <canvas  id="quantitychart"></canvas>
      </q-card-section>
      </q-card>
      </div>
    </div>
    <br/>
   <q-card class="my-card">
      <q-card-section class="bg-white text-center" >
          <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'Order-form', params: { pitem: 'New' }})" label="New Sample Order" />
      </q-card-section>
   </q-card>
   <br/>
  <q-card class="my-card">
    <q-card-section>
   <div class="text-h6">Samples by Sales Representative</div>
    </q-card-section>
   </q-card>
    <div class="row">
      <div class="col-12 col-md-12 q-pa-xs">
      <q-card class="my-card">
      <q-card-section>
        <canvas  id="salesrepresentativechart"></canvas>
      </q-card-section>
      </q-card>
      </div>
    </div>
  <br/>
    <div class="row">
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
    </div>
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
      myChart: null,
      salesrepresentativechart: null,
      quantitychart: null,
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
    this.GetCustomerGraphonDashboard()
  },
  methods: {
    fetchsamplescount: function () {
      var self = this
      self.Team = []
      self.$c.getData('Orders/loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        self.pendingsamples = data[0].salesrepresentativecode
        self.dispatchedsamples = data[0].customercode
        self.CustomerTask = data[0].dispatchdate
        // self.TeamAll = self.Team
        self.$c.hideLoader()
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
                            backgroundColor: ["red", "blue", "green", "blue", "red", "blue"],
                            borderColor: ["red", "blue", "green", "blue", "red", "blue"],
                          borderWidth: 1
                      }]
                  },
                  options: {
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
                            backgroundColor: ["Orange", "blue", "green", "blue", "red", "blue"],
                            borderColor: ["Orange", "blue", "green", "blue", "red", "blue"],
                          borderWidth: 1
                      }]
                  },
                  options: {
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
                            backgroundColor: ["blue", "Orange", "green", "blue", "red", "blue"],
                            borderColor: ["blue", "Orange", "green", "blue", "red", "blue"],
                          borderWidth: 1
                      }]
                  },
                  options: {
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
