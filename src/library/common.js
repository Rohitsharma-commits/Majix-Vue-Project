import axios from 'axios'
import { Notify, Loading } from 'quasar'
// import qs from 'querystring'
export default {
  router: null,
  aInstance: axios.create(
    {
      baseURL: 'http://localhost:8081/'
      // rohit-server
      // baseURL: 'http://18.221.58.133:8080/HAWK/'
      // majix-server
      // baseURL: 'http://52.10.153.223:8080/HAWK/'
    }
  ),
  appPrefix: 'c', // for unique local storage names
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  },
  resetLogin () {
    this.setLocalStorage('reccode', null)
    this.setLocalStorage('name', '')
    this.setLocalStorage('companyname', '')
    this.setLocalStorage('mobileno', null)
    this.setLocalStorage('emailid', '')
    this.setLocalStorage('addressline1', '')
    this.setLocalStorage('addressline2', '')
    this.setLocalStorage('city', '')
  },
  setLogin (reccode, name, companyname, mobileno, emailid, addressline1, addressline2, city) {
    // alert(DesignationCode)
    this.setLocalStorage('reccode', reccode)
    this.setLocalStorage('name', name)
    this.setLocalStorage('companyname', companyname)
    this.setLocalStorage('mobileno', mobileno)
    this.setLocalStorage('emailid', emailid)
    this.setLocalStorage('addressline1', addressline1)
    this.setLocalStorage('addressline2', addressline2)
    this.setLocalStorage('city', city)
  },
  getLocalStorage (name) {
    return sessionStorage.getItem(this.appPrefix + name)
  },
  setLocalStorage (name, value) {
    sessionStorage.setItem(this.appPrefix + name, value)
  },
  showLoader () {
    Loading.show({
      delay: 200 // ms
    })
  },
  hideLoader () {
    Loading.hide()
  },
  showError (message) {
    this.showNotification(message, 'negative', 3000, 'bottom-right')
  },
  showSuccess (message) {
    this.showNotification(message, 'positive', 3000, 'bottom-right')
  },
  showNotification (message, type, timeout, position) {
    Notify.create({
      message: message,
      color: type,
      classes: 'my-notif-class',
      timeout: timeout,
      position: position
    })
  },
  getDataRaw (url, callback) {
    axios.get(url)
      .then(function (response) {
        // eslint-disable-next-line
        callback(true, response, response.data)
      })
  },
  formatDateDDMMYYYY (date) {
    var today = new Date(date)
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    today = dd + '-' + mm + '-' + yyyy
    return today
  },
  formatDateYYYYMMDD (date) {
    var today = date
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    return today
  },
  getData (url, cb) {
    var d = null
    var self = this
    // eslint-disable-next-line dot-notation
    // this.aInstance.defaults.headers.common['Pats'] = this.getLocalStorage('Pats')
    this.aInstance.get(url).then(function (response) {
      var check = Array.isArray(response.data)
      if (check) {
        d = response.data
        if (d.length === 1) {
          if (d[0].IUD === 'L') {
            self.router.push({ name: 'login' })
          }
        }
        // eslint-disable-next-line
        cb(true, response, response.data)
      } else {
        console.log('error' + response)
        // eslint-disable-next-line
        cb(false, response, response.data)
      }
    })
  },
  postData (url, jsondata, cb) {
    // eslint-disable-next-line dot-notation
    // this.aInstance.defaults.headers.common['Pats'] = this.getLocalStorage('Pats')
    var self = this
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'JWT fefege...'
    }
    var data = jsondata
    this.aInstance.post(url, data, { headers: headers }).then(function (response) {
      var s = response.data
      if (s.Success !== undefined) {
        // eslint-disable-next-line
        cb(s.Success, response, null)
      } else {
        if (s.length === 1) {
          if (s[0].IUD === 'L') {
            self.router.push({ name: 'login' })
          }
        }
        // eslint-disable-next-line
        cb(false, response, new Error('HTTP path ' + url + ' not found...'))
      }
    }).catch(function (error) {
      console.log(error)
      // eslint-disable-next-line
      cb(false, null, new Error(error))
    })
  },
  deleteData (url, cb) {
    var d = null
    var self = this
    // eslint-disable-next-line dot-notation
    // this.aInstance.defaults.headers.common['Pats'] = this.getLocalStorage('Pats')
    this.aInstance.delete(url).then(function (response) {
      var check = Array.isArray(response.data)
      if (check) {
        d = response.data
        if (d.length === 1) {
          if (d[0].IUD === 'L') {
            self.router.push({ name: 'login' })
          }
        }
        // eslint-disable-next-line
        cb(true, response, response.data)
      } else {
        console.log('error' + response)
        // eslint-disable-next-line
        cb(false, response, response.data)
      }
    })
  },
  postImage (url, data, config, callback) {
    axios.post(this.aInstance.baseURL + url, data, config)
      .then(
        function (response) {
          // eslint-disable-next-line
          callback(true, response, null)
        }
      )
      .catch(function (error) {
        console.log(error)
        // eslint-disable-next-line
        callback(false, null, new Error(error))
      })
  },
  UUID () {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now() // use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }
}
