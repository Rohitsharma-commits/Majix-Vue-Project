<template>
  <div>
    <div hidden :content-css="{width: '70vw'}">
    <table id="Products" style="width:100%" border="1">
          <tr>
            <td><b>Product Name</b></td>
            <td><b>Product Group Name</b></td>
            <td><b>Product Code</b></td>
            <td><b>Cost Price</b></td>
            <td><b>Sale Price</b></td>
          </tr>
          <tr v-for="item in this.Products" :key="item.RecCode">
            <td>{{item.productname}}</td>
            <td>{{item.productGroupName}}</td>
            <td>{{item.productcode}}</td>
            <td>{{item.costprice}}</td>
            <td>{{item.saleprice}}</td>
          </tr>
        </table>
    </div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Products" to="/menu/Products" />
    </q-breadcrumbs>
    <q-table
      :data="Products"
      :columns="ColumnProducts"
      :pagination.sync="pcProducts"
      :filter="Filter"
      :hide-bottom="Products.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm" color="cyan" label="+ New" v-if="checkstatus === '1'" @click.native="addEditDeleteProducts(props.row, false)" class="col-12 col-md-4 q-pa-xs">
        <q-tooltip>
            Create Product
          </q-tooltip>
          </q-btn>
        <q-btn color="light-blue-5" size="lg" v-if="checkstatus === '1'" round dense flat icon="print" >
          <q-tooltip>
            Print
          </q-tooltip>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item clickable @click.native="exportTableToExcel(tableID = 'Products', filename = 'Products')">
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
          <q-btn size="sm" round dense color="cyan" icon="edit" v-if="checkstatus === '1'" @click.native="addEditDeleteProducts(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="check" v-if="checkstatus !== '1'" @click.native="Active(props.row)" class="q-mr-sm">
          <q-tooltip>
            Active
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="productname" :props="props">{{ props.row.productname }}</q-td>
        <!-- <q-td key="productcode" :props="props">{{ props.row.productcode }}</q-td> -->
        <q-td key="productGroupName" :props="props">{{ props.row.productGroupName }}</q-td>
        <q-td key="costprice" :props="props">{{ props.row.costprice }}</q-td>
        <q-td key="saleprice" :props="props">{{ props.row.saleprice }}</q-td>
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
    <!-- <q-dialog v-model="ProductModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:200vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Product</div>
          <q-space />
          <q-btn dense flat icon="close" @click="closemodal()">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
        <q-select v-model="ProductRecord.groupcode" :rules="[val => !!val || 'Field is required']" label="Product Group *"  @click.native="CheckproductGroupPresentornot()" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetProductGroups">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
          <q-input outlined dense v-model="ProductRecord.productname" :rules="[val => !!val || 'Field is required']" label="Product Name *" type="text">
          </q-input>
        <q-input outlined dense v-model="ProductRecord.productcode" :rules="[val => !!val || 'Field is required']" label="Product Code *" type="text">
          </q-input>
          <q-input outlined dense v-model="ProductRecord.costprice" label="Cost Price." type="number">
          </q-input>
          <br/>
          <q-input outlined dense v-model="ProductRecord.saleprice" label="Sale Price." type="number">
          </q-input>
          <br/>
          <q-input outlined dense v-model="ProductRecord.description" label="Description" autogrow="" maxlength="256" type="textarea">
          </q-input>
          <br/>
          Active:-<q-checkbox v-model="ProductRecord.activeflag"  true-value = '1' false-value = '0'/>
          <br/>
        <q-table
          :data="Shades"
          :columns="ColumnShades"
          :pagination.sync="pcShades"
          :filter="Filter"
          row-key="RecCode"
          color="secondary">
          <template slot="top-right" slot-scope="props">
            <q-btn size="sm" dense color="cyan" label="Add Shade" @click.native="addEditDeleteShades(props.row, false)" class="q-mr-sm">
            <q-tooltip>
            Create Shade
          </q-tooltip>
          </q-btn>
          </template>
          <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClickBrands(props.row)" class="cursor-pointer">
            <q-td key="reccode" :props="props">
              <q-btn size="sm" round dense color="cyan" icon="edit" @click.native="addEditDeleteShades(props.row, false)" class="q-mr-sm">
              <q-tooltip>
                Edit Shade
              </q-tooltip>
              </q-btn>
              <q-btn size="sm" round dense color="cyan" icon="remove" @click.native="addEditDeleteShades(props.row, true)" class="q-mr-sm">
              <q-tooltip>
                Delete Shade
              </q-tooltip>
              </q-btn>
            </q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
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
        <q-dialog v-model="ShadeModal" persistent transition-show="flip-down" transition-hide="flip-up">
          <q-card style="width:50vw">
            <q-bar class="bg-cyan text-white">
              <div>Add New Shade</div>
              <q-space />
              <q-btn dense flat icon="close" @click="ShadeModal = !ShadeModal">
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            <q-card-section>
              <q-input outlined dense v-model="ShadeRecord.name" label="Name." type="text">
              </q-input>
              <br/>
            <q-input outlined dense v-model="ShadeRecord.shadecode" label="Shade Code." type="text">
              </q-input>
              <br/>
              <div style="text-align:right">
                <q-btn color="pink-4" flat label="Save" @click.native="saveShade()"/>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" @click.native="saveProducts()"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog> -->
    <q-dialog
      v-model="deleteshadeDialog"
      persistent
    >
      <q-card style="width:30vw">
        <q-bar class="bg-cyan text-white">
          <div>Delete</div>
          <q-space />
          <q-btn dense flat icon="close" @click="deleteshadeDialog = !deleteshadeDialog">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          Delete the selected record?
          <br/>
          <br/>
          <div style="text-align:right">
            <q-btn flat label="Cancel" @click="deleteshadeDialog = !deleteshadeDialog" />
            <q-btn flat color="primary" label="Delete" @click="deleteshade()" />
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
            <q-btn flat color="primary" label="Delete" @click="deleteBrands()" />
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
      <th>Product Name</th>
      <th>Product Group</th>
      <th>Product Code</th>
      <th>Cost Price</th>
      <th>Sale Price</th>
      </tr>
      <!-- <div v-for="item in Products" :key="item.reccode"> -->
      <tr v-for="item in Products" :key="item.reccode">
        <td style="width:20%;text-align: center">{{item.productname}}</td>
        <td style="width:20%;text-align: center">{{item.productGroupName}}</td>
        <td style="width:=20%;text-align: center">{{item.productcode}}</td>
        <td style="width:=20%;text-align: center">{{item.costprice}}</td>
        <td style="width:20%;text-align: center">{{item.saleprice}}</td>
      </tr>
      <!-- </div> -->
