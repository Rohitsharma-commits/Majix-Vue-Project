<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Team" to="/menu/Team" />
    </q-breadcrumbs>
    <q-table
      :data="Team"
      :columns="CokumnTeams"
      :pagination.sync="pcTeams"
      :filter="Filter"
      :hide-bottom="Team.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm"  color="cyan" label="+ New" @click.native="addEditDeleteTeam(props.row, false)" class="q-mr-sm">
        <q-tooltip>
          Create Team
        </q-tooltip>
        </q-btn>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="addEditDeleteTeam(props.row, false)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.stop="addEditDeleteTeam(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="remove" @click.stop="addEditDeleteTeam(props.row, true)" class="q-mr-sm">
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
    <q-dialog v-model="TeamModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:50vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Team</div>
          <q-space />
          <q-btn dense flat icon="close" @click="TeamModal = !TeamModal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input outlined dense v-model="TeamsRecord.name" label="Name." type="text">
          </q-input>
          <br/>
          <div style="font-size:12px;">
            <li>
            Teams for your sales representatives can be how you segregate them, this helps in analysing your data. They can be HQ or brand office or as per the customers they attend to.
          </li>
          </div>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" @click.native="saveTeams()"/>
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
      TeamModal: false,
      TeamsRecord: '',
      Filter: '',
      Designationssearch: '',
      Team: [],
      TeamAll: [],

      deleteDialog: false,

      CokumnTeams: [
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
    this.fetchTeams()
    this.$c.showLoader()
    if (this.$route.params.pitem === 1) {
      this.TeamsRecord = this.$m.Team()
      this.TeamModal = true
    }
  },
  methods: {
    testProps: function (p) {
    },
    rowClickBrands: function (row) {
      var self = this
      self.TeamsRecord = row
    },
    addEditDeleteTeam: function (row, deleteRecord) {
      if (row === undefined) {
        this.TeamsRecord = this.$m.Team()
        this.TeamModal = true
      } else {
        this.TeamsRecord = row
        if (deleteRecord) {
          this.deleteDialog = true
        } else {
          this.TeamModal = true
        }
      }
    },
    saveTeams: function () {
      var self = this
      if (self.TeamsRecord.iud === 'U' || self.TeamsRecord.iud === undefined) {
        self.TeamsRecord.iud = 'U'
      }
      self.postTeams()
    },
    deleteBrands: function () {
      this.TeamsRecord.iud = 'D'
      this.postTeams()
      this.deleteDialog = false
    },
    postTeams: function () {
      var self = this
      if (self.TeamsRecord.iud === 'I') {
        var count1 = 0
        for (var a = 0; a < self.Team.length; a++) {
          if (self.Team[a].name.toLowerCase() === self.TeamsRecord.name.toLowerCase()) {
            count1 = count1 + 1
            break
          }
        }
        if (count1 === 1) {
          return self.$c.showError('Team Already present')
        }
      }
      if (!self.TeamsRecord.name) {
        self.$c.showError('Enter Name')
      } else {
        self.$c.showLoader()
        if (self.TeamsRecord.iud === 'I' || self.TeamsRecord.iud === 'U') {
          self.$c.postData('Team/', JSON.stringify(self.TeamsRecord), function (success, response, error) {
            if (response.data === 'Successfull') {
              if (self.TeamsRecord.iud === 'I') {
                self.TeamAll.push(self.TeamsRecord)
              }
              self.$c.showSuccess('Record(s) saved successfully')
              self.fetchTeams()
              self.TeamModal = false
              self.$c.hideLoader()
            }
          })
        } else {
          self.$c.deleteData('Team/' + self.TeamsRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              self.TeamAll.splice(self.TeamAll.indexOf(self.TeamsRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.TeamModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    fetchTeams: function () {
      var self = this
      self.Team = []
      self.$c.getData('Team/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.Team.push(self.$m.Team(item))
        })
        self.TeamAll = self.Team
        self.$c.hideLoader()
      })
    }
  }
}
</script>
