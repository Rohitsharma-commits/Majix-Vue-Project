<template>
  <div>
  <div hidden :content-css="{width: '70vw'}">
    <table id="Tasks" style="width:100%" border="1">
          <tr>
            <td><b>Task Type</b></td>
            <td><b>Task Date</b></td>
            <td><b>description</b></td>
            <td><b>Done Date</b></td>
            <td><b>status</b></td>
          </tr>
          <tr v-for="item in this.Tasks" :key="item.RecCode">
            <td>{{item.tasktype}}</td>
            <td>{{formatDate(item.taskdate)}}</td>
            <td>{{item.description}}</td>
            <td>{{formatDate(item.donedate)}}</td>
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
      <q-breadcrumbs-el label="Tasks" to="/menu/Tasks" />
    </q-breadcrumbs>
    <q-table
      :data="Tasks"
      :columns="ColumnTasks"
      :pagination.sync="pcTasks"
      :filter="Filter"
      :hide-bottom="Tasks.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm"  color="cyan" label="+ New" v-if="checkstatus === 'Pending'" @click.native="addEditDeleteTasks(props.row, false)" class="q-mr-sm">
        <q-tooltip>
            Create Task
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
              <q-item clickable @click.native="exportTableToExcel(tableID = 'Tasks', filename = 'Tasks')">
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
      <q-tr slot="body" slot-scope="props" :props="props" @click="addEditDeleteTasks(props.row, false)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.stop="addEditDeleteTasks(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="remove" :disable="props.row.status === 'Completed'" @click.stop="DeleteTasksdata(props.row, true)" class="q-mr-sm">
          <q-tooltip>
            Delete
          </q-tooltip>
          </q-btn>
           <q-btn size="sm" round dense color="cyan" icon="check" :disable="props.row.status === 'Completed'" @click.stop="Submitdata(props.row)" class="q-mr-sm">
          <q-tooltip>
            Completed
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="taskNo" :props="props">{{ props.row.taskNo }}</q-td>
        <q-td key="taskdate" :props="props">{{ formatDate(props.row.taskdate) }}</q-td>
        <q-td key="customername" :props="props">{{ props.row.customername }}</q-td>
        <q-td key="tasktype" :props="props">{{ props.row.tasktype }}</q-td>
        <q-td key="donedate" :props="props">{{ formatDate(props.row.donedate) }}</q-td>
        <q-td key="status" :props="props" v-bind:class="props.row.status === 'Pending' ? 'red': 'green'">{{ props.row.status }}</q-td>
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
    <q-dialog v-model="TasksModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:50vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Task</div>
          <q-space />
          <q-btn dense flat icon="close"  @click="closemodal()">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
        <q-select v-model="TasksRecord.salescode" :rules="[val => !!val || 'Field is required']" label="Sales Representative *"  outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSales">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select v-model="TasksRecord.customercode" :rules="[val => !!val || 'Field is required']" label="Customers *" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetCustomer">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select v-model="TasksRecord.tasktype" :rules="[val => !!val || 'Field is required']" label="Task *" outlined dense emit-value use-input hide-selected fill-input map-options :options="[
          {label: 'Mail', value: 'Mail'},
          {label: 'Call', value: 'Call'},
          {label: 'Followup', value: 'Followup'},
          {label: 'visit', value: 'visit'},
          {label: 'other', value: 'other'}
        ]" >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
        <q-input outlined dense label="Task Date *" :rules="[val => !!val || 'Field is required']" v-model="TasksRecord.taskdate">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="TasksRecord.taskdate" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
          </q-icon>
        </template>
        </q-input>
        <q-input outlined dense v-model="TasksRecord.description" label="description." autogrow="" type="textarea">
          </q-input>
          <br/>
        <q-input outlined dense label="Done Date" v-model="TasksRecord.donedate">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="TasksRecord.donedate" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
            </q-popup-proxy>
            </q-icon>
        </template>
        </q-input>
        <br/>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save"  :disable="TasksRecord.status === 'Completed'" @click.native="saveTasks()"/>
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
        <div class="row">
          <div class="col-12 col-md-4 q-pa-xs">
            Done Date
          </div>
          <div class="col-12 col-md-8 q-pa-xs">
            <q-input outlined dense v-model="SubmitRecord.donedate">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="SubmitRecord.donedate" @click="CheckDonedate(SubmitRecord.donedate)" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
                    </q-popup-proxy>
                    </q-icon>
                </template>
              </q-input>
          </div>
          </div>
          <br>
          Do you want to Approve Y/N?
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
            <q-btn flat color="primary" label="Delete" @click="deleteTasks()" />
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
          <th>Task Type</th>
          <th>Task Date</th>
          <th>description</th>
          <th>Done Date</th>
          <th>status</th>
          </tr>
          <!-- <div v-for="item in Products" :key="item.reccode"> -->
          <tr v-for="item in Tasks" :key="item.reccode">
            <td style="width:20%;text-align: center">{{item.tasktype}}</td>
            <td style="width:=20%;text-align: center">{{formatDate(item.taskdate)}}</td>
            <td style="width:=20%;text-align: center">{{item.description}}</td>
            <td style="width:20%;text-align: center">{{formatDate(item.donedate)}}</td>
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
<style scoped>

