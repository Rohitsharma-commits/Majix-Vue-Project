<template>
  <div>
  <div hidden :content-css="{width: '70vw'}">
    <table id="SalesRepresentative" style="width:100%" border="1">
          <tr>
            <td><b>Name</b></td>
            <td><b>PhoneNo</b></td>
            <td><b>EMail Id</b></td>
            <td><b>Address</b></td>
          </tr>
          <tr v-for="item in this.SalesRepresentatives" :key="item.RecCode">
            <td>{{item.name}}</td>
            <td>{{item.phonenumber}}</td>
            <td>{{item.email}}</td>
            <td>{{item.address}}</td>
          </tr>
        </table>
    </div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Sales Representatives" to="/menu/SalesRepresentatives" />
    </q-breadcrumbs>
    <q-table
      :data="SalesRepresentatives"
      :columns="ColumnSalesRepresentatives"
      :pagination.sync="pcSalesRepresentatives"
      :filter="Filter"
      :hide-bottom="SalesRepresentatives.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm"  color="cyan" label="+ New" v-if="checkstatus === '1'" @click.native="addEditDeleteSalesRepresentatives(props.row, false)" class="q-mr-sm">
        <q-tooltip>
            Create SalesRepresentative
          </q-tooltip>
          </q-btn>
        <q-btn color="light-blue-5" size="lg" round v-if="checkstatus === '1'" dense flat icon="print" >
          <q-tooltip>
            Print
          </q-tooltip>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item clickable @click.native="exportTableToExcel(tableID = 'SalesRepresentative', filename = 'SalesRepresentative')">
                <q-item-section avatar>
                  <span class="material-icons">
                  import_export
                  </span>
                </q-item-section>
                <q-item-section>Export Excel</q-item-section>
              </q-item>
              <q-item clickable  @click.native="print()">
                <q-item-section avatar>
                  <q-icon color="red" name="print" />
                </q-item-section>
                <q-item-section>print</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="addEditDeleteSalesRepresentatives(props.row, false)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" v-if="checkstatus === '1'" @click.stop="addEditDeleteSalesRepresentatives(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" v-if="checkstatus === '1'" icon="remove" @click.stop="DeleteSalesRepresentativesdata(props.row, true)" class="q-mr-sm">
          <q-tooltip>
            Delete
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="check" v-if="checkstatus !== '1'" @click.native="Active(props.row)" class="q-mr-sm">
          <q-tooltip>
            Active
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="phonenumber" :props="props">{{ props.row.phonenumber }}</q-td>
        <q-td key="email" :props="props">{{ props.row.email }}</q-td>
        <!-- <q-td key="address" :props="props">{{ props.row.address }}</q-td> -->
      </q-tr>
      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn
          round dense size="sm" icon="undo" color="cyan" class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div class="q-mr-sm" style="font-size: small">Page {{ props.pagination.page }} / {{ props.pagesNumber }}</div>
        <q-btn
          round dense size="sm" icon="redo" color="cyan"
          :disable="props.isLastPage"
          @click="props.nextPage"
        />
      </div>
    </q-table>
    <q-dialog v-model="SalesRepresentativesModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:50vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Sales Representative</div>
          <q-space />
          <q-btn dense flat icon="close" @click="SalesRepresentativesModal = !SalesRepresentativesModal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input outlined dense v-model="SalesRepresentativesRecord.name" :rules="[val => !!val || 'Field is required']" label="Name *" type="text">
          </q-input>
        <q-input outlined dense v-model="SalesRepresentativesRecord.phonenumber" :rules="[val => !!val || 'Field is required']" label="Phone No *" maxlength="10" type="tel">
          </q-input>
        <q-input outlined dense v-model="SalesRepresentativesRecord.email" :rules="[val => !!val || 'Field is required']" label="Email ID *" type="text">
          </q-input>
          <q-select v-model="SalesRepresentativesRecord.teamid" :rules="[val => !!val || 'Field is required']" label="Team *" @click.native="CheckteamPresentornot()" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetTeams">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
        <q-input outlined dense v-model="SalesRepresentativesRecord.addressline1" autogrow="" label="Address Line1" type="textarea">
          </q-input>
          <br/>
        <q-input outlined dense v-model="SalesRepresentativesRecord.addressline2" autogrow="" label="Address Line2" type="textarea">
          </q-input>
          <br/>
        <div class="row">
        <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="SalesRepresentativesRecord.country" autogrow label="country" type="text">
          </q-input>
          </div>
          <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="SalesRepresentativesRecord.states" autogrow label="State" type="text">
          </q-input>
          </div>
          </div>
           <br/>
          <div class="row">
          <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="SalesRepresentativesRecord.city" autogrow label="City" type="text">
          </q-input>
          </div>
        <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="SalesRepresentativesRecord.zipcode" label="ZipCode" type="number">
          </q-input>
          </div>
          </div>
           <br/>
          <q-select v-model="SalesRepresentativesRecord.sectorid" label="Sector" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSectors">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          <br/>
          Active:-<q-checkbox v-model="SalesRepresentativesRecord.activeflag"  true-value = '1' false-value = '0'/>
          <br/>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" @click.native="SaveSalesRepresentatives()"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="deleteDialog"
      persistent
    >
      <q-card style="width:30vw">
        <q-bar class="bg-cyan text-white">
          <div>Delete</div>
          <q-space />
          <q-btn dense flat icon="close" @click="deleteDialog = !deleteDialog">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          Delete the selected record?
          <br/>
          <br/>
          <div style="text-align:right">
            <q-btn flat label="Cancel" @click="deleteDialog = !deleteDialog" />
            <q-btn flat color="primary" label="Delete" @click="deleteSalesRepresentatives()" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="printmodal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="min-width:100%">
        <q-bar class="bg-cyan text-white">
          <div></div>
          <q-space />
          <q-btn dense flat icon="close" @click="printmodal = !printmodal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
        <div id="getpdf">
          <div>
            <!-- <img src="~assets/Servehr.png" height="100" width="450"> -->
          </div>
        <table style="width:100%"  border="1">
          <tr>
          <th>Name</th>
          <th>Phone No</th>
          <th>Email Id</th>
          <th>Address</th>
          </tr>
          <!-- <div v-for="item in Products" :key="item.reccode"> -->
          <tr v-for="item in SalesRepresentatives" :key="item.reccode">
            <td style="width:25%;text-align: center">{{item.name}}</td>
            <td style="width:=25%;text-align: center">{{item.phonenumber}}</td>
            <td style="width:=25%;text-align: center">{{item.email}}</td>
            <td style="width:25%;text-align: center">{{item.address}}</td>
          </tr>
          <!-- </div> -->
    </table>
    </div>
    <div style="text-align:right">
    <q-btn label="Print" color="cyan" @click.native="PrintPDF()" />
  </div>
  </q-card-section>
