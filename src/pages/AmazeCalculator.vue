<template>
  <div>
    <q-card>
    <q-card>
     <q-card-section>
       <h4 style="text-align:center;margin: 0px;"><b><u>AMAZE- Your Seller Calculator</u></b></h4>
     </q-card-section>
     <q-separator></q-separator>
    </q-card>
      <q-card-section>
    <!-- <div class="row">
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense v-model="amazerecord.salesprice" label="Sales Price" type="text"/>
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense  v-model="amazerecord.gst" label="GST %" type="text"/>
        </div>
        <div class="col-12 col-md-2 q-pa-xs">
          <q-input outlined dense label="Volume Weight" type="text"/>
        </div>
        <div class="col-12 col-md-2 q-pa-xs">
          <q-input outlined dense label="Commission %" type="text"/>
        </div>
        <div class="col-12 col-md-2 q-pa-xs">
          <q-input outlined dense label="Return %" type="text"/>
        </div>
        </div>
        <div class="row">
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense v-model="amazerecord.additionalshipping" label="Additional Shipping" type="text"/>
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense label="Weight" type="text"/>
        </div>
        <div class="col-12 col-md-2 q-pa-xs">
          <q-input outlined dense label="Length" type="text"/>
        </div>
        <div class="col-12 col-md-2 q-pa-xs">
          <q-input outlined dense label="Breadth" type="text"/>
        </div>
        <div class="col-12 col-md-2 q-pa-xs">
          <q-input outlined dense label="Height" type="text"/>
        </div>
        </div>
      <div class="row">
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense label="Cost Price" type="text"/>
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense label="Calculate Weight" type="text"/>
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense label="Special Category" type="text"/>
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined dense label="STEP" type="text"/>
        </div>
        </div> -->
  <div style="overflow-x:auto;">
  <table>
  <tr>
    <td><b>Sales Price</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.B3" type="number"/></td>
    <td><b>GST</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.D3" type="number"/></td>
    <td><b>Volume Weight</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.H3" readonly="" type="number"/></td>
    <td><b>Commission %</b></td>
    <td><q-input outlined dense v-model="amazeheaderrecord.N3" type="number"/></td>
    <td><b>Return %</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.P3" type="number"/></td>
  </tr>
    <tr>
    <td><b>Additional Shippings</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.B4" type="text"/></td>
    <td><b>Weight</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.D4" type="text"/></td>
    <td><b>Length</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.G4" type="text"/></td>
    <td><b>Breadth</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.J4" type="text"/></td>
    <td><b>Height in cms</b></td>
    <td><q-input outlined dense v-model="amazeheaderrecord.L4" type="text"/></td>
  </tr>
  <tr>
    <td><b>Cost Price</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.B5" type="text"/></td>
    <td><b>Calc Weight</b></td>
    <td><q-input outlined dense  v-model="amazeheaderrecord.D5" readonly="" type="text"/></td>
    <td><b>Special Category</b></td>
    <!-- <td><q-input outlined dense  v-model="amazeheaderrecord.specialcategory" type="text"/></td> -->
    <td>
      <q-select v-model="amazeheaderrecord.H5" outlined dense emit-value use-input hide-selected fill-input map-options :options="[
          {label: 'Yes', value: 'Yes'},
          {label: 'No', value: 'No'}
        ]" >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    </td>
    <td><b>STEP</b></td>
    <!-- <td><q-input outlined dense  v-model="amazeheaderrecord.step" type="text"/></td> -->
    <td>
      <q-select v-model="amazeheaderrecord.L5" outlined dense emit-value use-input hide-selected fill-input map-options :options="[
          {label: 'Basic', value: 'Basic'},
          {label: 'Standard', value: 'Standard'},
          {label: 'Advanced', value: 'Advanced'},
          {label: 'Premium', value: 'Premium'}
        ]" >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    </td>
    <td>
     <q-btn label="cancel" @click="ClearAllData()" size="md" />
    </td>
      <td>
     <q-btn label="calculate" @click="CalculateGST(amazeheaderrecord)" color="primary" size="md" />
    </td>
  </tr>
  </table>
  </div>
        <br/>
  <div style="overflow-x:auto;">
  <table>
  <tr>
    <th style="text-align:center;"></th>
    <th style="text-align:center;">Self Ship</th>
    <th style="text-align:center;">Easy Ship</th>
    <th style="text-align:center;">FBA</th>
    <th style="text-align:center;">Seller Flex</th>
  </tr>
  <tr>
    <td><b>Selling Price</b></td>
    <td>