</table>
    </div>
    <div style="text-align:right">
    <q-btn label="Print" color="cyan" @click.native="ExportPDF()" />
  </div>
  </q-card-section>
</q-card>
</q-dialog>
  </div>
</template>
<style scoped>

</style>
<script>
// import html2pdf from 'html2pdf.js'
export default {
  data () {
    return {
      ProductModal: false,
      ProductRecord: [],
      checkclickfromMenu: '',
      showpdf: false,
      deleteshadeDialog: false,
      ShadeModal: false,
      Filter: '',
      checkstatus: '',
      GetProductGroups: [],
      Designationssearch: '',
      Products: [],
      printmodal: false,
      ProductsAll: [],
      Shades: [],
      deleteDialog: false,
      ShadeRecord: '',
      printColumnProducts: [
        {
          name: 'productname',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'productname',
          sortable: true
        },
        {
          name: 'productcode',
          required: true,
          label: 'Product Code',
          align: 'left',
          field: 'productcode',
          sortable: true
        },
        {
          name: 'costprice',
          required: true,
          label: 'Cost Price',
          align: 'left',
          field: 'costprice',
          sortable: true
        },
        {
          name: 'saleprice',
          required: true,
          label: 'Sale Price',
          align: 'left',
          field: 'saleprice',
          sortable: true
        }
      ],
      ColumnProducts: [
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
          name: 'productname',
          required: true,
          label: 'Product Name',
          align: 'left',
          field: 'productname',
          sortable: true
        },
        {
          name: 'productGroupName',
          required: true,
          label: 'Product Group',
          align: 'left',
          field: 'productGroupName',
          sortable: true
        },
        // {
        //   name: 'productcode',
        //   required: true,
        //   label: 'Product Code',
        //   align: 'left',
        //   field: 'productcode',
        //   sortable: true
        // },
        {
          name: 'costprice',
          required: true,
          label: 'Cost Price',
          align: 'left',
          field: 'costprice',
          sortable: true
        },
        {
          name: 'saleprice',
          required: true,
          label: 'Sale Price',
          align: 'left',
          field: 'saleprice',
          sortable: true
        }
      ],
      ColumnShades: [
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
        }
      ],
      pcProducts: { rowsPerPage: 10, page: 1 },
      pcShades: { rowsPerPage: 10, page: 1 }
    }
  },
  mounted () {
    this.checkstatus = this.$route.params.pitem
    this.fetchProducts()
    this.checkclickfromMenu = this.$route.params.pstatus
    // if (this.checkclickfromMenu === 0) {
    //   this.ProductRecord = this.$m.Product()
    //   this.ProductModal = true
    // }
    this.$c.showLoader()
  },
  watch: {
    $route (to, from) {
      this.checkstatus = this.$route.params.pitem
      this.fetchProducts()
      this.checkclickfromMenu = this.$route.params.pstatus
      if (this.checkclickfromMenu === 0) {
        this.ProductRecord = this.$m.Product()
        this.ProductModal = true
      }
    }
  },
  methods: {
    rowClickBrands: function (row) {
    },
    print: function () {
      this.printmodal = true
    },
    CheckproductGroupPresentornot: function () {
      if (this.GetProductGroups.length === 0) {
        this.$c.showError('PLease Enter Product Group')
        this.$router.push({ name: 'productgroup', params: { pitem: 1 } })
      }
    },
    closemodal: function () {
      this.ProductModal = false
      this.Shades = []
      this.fetchProducts()
    },
    ExportPDF: function () {
      var printContent = document.getElementById('getpdf').innerHTML
      var w = window.open()
      w.document.write(printContent)
      w.print()
      w.close()
    },
    printpdf: function () {
      window.print()
    },
    addEditDeleteShades: function (row, deleteRecord) {
      if (row === undefined) {
        this.ShadeRecord = this.$m.Shade()
        this.ShadeRecord.productcode = this.ProductRecord.reccode
        this.ShadeModal = true
      } else {
        this.ShadeRecord = row
        this.ShadeRecord.iud = 'S'
        if (deleteRecord) {
          this.deleteshadeDialog = true
        } else {
          this.ShadeModal = true
        }
      }
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
    saveShade: function () {
      if (this.ShadeRecord.iud === 'S' | this.ShadeRecord.iud === undefined) {
        this.ShadeRecord.iud = 'U'
      }
      this.postShade()
    },
    deleteshade: function () {
      this.ShadeRecord.iud = 'D'
      this.postShade()
      this.deleteshadeDialog = false
    },
    Active: function (row) {
      var self = this
      self.$c.showLoader()
      row.activeflag = 1
      row.iud = 'U'
      self.$c.postData('Products/', JSON.stringify(row), function (success, response, error) {
        self.$c.showSuccess('Record(s) Activate successfully')
        // self.Submitmodal = false
        self.fetchProducts()
        self.$c.hideLoader()
      })
    },
    postShade: function () {
      var self = this
      console.log(self.ShadeRecord.iud)
      if (!self.ShadeRecord.name) {
        self.$c.showError('Enter Name')
      } else {
        // self.$c.showLoader()
        if (self.ShadeRecord.iud === 'I' || self.ShadeRecord.iud === 'U') {
          if (self.ShadeRecord.iud === 'I') {
            self.Shades.push(self.ShadeRecord)
          }
          self.$c.showSuccess('Record(s) saved successfully')
          // self.$c.postData('Sector/', JSON.stringify(self.ShadeRecord), function (success, response, error) {
          //   if (response.data === 'Successfull') {
          //     if (self.ShadeRecord.iud === 'I') {
          //       self.SectorAll.push(self.ShadeRecord)
          //     }
          //     self.$c.showSuccess('Record(s) saved successfully')
          //     self.fetchSector()
          self.ShadeModal = false
          //     self.$c.hideLoader()
          //   }
          // })
        } else {
          self.Shades.splice(self.Shades.indexOf(self.ShadeRecord), 1)
          self.$c.deleteData('Shades/' + self.ShadeRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              self.Shades.splice(self.Shades.indexOf(self.ShadeRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.ShadeModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    addEditDeleteProducts: function (row, deleteRecord) {
      if (row === undefined) {
        this.ProductRecord = this.$m.Product()
        // this.ProductModal = true
        this.$router.push({ name: 'product-form', params: { pitem: 'New' } })
      } else {
        this.ProductRecord = row
        // if (this.ProductRecord.activeflag === 1 || this.ProductRecord.activeflag === '1') {
        //   this.ProductRecord.activeflag = '1'
        // } else {
        //   this.ProductRecord.activeflag = '0'
        // }
        this.$router.push({ name: 'product-form', params: { pitem: row } })
        // this.GetShadeOnEdit(this.ProductRecord.reccode)
        if (deleteRecord) {
          this.deleteDialog = true
        } else {
          this.ProductModal = true
        }
      }
    },
    saveProducts: function () {
      if (this.ProductRecord.iud === 'S' | this.ProductRecord.iud === undefined) {
        this.ProductRecord.iud = 'U'
      }
      this.postProducts()
    },
    deleteBrands: function () {
      this.ProductRecord.iud = 'D'
      this.postProducts()
      this.deleteDialog = false
    },
    GetShadeOnEdit: function (row) {
      var self = this
      self.Shades = []
      self.$c.getData('Shades/Getbyshade/' + row, function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.Shades.push(self.$m.Shade(item))
        })
      })
    },
    postProducts: function () {
      var self = this
      console.log(self.ProductRecord.iud)
      // if (!self.ProductRecord.productname) {
      //   self.$c.showError('Enter Name')
      // } else {
      if (self.ProductRecord.groupcode === '') {
        return self.$c.showError('Please Select Product Group')
      }
      if (self.ProductRecord.productname === '') {
        return self.$c.showError('Please Enter Product Name')
      }
      if (self.ProductRecord.productcode === '') {
        return self.$c.showError('Please Enter Product Code')
      }
      var count = 0
      if (self.ProductRecord.iud === 'I') {
        for (var a = 0; a < self.Products.length; a++) {
          if (self.Products[a].productcode === self.ProductRecord.productcode) {
            count = count + 1
            break
          }
        }
        if (count === 1) {
          return self.$c.showError('productcode Already present')
        }
      }
      self.$c.showLoader()
      if (self.ProductRecord.iud === 'I' || self.ProductRecord.iud === 'U') {
        self.$c.postData('Products/', JSON.stringify(self.ProductRecord), function (success, response, error) {
          if (response.data === 'Successfull') {
            self.$c.postData('Shades/', JSON.stringify(self.Shades), function (success, response, error) {
              if (response.data === 'Successfull') {
                if (self.ProductRecord.iud === 'I') {
                  self.ProductsAll.push(self.ProductRecord)
                }
                self.$c.showSuccess('Record(s) saved successfully')
                self.Shades = []
                self.fetchProducts()
                self.ProductModal = false
                self.$c.hideLoader()
              }
            })
          }
        })
      } else {
        self.$c.deleteData('Products/' + self.ProductRecord.reccode, function (success, response, data) {
          console.log(response.data)
          if (response.data === 'Successfull') {
            self.ProductsAll.splice(self.ProductsAll.indexOf(self.ProductRecord), 1)
            self.$c.showSuccess('Record(s) Deleted successfully')
            self.ProductModal = false
            self.$c.hideLoader()
          }
        })
      }
      // }
    },
    fetchProducts: function () {
      var self = this
      self.$c.showLoader()
      self.Products = []
      self.GetProductGroups = []
      self.$c.getData('ProductGroup/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetProductGroups.push({ value: item.reccode, label: item.name })
        })
        self.$c.getData('Products/' + self.$c.getLocalStorage('reccode') + '/ActiveOrNot/' + self.checkstatus, function (success, response, data) {
          data.forEach(function (item, index, array) {
            for (var a = 0; a < self.GetProductGroups.length; a++) {
              if (item.groupcode === self.GetProductGroups[a].value) {
                item.productGroupName = self.GetProductGroups[a].label
                self.Products.push(self.$m.Product(item))
              }
            }
          })
          console.log(JSON.stringify(self.Products))
          self.ProductsAll = self.Products
          self.$c.hideLoader()
        })
      })
    }
  }
}
</script>
