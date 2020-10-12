<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Units" to="/menu/Units" />
    </q-breadcrumbs>
    <q-table
      :data="Units"
      :columns="ColumnUnits"
      :pagination.sync="pcTeams"
      :filter="Filter"
      :hide-bottom="Units.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm"  color="cyan" label="+ New" @click.native="addEditDeleteUnits(props.row, false)" class="q-mr-sm">
        <q-tooltip>
          Create Units
        </q-tooltip>
        </q-btn>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClickBrands(props.row)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.native="addEditDeleteUnits(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="remove" @click.native="addEditDeleteUnits(props.row, true)" class="q-mr-sm">
          <q-tooltip>
            Delete
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
    <q-dialog v-model="UnitsModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:50vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Units</div>
          <q-space />
          <q-btn dense flat icon="close" @click="UnitsModal = !UnitsModal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input outlined dense v-model="UnitsRecord.name" label="Name." type="text">
          </q-input>
          <br/>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" @click.native="saveUnits()"/>
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
            <q-btn flat color="primary" label="Delete" @click="dekleteUnits()" />
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
      UnitsModal: false,
      UnitsRecord: '',
      Filter: '',
      Designationssearch: '',
      Units: [],
      UnitsAll: [],

      deleteDialog: false,

      ColumnUnits: [
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
      pcTeams: { rowsPerPage: 10, page: 1 }
    }
  },
  watch: {
    'paginationControl.page' (page) {
    }
  },
  created () {
    this.fetchUnits()
    this.$c.showLoader()
  },
  methods: {
    testProps: function (p) {
    },
    rowClickBrands: function (row) {
      var self = this
      self.UnitsRecord = row
    },
    addEditDeleteUnits: function (row, deleteRecord) {
      if (row === undefined) {
        this.UnitsRecord = this.$m.Units()
        this.UnitsModal = true
      } else {
        this.UnitsRecord = row
        if (deleteRecord) {
          this.deleteDialog = true
        } else {
          this.UnitsModal = true
        }
      }
    },
    saveUnits: function () {
      var self = this
      if (self.UnitsRecord.iud === 'U' || self.UnitsRecord.iud === undefined) {
        self.UnitsRecord.iud = 'U'
      }
      self.postsUnits()
    },
    dekleteUnits: function () {
      this.UnitsRecord.iud = 'D'
      this.postsUnits()
      this.deleteDialog = false
    },
    postsUnits: function () {
      var self = this
      if (self.UnitsRecord.iud === 'I') {
        var count1 = 0
        for (var a = 0; a < self.Units.length; a++) {
          if (self.Units[a].name.toLowerCase() === self.UnitsRecord.name.toLowerCase()) {
            count1 = count1 + 1
            break
          }
        }
        if (count1 === 1) {
          return self.$c.showError('Unit Already present')
        }
      }
      if (!self.UnitsRecord.name) {
        self.$c.showError('Enter Name')
      } else {
        self.$c.showLoader()
        if (self.UnitsRecord.iud === 'I' || self.UnitsRecord.iud === 'U') {
          self.$c.postData('Units/', JSON.stringify(self.UnitsRecord), function (success, response, error) {
            if (response.data === 'Successfull') {
              if (self.UnitsRecord.iud === 'I') {
                self.UnitsAll.push(self.UnitsRecord)
              }
              self.$c.showSuccess('Record(s) saved successfully')
              self.fetchUnits()
              self.UnitsModal = false
              self.$c.hideLoader()
            }
          })
        } else {
          self.$c.deleteData('Units/' + self.UnitsRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              self.UnitsAll.splice(self.UnitsAll.indexOf(self.UnitsRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.UnitsModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    fetchUnits: function () {
      var self = this
      self.Units = []
      self.$c.getData('Units/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.Units.push(self.$m.Units(item))
        })
        self.UnitsAll = self.Units
        self.$c.hideLoader()
      })
    }
  }
}
</script>
