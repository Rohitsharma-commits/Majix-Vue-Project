<template>
  <div>
   <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Product Report" to="/menu/financialreport" />
    </q-breadcrumbs>
    <q-card>
    <q-card-section>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Highest Demand Product this Year</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{HighestDemandProductThisYear}}</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:17px;">Highest Demand Product Group this Year</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{HighestDemandProductGroupThisYear}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Best ROI Product</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;"><i>Comming Soon</i></div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    <br>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Highest Demand Product this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{HighestDemandProductThisMonth}}</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Highest Demand Product Group this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
        <div class="text-h6" style="font-size:18px;">{{HighestDemandProductGroupThisMonth}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Best ROI Product Group</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;"><i>Comming Soon</i></div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    <br>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Slowest Sampling Product</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{AverageSampleOrderThisYear}}</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Fastest Sampling Product</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{AverageSampleOrderThisMonth}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Best Customer</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;"><i>Comming Soon</i></div>
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
      HighestDemandProductThisYear: '',
      HighestDemandProductGroupThisYear: '',
      HighestDemandProductThisMonth: '',
      HighestDemandProductGroupThisMonth: '',
      AverageSampleOrderThisYear: '',
      AverageSampleOrderThisMonth: ''
    }
  },
  created () {
    this.GetFinancialReportData()
    this.$c.showLoader()
  },
  methods: {
    GetFinancialReportData: function () {
      var self = this
      self.Team = []
      self.$c.showLoader()
      self.$c.getData('Orders/GetProductReportData/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        self.HighestDemandProductThisYear = data[0].salesrepresentativecode
        self.HighestDemandProductGroupThisYear = data[0].samplingdate
        self.HighestDemandProductThisMonth = data[0].customercode
        self.HighestDemandProductGroupThisMonth = data[0].dispatchdate
        self.AverageSampleOrderThisYear = data[0].trackingNo
        self.AverageSampleOrderThisMonth = data[0].zipcode
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
