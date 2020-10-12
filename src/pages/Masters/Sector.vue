<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Sector" to="/menu/Sector" />
    </q-breadcrumbs>
    <q-table
      :data="Sector"
      :columns="ColumnSector"
      :pagination.sync="pcSector"
      :filter="Filter"
      :hide-bottom="Sector.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm" color="cyan" label="+ New" @click.native="addEditDeleteSector(props.row, false)" class="q-mr-sm">
        <q-tooltip>
            Create Sector
          </q-tooltip>
          </q-btn>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClickBrands(props.row)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.native="addEditDeleteSector(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="remove" @click.native="addEditDeleteSector(props.row, true)" class="q-mr-sm">
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
    <q-dialog v-model="SectorModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:50vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Sector</div>
          <q-space />
          <q-btn dense flat icon="close" @click="SectorModal = !SectorModal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input outlined dense v-model="SectorRecord.name" label="Name." type="text">
          </q-input>
          <br/>
          <div style="font-size:12px;">
          <li>Sectors for your customers can be how you segregate them, they can be geographic or technical. This will help you run better data analytics on your sample management system. Some examples of sectors are Shirting or North or Europe
          </li>
          </div>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" @click.native="saveSector()"/>
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
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  data () {
    return {
      SectorModal: false,
      SectorRecord: [],
      Filter: '',
      Designationssearch: '',
      Sector: [],
      SectorAll: [],

      deleteDialog: false,

      ColumnSector: [
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
      pcSector: { rowsPerPage: 10, page: 1 }
    }
  },
  watch: {
    'paginationControl.page' (page) {
    }
  },
  created () {
    this.fetchSector()
    this.$c.showLoader()
    if (this.$route.params.pitem === 1) {
      this.SectorRecord = this.$m.Sector()
      this.SectorModal = true
    }
  },
  methods: {
    testProps: function (p) {
    },
    rowClickBrands: function (row) {
      var self = this
      self.SectorRecord = row
    },
    addEditDeleteSector: function (row, deleteRecord) {
      if (row === undefined) {
        this.SectorRecord = this.$m.Sector()
        this.SectorModal = true
      } else {
        this.SectorRecord = row
        if (deleteRecord) {
          this.deleteDialog = true
        } else {
          this.SectorModal = true
        }
      }
    },
    saveSector: function () {
      if (this.SectorRecord.iud === 'S' | this.SectorRecord.iud === undefined) {
        this.SectorRecord.iud = 'U'
      }
      this.postSector()
    },
    deleteBrands: function () {
      this.SectorRecord.iud = 'D'
      this.postSector()
      this.deleteDialog = false
    },
    postSector: function () {
      var self = this
      if (self.SectorRecord.iud === 'I') {
        var count1 = 0
        for (var a = 0; a < self.Sector.length; a++) {
          if (self.Sector[a].name.toLowerCase() === self.SectorRecord.name.toLowerCase()) {
            count1 = count1 + 1
            break
          }
        }
        if (count1 === 1) {
          return self.$c.showError('Sector Already present')
        }
      }
      console.log(self.SectorRecord.iud)
      if (!self.SectorRecord.name) {
        self.$c.showError('Enter Name')
      } else {
        self.$c.showLoader()
        if (self.SectorRecord.iud === 'I' || self.SectorRecord.iud === 'U') {
          self.$c.postData('Sector/', JSON.stringify(self.SectorRecord), function (success, response, error) {
            if (response.data === 'Successfull') {
              if (self.SectorRecord.iud === 'I') {
                self.SectorAll.push(self.SectorRecord)
              }
              self.$c.showSuccess('Record(s) saved successfully')
              self.fetchSector()
              self.SectorModal = false
              self.$c.hideLoader()
            }
          })
        } else {
          self.$c.deleteData('Sector/' + self.SectorRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              self.SectorAll.splice(self.SectorAll.indexOf(self.SectorRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.SectorModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    fetchSector: function () {
      var self = this
      self.Sector = []
      self.$c.getData('Sector/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.Sector.push(self.$m.Sector(item))
        })
        self.SectorAll = self.Sector
        self.$c.hideLoader()
      })
    }
  }
}
</script>
