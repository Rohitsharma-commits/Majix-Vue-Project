<template>
  <div>
  <div hidden :content-css="{width: '70vw'}">
    <table id="Customers" style="width:100%" border="1">
          <tr>
            <td><b>Customer Name</b></td>
            <td><b>PhoneNo</b></td>
            <td><b>Emailid</b></td>
            <!-- <td><b>Sale Price</b></td> -->
          </tr>
          <tr v-for="item in this.Customers" :key="item.RecCode">
            <td>{{item.customername}}</td>
            <td>{{item.customerphoneno}}</td>
            <td>{{item.customeremailid}}</td>
            <!-- <td>{{item.saleprice}}</td> -->
          </tr>
        </table>
    </div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Customers" to="/menu/Customers" />
    </q-breadcrumbs>
    <q-table
      :data="Customers"
      :columns="columnCustomers"
      :pagination.sync="pcCustomers"
      :filter="filter"
      :hide-bottom="Customers.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm" color="cyan" label="+ New" @click.native="addEditDeleteCustomers(props.row, false)" class="q-mr-sm">
        <q-tooltip>
            Create Customer
          </q-tooltip>
          </q-btn>
        <q-btn color="light-blue-5" size="lg" round dense flat icon="print" >
          <q-tooltip>
            Print
          </q-tooltip>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item clickable @click.native="exportTableToExcel(tableID = 'Customers', filename = 'Customers')">
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
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClickBrands(props.row)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.native="addEditDeleteCustomers(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="remove" @click.native="DeleteCustomers(props.row, true)" class="q-mr-sm">
          <q-tooltip>
            Delete
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="companyname" :props="props">{{ props.row.companyname }}</q-td>
        <q-td key="name" :props="props">{{ props.row.customername }}</q-td>
        <q-td key="customerphoneno" :props="props">{{ props.row.customerphoneno }}</q-td>
        <q-td key="customeremailid" :props="props">{{ props.row.customeremailid }}</q-td>
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
            <q-btn flat color="primary" label="Delete" @click="deleteCustomer()" />
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
        <th>Customer Name</th>
        <th>PhoneNo</th>
        <th>Emailid</th>
        <!-- <th>Sale Price</th> -->
        </tr>
        <!-- <div v-for="item in Products" :key="item.reccode"> -->
        <tr v-for="item in Customers" :key="item.reccode">
          <td style="width:40%;text-align: center">{{item.customername}}</td>
          <td style="width:=30%;text-align: center">{{item.customerphoneno}}</td>
          <td style="width:=30%;text-align: center">{{item.customeremailid}}</td>
          <!-- <td style="width:25%;text-align: center">{{item.saleprice}}</td> -->
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
// eslint-disable-next-line
import axios from 'axios'
export default {
  data () {
    return {
      customermodal: false,
      CustomerRecord: '',
      filter: '',
      printmodal: false,
      Designationssearch: '',
      Customers: [],
      CustomerAll: [],
      GetSectors: [],
      deleteDialog: false,

      columnCustomers: [
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
          name: 'companyname',
          required: true,
          label: 'Company Name',
          align: 'left',
          field: 'companyname',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Customer Name',
          align: 'left',
          field: 'customername',
          sortable: true
        },
        {
          name: 'customerphoneno',
          required: true,
          label: 'Phone No',
          align: 'left',
          field: 'customerphoneno',
          sortable: true
        },
        {
          name: 'customeremailid',
          required: true,
          label: 'Email Id',
          align: 'left',
          field: 'customeremailid',
          sortable: true
        }
      ],
      pcCustomers: { rowsPerPage: 10, page: 1 }
    }
  },
  watch: {
    'paginationControl.page' (page) {
    }
  },
  mounted () {
    this.fetchCustomers()
    this.checkclickfromMenu = this.$route.params.pstatus
    if (this.checkclickfromMenu === 0) {
      this.CustomerRecord = this.$m.Customer()
      this.customermodal = true
    }
    this.$c.showLoader()
  },
  methods: {
    testProps: function (p) {
    },
    // CheckSectorPresentornot: function () {
    //   console.log('a')
    //   if (this.GetSectors.length === 0) {
    //     this.$c.showError('No Sector Available')
    //     this.$router.push({ name: 'sector', params: { pitem: 1 } })
    //   }
    // },
    print: function () {
      this.printmodal = true
    },
    DeleteCustomers: function () {
      this.deleteDialog = true
    },
    rowClickBrands: function (row) {
      var self = this
      self.CustomerRecord = row
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
    addEditDeleteCustomers: function (row, deleteRecord) {
      if (row === undefined) {
        // this.CustomerRecord = this.$m.Customer()
        // this.customermodal = true
        this.$router.push({ name: 'customer', params: { pitem: 'New' } })
      } else {
        this.CustomerRecord = row
        this.$router.push({ name: 'customer', params: { pitem: row } })
        // if (deleteRecord) {
        //   this.deleteDialog = true
        // } else {
        //   this.customermodal = true
        // }
      }
    },
    // SaveCustomers: function () {
    //   if (this.CustomerRecord.iud === 'S' | this.CustomerRecord.iud === undefined) {
    //     this.CustomerRecord.iud = 'U'
    //   }
    //   this.PostCustomers()
    // },
    deleteCustomer: function () {
      this.CustomerRecord.iud = 'D'
      this.PostCustomers()
      this.deleteDialog = false
    },
    PostCustomers: function () {
      var self = this
      if (self.CustomerRecord.companyname === '') {
        return self.$c.showError('Enter Company Group Name')
      }
      if (self.CustomerRecord.sectorid === '') {
        return self.$c.showError('Select Sector ID')
      }
      if (self.CustomerRecord.customername === '') {
        return self.$c.showError('Enter Customer Name')
      }
      if (self.CustomerRecord.customerphoneno === null) {
        return self.$c.showError('Enter phoneno')
      }
      if (self.CustomerRecord.customerphoneno !== null) {
        if (self.CustomerRecord.customerphoneno.length < 10) {
          return self.$c.showError('MobileNo must be 10 digit')
        }
      }
      if (self.CustomerRecord.customeremailid === '') {
        return self.$c.showError('Enter Email Id')
      }
      if (self.CustomerRecord.customeremailid !== '') {
        // eslint-disable-next-line
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(self.CustomerRecord.customeremailid) === false) {
          return self.$c.showError('Enter Proper Email ID')
        }
      }
      if (self.CustomerRecord.gst !== '') {
        if (self.CustomerRecord.gst.length < 15) {
          return self.$c.showError('Enter 15 digit GST No')
        }
      }
      if (self.CustomerRecord.iud === 'I') {
        var count1 = 0
        for (var a = 0; a < self.Customers.length; a++) {
          if (self.Customers[a].gst === self.CustomerRecord.gst) {
            count1 = count1 + 1
            break
          }
        }
        if (count1 === 1) {
          return self.$c.showError('GST No Already present')
        }
        var count2 = 0
        for (var b = 0; b < self.Customers.length; b++) {
          if (self.Customers[b].customeremailid.toLowerCase() === self.CustomerRecord.customeremailid.toLowerCase()) {
            count2 = count2 + 1
            break
          }
        }
        if (count2 === 1) {
          return self.$c.showError('Email Address Already present')
        }
        var count3 = 0
        for (var c = 0; c < self.Customers.length; c++) {
          if (self.Customers[c].companyname.trim().toLowerCase() === self.CustomerRecord.companyname.trim().toLowerCase()) {
            count3 = count3 + 1
            break
          }
        }
        if (count3 === 1) {
          return self.$c.showError('Company Name Already present')
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
