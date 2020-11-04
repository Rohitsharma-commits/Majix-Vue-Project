<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Product List" :to="{name: 'products', params: { pitem: '1' }}"/>
      <q-breadcrumbs-el label="Product" to="/menu/Product" />
    </q-breadcrumbs>
    <q-card>
      <q-card-section>
        <b>Product</b>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          Product Group *
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-select v-model="ProductRecord.groupcode" :error="checkgroupcode"  @click.native="CheckproductGroupPresentornot()" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetProductGroups">
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
      <div class="row" style="margin-top:-20px;" >
        <div class="col-12 col-md-2 q-pa-xs">
          Product Name *
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input outlined dense v-model="ProductRecord.productname"  :error="checkproductname" type="text">
          </q-input>
        </div>
        </div>
        <div class="row" style="margin-top:-20px;" >
        <div class="col-12 col-md-2 q-pa-xs">
          Product Code *
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input outlined dense v-model="ProductRecord.productcode"  :error="checkproductcode" type="text">
          </q-input>
        </div>
        </div>
        <div class="row" style="margin-top:-20px;" >
        <div class="col-12 col-md-2 q-pa-xs">
          Cost Price
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input outlined dense v-model="ProductRecord.costprice"  type="number">
          </q-input>
        </div>
        </div>
        <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          Sale Price
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input outlined dense v-model="ProductRecord.saleprice" type="number">
          </q-input>
        </div>
        </div>
        <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          Description
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
         <q-input outlined dense v-model="ProductRecord.description" autogrow label="Description" maxlength="256" type="textarea">
          </q-input>
        </div>
        </div>
          Active:-<q-checkbox v-model="ProductRecord.activeflag"  true-value = '1' false-value = '0'/>
        <q-table
          :data="Shades"
          :columns="ColumnShades"
          :pagination.sync="pcShades"
          :hide-bottom="Shades.length === 0"
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
          <div style="text-align:center">
            <q-btn color="pink-4" flat label="Cancel" @click.native="CancelProduct()"/>&nbsp;&nbsp;
            <q-btn color="pink-4" flat label="Save" @click.native="saveProducts()"/>
          </div>
          </q-card-section>
    </q-card>
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
  </div>
</template>

<script>
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
      // checkstatus: '',
      GetProductGroups: [],
      Designationssearch: '',
      Products: [],
      printmodal: false,
      ProductsAll: [],
      Shades: [],
      deleteDialog: false,
      checkgroupcode: false,
      checkproductname: false,
      checkproductcode: false,
      ShadeRecord: '',
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
    this.fetchProducts()
    // this.checkstatus = this.$route.params.pstatus
    this.checkProduct = this.$route.params.pitem
    if (this.checkProduct === 'New') {
      this.ProductRecord = this.$m.Product()
    } else {
      this.ProductRecord = this.$m.Product(this.checkProduct)
      this.GetShadeOnEdit(this.ProductRecord.reccode)
    }
    this.$c.showLoader()
  },
  methods: {
    rowClickBrands: function (row) {
    },
    CheckproductGroupPresentornot: function () {
      if (this.GetProductGroups.length === 0) {
        this.$c.showError('PLease Enter Product Group')
        this.$router.push({ name: 'productgroup', params: { pitem: 1 } })
      }
    },
    CancelProduct: function () {
      this.$router.push({ name: 'products', params: { pitem: '1' } })
    },
    closemodal: function () {
      this.ProductModal = false
      this.Shades = []
      this.fetchProducts()
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
            var count1 = 0
            for (var a = 0; a < self.Shades.length; a++) {
              if (self.Shades[a].shadecode === self.ShadeRecord.shadecode) {
                count1 = count1 + 1
                break
              }
            }
            if (count1 === 0) {
              self.Shades.push(self.ShadeRecord)
              self.$c.showSuccess('Record(s) saved successfully')
            } else {
              self.$c.showError('Shade Code Already Present')
            }
          }
          self.ShadeModal = false
        } else {
          self.Shades.splice(self.Shades.indexOf(self.ShadeRecord), 1)
          self.$c.deleteData('Shades/' + self.ShadeRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.ShadeModal = false
              self.$c.hideLoader()
            }
          })
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
        self.checkgroupcode = true
        return self.$c.showError('Please Select Product Group')
      }
      if (self.ProductRecord.productname === '') {
        self.checkproductname = true
        return self.$c.showError('Please Enter Product Name')
      }
      if (self.ProductRecord.productcode === '') {
        self.checkproductcode = true
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
          return self.$c.showError('ProductCode is Already present')
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
                self.$router.push({ name: 'products', params: { pitem: '1' } })
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
        self.$c.getData('Products/' + self.$c.getLocalStorage('reccode') + '/ActiveOrNot/' + 1, function (success, response, data) {
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

<style>

</style>
