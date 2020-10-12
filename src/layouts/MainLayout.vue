<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal style="background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%;">
      <q-toolbar>
        <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm"/>
        <q-toolbar-title>Hawk</q-toolbar-title>
        <a style="font-size: 25px;" class="float-right q-mr-sm"
           target="_blank" title="Donate"><i class="fas fa-heart" style="color: #eb5daa"></i></a>
        <q-btn flat round dense icon="search" class="q-mr-xs"/>
        <q-btn flat round dense icon="fas fa-sign-out-alt" to="/"/>
      </q-toolbar>
    </q-header>
    <q-drawer class="left-navigation text-white"
      show-if-above v-model="left"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated>
      <div style="height: calc(100% - 117px);padding:10px">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>

          <q-toolbar-title>Mayank Patel</q-toolbar-title>
        </q-toolbar>
        <hr/>
        <q-scroll-area style="height:100%;">
          <q-list padding>
            <q-item active-class="tab-active" to="/layouts/dashboard" exact class="q-ma-sm navigation-item" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="dashboard"/>
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
        <q-expansion-item
        expand-separator
        class="q-ma-sm navigation-item"
        icon="money"
        label="Masters"
        caption="Manage Master Data">
          <q-item active-class="tab-active" to="/Masters/customers" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Customers
            </q-item-section>
          </q-item>
          <q-item active-class="tab-active" to="/Masters/customers" class="q-ma-sm navigation-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>
            <q-item-section>
              Customers
            </q-item-section>
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
      left: false
    }
  }
}
</script>
<style>
  .q-drawer {
    /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
    background-image: url('../assets/images/lake.jpg') !important;
    background-size: cover !important;
  }

  .q-drawer__content {
    background-color: rgba(1, 1, 1, 0.75);
  }

  .navigation-item {
    border-radius: 5px;
  }

  .tab-active {
    background-color: green;
  }

  body {
    background: #f1f1f1 !important;
  }
</style>
