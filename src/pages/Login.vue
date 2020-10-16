<template>
<div>
  <!-- .site-wrap -->
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div id="particles-js"></div>
        <q-card class="login-form" v-bind:style="$q.platform.is.mobile?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Log in to Dashboard
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="mobileEmail"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />
              <div>
                <q-btn label="Login" @click="loginClick()" type="button" color="primary"/>&nbsp;&nbsp;&nbsp;
                <router-link to="/registration" >Register Now!</router-link>&nbsp;&nbsp;&nbsp;
                <router-link to="/forgotpassword" >Forgot Password!</router-link>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
  </div>
</template>
<style scoped>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);color: white;
    /* background:honeydew; */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .login-form {
    position: absolute;
  }
</style>
<script>
export default {
  data () {
    return {
      mobileEmail: '',
      password: ''
    }
  },
  methods: {
    loginClick () {
      var self = this
      var m = this.mobileEmail
      var p = this.password
      // axios.get(self.$c.baseURL + 'Cutomers/' + m + '/P/' + p)
      //   .then(function (response) {
      //     // handle success
      //     console.log(response)
      //   })
      self.$c.getData('Administrators/loginA/' + m + '/P/' + p, function (success, response, data) {
        if (success) {
          if (data.length === 1) {
            localStorage.setItem('reccode', data[0].reccode)
            self.$c.setLogin(data[0].reccode, data[0].name, data[0].companyname, data[0].mobileno, data[0].emailid, data[0].addressline1, data[0].addressline2, data[0].city)
            self.$router.push({ name: 'dashboard' })
          } else {
            self.$c.showError('Invalid Username / Password!')
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