</q-card>
</q-dialog>
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  data () {
    return {
      SalesRepresentativesModal: false,
      SalesRepresentativesRecord: [],
      Filter: '',
      printmodal: false,
      Designationssearch: '',
      GetSectors: [],
      checkclickfromMenu: '',
      SalesRepresentatives: [],
      SalesRepresentativesAll: [],
      GetTeams: [],
      checkstatus: '',
      deleteDialog: false,

      ColumnSalesRepresentatives: [
        {
          name: 'reccode',
          required: true,
          label: 'Action',
          align: 'center',
          field: 'RecCode',
          style: 'width:20px',
          sortable: false
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'phonenumber',
          required: true,
          label: 'Phone No',
          align: 'left',
          field: 'phonenumber',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: 'Email Id',
          align: 'left',
          field: 'email',
          sortable: true
        }
        // {
        //   name: 'address',
        //   required: true,
        //   label: 'Address',
        //   align: 'left',
        //   field: 'address',
        //   sortable: true
        // }
      ],
      pcSalesRepresentatives: { rowsPerPage: 10, page: 1 }
    }
  },
  mounted () {
    this.checkstatus = this.$route.params.pitem
    this.fetchSalesRepresentatives()
    this.checkclickfromMenu = this.$route.params.pstatus
    // if (this.checkclickfromMenu === 0) {
    //   this.SalesRepresentativesRecord = this.$m.SalesRepresentatives()
    //   this.SalesRepresentativesRecord.activeflag = '1'
    //   this.SalesRepresentativesModal = true
    // }
    this.$c.showLoader()
  },
  watch: {
    $route (to, from) {
      this.checkstatus = this.$route.params.pitem
      this.fetchSalesRepresentatives()
      this.checkclickfromMenu = this.$route.params.pstatus
      // if (this.checkclickfromMenu === 0) {
      //   this.SalesRepresentativesRecord = this.$m.SalesRepresentatives()
      //   this.SalesRepresentativesRecord.activeflag = '1'
      //   this.SalesRepresentativesModal = true
      // }
    }
  },
  methods: {
    testProps: function (p) {
    },
    DeleteSalesRepresentativesdata: function (row) {
      this.SalesRepresentativesRecord = row
      this.deleteDialog = true
    },
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
    print: function () {
      this.printmodal = true
    },
    PrintPDF: function () {
      var printContent = document.getElementById('getpdf').innerHTML
      var w = window.open()
      w.document.write(printContent)
      w.print()
      w.close()
    },
    exportTableToExcel: function (tableID, filename) {
      var downloadLink
      var dataType = 'application/vnd.ms-excel'
      var tableSelect = document.getElementById(tableID)
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

      // Specify file name
      filename = filename ? filename + '.xls' : 'excel_data.xls'

      // Create download link element
      downloadLink = document.createElement('a')

      document.body.appendChild(downloadLink)

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
        })
        navigator.msSaveOrOpenBlob(blob, filename)
      } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML

        // Setting the file name
        downloadLink.download = filename

        // triggering the function
        downloadLink.click()
      }
    },
    addEditDeleteSalesRepresentatives: function (row, deleteRecord) {
      if (row === undefined) {
        // this.SalesRepresentativesRecord = this.$m.SalesRepresentatives()
        // this.SalesRepresentativesRecord.activeflag = '1'
        // this.SalesRepresentativesModal = true
        this.$router.push({ name: 'salerepresentative-form', params: { pitem: 'New' } })
      } else {
        this.SalesRepresentativesRecord = row
        this.$router.push({ name: 'salerepresentative-form', params: { pitem: row } })
        // if (this.SalesRepresentativesRecord.activeflag === 1 || this.SalesRepresentativesRecord.activeflag === '1') {
        //   this.SalesRepresentativesRecord.activeflag = '1'
        // } else {
        //   this.SalesRepresentativesRecord.activeflag = '0'
        // }
      }
    },
    SaveSalesRepresentatives: function () {
      if (this.SalesRepresentativesRecord.iud === 'S' | this.SalesRepresentativesRecord.iud === undefined) {
        this.SalesRepresentativesRecord.iud = 'U'
      }
      this.postSalesRepresentatives()
    },
    deleteSalesRepresentatives: function () {
      this.SalesRepresentativesRecord.iud = 'D'
      this.postSalesRepresentatives()
      this.deleteDialog = false
    },
    Active: function (row) {
      var self = this
      self.$c.showLoader()
      row.activeflag = 1
      row.iud = 'U'
      self.$c.postData('SalesRepresentatives/', JSON.stringify(row), function (success, response, error) {
        self.$c.showSuccess('Record(s) Activate successfully')
        // self.Submitmodal = false
        self.fetchSalesRepresentatives()
        self.$c.hideLoader()
      })
    },
    postSalesRepresentatives: function () {
      var self = this
      console.log(self.SalesRepresentativesRecord.iud)
      // if (!self.SalesRepresentativesRecord.name) {
      //   self.$c.showError('Enter Name')
      // } else {
      if (self.SalesRepresentativesRecord.Name === '') {
        return self.$c.showError('Please Enter Name')
      }
      if (self.SalesRepresentativesRecord.phonenumber === '') {
        return self.$c.showError('Please Enter Phone No')
      }
      if (self.SalesRepresentativesRecord.phonenumber !== '') {
        if (self.SalesRepresentativesRecord.phonenumber.length < 10) {
          return self.$c.showError('PhoneNo must be 10 digit')
        }
      }
      if (self.SalesRepresentativesRecord.email === '') {
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
        return self.$c.showError('Please Select Team')
      }
      self.$c.showLoader()
      if (self.SalesRepresentativesRecord.iud === 'I' || self.SalesRepresentativesRecord.iud === 'U') {
        self.$c.postData('SalesRepresentatives/', JSON.stringify(self.SalesRepresentativesRecord), function (success, response, error) {
          if (response.data === 'Successfull') {
            if (self.SalesRepresentativesRecord.iud === 'I') {
              self.SalesRepresentativesAll.push(self.SalesRepresentativesRecord)
            }
            self.$c.showSuccess('Record(s) saved successfully')
            self.fetchSalesRepresentatives()
            self.SalesRepresentativesModal = false
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
      self.$c.getData('SalesRepresentatives/' + self.$c.getLocalStorage('reccode') + '/ActiveStatus/' + self.checkstatus, function (success, response, data) {
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
