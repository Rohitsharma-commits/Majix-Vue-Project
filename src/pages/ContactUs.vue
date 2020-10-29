<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="amber-10"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Contact Us" to="/menu/contactus" />
    </q-breadcrumbs>
    <div class="q-pa-xs">
    <q-card>
      <q-card-section>
        Contact Us
    </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="frame">
          <q-input v-model="Name" label=" Full Name" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            dns
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="MobileNo"  icon="mobileno" label="MobileNo" type="number">
          <template v-slot:prepend>
            <span class="material-icons">
            call
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Issue"  icon="problem" label="Issue" type="textarea">
          <template v-slot:prepend>
            <span class="material-icons">
            description
            </span>
          </template>
          </q-input>
          <br/>
          <br/>
          <q-btn class="full-width" color="primary" @click.native="SendMail()">Send</q-btn>
          <br/>
          <br/>
          <br/>
        </div>
      </q-card-section>
    </q-card>
  </div>
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  data () {
    return {
      Name: '',
      MobileNo: '',
      Issue: ''
    }
  },
  created () {
  },
  methods: {
    SendMail: function () {
      var self = this
      self.$c.showLoader()
      self.$c.getData('Administrators/sendemail/' + self.Name + '/MobileNo/' + self.MobileNo + '/issue/' + self.Issue, function (success, response, data) {
        console.log(data)
        if (data === true || data === 'true') {
          self.$c.showSuccess('Request Send successfully')
          self.Name = ''
          self.MobileNo = ''
          self.Issue = ''
          self.$c.hideLoader()
        }
      })
    }
  }
}
</script>
