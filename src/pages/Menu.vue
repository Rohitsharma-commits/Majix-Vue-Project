<template>
  <q-layout view="lHh LpR lFf" style="height: 300px">
    <q-header reveal style="background: #338DFF">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <!-- <div style="font-size:20px;"><b>HAWK</b></div> -->
        <!-- <div v-if="Units.length === 0" style="color:red;"><b>Please Fill All Organization Details</b></div> -->
         <q-btn flat class="q-mr-sm" :label="showName()"/>
        <q-btn  size="lg" round dense flat icon="settings" >
          <q-tooltip>
            Settings
          </q-tooltip>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item clickable to="/menu/editprofile">
                <q-item-section avatar>
                  <q-icon color="blue" name="account_circle" />
                </q-item-section>
                <q-item-section>Edit profile</q-item-section>
              </q-item>
              <q-item clickable  to="/menu/mastersdashboard">
                <q-item-section avatar>
                  <q-icon color="blue" name="send" />
                </q-item-section>
                <q-item-section>Organization</q-item-section>
              </q-item>
              <q-item clickable  to="/menu/contactus">
                <q-item-section avatar>
                  <q-icon color="blue" name="contact_support" />
                </q-item-section>
                <q-item-section>Contact Us</q-item-section>
              </q-item>
              <q-item clickable  @click.native="logoutAdmin()">
                <q-item-section avatar>
                  <q-icon color="red" name="power_settings_new" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer class="left-navigation text-white"
      show-if-above
      v-model="drawer"
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      content-style="{ backgroundColor: '#ff0000' }"
      side="left"
      :width="240"
      :height="240"
      elevated>
      <div style="height: calc(100% - 117px);padding:10px;margin-top: -10px;">
        <q-toolbar>
        <q-btn @click="miniState = true" flat round dense icon="menu" style="margin-left:-10px;" class="q-mr-sm"/>
        <q-avatar>
          <img src="../assets/HAWK.png">
        </q-avatar>
          <q-toolbar-title>HAWK</q-toolbar-title>
        </q-toolbar>
        <hr style="margin-top: -1px;"/>
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item active-class="tab-active" to="/menu/dashboard" exact class="q-ma-sm navigation-item" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="dashboard"/>
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
            <br/>
        <q-expansion-item
          expand-separator
          class="q-ma-sm navigation-item"
          icon="pending_actions"
          label="Tasks">
          <q-item active-class="tab-active" :to="{name: 'task-form', params: { pitem: 'New' }}"  class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Create New Task
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'tasks', params: { pitem: 'Pending' }}"  class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Pending Tasks
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'tasks', params: { pitem: 'Completed' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Completed Tasks
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          class="q-ma-sm navigation-item"
          icon="shopping_bag"
          label="Sample Orders">
          <q-item active-class="tab-active" :to="{name: 'Order-form', params: { pitem: 'New' }}"  class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Add Sample Order
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'orders', params: { pitem: 'Pending' }}"  class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Pending Sample Orders
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'orders', params: { pitem: 'Dispatched' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Dispatched Sample Orders
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'orders', params: { pitem: 'Rejected' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Rejected Sample Orders
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <br/>
        <q-expansion-item
          expand-separator
          class="q-ma-sm navigation-item"
          icon="perm_identity"
          label="Customers">
          <q-item active-class="tab-active" :to="{name: 'customer', params: { pitem: 'New' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
              <div style="padding-bottom: 0px;padding-top: 0px;">
              Add Customer
              </div>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'customers', params: { pstatus: 1 }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
              <div style="padding-bottom: 0px;padding-top: 0px;">
              All Customers
              </div>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          class="q-ma-sm navigation-item"
          icon="archive"
          label="Products">
          <q-item active-class="tab-active" :to="{name: 'product-form', params: { pitem: 'New' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Add Product
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'products', params: { pitem: '1' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              All Products
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'products', params: { pitem: 0 }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Discontinued Products
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          class="q-ma-sm navigation-item"
          icon="point_of_sale"
          label="Sales Representatives">
          <q-item active-class="tab-active" :to="{name: 'salerepresentative-form', params: { pitem: 'New' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Add Sales Representative
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'salesrepresentative', params: { pitem: '1' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              All Sales Representative
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" :to="{name: 'salesrepresentative', params: { pitem: '0' }}" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Discontinued Sales Representative
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <br/>
        <q-expansion-item
          expand-separator
          class="q-ma-sm navigation-item"
          icon="folder_shared"
          label="Reports">
          <q-item active-class="tab-active"  to="/menu/financialreports" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
              <div style="padding-bottom: 0px;padding-top: 0px;">
              Financial
              </div>
          </q-item>
          <q-item active-class="tab-active" to="/menu/productreports" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
              <div style="padding-bottom: 0px;padding-top: 0px;">
              Product Analysis
              <!-- Product Reports -->
              </div>
          </q-item>
          <q-item active-class="tab-active" to="/menu/customerreports" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
              <div style="padding-bottom: 0px;padding-top: 0px;">
              Production Data
              <!-- Customer Reports -->
              </div>
          </q-item>
        </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view/>
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      Units: [],
      miniState: false
    }
  },
  mounted () {
    this.fetchUnits()
  },
  methods: {
    fetchUnits: function () {
      var self = this
      self.Units = []
      self.$c.getData('Units/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
        data.forEach(function (item, index, array) {
          self.Units.push(self.$m.Units(item))
        })
        if (self.Units.length === 0) {
          self.$q.notify({
            message: 'Please Go To Settings Fill All Organization Details',
            color: 'red',
            position: 'top'
          })
        }
        self.$c.hideLoader()
      })
    },
    logoutAdmin: function () {
      this.$c.resetLogin()
      window.localStorage.clear()
      localStorage.removeItem('name')
      this.$router.push({ name: 'frontpage' })
    },
    showName: function () {
      return this.$c.getLocalStorage('companyname')
    },
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    }
  }
}
</script>
<style>
  .q-drawer {
    /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
    /* background-image: url('../assets/images/lake.jpg') !important; */
    /* background-size: cover !important; */
  }

  .q-drawer__content {
    background-color: rgba(1, 1, 1, 0.75);
    padding-bottom: -100px;
    padding-top: 0px;
  }

  .navigation-item {
    border-radius: 10px;
  }

  .tab-active {
    color: #40E0D0;
  }

  body {
    background: #f1f1f1 !important;
  }
  .setheaderbackground {
    background: #284B63 !important;
  }
  .q-item {
    min-height: 0px;
    padding: 6px 2px;
  }
</style>