<table>
  <tr>
    <th>Local</th>
    <th>Regional</th>
    <th>National</th>
  </tr>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense  readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense  readonly="" v-model="amazerecord.salesprice" type="text"/></td>
  </tr>
</table>
    </td>
    <td>
<table>
  <tr>
    <th>Local</th>
    <th>Regional</th>
    <th>National</th>
  </tr>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
  </tr>
</table>
    </td>
    <td>
<table>
  <tr>
    <th>Local</th>
    <th>Regional</th>
    <th>National</th>
  </tr>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
  </tr>
</table>
    </td>
  <td>
<table>
  <tr>
    <th>Local</th>
    <th>Regional</th>
    <th>National</th>
  </tr>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.salesprice" type="text"/></td>
  </tr>
</table>
    </td>
  </tr>
    <tr>
    <td><b>Additional Shipping</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.additionalshipping" type="text"/></td>
  </tr>
    </td>
  </tr>

  <tr>
    <td><b>GST</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.gst" type="text"/></td>
  </tr>
    </td>
  </tr>

    <tr>
    <td><b>Selling Price Without GST</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.sellingpricewithoutgst" type="text"/></td>
  </tr>
    </td>
  </tr>

      <tr>
    <td><b>Fixed Closing Fees</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D15" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H15" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L15" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O15" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P15" type="text"/></td>
  </tr>
    </td>
  </tr>

      <tr>
    <td><b>Referral Fees</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
  </tr>
    </td>
  </tr>

    <tr>
    <td><b>Weight Handling Fees</b></td>
    <td>
    <tr>
  </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F17" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G17" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H17" type="text"/></td>
  </tr>
    </td>
    <td>
    <tr>
    <!-- <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.referalfees" type="text"/></td> -->
  </tr>
    </td>
  <td>
    <tr>
  </tr>
    </td>
  </tr>
