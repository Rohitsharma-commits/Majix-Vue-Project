<template>
  <div>
    <q-breadcrumbs
      style="padding:10px"
      separator="/"
      active-color="amber-10"
      color="light">
      <q-breadcrumbs-el label="Dashboard" to="/menu/dashboard" />
      <q-breadcrumbs-el label="Edit Profile" to="/menu/editprofile" />
    </q-breadcrumbs>
    <div class="q-pa-xs">
    <q-card style="max-width: 40%">
      <q-card-section>
        Edit Profile
    </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="frame">
          <q-input v-model="Register.name" label="Name *" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            dns
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.companyname"  label="Company Name *" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            featured_play_list
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.mobileno"  label="Mobile No *" type="number">
          <template v-slot:prepend>
            <span class="material-icons">
            description
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.emailid"  label="Email Id*" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            email
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.password"  label="Password*" type="password">
          <template v-slot:prepend>
            <span class="material-icons">
            vpn_key
            </span>
          </template>
          </q-input>
          <br/>
        <q-input
            v-model="Register.gst"  label="GST" maxlength="15" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            description
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.addressline1"  label="Adddress Line1" style="height:70px !important;" type="textarea">
          <template v-slot:prepend>
            <span class="material-icons">
            grading
            </span>
          </template>
          </q-input>
          <br/>
           <q-input
            v-model="Register.addressline2"  label="Adddress Line2" style="height:70px !important;" type="textarea">
          <template v-slot:prepend>
            <span class="material-icons">
            grading
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.country"  label="Country" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            person_pin_circle
            </span>
          </template>
          </q-input>
          <br/>
        <q-input
            v-model="Register.state"  label="State" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            person_pin_circle
            </span>
          </template>
          </q-input>
          <br/>
        <q-input
            v-model="Register.city"  label="City" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            person_pin_circle
            </span>
          </template>
          </q-input>
          <br/>
          <q-input
            v-model="Register.pincode"  label="pincode" type="text">
          <template v-slot:prepend>
            <span class="material-icons">
            person_pin_circle
            </span>
          </template>
          </q-input>
          <br/>
          <br/>
          <q-btn class="full-width" outline color="red" @click.native="EditProfile()">Edit Profile</q-btn>
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
export default {
  data () {
    return {
      Register: {
        reccode: '',
        name: '',
        companyname: '',
        mobileno: null,
        emailid: '',
        password: '',
        gst: '',
        addressline1: '',
        addressline2: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        iud: 'I'
      },
      isPwd: true
    }
  },
  mounted () {
    var self = this
    self.$c.getData('Administrators/EditProfile/' + self.$c.getLocalStorage('reccode'), function (success, response, data) {
      self.Register = data[0]
    })
  },
  methods: {
    EditProfile () {
      var self = this
      if (self.Register.name === '') {
        return self.$c.showError('Please Enter Name')
      }
      if (self.Register.gst === '') {
        return self.$c.showError('Please Enter GST No')
      }
      if (self.Register.companyname === '') {
        return self.$c.showError('Please Enter Company Name')
      }
      if (self.Register.mobileno === null) {
        return self.$c.showError('Please Enter mobileNo')
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
      self.$c.postData('Administrators/', JSON.stringify(self.Register), function (success, response, error) {
        if (response.data === 'Successfull') {
          self.$c.showSuccess('Record Updated successfully')
          self.$c.hideLoader()
        }
      })
    }
  }
}
</script>

<style>

</style>
