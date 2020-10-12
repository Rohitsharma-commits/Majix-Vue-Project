<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="cyan"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Product Group" to="/menu/ProductGroup" />
    </q-breadcrumbs>
    <q-table
      :data="ProductGroup"
      :columns="ColumnProductGroup"
      :pagination.sync="pcProductGroup"
      :filter="Filter"
      :hide-bottom="ProductGroup.length === 0"
      row-key="RecCode"
      color="secondary">
      <template slot="top-left" slot-scope="props">
        <q-input v-model="Filter" debounce="500" placeholder="Search"><template v-slot:append><q-icon name="search"  @click.native="testProps(props)" /></template></q-input>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn size="sm"  color="cyan" label="+ New" @click.native="addEditDeleteSectorProductGroup(props.row, false)" class="q-mr-sm">
        <q-tooltip>
            Create ProductGroup
          </q-tooltip>
          </q-btn>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClickBrands(props.row)" class="cursor-pointer">
        <q-td key="reccode" :props="props">
          <q-btn size="sm" round dense color="cyan" icon="edit" @click.native="addEditDeleteSectorProductGroup(props.row, false)" class="q-mr-sm">
          <q-tooltip>
            Edit
          </q-tooltip>
          </q-btn>
          <q-btn size="sm" round dense color="cyan" icon="remove" @click.native="addEditDeleteSectorProductGroup(props.row, true)" class="q-mr-sm">
          <q-tooltip>
            Delete
          </q-tooltip>
          </q-btn>
        </q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="manufacturingunit" :props="props">{{ props.row.manufacturingunit }}</q-td>
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
    <q-dialog v-model="ProductGroupModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width:50vw">
        <q-bar class="bg-cyan text-white">
          <div>Add New Product Groups</div>
          <q-space />
          <q-btn dense flat icon="close" @click="ProductGroupModal = !ProductGroupModal">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input outlined dense v-model="ProductGroupRecord.name" label="Name." type="text">
          </q-input>
          <br/>
          <div style="font-size:12px;text-align: justify;">
            <li>Product Groups for your customers can be how you segregate them, this helps in analysing your data. Some examples of product groups can be shirts, pants, cotton or polyester.
          </li>
          </div>
        <br/>
        <q-input outlined dense v-model="ProductGroupRecord.manufacturingunit" label="Manufacturing Unit." type="text">
          </q-input>
          <br/>
          <div style="text-align:right">
            <q-btn color="pink-4" flat label="Save" @click.native="saveProductGroup()"/>
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
            <q-btn flat color="primary" label="Delete" @click="deleteProductGroup()" />
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
      ProductGroupModal: false,
      ProductGroupRecord: [],
      Filter: '',
      Designationssearch: '',
      ProductGroup: [],
      ProductGroupAll: [],

      deleteDialog: false,

      ColumnProductGroup: [
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
        },
        {
          name: 'manufacturingunit',
          required: true,
          label: 'Manufacturing Unit',
          align: 'left',
          field: 'manufacturingunit',
          sortable: true
        }
      ],
      pcProductGroup: { rowsPerPage: 10, page: 1 }
    }
  },
  watch: {
    'paginationControl.page' (page) {
    }
  },
  created () {
    this.fetchProductGroup()
    this.$c.showLoader()
    // this.checkclickfromMenu = this.$route.params.pitem
    if (this.$route.params.pitem === 1) {
      this.ProductGroupRecord = this.$m.ProductGroup()
      this.ProductGroupModal = true
    }
  },
  methods: {
    testProps: function (p) {
    },
    rowClickBrands: function (row) {
      var self = this
      self.ProductGroupRecord = row
    },
    addEditDeleteSectorProductGroup: function (row, deleteRecord) {
      if (row === undefined) {
        this.ProductGroupRecord = this.$m.ProductGroup()
        this.ProductGroupModal = true
      } else {
        this.ProductGroupRecord = row
        if (deleteRecord) {
          this.deleteDialog = true
        } else {
          this.ProductGroupModal = true
        }
      }
    },
    saveProductGroup: function () {
      if (this.ProductGroupRecord.iud === 'S' | this.ProductGroupRecord.iud === undefined) {
        this.ProductGroupRecord.iud = 'U'
      }
      this.postProductGroup()
    },
    deleteProductGroup: function () {
      this.ProductGroupRecord.iud = 'D'
      this.postProductGroup()
      this.deleteDialog = false
    },
    postProductGroup: function () {
      var self = this
      if (self.ProductGroupRecord.iud === 'I') {
        var count1 = 0
        for (var a = 0; a < self.ProductGroup.length; a++) {
          if (self.ProductGroup[a].name.toLowerCase() === self.ProductGroupRecord.name.toLowerCase()) {
            count1 = count1 + 1
            break
          }
        }
        if (count1 === 1) {
          return self.$c.showError('Product Group Already present')
        }
      }
      console.log(self.ProductGroupRecord.iud)
      if (!self.ProductGroupRecord.name) {
        self.$c.showError('Enter Name')
      } else {
        self.$c.showLoader()
        if (self.ProductGroupRecord.iud === 'I' || self.ProductGroupRecord.iud === 'U') {
          self.$c.postData('ProductGroup/', JSON.stringify(self.ProductGroupRecord), function (success, response, error) {
            if (response.data === 'Successfull') {
              if (self.ProductGroupRecord.iud === 'I') {
                self.ProductGroupAll.push(self.ProductGroupRecord)
              }
              self.$c.showSuccess('Record(s) saved successfully')
              self.fetchProductGroup()
              self.ProductGroupModal = false
              self.$c.hideLoader()
            }
          })
        } else {
          self.$c.deleteData('ProductGroup/' + self.ProductGroupRecord.reccode, function (success, response, data) {
            console.log(response.data)
            if (response.data === 'Successfull') {
              self.ProductGroupAll.splice(self.ProductGroupAll.indexOf(self.ProductGroupRecord), 1)
              self.$c.showSuccess('Record(s) Deleted successfully')
              self.ProductGroupModal = false
              self.$c.hideLoader()
            }
          })
        }
      }
    },
    fetchProductGroup: function () {
      var self = this
      self.ProductGroup = []
      self.$c.getData('ProductGroup/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.ProductGroup.push(self.$m.ProductGroup(item))
        })
        self.ProductGroupAll = self.ProductGroup
        self.$c.hideLoader()
      })
    }
  }
}
</script>
