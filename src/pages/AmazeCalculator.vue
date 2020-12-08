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
    <td><q-input outlined dense readonly="" v-model="amazerecord.J17" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K17" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L17" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr>
  </tr>
    </td>
  </tr>

    <tr>
    <td><b>Pick & Pack Fee</b></td>
    <td>
    <tr></tr>
    </td>
    <td>
    <tr></tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J19" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K19" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L19" type="text"/></td>
  </tr>
    </td>
  <td>
    <tr></tr>
    </td>
  </tr>

      <tr>
    <td><b>Technology Fee</b></td>
    <td>
    <tr></tr>
    </td>
    <td>
    <tr></tr>
    </td>
    <td>
    <tr></tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N22" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O22" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P22" type="text"/></td>
    </tr>
    </td>
  </tr>

        <tr>
    <td><b>Total Amazon Fees</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D24" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H24" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L24" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O24" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P24" type="text"/></td>
    </tr>
    </td>
  </tr>

   <tr>
    <td><b>GST on Amazon Fees</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D25" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H25" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L25" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O25" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P25" type="text"/></td>
    </tr>
    </td>
  </tr>

     <tr>
    <td><b>Revenue - Amazon Fees</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D27" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H27" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L27" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O27" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P27" type="text"/></td>
    </tr>
    </td>
  </tr>

    <tr>
    <td><b>Cost Price(Without GST)</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.costpricewithoutgst" type="text"/></td>
    </tr>
    </td>
  </tr>

      <tr>
    <td><b>Packing Cost</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.packingcost" type="text"/></td>
    </tr>
    </td>
  </tr>

      <tr>
    <td><b>Output GST</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.outputgst" type="text"/></td>
    </tr>
    </td>
  </tr>

       <tr>
    <td><b>Input GST</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D33" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H33" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L33" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O33" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P33" type="text"/></td>
    </tr>
    </td>
  </tr>

  <tr>
    <td><b>GST Liability</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D34" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H34" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L34" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O34" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P34" type="text"/></td>
    </tr>
    </td>
  </tr>

    <tr>
    <td><b>Profit</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D36" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H36" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L36" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O36" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P36" type="text"/></td>
    </tr>
    </td>
  </tr>

   <tr>
    <td><b>Amazon Returns Cost</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D38" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H38" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L38" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O38" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P38" type="text"/></td>
    </tr>
    </td>
  </tr>

  <tr>
    <td><b>Amazon Returns Cost</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D39" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H39" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L39" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O39" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P39" type="text"/></td>
    </tr>
    </td>
  </tr>

    <tr>
    <td><b>Actual Profit</b></td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.B41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.C41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.D41" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.F41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.G41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.H41" type="text"/></td>
    </tr>
    </td>
    <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.J41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.K41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.L41" type="text"/></td>
    </tr>
    </td>
  <td>
    <tr>
    <td><q-input outlined dense readonly="" v-model="amazerecord.N41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.O41" type="text"/></td>
    <td><q-input outlined dense readonly="" v-model="amazerecord.P41" type="text"/></td>
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
        B17: '',
        C17: '',
        D17: '',
        F17: '',
        G17: '',
        H17: '',
        J17: '',
        K17: '',
        L17: '',
        N17: '',
        O17: '',
        P17: '',
        J19: '10',
        K19: '10',
        L19: '10',
        N22: '10',
        O22: '10',
        P22: '10',
        B24: '',
        C24: '',
        D24: '',
        F24: '',
        G24: '',
        H24: '',
        J24: '',
        K24: '',
        L24: '',
        N24: '',
        O24: '',
        P24: '',
        B25: '',
        C25: '',
        D25: '',
        F25: '',
        G25: '',
        H25: '',
        J25: '',
        K25: '',
        L25: '',
        N25: '',
        O25: '',
        P25: '',
        B27: '',
        C27: '',
        D27: '',
        F27: '',
        G27: '',
        H27: '',
        J27: '',
        K27: '',
        L27: '',
        N27: '',
        O27: '',
        P27: '',
        costpricewithoutgst: '',
        packingcost: '',
        outputgst: '',
        B33: '',
        C33: '',
        D33: '',
        F33: '',
        G33: '',
        H33: '',
        J33: '',
        K33: '',
        L33: '',
        N33: '',
        O33: '',
        P33: '',
        B34: '',
        C34: '',
        D34: '',
        F34: '',
        G34: '',
        H34: '',
        J34: '',
        K34: '',
        L34: '',
        N34: '',
        O34: '',
        P34: '',
        B36: '',
        C36: '',
        D36: '',
        F36: '',
        G36: '',
        H36: '',
        J36: '',
        K36: '',
        L36: '',
        N36: '',
        O36: '',
        P36: '',
        B38: '',
        C38: '',
        D38: '',
        F38: '',
        G38: '',
        H38: '',
        J38: '',
        K38: '',
        L38: '',
        N38: '',
        O38: '',
        P38: '',
        B39: '',
        C39: '',
        D39: '',
        F39: '',
        G39: '',
        H39: '',
        J39: '',
        K39: '',
        L39: '',
        N39: '',
        O39: '',
        P39: '',
        B41: '',
        C41: '',
        D41: '',
        F41: '',
        G41: '',
        H41: '',
        J41: '',
        K41: '',
        L41: '',
        N41: '',
        O41: '',
        P41: ''
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
      // selling price
      self.amazerecord.salesprice = row.B3
      // Additional Shipping
      self.amazerecord.additionalshipping = row.B4
      // gst
      self.roundoff = (row.B3 * row.D3) / (100 + Number(row.D3))
      self.amazerecord.gst = self.roundoff.toFixed(2)
      // selling price wihout gst
      self.roundoff = row.B3 / (1 + Number(row.D3) / 100)
      self.amazerecord.sellingpricewithoutgst = self.roundoff.toFixed(2)

      // self.roundoff = row.N3 / 100 * row.B3
      // self.amazerecord.sellingpricewithoutgst = self.roundoff.toFixed(2)
      // fixed closing price
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
      // Referal Fees
      self.amazerecord.referalfees = row.N3 / 100 * row.B3
      // Weight Handling Fees
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
      if (row.L5 === 'Premium') {
        self.premiumdata = 46.5
      } else if (row.L5 === 'Advanced') {
        self.premiumdata = 46.5
      } else if (row.L5 === 'Standard') {
        self.premiumdata = 48
      } else {
        self.premiumdata = 52.5
      }
      if (row.D5 > 0.5) {
        self.testdata = 21
      } else {
        self.testdata = 0
      }
      if (row.D5 > 1) {
        self.testdata1 = Math.round(row.D5 - 1) * 18
      } else {
        self.testdata1 = 0
      }
      if (row.D5 > 5) {
        self.testdata2 = Math.round(row.D5 - 5) * 7
      } else {
        self.testdata2 = 0
      }
      self.amazerecord.G17 = Number(self.premiumdata) + Number(self.testdata) + Number(self.testdata1) - Number(self.testdata1)
      if (row.L5 === 'Premium') {
        self.premiumdata = 68
      } else if (row.L5 === 'Advanced') {
        self.premiumdata = 68
      } else if (row.L5 === 'Standard') {
        self.premiumdata = 69
      } else {
        self.premiumdata = 73
      }
      if (row.D5 > 0.5) {
        self.testdata = 26
      } else {
        self.testdata = 0
      }
      if (row.D5 > 1) {
        self.testdata1 = Math.round(row.D5 - 1) * 24
      } else {
        self.testdata1 = 0
      }
      if (row.D5 > 5) {
        self.testdata2 = Math.round(row.D5 - 5) * 9
      } else {
        self.testdata2 = 0
      }
      self.amazerecord.H17 = Number(self.premiumdata) + Number(self.testdata) + Number(self.testdata1) - Number(self.testdata1)
      if (row.L5 === 'Premium') {
        self.premiumdata = 22
      } else if (row.L5 === 'Advanced') {
        self.premiumdata = 22
      } else if (row.L5 === 'Standard') {
        self.premiumdata = 28
      } else {
        self.premiumdata = 34
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
      self.amazerecord.J17 = Number(self.premiumdata) + Number(self.testdata) + Number(self.testdata1) - Number(self.testdata1)
      if (row.L5 === 'Premium') {
        self.premiumdata = 36.5
      } else if (row.L5 === 'Advanced') {
        self.premiumdata = 36.5
      } else if (row.L5 === 'Standard') {
        self.premiumdata = 38
      } else {
        self.premiumdata = 42.5
      }
      if (row.D5 > 0.5) {
        self.testdata = 21
      } else {
        self.testdata = 0
      }
      if (row.D5 > 1) {
        self.testdata1 = Math.round(row.D5 - 1) * 18
      } else {
        self.testdata1 = 0
      }
      if (row.D5 > 5) {
        self.testdata2 = Math.round(row.D5 - 5) * 7
      } else {
        self.testdata2 = 0
      }
      self.amazerecord.K17 = Number(self.premiumdata) + Number(self.testdata) + Number(self.testdata1) - Number(self.testdata1)
      if (row.L5 === 'Premium') {
        self.premiumdata = 58
      } else if (row.L5 === 'Advanced') {
        self.premiumdata = 58
      } else if (row.L5 === 'Standard') {
        self.premiumdata = 59
      } else {
        self.premiumdata = 63
      }
      if (row.D5 > 0.5) {
        self.testdata = 26
      } else {
        self.testdata = 0
      }
      if (row.D5 > 1) {
        self.testdata1 = Math.round(row.D5 - 1) * 24
      } else {
        self.testdata1 = 0
      }
      if (row.D5 > 5) {
        self.testdata2 = Math.round(row.D5 - 5) * 9
      } else {
        self.testdata2 = 0
      }
      self.amazerecord.L17 = Number(self.premiumdata) + Number(self.testdata) + Number(self.testdata1) - Number(self.testdata1)
      // Total Amazon Fee
      self.amazerecord.B24 = Number(self.amazerecord.referalfees) + Number(self.amazerecord.B15)
      self.amazerecord.C24 = Number(self.amazerecord.referalfees) + Number(self.amazerecord.C15)
      self.amazerecord.D24 = Number(self.amazerecord.referalfees) + Number(self.amazerecord.D15)
      self.amazerecord.F24 = Number(self.amazerecord.F17) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.F15)
      self.amazerecord.G24 = Number(self.amazerecord.G17) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.G15)
      self.amazerecord.H24 = Number(self.amazerecord.H17) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.H15)
      self.amazerecord.J24 = Number(self.amazerecord.J19) + Number(self.amazerecord.J17) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.J15)
      self.amazerecord.K24 = Number(self.amazerecord.K19) + Number(self.amazerecord.K17) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.K15)
      self.amazerecord.L24 = Number(self.amazerecord.L19) + Number(self.amazerecord.L17) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.L15)
      self.amazerecord.N24 = Number(self.amazerecord.N22) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.N15)
      self.amazerecord.O24 = Number(self.amazerecord.O22) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.O15)
      self.amazerecord.P24 = Number(self.amazerecord.P22) + Number(self.amazerecord.referalfees) + Number(self.amazerecord.P15)
      // GST on amazon fees
      self.roundoff = self.amazerecord.B24 * 0.18
      self.amazerecord.B25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.C24 * 0.18
      self.amazerecord.C25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.D24 * 0.18
      self.amazerecord.D25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.F24 * 0.18
      self.amazerecord.F25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.G24 * 0.18
      self.amazerecord.G25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.H24 * 0.18
      self.amazerecord.H25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.J24 * 0.18
      self.amazerecord.J25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.K24 * 0.18
      self.amazerecord.K25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.L24 * 0.18
      self.amazerecord.L25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.N24 * 0.18
      self.amazerecord.N25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.O24 * 0.18
      self.amazerecord.O25 = self.roundoff.toFixed(2)
      self.roundoff = self.amazerecord.P24 * 0.18
      self.amazerecord.P25 = self.roundoff.toFixed(2)
      // Revenue - Amazon fees
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.B24) - Number(self.amazerecord.B25)
      self.amazerecord.B27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.C24) - Number(self.amazerecord.C25)
      self.amazerecord.C27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.D24) - Number(self.amazerecord.D25)
      self.amazerecord.D27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.F24) - Number(self.amazerecord.F25)
      self.amazerecord.F27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.G24) - Number(self.amazerecord.G25)
      self.amazerecord.G27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.H24) - Number(self.amazerecord.H25)
      self.amazerecord.H27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.J24) - Number(self.amazerecord.J25)
      self.amazerecord.J27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.K24) - Number(self.amazerecord.K25)
      self.amazerecord.K27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.L24) - Number(self.amazerecord.L25)
      self.amazerecord.L27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.N24) - Number(self.amazerecord.N25)
      self.amazerecord.N27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.O24) - Number(self.amazerecord.O25)
      self.amazerecord.O27 = self.roundoff
      self.roundoff = Number(self.amazerecord.salesprice) - Number(self.amazerecord.P24) - Number(self.amazerecord.P25)
      self.amazerecord.P27 = self.roundoff
      // cost price without gst
      self.roundoff = Number(row.B5) / (1 + Number(row.D3) / 100)
      self.amazerecord.costpricewithoutgst = self.roundoff.toFixed(2)
      // Output gst
      self.roundoff = (Number(row.B3) * Number(row.D3)) / (100 + Number(row.D3))
      self.amazerecord.outputgst = self.roundoff.toFixed(2)
      // Input gst
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.B25)
      self.amazerecord.B33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.C25)
      self.amazerecord.C33 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.D25)
      self.amazerecord.D33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.F25)
      self.amazerecord.F33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.G25)
      self.amazerecord.G33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.H25)
      self.amazerecord.H33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.J25)
      self.amazerecord.J33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.K25)
      self.amazerecord.K33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.L25)
      self.amazerecord.L33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.N25)
      self.amazerecord.N33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.O25)
      self.amazerecord.O33 = self.roundoff.toFixed(2)
      self.roundoff = (Number(row.B5) * Number(row.D3)) / (100 + Number(row.D3)) + Number(self.amazerecord.P25)
      self.amazerecord.P33 = self.roundoff.toFixed(2)
      // gst libility
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.B33)
      self.amazerecord.B34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.C33)
      self.amazerecord.C34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.D33)
      self.amazerecord.D34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.F33)
      self.amazerecord.F34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.G33)
      self.amazerecord.G34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.H33)
      self.amazerecord.H34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.J33)
      self.amazerecord.J34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.K33)
      self.amazerecord.K34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.L33)
      self.amazerecord.L34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.N33)
      self.amazerecord.N34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.O33)
      self.amazerecord.O34 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.outputgst) - Number(self.amazerecord.P33)
      self.amazerecord.P34 = self.roundoff.toFixed(2)

      // Profit
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.B24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.B36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.C24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.C36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.D24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.D36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.F24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.F36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.G24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.G36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.H24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.H36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.J24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.J36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.K24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.K36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.L24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.L36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.N24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.N36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.O24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.O36 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.sellingpricewithoutgst) - Number(self.amazerecord.P24) - Number(self.amazerecord.costpricewithoutgst) - Number(self.amazerecord.packingcost)
      self.amazerecord.P36 = self.roundoff.toFixed(2)
      // Amazon Return Cost
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.B17)
      self.amazerecord.B38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.C17)
      self.amazerecord.C38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.D17)
      self.amazerecord.D38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.F17)
      self.amazerecord.F38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.G17)
      self.amazerecord.G38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.H17)
      self.amazerecord.H38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.J17)
      self.amazerecord.J38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.K17)
      self.amazerecord.K38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.L17)
      self.amazerecord.L38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.N17)
      self.amazerecord.N38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.O17)
      self.amazerecord.O38 = self.roundoff.toFixed(2)
      self.roundoff = 0.2 * Number(self.amazerecord.referalfees) + Number(self.amazerecord.P17)
      self.amazerecord.P38 = self.roundoff.toFixed(2)
      // per unit return as per percentage
      self.roundoff = Number(self.amazerecord.B38) * Number(row.P3) / 100
      self.amazerecord.B39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.C38) * Number(row.P3) / 100
      self.amazerecord.C39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.D38) * Number(row.P3) / 100
      self.amazerecord.D39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.F38) * Number(row.P3) / 100
      self.amazerecord.F39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.G38) * Number(row.P3) / 100
      self.amazerecord.G39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.H38) * Number(row.P3) / 100
      self.amazerecord.H39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.J38) * Number(row.P3) / 100
      self.amazerecord.J39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.K38) * Number(row.P3) / 100
      self.amazerecord.K39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.L38) * Number(row.P3) / 100
      self.amazerecord.L39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.N38) * Number(row.P3) / 100
      self.amazerecord.N39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.O38) * Number(row.P3) / 100
      self.amazerecord.O39 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.P38) * Number(row.P3) / 100
      self.amazerecord.P39 = self.roundoff.toFixed(2)
      // Actual Profit
      self.roundoff = Number(self.amazerecord.B36) - Number(self.amazerecord.B39)
      self.amazerecord.B41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.C36) - Number(self.amazerecord.C39)
      self.amazerecord.C41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.D36) - Number(self.amazerecord.D39)
      self.amazerecord.D41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.F36) - Number(self.amazerecord.F39)
      self.amazerecord.F41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.G36) - Number(self.amazerecord.G39)
      self.amazerecord.G41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.H36) - Number(self.amazerecord.H39)
      self.amazerecord.H41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.J36) - Number(self.amazerecord.J39)
      self.amazerecord.J41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.K36) - Number(self.amazerecord.K39)
      self.amazerecord.K41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.L36) - Number(self.amazerecord.L39)
      self.amazerecord.L41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.N36) - Number(self.amazerecord.N39)
      self.amazerecord.N41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.O36) - Number(self.amazerecord.O39)
      self.amazerecord.O41 = self.roundoff.toFixed(2)
      self.roundoff = Number(self.amazerecord.P36) - Number(self.amazerecord.P39)
      self.amazerecord.P41 = self.roundoff.toFixed(2)
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
  padding: 5px;
}

tr:nth-child(even){background-color: #f2f2f2}
</style>
