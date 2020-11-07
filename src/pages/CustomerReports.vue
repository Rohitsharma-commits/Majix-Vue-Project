<template>
  <div>
   <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Customer Report" to="/menu/customerreport" />
    </q-breadcrumbs>
    <q-card>
    <q-card-section>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">On Time Sampling this Year</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(OnTimeSamplingThisYear)}}</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:17px;">On Time Sampling this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(OnTimeSamplingThisMonth)}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Lowest ROI Customer</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">Comming Soon</div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    <br>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Cancelled Samples this Year</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(CancelSamplesThisYear)}}</div>
          <!-- aaa -->
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Cancelled Samples this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
         <div class="text-h6" style="font-size:18px;">{{CommaSeperator(CancelSamplesThisMonth)}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Lowest ROI Sector</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">Comming Soon</div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    <br>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Highest Cancelled Product this Year</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{HighestProductCanceledthisYear}}</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Highest Cancelled Product this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{HighestProductCanceledthisMonth}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Lowest ROI Customer</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">Comming Soon</div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      OnTimeSamplingThisMonth: 0,
      OnTimeSamplingThisYear: 0,
      CancelSamplesThisYear: 0,
      CancelSamplesThisMonth: 0,
      HighestProductCanceledthisYear: '',
      HighestProductCanceledthisMonth: ''
    }
  },
  created () {
    this.GetCustomerReportData()
    this.$c.showLoader()
  },
  methods: {
    GetCustomerReportData: function () {
      var self = this
      self.Team = []
      self.$c.showLoader()
      self.$c.getData('Orders/GetCustomerReportData/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        self.OnTimeSamplingThisYear = Number(data[0].salesrepresentativecode)
        self.OnTimeSamplingThisMonth = Number(data[0].samplingdate)
        self.CancelSamplesThisYear = data[0].customercode
        self.CancelSamplesThisMonth = data[0].dispatchdate
        self.HighestProductCanceledthisYear = data[0].zipcode
        self.HighestProductCanceledthisMonth = data[0].courierNo
        self.$c.hideLoader()
      })
    //   self.fetchTeamAndFollowUpCOuntOnDashboard()
    },
    CommaSeperator (n) {
      var m = parseFloat(n).toLocaleString()
      return m
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
</style>