</table>
  </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amazeheaderrecord: {
        B3: '',
        D3: '',
        H3: '',
        N3: '',
        P3: '',
        B4: '',
        D4: '',
        G4: '',
        J4: '',
        L4: '',
        B5: '',
        D5: '',
        H5: 'No',
        L5: 'Standard'
      },
      amazerecord: {
        salesprice: '',
        additionalshipping: '',
        gst: '',
        sellingpricewithoutgst: '',
        B15: '',
        C15: '',
        D15: '',
        F15: '',
        G15: '',
        H15: '',
        J15: '',
        K15: '',
        L15: '',
        N15: '',
        O15: '',
        P15: '',
        referalfees: '',
        F17: '',
        G17: '',
        H17: ''
      },
      roundoff: '',
      premiumdata: '',
      testdata: '',
      testdata1: '',
      testdata2: ''
    }
  },
  methods: {
    CalculateGST: function (row) {
      var self = this
      row.H3 = row.G4 * row.J4 * row.L4 / 5000
      if (row.D4 > row.H3) {
        row.D5 = row.D4
      } else {
        row.D5 = row.H3
      }
      self.amazerecord.salesprice = row.B3
      self.amazerecord.additionalshipping = row.B4
      self.roundoff = (row.B3 * row.D3) / (100 + Number(row.D3))
      self.amazerecord.gst = self.roundoff.toFixed(2)
      self.roundoff = row.B3 / (1 + Number(row.D3) / 100)
      self.amazerecord.sellingpricewithoutgst = self.roundoff.toFixed(2)
      self.roundoff = row.N3 / 100 * row.B3
      self.amazerecord.sellingpricewithoutgst = self.roundoff.toFixed(2)
      if (row.B3 < 251) {
        self.amazerecord.B15 = 6
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.B15 = 16
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.B15 = 32
      } else {
        self.amazerecord.B15 = 59
      }
      if (row.B3 < 251) {
        self.amazerecord.C15 = 6
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.C15 = 16
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.C15 = 32
      } else {
        self.amazerecord.C15 = 59
      }
      if (row.B3 < 251) {
        self.amazerecord.D15 = 6
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.D15 = 16
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.D15 = 32
      } else {
        self.amazerecord.D15 = 59
      }

      if (row.B3 < 251) {
        self.amazerecord.F15 = 5
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.F15 = 8
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.F15 = 28
      } else {
        self.amazerecord.F15 = 50
      }
      if (row.B3 < 251) {
        self.amazerecord.G15 = 5
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.G15 = 8
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.G15 = 28
      } else {
        self.amazerecord.G15 = 50
      }
      if (row.B3 < 251) {
        self.amazerecord.H15 = 5
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.H15 = 8
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.H15 = 28
      } else {
        self.amazerecord.H15 = 50
      }

      if (row.H5 === 'Yes') {
        if (row.B3 < 251) {
          self.amazerecord.J15 = 25
        } else if (row.B3 > 250 && row.B3 < 501) {
          self.amazerecord.J15 = 12
        } else if (row.B3 > 500 && row.B3 < 1001) {
          self.amazerecord.J15 = 15
        } else {
          self.amazerecord.J15 = 30
        }
      } else {
        if (row.B3 < 251) {
          self.amazerecord.J15 = 25
        } else if (row.B3 > 250 && row.B3 < 501) {
          self.amazerecord.J15 = 20
        } else if (row.B3 > 500 && row.B3 < 1001) {
          self.amazerecord.J15 = 15
        } else {
          self.amazerecord.J15 = 30
        }
      }
      if (row.H5 === 'Yes') {
        if (row.B3 < 251) {
          self.amazerecord.K15 = 25
        } else if (row.B3 > 250 && row.B3 < 501) {
          self.amazerecord.K15 = 12
        } else if (row.B3 > 500 && row.B3 < 1001) {
          self.amazerecord.K15 = 15
        } else {
          self.amazerecord.K15 = 30
        }
      } else {
        if (row.B3 < 251) {
          self.amazerecord.K15 = 25
        } else if (row.B3 > 250 && row.B3 < 501) {
          self.amazerecord.K15 = 20
        } else if (row.B3 > 500 && row.B3 < 1001) {
          self.amazerecord.K15 = 15
        } else {
          self.amazerecord.K15 = 30
        }
      }
      if (row.H5 === 'Yes') {
        if (row.B3 < 251) {
          self.amazerecord.L15 = 25
        } else if (row.B3 > 250 && row.B3 < 501) {
          self.amazerecord.L15 = 12
        } else if (row.B3 > 500 && row.B3 < 1001) {
          self.amazerecord.L15 = 15
        } else {
          self.amazerecord.L15 = 30
        }
      } else {
        if (row.B3 < 251) {
          self.amazerecord.L15 = 25
        } else if (row.B3 > 250 && row.B3 < 501) {
          self.amazerecord.L15 = 20
        } else if (row.B3 > 500 && row.B3 < 1001) {
          self.amazerecord.L15 = 15
        } else {
          self.amazerecord.L15 = 30
        }
      }

      if (row.B3 < 251) {
        self.amazerecord.N15 = 8
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.N15 = 11
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.N15 = 25
      } else {
        self.amazerecord.N15 = 45
      }
      if (row.B3 < 251) {
        self.amazerecord.O15 = 8
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.O15 = 11
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.O15 = 25
      } else {
        self.amazerecord.O15 = 45
      }
      if (row.B3 < 251) {
        self.amazerecord.P15 = 8
      } else if (row.B3 > 250 && row.B3 < 501) {
        self.amazerecord.P15 = 11
      } else if (row.B3 > 500 && row.B3 < 1001) {
        self.amazerecord.P15 = 25
      } else {
        self.amazerecord.P15 = 45
      }
      self.amazerecord.referalfees = row.N3 / 100 * row.B3
      if (row.L5 === 'Premium') {
        self.premiumdata = 32
      } else if (row.L5 === 'Advanced') {
        self.premiumdata = 32
      } else if (row.L5 === 'Standard') {
        self.premiumdata = 38
      } else {
        self.premiumdata = 44
      }
      if (row.D5 > 0.5) {
        self.testdata = 16
      } else {
        self.testdata = 0
      }
      if (row.D5 > 1) {
        self.testdata1 = Math.round(row.D5 - 1) * 13
      } else {
        self.testdata1 = 0
      }
      if (row.D5 > 5) {
        self.testdata2 = Math.round(row.D5 - 5) * 3
      } else {
        self.testdata2 = 0
      }
      self.amazerecord.F17 = Number(self.premiumdata) + Number(self.testdata) + Number(self.testdata1) - Number(self.testdata1)
    },
    ClearAllData: function () {
      this.amazeheaderrecord = ''
      this.amazerecord = ''
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}
</style>
