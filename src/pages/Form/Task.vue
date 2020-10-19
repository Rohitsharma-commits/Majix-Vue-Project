<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Task List" :to="{name: 'tasks', params: { pitem: 'Pending', pstatus: 1 }}" />
      <q-breadcrumbs-el label="Task" to="/menu/Task" />
    </q-breadcrumbs>
    <q-card>
      <q-card-section>
        <b>Task</b>
      </q-card-section>
      <q-separator></q-separator>
      <form @submit.prevent.stop="saveTasks" class="q-gutter-md">
        <div class="col-12">
        <q-card-section>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Sales Representative *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
          <q-select v-model="TasksRecord.salescode" :error="checksalecode" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetSales">
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
          <q-select v-model="TasksRecord.customercode" :error="checkcustomercode" outlined dense emit-value use-input hide-selected fill-input map-options class="full-width" :options="GetCustomer">
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
            Task *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
          <q-select v-model="TasksRecord.tasktype" :error="checktasktype" outlined dense emit-value use-input hide-selected fill-input map-options :options="[
                  {label: 'Mail', value: 'Mail'},
                  {label: 'Call', value: 'Call'},
                  {label: 'Followup', value: 'Followup'},
                  {label: 'Visit', value: 'Visit'},
                  {label: 'Other', value: 'Other'}
                ]" >
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
            Task Date *
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined dense :error="checktaskdate" v-model="TasksRecord.taskdate">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="TasksRecord.taskdate" dense mask="DD-MM-YYYY" @input="() => $refs.qDateProxy.hide()"/>
              </q-popup-proxy>
              </q-icon>
            </template>
            </q-input>
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            Remarks
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
              <q-input outlined dense v-model="TasksRecord.remarks" autogrow type="textarea">
              </q-input>
          </div>
          </div>
          </q-card-section>
          <div style="text-align:center">
             <q-btn color="pink-4" flat label="Cancel" @click.native="CancelTask()"/>&nbsp;&nbsp;
            <q-btn color="pink-4" flat label="Save" type="submit" :disable="TasksRecord.status === 'Completed'"/>
          </div>
          <q-card-section>
          </q-card-section>
          </div>
        </form>
    </q-card>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      TasksRecord: [],
      Filter: '',
      AddEditTask: '',
      checkstatus: '',
      Tasks: [],
      SectorAll: [],
      GetSales: [],
      SubmitRecord: '',
      GetCustomer: [],
      checktaskdate: false,
      checksalecode: false,
      checktasktype: false,
      checkcustomercode: false,
      ColumnTasks: []
    }
  },
  mounted () {
    this.AddEditTask = this.$route.params.pitem
    this.fetchTasks()
    if (this.AddEditTask === 'New') {
      this.TasksRecord = this.$m.Tasks()
    } else {
      this.TasksRecord = this.$m.Tasks(this.AddEditTask)
      if (this.TasksRecord.taskdate !== null) {
        this.TasksRecord.taskdate = this.formatDateForDisplay(this.TasksRecord.taskdate)
      }
      if (this.TasksRecord.donedate !== null) {
        this.TasksRecord.donedate = this.formatDateForDisplay(this.TasksRecord.donedate)
      }
    }
    this.$c.showLoader()
  },
  methods: {
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
    // myRule (val) {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(!!val || '* Required')
    //     }, 1000)
    //   })
    // },
    CancelTask: function () {
      this.$router.push({ name: 'tasks', params: { pitem: 'Pending', pstatus: 1 } })
    },
    postTasks: function () {
      var self = this
      if (self.TasksRecord.salescode === '') {
        self.checksalecode = true
        return self.$c.showError('Please Select Sales Representative')
      }
      if (self.TasksRecord.customercode === '') {
        self.checkcustomercode = true
        return self.$c.showError('Please Select Customer')
      }
      if (self.TasksRecord.tasktype === '') {
        self.checktasktype = true
        return self.$c.showError('Please Select Task')
      }
      if (self.TasksRecord.taskdate === null) {
        self.checktaskdate = true
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
              self.$c.getData('Tasks/UpdateTasksCountid/' + self.TasksRecord.reccode + '/loginuser/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
              })
            }
            // if (self.TasksRecord.iud === 'I') {
            //   self.SectorAll.push(self.TasksRecord)
            // }
            self.$c.showSuccess('Record(s) saved successfully')
            self.$router.push({ name: 'tasks', params: { pitem: 'Pending', pstatus: 1 } })
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
      self.$c.getData('Customers/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.GetCustomer.push({ value: item.reccode, label: item.companyname })
        })
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

<style>

</style>
