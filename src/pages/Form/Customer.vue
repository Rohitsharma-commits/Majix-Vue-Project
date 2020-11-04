<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Customers List" to="/menu/Customers/1" />
      <q-breadcrumbs-el label="Customers" to="/menu/Customer" />
    </q-breadcrumbs>
    <q-card>
      <q-card-section>
        <b>Customer</b>
      </q-card-section>
      <q-separator></q-separator>
        <div class="col-12">
        <q-card-section>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Company Name *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.companyname" :error="checkcompanyname" type="text">
            </q-input>
          </div>
          </div>
       <div class="row" style="margin-top:-20px;" >
          <div class="col-12 col-md-2 q-pa-xs">
            Customer Contact Person*
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.customername" :error="checkcustomername" type="text">
            </q-input>
          </div>
          </div>
          <div class="row" style="margin-top:-20px;">
          <div class="col-12 col-md-2 q-pa-xs" >
            Sector *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
          <q-select v-model="CustomerRecord.sectorid" :error="checksectorid" @click.native="CheckSectorPresentornot()" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSectors">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          </div>
          </div>
          <div class="row" style="margin-top:-20px;">
          <div class="col-12 col-md-2 q-pa-xs" >
            Phone No *
          </div>
          <div class="col-12 col-md-4 q-pa-xs" >
            <q-input outlined dense v-model="CustomerRecord.customerphoneno" :error="checkcustomerphoneno" maxlength="10"  type="tel">
            </q-input>
          </div>
          </div>
          <div class="row" style="margin-top:-20px;">
          <div class="col-12 col-md-2 q-pa-xs" >
            Email Id *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.customeremailid" :error="checkcustomeremailid" type="text">
            </q-input>
          </div>
          </div>
          <div class="row" style="margin-top:-20px;">
          <div class="col-12 col-md-2 q-pa-xs" >
            GST
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.gst" maxlength="15" type="text">
            </q-input>
          </div>
          </div>
          </q-card-section>
        <q-card-actions>
          <b>Customer Address</b>
        </q-card-actions>
        <q-separator></q-separator>
        <q-card-section>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Address
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.addressline1" autogrow label="Street 1" type="textarea">
            </q-input>
          </div>
          </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            <!-- Address Line 2: - -->
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.addressline2" autogrow label="Street 2" type="textarea">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Country
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.country" type="text">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            State
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.states" type="text">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            City
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.city" type="text">
              </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            ZipCode
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.zipcode" maxlength="6" type="number">
            </q-input>
          </div>
          </div>
          </q-card-section>
          <q-card-section>
            <b>Shipping Address</b>&nbsp;&nbsp;&nbsp;&nbsp;<q-btn color="primary" flat dense label="Copy Above Address" @click.native="Checkifactiveornot()">
            <q-tooltip>
            Copy Above Address
          </q-tooltip>
          </q-btn>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Address
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.shippingaddressline1"  autogrow  label="Street 1" type="textarea">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            <!-- Shipping Address Line 2: - -->
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.shippingaddressline2" autogrow label="Street 2" type="textarea">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Country
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.shippingaddresscountry" type="text">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            State
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.shippingaddressstates" type="text">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            City
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.shippingaddresscity" type="text">
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            ZipCode
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="CustomerRecord.shippingaddresszipcode" type="number">
            </q-input>
          </div>
          </div>
          </q-card-section>
          <div style="text-align:center">
             <q-btn color="pink-4" flat label="Cancel" @click.native="cancelCustomer()"/>
            <q-btn color="pink-4" flat label="Save" @click.native="SaveCustomers()"/>
          </div>
          <q-card-section>
          </q-card-section>
          </div>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      CustomerRecord: '',
      filter: '',
      Designationssearch: '',
      checkCustomer: '',
      checkcustomername: false,
      checkcompanyname: false,
      checksectorid: false,
      checkcustomerphoneno: false,
      checkcustomeremailid: false,
      Customers: [],
      CustomerAll: [],
      GetSectors: []
    }
  },
  mounted () {
    this.fetchCustomers()
    // this.checkclickfromMenu = this.$route.params.pstatus
    this.checkCustomer = this.$route.params.pitem
    // if (this.checkclickfromMenu === 0) {
    //   this.CustomerRecord = this.$m.Customer()
    //   this.customermodal = true
    // }
    if (this.checkCustomer === 'New') {
      this.CustomerRecord = this.$m.Customer()
    } else {
      this.CustomerRecord = this.$m.Customer(this.checkCustomer)
    }
    this.$c.showLoader()
  },
  methods: {
    CheckSectorPresentornot: function () {
      console.log('a')
      if (this.GetSectors.length === 0) {
        this.$c.showError('No Sector Available')
        this.$router.push({ name: 'sector', params: { pitem: 1 } })
      }
    },
    Checkifactiveornot: function () {
      // if (this.CustomerRecord.activeflag === '1') {
      this.CustomerRecord.shippingaddressline1 = this.CustomerRecord.addressline1
      this.CustomerRecord.shippingaddressline2 = this.CustomerRecord.addressline2
      this.CustomerRecord.shippingaddresscountry = this.CustomerRecord.country
      this.CustomerRecord.shippingaddressstates = this.CustomerRecord.states
      this.CustomerRecord.shippingaddresscity = this.CustomerRecord.city
      this.CustomerRecord.shippingaddresszipcode = this.CustomerRecord.zipcode
      // }
      // if (this.CustomerRecord.CheckSameasAboveAdress === '0') {
      //   this.CustomerRecord.shippingaddressline1 = ''
      //   this.CustomerRecord.shippingaddressline2 = ''
      //   this.CustomerRecord.shippingaddresscountry = ''
      //   this.CustomerRecord.shippingaddressstates = ''
      //   this.CustomerRecord.shippingaddresscity = ''
      //   this.CustomerRecord.shippingaddresszipcode = ''
      // }
    },
    SaveCustomers: function () {
      if (this.CustomerRecord.iud === 'S' | this.CustomerRecord.iud === undefined) {
        this.CustomerRecord.iud = 'U'
      }
      this.PostCustomers()
    },
    deleteCustomer: function () {
      this.CustomerRecord.iud = 'D'
      this.PostCustomers()
      this.deleteDialog = false
    },
    cancelCustomer: function () {
      this.$router.push({ name: 'customers', params: { pstatus: 1 } })
    },
    PostCustomers: function () {
      var self = this
      if (self.CustomerRecord.customername === '') {
        self.checkcustomername = true
        return self.$c.showError('Enter Customer Contact Person')
      }
      if (self.CustomerRecord.companyname === '') {
        self.checkcompanyname = true
        return self.$c.showError('Enter Company Group Name')
      }
      if (self.CustomerRecord.sectorid === '') {
        self.checksectorid = true
        return self.$c.showError('Select Sector ID')
      }
      if (self.CustomerRecord.customerphoneno === null) {
        self.checkcustomerphoneno = true
        return self.$c.showError('Enter phone Number')
      }
      if (self.CustomerRecord.customerphoneno !== null) {
        if (self.CustomerRecord.customerphoneno.length < 10) {
          return self.$c.showError('Mobile Number must be 10 digit')
        }
      }
      if (self.CustomerRecord.zipcode !== '') {
        if (self.CustomerRecord.zipcode.length < 6) {
          return self.$c.showError('ZipCode must be 6 digit')
        }
      }
      if (self.CustomerRecord.customeremailid === '') {
        self.checkcustomeremailid = true
        return self.$c.showError('Enter Email Id')
      }
      if (self.CustomerRecord.customeremailid !== '') {
        // eslint-disable-next-line
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(self.CustomerRecord.customeremailid) === false) {
          return self.$c.showError('Enter Proper Email Id')
        }
      }
      if (self.CustomerRecord.gst !== '') {
        if (self.CustomerRecord.gst.length < 15) {
          return self.$c.showError('Enter 15 digit GST No')
        }
      }
      if (self.CustomerRecord.iud === 'I') {
        var count1 = 0
        if (self.CustomerRecord.gst !== '') {
          for (var a = 0; a < self.Customers.length; a++) {
            if (self.Customers[a].gst === self.CustomerRecord.gst) {
              count1 = count1 + 1
              break
            }
          }
          if (count1 === 1) {
            return self.$c.showError('Customer Already Registered')
          }
        }
        var count2 = 0
        for (var b = 0; b < self.Customers.length; b++) {
          if (self.Customers[b].customeremailid.toLowerCase() === self.CustomerRecord.customeremailid.toLowerCase()) {
            count2 = count2 + 1
            break
          }
        }
        if (count2 === 1) {
          return self.$c.showError('Email Address Already Registered')
        }
        var count3 = 0
        for (var c = 0; c < self.Customers.length; c++) {
          if (self.Customers[c].companyname.trim().toLowerCase() === self.CustomerRecord.companyname.trim().toLowerCase()) {
            count3 = count3 + 1
            break
          }
        }
        if (count3 === 1) {
          return self.$c.showError('Company Name Already Registered')
        }
        var count4 = 0
        for (var d = 0; d < self.Customers.length; d++) {
          if (self.Customers[d].customerphoneno.trim() === self.CustomerRecord.customerphoneno.trim()) {
            count4 = count4 + 1
            break
          }
        }
        if (count4 === 1) {
          return self.$c.showError('Phone Number Already Registered')
        }
      }
      self.$c.showLoader()
      if (self.CustomerRecord.iud === 'I' || self.CustomerRecord.iud === 'U') {
        self.$c.postData('Customers/', JSON.stringify(self.CustomerRecord), function (success, response, error) {
          // console.log(response.status === 200)
          if (response.data === 'successfull') {
            if (self.CustomerRecord.iud === 'I') {
              self.CustomerAll.push(self.CustomerRecord)
            }
            self.$c.showSuccess('Record(s) saved successfully')
            self.$router.push({ name: 'customers', params: { pstatus: 1 } })
            self.fetchCustomers()
            self.customermodal = false
            self.$c.hideLoader()
          }
        })
      } else {
        self.$c.deleteData('Customers/' + self.CustomerRecord.reccode, function (success, response, data) {
          console.log(response.data)
          if (response.data === 'successfull') {
            self.CustomerAll.splice(self.CustomerAll.indexOf(self.CustomerRecord), 1)
            self.$c.showSuccess('Record(s) Deleted successfully')
            self.customermodal = false
            self.$c.hideLoader()
          }
        })
      }
    },
    fetchCustomers: function () {
      var self = this
      self.Customers = []
      self.GetSectors = []
      self.$c.getData('Customers/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          // if (item.activeflag === 1) {
          //   item.activeflag = '1'
          // } else {
          //   item.activeflag = '0'
          // }
          self.Customers.push(self.$m.Customer(item))
        })
        self.CustomerAll = self.Customers
        self.$c.hideLoader()
      })
      self.$c.getData('Sector/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetSectors.push({ value: item.reccode, label: item.name })
        })
        self.$c.hideLoader()
      })
    }
  }
}
</script>

<style>

</style>
