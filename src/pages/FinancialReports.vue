<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Financial Report" to="/menu/financialreport" />
    </q-breadcrumbs>
    <q-card>
    <q-card-section>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Total Cost of Sampling</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(TotalCostSampling)}} &#8360;</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Sampling Cost this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(TotalCostSamplingthisMonth)}} &#8360;</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">ROI on Sampling</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;"><i>Coming Soon</i></div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    <br>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Maximum Expense Customer</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{MaximumExpenceCustomer}}</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Maximum Expense Product</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{MaximumExpenceProduct}}</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Best ROI Product</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;"><i>Coming Soon</i></div>
      </q-card-actions>
        </q-card>
    </div>
    </div>
    <br>
    <div class="row">
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Average Sample Order Cost this Year</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(AverageSampleOrderThisYear)}}  &#8360;</div>
      </q-card-actions>
        </q-card>
    </div>
    <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Average Sample Order Cost this Month</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;">{{CommaSeperator(AverageSampleOrderThisMonth)}}  &#8360;</div>
      </q-card-actions>
        </q-card>
    </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-white" align="center" style="background: #338DFF;">
              <div class="text-h6" style="font-size:18px;">Best Customer</div>
          </q-card-section>
        <q-card-actions class="q-pt-none" align="center">
          <div class="text-h6" style="font-size:18px;"><i>Coming Soon</i></div>
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
      TotalCostSampling: 0,
      TotalCostSamplingthisMonth: 0,
      MaximumExpenceCustomer: '',
      MaximumExpenceProduct: '',
      AverageSampleOrderThisYear: 0,
      AverageSampleOrderThisMonth: 0
    }
  },
  created () {
    this.GetFinancialReportData()
  },
  methods: {
    GetFinancialReportData: function () {
      var self = this
      self.Team = []
      self.$c.showLoader()
      self.$c.getData('Orders/GetFinancialReportData/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        self.TotalCostSampling = data[0].salesrepresentativecode
        self.TotalCostSamplingthisMonth = data[0].samplingdate
        self.MaximumExpenceCustomer = data[0].customercode
        self.MaximumExpenceProduct = data[0].dispatchdate
        self.AverageSampleOrderThisYear = data[0].trackingNo
        self.AverageSampleOrderThisMonth = data[0].zipcode
        self.$c.hideLoader()
      })
      // self.fetchTeamAndFollowUpCOuntOnDashboard()
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
