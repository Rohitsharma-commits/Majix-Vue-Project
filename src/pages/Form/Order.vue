<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Orders List" :to="{name: 'orders', params: { pitem: 'Pending', pstatus: 1 }}"/>
      <q-breadcrumbs-el label="Order" to="/menu/Order" />
    </q-breadcrumbs>
    <q-card>
      <q-card-section>
        <b>Sample Order</b>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          Sales Representative *
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-select v-model="OrdersRecord.salesrepresentativecode" :error="checksalesrepresentativecode"  outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSalesRepresentatives">
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
          Customers *
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-select v-model="OrdersRecord.customercode" :error="checkcustomercode" @input="GetCustomerAddress(OrdersRecord.customercode)" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetCustomer">
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
          Sampling Date *
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-input outlined dense :error="checksamplingdate" v-model="OrdersRecord.samplingdate">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="OrdersRecord.samplingdate" @click="Checkdate(OrdersRecord.samplingdate)" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
              </q-popup-proxy>
              </q-icon>
            </template>
            </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          Address
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-input outlined dense v-model="OrdersRecord.addressline1" label="street 1" autogrow readonly type="textarea">
        </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          <!-- Address Line2: - -->
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-input outlined dense v-model="OrdersRecord.addressline2" label="street 2" autogrow readonly type="textarea">
        </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          Country
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-input outlined dense v-model="OrdersRecord.country" readonly  type="text">
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          State
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
        <q-input outlined dense v-model="OrdersRecord.states" readonly type="text">
        </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          City
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input outlined dense v-model="OrdersRecord.city" readonly type="text">
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 q-pa-xs">
          ZipCode
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input outlined dense v-model="OrdersRecord.zipcode" readonly type="number">
          </q-input>
        </div>
      </div>
     <q-table
      :data="OrderItems"
      :columns="ColumnOrderItems"
      :pagination.sync="pcOrderItems"
      :hide-bottom="OrderItems.length === 0"
      :filter="Filter"
      row-key="RecCode"
      color="secondary">>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm" dense color="cyan" label="add Order Item" @click.native="addEditDeleteOrderItems(props.row, false)" class="q-mr-sm" />
      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClickBrands(props.row)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.native="addEditDeleteOrderItems(props.row, false)" class="q-mr-sm" />
          <q-btn size="sm" round dense color="cyan" icon="remove" @click.native="addEditDeleteOrderItems(props.row, true)" class="q-mr-sm" />
        </q-td>
        <q-td key="productname" :props="props">{{ props.row.productname }}</q-td>
        <!-- <q-td key="shadename" :props="props">{{ props.row.shadename }}</q-td> -->
        <q-td key="unitname" :props="props">{{ props.row.unitname }}</q-td>
        <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
        <q-td key="remarks" :props="props">{{ props.row.remarks }}</q-td>
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
      <q-dialog v-model="OrderItemsModal" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card style="width:50vw">
          <q-bar class="bg-cyan text-white">
            <div>Add New Order Item</div>
            <q-space />
            <q-btn dense flat icon="close" @click="OrderItemsModal = !OrderItemsModal">
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
          <q-select v-model="OrderItemsRecord.productcode" label="Products" @input="GetShadesinSampleOrders(OrderItemsRecord.productcode)" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetProducts">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br/>
          <q-select v-model="OrderItemsRecord.shadecode" label="Shades"  outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetShades">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br/>
            <q-input outlined dense v-model="OrderItemsRecord.quantity" label="Quantity." type="number">
            </q-input>
            <br/>
            <q-select v-model="OrderItemsRecord.units" label="Units" outlined dense emit-value use-input hide-selected fill-input map-options :options="GetUnits" >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <br/>
        <q-input outlined dense v-model="OrderItemsRecord.remarks" label="Remarks." autogrow="" type="textarea">
            </q-input>
            <br/>
            <div style="text-align:right">
              <q-btn color="pink-4" flat label="Save" :disable="this.OrdersRecord.status === 'Rejected' || this.OrdersRecord.status === 'Dispatched'" @click.native="saveOrderItems()"/>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
          <div style="text-align:center">
            <q-btn color="pink-4" flat label="Cancel" @click.native="BacktoOrderlist()"/>
            <q-btn color="pink-4" flat label="Save" :disable="this.OrdersRecord.status === 'Rejected' || this.OrdersRecord.status === 'Dispatched'" @click.native="saveOrders()"/>
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
            <q-btn flat color="primary" label="Delete" @click="deleteOrderItems()" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      OrdersModal: false,
      GetUnits: [],
      OrdersRecord: [],
      deleteshadeDialog: false,
      checksalesrepresentativecode: false,
      checksamplingdate: false,
      checkcustomercode: false,
      RejectRecord: '',
      Rejectmodal: false,
      checkclickfromMenu: '',
      SubmitRecord: '',
      Submitmodal: false,
      OrderItemsModal: false,
      Filter: '',
      ColumnOrders: [],
      GetSalesRepresentatives: [],
      GetCustomer: [],
      GetProductGroups: [],
      Designationssearch: '',
      Orders: [],
      ProductsAll: [],
      checkstatus: '',
      AddEditOrder: '',
      OrderItems: [],
      printmodal: false,
      deleteDialog: false,
      GetProducts: [],
      GetShades: [],
      OrderItemsRecord: [],
      ColumnOrderItems: [
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
          label: 'Product',
          align: 'left',
          field: 'productname',
          sortable: true
        },
        {
          name: 'unitname',
          required: true,
          label: 'Units',
          align: 'left',
          field: 'unitname',
          sortable: true
        },
        {
          name: 'quantity',
          required: true,
          label: 'quantity',
          align: 'left',
          field: 'quantity',
          sortable: true
        },
        {
          name: 'remarks',
          required: true,
          label: 'Remarks',
          align: 'left',
          field: 'remarks',
          sortable: true
        }
      ],
      pcOrders: { rowsPerPage: 10, page: 1 },
      pcOrderItems: { rowsPerPage: 10, page: 1 }
    }
  },
  mounted () {
    this.AddEditOrder = this.$route.params.pitem
    this.fetchOrders()
    // this.checkclickfromMenu = self.$route.params.pstatus
    if (this.AddEditOrder === 'New') {
      this.OrdersRecord = this.$m.Orders()
    } else {
      this.OrdersRecord = this.$m.Orders(this.AddEditOrder)
      this.GetOrderItemsOnEdit(this.OrdersRecord.reccode)
      if (this.OrdersRecord.samplingdate !== null) {
        this.OrdersRecord.samplingdate = this.formatDateForDisplay(this.OrdersRecord.samplingdate)
      }
      if (this.OrdersRecord.dispatchdate !== null) {
        this.OrdersRecord.dispatchdate = this.formatDateForDisplay(this.OrdersRecord.dispatchdate)
      }
    }
    this.$c.showLoader()
  },
  methods: {
    rowClickBrands: function (row) {
    },
    Checkdate: function (row) {
      var self = this
      var currentdate = self.$c.formatDateYYYYMMDD(new Date())
      var oDateOne = row.split('-').reverse().join('-')
      if (oDateOne > currentdate) {
        self.OrdersRecord.samplingdate = null
        self.$c.showError('Date Cannot be of the future')
      }
    },
    formatDate: function (date1) {
      // var ExtractDate = date.extractDate(date1, 'YYYY/MM/DD')
      var CheckDate = date.formatDate(date1, 'DD-MM-YYYY')
      return CheckDate
    },
    formatDateForDisplay: function (date1) {
      // var ExtractDate = date.extractDate(date1, 'YYYY/MM/DD')
      var CheckDate = date.formatDate(date1, 'DD-MM-YYYY')
      return CheckDate
    },
    BacktoOrderlist: function () {
      this.$router.push({ name: 'orders', params: { pitem: 'Pending', pstatus: 1 } })
    },
    addEditDeleteOrderItems: function (row, deleteRecord) {
      if (row === undefined) {
        this.OrderItemsRecord = this.$m.OrderItems()
        this.OrderItemsRecord.ordercode = this.OrdersRecord.reccode
        this.OrderItemsModal = true
      } else {
        this.OrderItemsRecord = row
        this.OrderItemsRecord.iud = 'S'
        this.GetShadesinSampleOrders(this.OrderItemsRecord.productcode)
        if (deleteRecord) {
          this.deleteshadeDialog = true
        } else {
          this.OrderItemsModal = true
        }
      }
    },
    saveOrderItems: function () {
      console.log(this.OrderItemsRecord.iud)
      if (this.OrderItemsRecord.iud === 'S' | this.OrderItemsRecord.iud === undefined) {
        this.OrderItemsRecord.iud = 'U'
      }
      this.postOrderitems()
    },
    deleteOrderItems: function () {
      this.OrderItemsRecord.iud = 'D'
      this.postOrderitems()
      this.deleteshadeDialog = false
    },
    GetCustomerAddress: function (row) {
      var self = this
      self.OrdersRecord.address = ''
      self.$c.getData('Customers/GetCustomerAddressinSampleOrder/' + row, function (success, response, data) {
        self.OrdersRecord.addressline1 = data[0].addressline1
        self.OrdersRecord.addressline2 = data[0].addressline2
        self.OrdersRecord.country = data[0].country
        self.OrdersRecord.states = data[0].states
        self.OrdersRecord.city = data[0].city
        self.OrdersRecord.zipcode = data[0].zipcode
      })
    },
    postOrderitems: function () {
      var self = this
      if (!self.OrderItemsRecord.productcode) {
        self.$c.showError('Select Products')
      } else {
        // self.$c.showLoader()
        if (self.OrderItemsRecord.iud === 'I' || self.OrderItemsRecord.iud === 'U') {
          if (self.OrderItemsRecord.iud === 'I') {
            for (var a = 0; a < self.GetProducts.length; a++) {
              if (self.GetProducts[a].value === self.OrderItemsRecord.productcode) {
                self.OrderItemsRecord.productname = self.GetProducts[a].label
              }
            }
            // for (var b = 0; b < self.GetShades.length; b++) {
            //   if (self.GetShades[b].value === self.OrderItemsRecord.shadecode) {
            //     self.OrderItemsRecord.shadename = self.GetShades[b].label
            //   }
            // }
            for (var c = 0; c < self.GetUnits.length; c++) {
              if (self.GetUnits[c].value === self.OrderItemsRecord.units) {
                self.OrderItemsRecord.unitname = self.GetUnits[c].label
              }
            }
            self.OrderItems.push(self.OrderItemsRecord)
          }
          self.$c.showSuccess('Record(s) saved successfully')
          // self.$c.postData('Sector/', JSON.stringify(self.OrderItemsRecord), function (success, response, error) {
          //   if (response.data === 'Successfull') {
          //     if (self.OrderItemsRecord.iud === 'I') {
          //       self.SectorAll.push(self.OrderItemsRecord)
          //     }
          //     self.$c.showSuccess('Record(s) saved successfully')
          //     self.fetchSector()
          self.OrderItemsModal = false
          //     self.$c.hideLoader()
          //   }
          // })
        } else {
          self.OrderItems.splice(self.OrderItems.indexOf(self.OrderItemsRecord), 1)
          self.$c.deleteData('OrderItems/' + self.OrderItemsRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              // self.OrderItems.splice(self.OrderItems.indexOf(self.OrderItemsRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.OrderItemsModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    saveOrders: function () {
      if (this.OrdersRecord.iud === 'S' | this.OrdersRecord.iud === undefined) {
        this.OrdersRecord.iud = 'U'
      }
      this.postOrders()
    },
    deleteBrands: function () {
      this.OrdersRecord.iud = 'D'
      this.postOrders()
      this.deleteDialog = false
    },
    GetOrderItemsOnEdit: function (row) {
      var self = this
      self.OrderItems = []
      self.$c.getData('OrderItems/GetOrderItemsOnEdit/' + row, function (success, response, data) {
        data.forEach(function (item, index, array) {
          for (var a = 0; a < self.GetProducts.length; a++) {
            if (self.GetProducts[a].value === item.productcode) {
              item.productname = self.GetProducts[a].label
            }
          }
          // for (var b = 0; b < self.GetShades.length; b++) {
          //   if (self.GetShades[b].value === item.shadecode) {
          //     item.shadename = self.GetShades[b].label
          //   }
          // }
          for (var c = 0; c < self.GetUnits.length; c++) {
            if (self.GetUnits[c].value === item.units) {
              item.unitname = self.GetUnits[c].label
            }
          }
          self.OrderItems.push(self.$m.OrderItems(item))
        })
      })
    },
    GetShadesinSampleOrders: function (row) {
      var self = this
      self.GetShades = []
      self.$c.getData('Shades/GetShadesinSampleOrders/' + row, function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetShades.push({ value: item.reccode, label: item.name })
        })
      })
    },
    postOrders: function () {
      var self = this
      if (self.OrdersRecord.samplingdate !== null) {
        self.OrdersRecord.samplingdate = self.OrdersRecord.samplingdate.split('-').reverse().join('-')
      }
      if (self.OrdersRecord.salesrepresentativecode === '') {
        self.checksalesrepresentativecode = true
        return self.$c.showError('Please Select Sales Representative')
      }
      if (self.OrdersRecord.customercode === '') {
        self.checkcustomercode = true
        return self.$c.showError('Please Select Customer')
      }
      if (self.OrdersRecord.samplingdate === null) {
        self.checksamplingdate = true
        return self.$c.showError('Please Enter sampling date')
      }
      if (self.OrdersRecord.iud === 'I' || self.OrdersRecord.iud === 'U') {
        if (self.OrderItems.length === 0) {
          return self.$c.showError('Please Add Atleast One Product')
        }
      }
      self.$c.showLoader()
      if (self.OrdersRecord.iud === 'I' || self.OrdersRecord.iud === 'U') {
        self.$c.postData('Orders/', JSON.stringify(self.OrdersRecord), function (success, response, error) {
          if (response.data === 'Successfull') {
            self.$c.postData('OrderItems/', JSON.stringify(self.OrderItems), function (success, response, error) {
              if (response.data === 'Successfull') {
                if (self.OrdersRecord.iud === 'I') {
                  self.$c.getData('Orders/UpdateOrderCountid/' + self.OrdersRecord.reccode + '/loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
                  })
                }
                if (self.OrdersRecord.iud === 'I') {
                  self.ProductsAll.push(self.OrdersRecord)
                }
                self.$c.showSuccess('Record(s) saved successfully')
                self.$router.push({ name: 'orders', params: { pitem: 'Pending', pstatus: 1 } })
                self.OrderItems = []
                self.$c.hideLoader()
              }
            })
          }
        })
      } else {
        self.$c.deleteData('Orders/' + self.OrdersRecord.reccode, function (success, response, data) {
          console.log(response.data)
          if (response.data === 'Successfull') {
            self.ProductsAll.splice(self.ProductsAll.indexOf(self.OrdersRecord), 1)
            self.$c.showSuccess('Record(s) Deleted successfully')
            self.OrdersModal = false
            self.$c.hideLoader()
          }
        })
      }
      // }
    },
    fetchOrders: function () {
      var self = this
      self.$c.showLoader()
      self.Orders = []
      self.GetCustomer = []
      self.GetProducts = []
      self.GetUnits = []
      self.GetSalesRepresentatives = []
      self.$c.getData('Customers/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetCustomer.push({ value: item.reccode, label: item.companyname })
        })
      })
      self.$c.getData('SalesRepresentatives/' + self.$c.getLocalStorage('reccode') + '/ActiveStatus/' + 1, function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetSalesRepresentatives.push({ value: item.reccode, label: item.name })
        })
        // self.$c.hideLoader()
      })
      self.$c.getData('Products/' + self.$c.getLocalStorage('reccode') + '/ActiveOrNot/' + 1, function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetProducts.push({ value: item.reccode, label: item.productname })
        })
        self.$c.hideLoader()
      })
      self.$c.getData('Units/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetUnits.push({ value: item.reccode, label: item.name })
        })
        self.$c.hideLoader()
      })
    }
  }
}
</script>

<style>

</style>
