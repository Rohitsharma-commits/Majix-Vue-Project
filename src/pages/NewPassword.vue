<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div id="particles-js"></div>
        <q-card class="login-form" v-bind:style="$q.platform.is.mobile?{'width': '80%'}:{'width':'30%'}">
          <!-- <q-img src="../assets/images/pharmacy.jpg"></q-img> -->
          <q-card-section>
            <!-- <q-avatar size="74px" class="absolute" style="top: 0;right: 25px;transform: translateY(-50%);">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar> -->
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Forgot Password
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                dense
                v-model="Register.password"
                label="New Password *"
                type="password"
                lazy-rules
              />
                <!-- <q-btn label="Submit" @click="Forgotpassword()"  type="button" color="primary"/>&nbsp; -->
                 <q-btn label="Submit" @click="UpdatePassword()"  type="button" color="primary"/>&nbsp;
                <q-btn label="Cancel" to="/" type="button" />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%); */
    background:honeydew;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  .login-form {
    position: absolute;
  }
</style>
<script>
// const axios = require('axios')
// eslint-disable-next-line
import Password from 'vue-password-strength-meter'
export default {
  data () {
    return {
      Register: {
        reccode: '',
        password: '',
        iud: 'I'
      },
      username: '',
      // phoneno: false,
      isPwd: true
    }
  },
  mounted () {
    var self = this
    self.Register.reccode = self.$route.params.pitem
    // self.$c.showLoader()
  },
  methods: {
    UpdatePassword () {
      var self = this
      if (self.Register.password === '') {
        return self.$c.showError('Please Enter password')
      }
      if (self.Register.password !== '') {
        if (self.Register.password.length < 8) {
          return self.$c.showError('Password must Contain minimum 8 Character')
        }
      }
      self.$c.showLoader()
      self.$c.getData('Administrators/UpdateNewPassword/' + self.Register.reccode + '/P/' + self.Register.password, function (success, response, data) {
      //   self.$c.postData('Administrators/', JSON.stringify(self.Register), function (success, response, error) {
        if (response.data === 'Successfull') {
          self.$c.showSuccess('Password Updated successfully')
          self.$router.push({ name: 'frontpage' })
          self.$c.hideLoader()
        }
      })
    }
  }
}
</script>

<style>

</style>
