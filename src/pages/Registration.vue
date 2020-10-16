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
                Registration
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <!-- <q-input
                filled
                dense
                v-model="Register.name"
                label="Name *"
                lazy-rules
              /> -->
              <q-input
                filled
                v-model="Register.companyname"
                label="Company Name *"
                lazy-rules
              />
              <q-input
                filled
                type="number"
                v-model="Register.mobileno"
                label="Mobile No *"
                lazy-rules
              />
              <q-input
                filled
                v-model="Register.emailid"
                label="Email Id *"
                lazy-rules
              />
              <!-- <q-input v-model="Register.password" dense filled :type="isPwd ? 'password' : 'text'" label="Password *">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input> -->
              <br/>
              <password
                outlined
                dense
                style="padding-left:15px;"
                placeholder="Password *"
                size="50"
                v-model="Register.password"
                secureLength = 8
                :toggle="true"
              />
              <div>
                <q-btn label="Register" @click="RegisterNow()" type="button" color="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <q-btn label="Cancel" to="/" type="button" />
              </div>
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
  .Password__field {
    padding: -20px;
}
</style>
<script>
// const axios = require('axios')
// eslint-disable-next-line
import Password from 'vue-password-strength-meter'
export default {
  components: { Password },
  data () {
    return {
      Register: {
        reccode: this.$c.UUID(),
        name: '',
        companyname: '',
        mobileno: null,
        emailid: '',
        password: '',
        iud: 'I'
      },
      isPwd: true
    }
  },
  methods: {
    RegisterNow () {
      var self = this
      // if (self.Register.name === '') {
      //   return self.$c.showError('Please Enter Name')
      // }
      if (self.Register.companyname === '') {
        return self.$c.showError('Please Enter Company Name')
      }
      if (self.Register.mobileno === null) {
        return self.$c.showError('Please Enter mobileNo')
      }
      if (self.Register.mobileno !== null) {
        if (self.Register.mobileno.length < 10) {
          return self.$c.showError('MobileNo must be 10 digit')
        }
      }
      if (self.Register.emailid === '') {
        return self.$c.showError('Please Enter Email Id')
      }
      if (self.Register.password === '') {
        return self.$c.showError('Please Enter password')
      }
      if (self.Register.password !== '') {
        if (self.Register.password.length < 8) {
          return self.$c.showError('Password must Contain minimum 8 Character')
        }
      }
      if (self.Register.emailid !== '') {
        // eslint-disable-next-line
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(self.Register.emailid) === false) {
          return self.$c.showError('Please Enter Correct Email Address')
        }
      }
      self.$c.getData('Administrators/companyname/' + self.Register.companyname, function (success, response, data) {
        if (data.length === 0) {
          self.$c.getData('Administrators/emailid/' + self.Register.emailid, function (success, response, data) {
            if (data.length === 0) {
              self.$c.getData('Administrators/mobileno/' + self.Register.mobileno, function (success, response, data) {
                if (data.length === 0) {
                  self.$c.postData('Administrators/', JSON.stringify(self.Register), function (success, response, error) {
                    if (response.data === 'Successfull') {
                      self.$router.push({ name: 'login' })
                      self.$c.showSuccess('Registered successfully')
                      self.$c.hideLoader()
                    }
                  })
                } else {
                  self.$c.showError('Mobile Number already Registered')
                  self.Register.mobileno = ''
                }
              })
            } else {
              self.$c.showError('Email id already Registered')
              self.Register.emailid = ''
            }
          })
        } else {
          self.$c.showError('Company Name Already Registered')
          self.Register.companyname = ''
        }
      })
    }
  }
}
</script>
