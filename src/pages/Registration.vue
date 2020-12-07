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
                <div class="row">
                <div class="col-md-4 q-pa-xs">
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                </div>
                <div class="col-md-4 q-pa-xs">
                <q-btn label="Register" @click="RegisterNow()" type="button" color="primary"/>
                </div>
                <div class="col-md-4 q-pa-xs">
                <q-btn label="Cancel" to="/" type="button" />
                </div>
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
<script src="https://apis.google.com/js/client:platform.js?onload=renderButton" async defer></script>
<script>
// const axios = require('axios')
// eslint-disable-next-line
import GoogleLogin from 'vue-google-login'
import Password from 'vue-password-strength-meter'
import Vue from 'vue'
export default {
  components: { Password, GoogleLogin },
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
      params: {
        client_id: '725002701224-h710lni8ceqts1vjrcq0r5gtsuk3dgmm.apps.googleusercontent.com'
      },
      renderParams: {
        width: 40,
        height: 35,
        longtitle: true
      },
      isPwd: true
    }
  },
  methods: {
    onSuccess (googleUser) {
      var self = this
      self.$c.showLoader()
      var profile = googleUser.getBasicProfile();
      console.log('Email: ' + profile);
      self.$c.getData('Administrators/emailid/' + profile.getEmail(), function (success, response, data) {
      if (data.length === 0) {
        var generator = require('generate-password');
        var password = generator.generate({
          length: 8,
          numbers: true
        })
        self.Register.name = profile.getName()
        self.Register.emailid = profile.getEmail()
        self.Register.password = password
        self.$c.postData('Administrators/', JSON.stringify(self.Register), function (success, response, error) {
          if (response.data === 'Successfull') {
          self.$c.getData('Administrators/SendPasswordToCustomer/' + self.Register.emailid + '/password/' + self.Register.password, function (success, response, data) {
            console.log(data)
            if (data === true || data === 'true') {
              self.$c.showSuccess('Password Send To Your Email')
              self.$router.push({ name: 'frontpage' })
              self.$c.showSuccess('Registered successfully')
              self.$c.hideLoader()
            }
          })
          }
        })
      } else {
          self.$c.showError('Email id already Registered')
          self.$c.hideLoader()
        }
      })
    },
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
      // self.$c.showLoader()
      self.$c.getData('Administrators/companyname/' + self.Register.companyname, function (success, response, data) {
        if (data.length === 0) {
          self.$c.getData('Administrators/emailid/' + self.Register.emailid, function (success, response, data) {
            if (data.length === 0) {
              self.$c.getData('Administrators/mobileno/' + self.Register.mobileno, function (success, response, data) {
                if (data.length === 0) {
                  self.$c.postData('Administrators/', JSON.stringify(self.Register), function (success, response, error) {
                    if (response.data === 'Successfull') {
                      self.$router.push({ name: 'frontpage' })
                      self.$c.showSuccess('Registered successfully')
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
        self.$c.hideLoader()
      })
    },
    renderButton () {
      gapi.signin2.render('gSignIn', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSuccess,
          'onfailure': onFailure
      })
    },
    onFailure (googleUser) {
      console.log(googleUser)
    }
  }
}
</script>
<style scoped>
.container{padding: 20px;}
.usercontent{
  padding: 10px 20px;
  margin: auto;
  width: 350px;
  background-color: #F7F7F7;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)
}
.usercontent h3{font-size: 17px;}
.usercontent p{font-size: 15px;}
.usercontent img{max-width: 100%;margin-bottom: 5px;}
</style>
