<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="SalesRepresentative List" :to="{name: 'salesrepresentative', params: { pitem: '1', pstatus: '1' }}" />
      <q-breadcrumbs-el label="SalesRepresentative" to="/menu/Task" />
    </q-breadcrumbs>
    <q-card>
      <q-card-section>
        <b>Sales Representative</b>
      </q-card-section>
      <q-separator></q-separator>
        <div class="col-12">
        <q-card-section>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Name *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense  :error="checkname" v-model="SalesRepresentativesRecord.name" type="text">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Phone No *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense :error="checkphonenumber" v-model="SalesRepresentativesRecord.phonenumber" maxlength="10" type="tel">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Email Id *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense :error="checkemail" v-model="SalesRepresentativesRecord.email" type="text">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Team *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
          <q-select v-model="SalesRepresentativesRecord.teamid" :error="checkteamid"  @click.native="CheckteamPresentornot()" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetTeams">
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
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Sector
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select v-model="SalesRepresentativesRecord.sectorid" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSectors">
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
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Address
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="SalesRepresentativesRecord.addressline1" autogrow label="Street 1" type="textarea">
              </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            <!-- Address Line2: - -->
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="SalesRepresentativesRecord.addressline2" autogrow label="Street 1" type="textarea">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Country
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="SalesRepresentativesRecord.country" type="text">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            State
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="SalesRepresentativesRecord.states" type="text">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            City
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="SalesRepresentativesRecord.city" type="text">
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            ZipCode
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense v-model="SalesRepresentativesRecord.zipcode" maxlength="6" type="tel">
            </q-input>
          </div>
        </div>
          Active:-<q-checkbox v-model="SalesRepresentativesRecord.activeflag"  true-value = '1' false-value = '0'/>
          </q-card-section>
          <div style="text-align:center">
             <q-btn color="pink-4" flat label="Cancel" @click.native="CancelSalesRepresentatives()"/>
            <q-btn color="pink-4" flat label="Save" @click.native="SaveSalesRepresentatives()"/>
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
      SalesRepresentativesRecord: [],
      Designationssearch: '',
      GetSectors: [],
      checkclickfromMenu: '',
      AddeditSales: '',
      SalesRepresentatives: [],
      SalesRepresentativesAll: [],
      GetTeams: [],
      checkname: false,
      checkphonenumber: false,
      checkemail: false,
      checkteamid: false,
      checkstatus: ''
    }
  },
  mounted () {
    this.AddeditSales = this.$route.params.pitem
    this.fetchSalesRepresentatives()
    this.checkclickfromMenu = this.$route.params.pstatus
    if (this.AddeditSales === 'New') {
      this.SalesRepresentativesRecord = this.$m.SalesRepresentatives()
      this.SalesRepresentativesRecord.activeflag = '1'
    } else {
      this.SalesRepresentativesRecord = this.$m.SalesRepresentatives(this.AddeditSales)
      if (this.SalesRepresentativesRecord.activeflag === 1 || this.SalesRepresentativesRecord.activeflag === '1') {
        this.SalesRepresentativesRecord.activeflag = '1'
      } else {
        this.SalesRepresentativesRecord.activeflag = '0'
      }
    }
    this.$c.showLoader()
  },
  methods: {
    CheckteamPresentornot: function () {
      if (this.GetTeams.length === 0) {
        this.$c.showError('Please Enter Team First')
        this.$router.push({ name: 'team', params: { pitem: 1 } })
      }
    },
    rowClickBrands: function (row) {
      var self = this
      self.SalesRepresentativesRecord = row
    },
    SaveSalesRepresentatives: function () {
      if (this.SalesRepresentativesRecord.iud === 'S' | this.SalesRepresentativesRecord.iud === undefined) {
        this.SalesRepresentativesRecord.iud = 'U'
      }
      this.postSalesRepresentatives()
    },
    CancelSalesRepresentatives: function () {
      this.$router.push({ name: 'salesrepresentative', params: { pitem: '1', pstatus: '1' } })
    },
    postSalesRepresentatives: function () {
      var self = this
      console.log(self.SalesRepresentativesRecord.iud)
      // if (!self.SalesRepresentativesRecord.name) {
      //   self.$c.showError('Enter Name')
      // } else {
      if (self.SalesRepresentativesRecord.Name === '') {
        self.checkname = true
        return self.$c.showError('Please Enter Name')
      }
      if (self.SalesRepresentativesRecord.phonenumber === '') {
        self.checkphonenumber = true
        return self.$c.showError('Please Enter Phone No')
      }
      if (self.SalesRepresentativesRecord.phonenumber !== '') {
        if (self.SalesRepresentativesRecord.phonenumber.length < 10) {
          return self.$c.showError('PhoneNo must be 10 digit')
        }
      }
      if (self.SalesRepresentativesRecord.zipcode !== null) {
        if (self.SalesRepresentativesRecord.zipcode.length < 6) {
          return self.$c.showError('ZipCode must be 10 digit')
        }
      }
      if (self.SalesRepresentativesRecord.email === '') {
        self.checkemail = true
        return self.$c.showError('Please Enter Email Id')
      }
      if (self.SalesRepresentativesRecord.email !== '') {
        // eslint-disable-next-line
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(self.SalesRepresentativesRecord.email) === false) {
          return self.$c.showError('Please Enter Correct Email Address')
        }
      }
      if (self.SalesRepresentativesRecord.teamid === null) {
        self.checkteamid = true
        return self.$c.showError('Please Select Team')
      }
      if (self.SalesRepresentativesRecord.iud === 'I') {
        var count1 = 0
        for (var a = 0; a < self.SalesRepresentatives.length; a++) {
          if (self.SalesRepresentatives[a].phonenumber === self.SalesRepresentativesRecord.phonenumber) {
            count1 = count1 + 1
            break
          }
        }
        if (count1 === 1) {
          return self.$c.showError('Phone Number Already Registered')
        }
        var count2 = 0
        for (var b = 0; b < self.SalesRepresentatives.length; b++) {
          if (self.SalesRepresentatives[b].email === self.SalesRepresentativesRecord.email) {
            count2 = count2 + 1
            break
          }
        }
        if (count2 === 1) {
          return self.$c.showError('Email Id Already present')
        }
      }
      self.$c.showLoader()
      if (self.SalesRepresentativesRecord.iud === 'I' || self.SalesRepresentativesRecord.iud === 'U') {
        self.$c.postData('SalesRepresentatives/', JSON.stringify(self.SalesRepresentativesRecord), function (success, response, error) {
          if (response.data === 'Successfull') {
            if (self.SalesRepresentativesRecord.iud === 'I') {
              self.SalesRepresentativesAll.push(self.SalesRepresentativesRecord)
            }
            self.$c.showSuccess('Record(s) saved successfully')
            self.$router.push({ name: 'salesrepresentative', params: { pitem: '1', pstatus: '1' } })
            self.$c.hideLoader()
          }
        })
      } else {
        self.$c.deleteData('SalesRepresentatives/' + self.SalesRepresentativesRecord.reccode, function (success, response, data) {
          console.log(response.data)
          if (response.data === 'Successfull') {
            self.SalesRepresentativesAll.splice(self.SalesRepresentativesAll.indexOf(self.SalesRepresentativesRecord), 1)
            self.$c.showSuccess('Record(s) Deleted successfully')
            self.SalesRepresentativesModal = false
            self.$c.hideLoader()
          }
        })
      }
      // }
    },
    fetchSalesRepresentatives: function () {
      var self = this
      self.$c.showLoader()
      self.SalesRepresentatives = []
      self.GetTeams = []
      self.GetSectors = []
      self.$c.getData('SalesRepresentatives/' + self.$c.getLocalStorage('reccode') + '/ActiveStatus/' + 1, function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.SalesRepresentatives.push(self.$m.SalesRepresentatives(item))
        })
        self.SalesRepresentativesAll = self.SalesRepresentatives
        // self.$c.hideLoader()
      })
      self.$c.getData('Team/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetTeams.push({ value: item.reccode, label: item.name })
        })
        // self.$c.hideLoader()
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