</style>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      TasksModal: false,
      TasksRecord: [],
      checkclickfromMenu: '',
      Filter: '',
      checkstatus: '',
      Designationssearch: '',
      Tasks: [],
      SectorAll: [],
      GetSales: [],
      printmodal: false,
      Submitmodal: false,
      SubmitRecord: '',
      GetCustomer: [],
      deleteDialog: false,
      ColumnTasks: [],
      pcTasks: { rowsPerPage: 10, page: 1 }
    }
  },
  watch: {
    $route (to, from) {
      this.checkstatus = this.$route.params.pitem
      this.fetchTasks()
      // this.checkclickfromMenu = this.$route.params.pstatus
      // if (this.checkclickfromMenu === 0) {
      //   this.TasksRecord = this.$m.Tasks()
      //   this.TasksModal = true
      // }
    }
  },
  mounted () {
    this.checkstatus = this.$route.params.pitem
    this.fetchTasks()
    this.checkclickfromMenu = this.$route.params.pstatus
    // if (this.checkclickfromMenu === 0) {
    //   this.TasksRecord = this.$m.Tasks()
    //   this.TasksModal = true
    // }
    this.$c.showLoader()
  },
  methods: {
    testProps: function (p) {
    },
    DeleteTasksdata: function (row) {
      this.deleteDialog = true
      this.TasksRecord = row
    },
    CheckDonedate: function (row) {
      var self = this
      var currentdate = self.$c.formatDateYYYYMMDD(new Date())
      var oDateOne = row.split('-').reverse().join('-')
      if (oDateOne > currentdate) {
        self.SubmitRecord.donedate = null
        self.$c.showError('Date Cannot be of the future')
      }
    },
    closemodal: function () {
      this.TasksModal = false
      this.fetchTasks()
    },
    Submitdata: function (row) {
      this.SubmitRecord = row
      this.Submitmodal = true
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
    SubmitOrder: function (row) {
      var self = this
      if (row.donedate !== null) {
        row.donedate = row.donedate.split('-').reverse().join('-')
      }
      row.status = 'Completed'
      row.iud = 'U'
      self.$c.postData('Tasks/', JSON.stringify(row), function (success, response, error) {
        self.$c.showSuccess('Record(s) Approved successfully')
        self.Submitmodal = false
        self.fetchTasks()
        // self.servicetypeModal = false
        self.$c.hideLoader()
      })
    },
    rowClickBrands: function (row) {
      var self = this
      self.TasksRecord = row
    },
    addEditDeleteTasks: function (row, deleteRecord) {
      if (row === undefined) {
        // this.TasksRecord = this.$m.Tasks()
        // this.TasksModal = true
        this.$router.push({ name: 'task-form', params: { pitem: 'New' } })
      } else {
        this.TasksRecord = row
        // if (this.checkstatus === 'Pending') {
        this.$router.push({ name: 'task-form', params: { pitem: row } })
        // } else {
        //   this.TasksModal = true
        // }
      }
    },
    formatDateForDisplay: function (date1) {
      // var ExtractDate = date.extractDate(date1, 'YYYY/MM/DD')
      var CheckDate = date.formatDate(date1, 'DD-MM-YYYY')
      return CheckDate
    },
    formatDate: function (date1) {
      // var ExtractDate = date.extractDate(date1, 'YYYY/MM/DD')
      var CheckDate = date.formatDate(date1, 'DD-MM-YYYY')
      return CheckDate
    },
    saveTasks: function () {
      if (this.TasksRecord.iud === 'S' | this.TasksRecord.iud === undefined) {
        this.TasksRecord.iud = 'U'
      }
      this.postTasks()
    },
    deleteTasks: function () {
      this.TasksRecord.iud = 'D'
      this.postTasks()
      this.deleteDialog = false
    },
    postTasks: function () {
      var self = this
      console.log(JSON.stringify(self.TasksRecord))
      if (self.TasksRecord.salescode === '') {
        return self.$c.showError('Please Select sales representative')
      }
      if (self.TasksRecord.customercode === '') {
        return self.$c.showError('Please Select Customer')
      }
      if (self.TasksRecord.tasktype === '') {
        return self.$c.showError('Please Select Task')
      }
      if (self.TasksRecord.taskdate === null) {
        return self.$c.showError('Please Select Task Date')
      }
      if (self.TasksRecord.taskdate !== null) {
        self.TasksRecord.taskdate = self.TasksRecord.taskdate.split('-').reverse().join('-')
      }
      if (self.TasksRecord.donedate !== null) {
        self.TasksRecord.donedate = self.TasksRecord.donedate.split('-').reverse().join('-')
      }
      // if (!self.TasksRecord.salescode) {
      //   self.$c.showError('Select sales')
      // } else {
      self.$c.showLoader()
      if (self.TasksRecord.iud === 'I' || self.TasksRecord.iud === 'U') {
        self.$c.postData('Tasks/', JSON.stringify(self.TasksRecord), function (success, response, error) {
          if (response.data === 'Successfull') {
            if (self.TasksRecord.iud === 'I') {
              self.SectorAll.push(self.TasksRecord)
            }
            self.$c.showSuccess('Record(s) saved successfully')
            self.fetchTasks()
            self.TasksModal = false
            self.$c.hideLoader()
          }
        })
      } else {
        self.$c.deleteData('Tasks/' + self.TasksRecord.reccode, function (success, response, data) {
          console.log(response.data)
          if (response.data === 'Successfull') {
            self.SectorAll.splice(self.SectorAll.indexOf(self.TasksRecord), 1)
            self.$c.showSuccess('Record(s) Deleted successfully')
            self.TasksModal = false
            self.$c.hideLoader()
          }
        })
      }
      // }
    },
    fetchTasks: function () {
      var self = this
      self.$c.showLoader()
      self.Tasks = []
      self.GetCustomer = []
      self.GetSales = []
      self.$c.getData('Tasks/FetchTaskWithStatus/' + self.checkstatus + '/loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.Tasks.push(self.$m.Tasks(item))
        })
        self.$c.getData('Customers/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
          data.forEach(function (item, index, array) {
            // self.GetCustomer.push({ value: item.reccode, label: item.companyname })
            for (var a = 0; a < self.Tasks.length; a++) {
              if (self.Tasks[a].customercode === item.reccode) {
                self.Tasks[a].customername = item.companyname
              }
            }
          })
        // self.$c.hideLoader()
        })
        self.SectorAll = self.Tasks
        if (self.checkstatus === 'Pending') {
          self.ColumnTasks = [
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
              name: 'taskNo',
              required: true,
              label: 'Task No',
              align: 'left',
              field: 'taskNo',
              sortable: true
            },
            {
              name: 'taskdate',
              required: true,
              label: 'Task Date',
              align: 'left',
              field: 'taskdate',
              sortable: true
            },
            {
              name: 'customername',
              required: true,
              label: 'Company Name',
              align: 'left',
              field: 'customername',
              sortable: true
            },
            {
              name: 'tasktype',
              required: true,
              label: 'Task Type',
              align: 'left',
              field: 'tasktype',
              sortable: true
            },
            {
              name: 'donedate',
              required: true,
              label: 'Task Completion Date',
              align: 'left',
              field: 'donedate',
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
          self.ColumnTasks = [
            {
              name: 'taskNo',
              required: true,
              label: 'Task No',
              align: 'left',
              field: 'taskNo',
              sortable: true
            },
            {
              name: 'taskdate',
              required: true,
              label: 'Task Date',
              align: 'left',
              field: 'taskdate',
              sortable: true
            },
            {
              name: 'customername',
              required: true,
              label: 'Company Name',
              align: 'left',
              field: 'customername',
              sortable: true
            },
            {
              name: 'tasktype',
              required: true,
              label: 'Task Type',
              align: 'left',
              field: 'tasktype',
              sortable: true
            },
            {
              name: 'donedate',
              required: true,
              label: 'Task Completion Date',
              align: 'left',
              field: 'donedate',
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
        // self.$c.hideLoader()
      })
      self.$c.getData('SalesRepresentatives/' + self.$c.getLocalStorage('reccode') + '/ActiveStatus/' + 1, function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetSales.push({ value: item.reccode, label: item.name })
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
.q-table thead tr, .q-table tbody td {
    height: 40px;
}
</style>
