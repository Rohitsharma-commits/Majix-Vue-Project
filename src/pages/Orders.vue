<template>
  <div>
    <div hidden :content-css="{width: '70vw'}">
    <table id="Orders" style="width:100%" border="1">
          <tr>
            <td><b>OrderNo</b></td>
            <td><b>Customers</b></td>
            <td><b>Sampling date</b></td>
            <td><b>Dispatch date</b></td>
            <td><b>Address</b></td>
            <td><b>status</b></td>
          </tr>
          <tr v-for="item in this.Orders" :key="item.RecCode">
            <td>{{item.orderNo}}</td>
             <td>{{item.customers}}</td>
            <td>{{formatDate(item.samplingdate)}}</td>
            <td>{{formatDate(item.dispatchdate)}}</td>
            <td>{{item.address}}</td>
            <td>{{item.status}}</td>
          </tr>
        </table>
    </div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Orders" to="/menu/Orders" />
    </q-breadcrumbs>
    <q-table
      :data="Orders"
      :columns="ColumnOrders"
      :pagination.sync="pcOrders"
      :filter="Filter"
      :hide-bottom="Orders.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm"  color="cyan" label="+ New" v-if="checkstatus === 'Pending'" @click.native="addEditDeleteOrders(props.row, false)" class="q-mr-sm">
        <q-tooltip>
            Create Order
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
              <q-item clickable @click.native="exportTableToExcel(tableID = 'Orders', filename = 'Orders')">
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
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="addEditDeleteOrders(props.row)" class="cursor-pointer">
        <!-- <q-tr slot="body" slot-scope="props" :props="props" class="cursor-pointer"> -->
        <q-td key="reccode" :props="props" v-if="props.row.status === 'Pending'">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.stop="addEditDeleteOrders(props.row, false)" class="q-mr-sm">
            <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="cancel" :disable="props.row.status === 'Rejected' || props.row.status === 'Dispatched'" @click.stop="RejectOrder(props.row)" class="q-mr-sm">
          <q-tooltip>
            Reject
          </q-tooltip>
          </q-btn>
         <q-btn size="sm" round dense color="cyan" icon="check" :disable="props.row.status === 'Rejected' || props.row.status === 'Dispatched'" @click.stop="Submitdata(props.row)" class="q-mr-sm">
          <q-tooltip>
            Approve
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="reccode" :props="props" v-if="props.row.status === 'Dispatched'">
         <q-btn size="sm" round dense color="cyan" icon="check" :disable="props.row.followup === 'Yes'" @click.stop="ApproveFollowUp(props.row)" class="q-mr-sm">
          <q-tooltip>
            Follow up
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="orderNo" :props="props">{{ props.row.orderNo }}</q-td>
        <q-td key="customers" :props="props">{{ props.row.customers }}</q-td>
        <q-td key="samplingdate" :props="props">{{ formatDate(props.row.samplingdate) }}</q-td>
        <q-td key="dispatchdate" :props="props">{{ formatDate(props.row.dispatchdate) }}</q-td>
        <!-- <q-td key="address" :props="props">{{ props.row.address }}</q-td> -->
        <q-td key="status" :props="props" v-bind:class="props.row.status === 'Pending' ? 'red' :props.row.status === 'Rejected' ? 'yellow': 'green'">{{ props.row.status }}</q-td>
        <q-td key="followup" :props="props" v-bind:class="props.row.followup === 'No' ? 'red' : props.row.followup === 'Yes' ? 'green': ''">{{ props.row.followup }}</q-td>
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
    <q-dialog v-model="OrdersModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width: 1200px; max-width: 300vw;">
        <q-bar class="bg-cyan text-white">
          <div>Add New Order</div>
          <q-space />
          <q-btn dense flat icon="close" @click="closemodal()">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
        <q-select v-model="OrdersRecord.salesrepresentativecode" :rules="[val => !!val || 'Field is required']" label="Sales Representative *"  outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSalesRepresentatives">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select v-model="OrdersRecord.customercode" :rules="[val => !!val || 'Field is required']" @input="GetCustomerAddress(OrdersRecord.customercode)" label="Customers *" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetCustomer">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input outlined dense label="Sampling Date *"  :rules="[val => !!val || 'Field is required']" v-model="OrdersRecord.samplingdate">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="OrdersRecord.samplingdate" @click="Checkdate(OrdersRecord.samplingdate)" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
          </q-icon>
        </template>
        </q-input>
        <!-- <q-input filled dense label="dispatch date" v-model="OrdersRecord.dispatchdate">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="OrdersRecord.dispatchdate" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
            </q-popup-proxy>
            </q-icon>
        </template>
        </q-input>
        <br/> -->
        <q-input outlined dense v-model="OrdersRecord.addressline1" readonly label="Address Line1" autogrow="" type="textarea">
        </q-input>
        <br/>
        <q-input outlined dense v-model="OrdersRecord.addressline2" readonly label="Address Line2" autogrow="" type="textarea">
        </q-input>
        <br/>
        <div class="row">
        <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="OrdersRecord.country" readonly  label="country" type="text">
          </q-input>
          </div>
        <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="OrdersRecord.states" readonly  label="states" type="text">
          </q-input>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="OrdersRecord.city" readonly  autogrow label="City" type="text">
          </q-input>
          </div>
        <div class="col-6 q-pa-xs">
         <q-input outlined dense v-model="OrdersRecord.zipcode"  readonly  label="ZipCode" type="number">
          </q-input>
          </div>
          </div>
          <br/>
        <q-table
          :data="OrderItems"
          :columns="ColumnOrderItems"
          :pagination.sync="pcOrderItems"
          :filter="Filter"
          row-key="RecCode"
          color="secondary">
          <!-- <template slot="top-left" slot-scope="props">
            <q-input v-model="Filter" debounce="500" placeholder="Filter in Table"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
          </template> -->
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
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" :disable="this.OrdersRecord.status === 'Rejected' || this.OrdersRecord.status === 'Dispatched'" @click.native="saveOrders()"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="FollowUpDialog"
      persistent
    >
      <q-card style="width:30vw">
        <q-bar class="bg-cyan text-white">
          <div>Follow Up</div>
          <q-space />
          <q-btn dense flat icon="close" @click="FollowUpDialog = !FollowUpDialog">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          Follow Up done Yes/No?
          <br/>
          <br/>
          <div style="text-align:right">
            <q-btn flat label="Cancel" @click="FollowUpDialog = !FollowUpDialog" />
            <q-btn flat color="primary" label="Done" @click="FollowUpDone(FollowUpDoneYesNo)" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
    <q-dialog v-model="Rejectmodal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:70vw">
         <q-bar class="bg-cyan text-white">
          <div>Reject</div>
          <q-space />
          <q-btn dense flat icon="close" @click="Rejectmodal = !Rejectmodal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          Do you want to Reject Y/N?
          <br>
          <div style="text-align:right">
            <q-btn flat label="Cancel" @click="Rejectmodal = !Rejectmodal" />
            <q-btn flat color="primary" label="Reject" @click="RejectSampleOrder(RejectRecord)" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="Submitmodal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:70vw">
         <q-bar class="bg-cyan text-white">
          <div>Submit</div>
          <q-space />
          <q-btn dense flat icon="close" @click="Submitmodal = !Submitmodal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input outlined dense v-model="SubmitRecord.courierNo" label="Courier No." type="text">
          </q-input>
          <br/>
        <q-input outlined dense v-model="SubmitRecord.trackingNo" label="Tracking No." type="text">
          </q-input>
          <br/>
        </q-card-section>
        <q-card-section>
          Do you want to confirm dispatch of the sample?
          <br>
          <div style="text-align:right">
            <q-btn flat label="Cancel" @click="Submitmodal = !Submitmodal" />
            <q-btn flat color="primary" label="Submit" @click="SubmitOrder(SubmitRecord)" />
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
              <th>OrderNo</th>
              <th>Customer</th>
              <th>Sampling date</th>
              <th>Dispatch date</th>
              <th>status</th>
              </tr>
              <!-- <div v-for="item in Products" :key="item.reccode"> -->
              <tr v-for="item in Orders" :key="item.reccode">
                <td style="width:=20%;text-align: center">{{item.orderNo}}</td>
                <td style="width:=20%;text-align: center">{{item.customers}}</td>
                <td style="width:=20%;text-align: center">{{formatDate(item.samplingdate)}}</td>
                <td style="width:20%;text-align: center">{{formatDate(item.dispatchdate)}}</td>
                <td style="width:20%;text-align: center">{{item.status}}</td>
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
<style>
</style>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      OrdersModal: false,
      GetUnits: [],
      OrdersRecord: [],
      deleteshadeDialog: false,
      RejectRecord: '',
      Rejectmodal: false,
      checkclickfromMenu: '',
      SubmitRecord: '',
      Submitmodal: false,
      FollowUpDialog: false,
      OrderItemsModal: false,
      Filter: '',
      ColumnOrders: [],
      GetSalesRepresentatives: [],
      GetCustomer: [],
      GetProductGroups: [],
      Designationssearch: '',
      Orders: [],
      ProductsAll: [],
      FollowUpDoneYesNo: '',
      checkstatus: '',
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
        // {
        //   name: 'shadename',
        //   required: true,
        //   label: 'Shade',
        //   align: 'left',
        //   field: 'shadename',
        //   sortable: true
        // },
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
  // watch: {
  //   'paginationControl.page' (page) {
  //   }
  // },
  mounted () {
    var self = this
    self.checkstatus = self.$route.params.pitem
    self.fetchOrders()
    // self.checkclickfromMenu = self.$route.params.pstatus
    // if (self.checkclickfromMenu === 0) {
    //   self.OrdersRecord = this.$m.Orders()
    //   self.OrdersModal = true
    // }
    self.$c.showLoader()
  },
  watch: {
    $route (to, from) {
      this.checkstatus = this.$route.params.pitem
      // this.checkclickfromMenu = this.$route.params.pstatus
      this.fetchOrders()
      // if (this.checkclickfromMenu === 0) {
      //   this.OrdersRecord = this.$m.Orders()
      //   this.OrdersModal = true
      // }
    }
  },
  methods: {
    rowClickBrands: function (row) {
    },
    closemodal: function () {
      this.OrdersModal = false
      this.OrderItems = []
      this.fetchOrders()
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
    Submitdata: function (row) {
      // alert()
      this.SubmitRecord = row
      this.Submitmodal = true
    },
    RejectOrder: function (row) {
      this.RejectRecord = row
      this.Rejectmodal = true
    },
    SubmitOrder: function (row) {
      var self = this
      row.status = 'Dispatched'
      row.dispatchdate = self.$c.formatDateYYYYMMDD(new Date())
      row.iud = 'U'
      console.log(JSON.stringify(row))
      self.$c.postData('Orders/', JSON.stringify(row), function (success, response, error) {
        self.$c.showSuccess('Record(s) Approved successfully')
        self.Submitmodal = false
        self.fetchOrders()
        // self.servicetypeModal = false
        self.$c.hideLoader()
      })
    },
    ApproveFollowUp: function (row) {
      var self = this
      self.FollowUpDoneYesNo = row
      self.FollowUpDialog = true
    },
    FollowUpDone: function (row) {
      var self = this
      row.followup = 'Yes'
      row.iud = 'U'
      console.log(JSON.stringify(row))
      self.$c.postData('Orders/', JSON.stringify(row), function (success, response, error) {
        self.$c.showSuccess('Record(s) Follow up successfully')
        self.$c.getData('Orders/UpdateTaskONFollowupDone/' + row.reccode + '/reccode/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
          console.log(response.data)
          if (response.data === 'success') {
            self.FollowUpDialog = false
            self.fetchOrders()
          }
        })
        self.$c.hideLoader()
      })
    },
    RejectSampleOrder: function (row) {
      var self = this
      row.status = 'Rejected'
      row.iud = 'U'
      self.$c.postData('Orders/', JSON.stringify(row), function (success, response, error) {
        self.$c.showSuccess('Record(s) Approved successfully')
        self.Rejectmodal = false
        self.fetchOrders()
        // self.servicetypeModal = false
        self.$c.hideLoader()
      })
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
    printpdf: function () {
      window.print()
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
              self.OrderItems.splice(self.OrderItems.indexOf(self.OrderItemsRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.OrderItemsModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    addEditDeleteOrders: function (row, deleteRecord) {
      if (row === undefined) {
        // this.OrdersRecord = this.$m.Orders()
        // this.OrdersModal = true
        this.$router.push({ name: 'Order-form', params: { pitem: 'New' } })
      } else {
        this.OrdersRecord = row
        this.OrdersRecord.iud = 'S'
        this.$router.push({ name: 'Order-form', params: { pitem: row } })
        this.GetOrderItemsOnEdit(this.OrdersRecord.reccode)
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
        return self.$c.showError('Please Select sales representative')
      }
      if (self.OrdersRecord.customercode === '') {
        return self.$c.showError('Please Select Customer')
      }
      if (self.OrdersRecord.samplingdate === null) {
        return self.$c.showError('Please Enter sampling date')
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
                self.OrderItems = []
                self.fetchOrders()
                self.OrdersModal = false
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
        self.$c.getData('Orders/GetOrderStatuswise/' + self.checkstatus + '/loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
          data.forEach(function (item, index, array) {
            for (var a = 0; a < self.GetCustomer.length; a++) {
              if (item.customercode === self.GetCustomer[a].value) {
                item.customers = self.GetCustomer[a].label
                self.Orders.push(self.$m.Orders(item))

                // self.Orders.push(self.GetCustomer[a].companyname)
              }
            }
          })
        })
        if (self.checkstatus === 'Dispatched') {
          self.ColumnOrders = [
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
              name: 'orderNo',
              required: true,
              label: 'Order No',
              align: 'left',
              style: 'width:20px',
              field: 'orderNo',
              sortable: true
            },
            {
              name: 'customers',
              required: true,
              label: 'Customer',
              align: 'left',
              field: 'customers',
              sortable: true
            },
            {
              name: 'samplingdate',
              required: true,
              label: 'Sampling Date',
              align: 'left',
              field: 'samplingdate',
              sortable: true
            },
            {
              name: 'dispatchdate',
              required: true,
              label: 'Dispatch Date',
              align: 'left',
              field: 'dispatchdate',
              sortable: true
            },
            // {
            //   name: 'address',
            //   required: true,
            //   label: 'Address',
            //   align: 'left',
            //   field: 'address',
            //   sortable: true
            // },
            {
              name: 'status',
              required: true,
              label: 'Status',
              align: 'left',
              field: 'status',
              sortable: true
            },
            {
              name: 'followup',
              required: true,
              label: 'Follow up',
              align: 'left',
              field: 'followup',
              sortable: true
            }
          ]
        } else if (self.checkstatus === 'Pending') {
          self.ColumnOrders = [
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
              name: 'orderNo',
              required: true,
              label: 'Order No',
              align: 'left',
              field: 'orderNo',
              sortable: true
            },
            {
              name: 'customers',
              required: true,
              label: 'Customer',
              align: 'left',
              field: 'customers',
              sortable: true
            },
            {
              name: 'samplingdate',
              required: true,
              label: 'Sampling Date',
              align: 'left',
              field: 'samplingdate',
              sortable: true
            },
            {
              name: 'dispatchdate',
              required: true,
              label: 'Dispatch Date',
              align: 'left',
              field: 'dispatchdate',
              sortable: true
            },
            {
              name: 'status',
              required: true,
              label: 'Status',
              align: 'left',
              field: 'status',
              sortable: true
            }
          ]
        } else {
          self.ColumnOrders = [
            {
              name: 'orderNo',
              required: true,
              label: 'Order No',
              align: 'left',
              field: 'orderNo',
              sortable: true
            },
            {
              name: 'customers',
              required: true,
              label: 'Customer',
              align: 'left',
              field: 'customers',
              sortable: true
            },
            {
              name: 'samplingdate',
              required: true,
              label: 'Sampling Date',
              align: 'left',
              field: 'samplingdate',
              sortable: true
            },
            {
              name: 'dispatchdate',
              required: true,
              label: 'Dispatch Date',
              align: 'left',
              field: 'dispatchdate',
              sortable: true
            },
            {
              name: 'status',
              required: true,
              label: 'Status',
              align: 'left',
              field: 'status',
              sortable: true
            }
          ]
        }
        console.log(JSON.stringify(self.Orders))
        self.ProductsAll = self.Orders
        // self.$c.hideLoader()
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
        // self.$c.hideLoader()
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
<style scoped>
.green {
  background-color: lightgreen;
}
.red {
  background-color: red;
}
.yellow {
  background-color: yellow;
}
.makebold {
  font-weight:bold;
  }
.q-table thead tr, .q-table tbody td {
    height: 40px;
}
</style>
