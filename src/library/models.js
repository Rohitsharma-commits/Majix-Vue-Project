import c from './common.js'
export default {
  Customer (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        companyname: '',
        sectorid: '',
        customername: '',
        customerphoneno: null,
        customeremailid: '',
        password: '',
        gst: '',
        addressline1: '',
        addressline2: '',
        country: '',
        states: '',
        city: '',
        zipcode: '',
        shippingaddressline1: '',
        shippingaddressline2: '',
        shippingaddresscountry: '',
        shippingaddressstates: '',
        shippingaddresscity: '',
        shippingaddresszipcode: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: '1',
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        companyname: data.companyname,
        sectorid: data.sectorid,
        sector: data.sector,
        customername: data.customername,
        customerphoneno: data.customerphoneno,
        customeremailid: data.customeremailid,
        password: data.password,
        gst: data.gst,
        addressline1: data.addressline1,
        addressline2: data.addressline2,
        country: data.country,
        states: data.states,
        city: data.city,
        zipcode: data.zipcode,
        shippingaddressline1: data.shippingaddressline1,
        shippingaddressline2: data.shippingaddressline2,
        shippingaddresscountry: data.shippingaddresscountry,
        shippingaddressstates: data.shippingaddressstates,
        shippingaddresscity: data.shippingaddresscity,
        shippingaddresszipcode: data.shippingaddresszipcode,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Team (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        name: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        name: data.name,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Units (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        name: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        name: data.name,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Sector (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        name: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        name: data.name,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  ProductGroup (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        name: '',
        manufacturingunit: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        name: data.name,
        manufacturingunit: data.manufacturingunit,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  SalesRepresentatives (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        name: '',
        phonenumber: '',
        email: '',
        addressline1: '',
        addressline2: '',
        country: '',
        states: '',
        city: '',
        zipcode: '',
        teamid: null,
        sectorid: null,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        name: data.name,
        phonenumber: data.phonenumber,
        email: data.email,
        addressline1: data.addressline1,
        addressline2: data.addressline2,
        country: data.country,
        states: data.states,
        city: data.city,
        zipcode: data.zipcode,
        teamid: data.teamid,
        sectorid: data.sectorid,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Product (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        groupcode: '',
        productname: '',
        productcode: null,
        costprice: 0,
        saleprice: 0,
        description: '',
        productGroupName: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: '1',
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        groupcode: data.groupcode,
        productname: data.productname,
        productcode: data.productcode,
        costprice: data.costprice,
        saleprice: data.saleprice,
        description: data.description,
        productGroupName: data.productGroupName,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Shade (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        productcode: '',
        name: '',
        shadecode: null,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        productcode: data.productcode,
        name: data.name,
        shadecode: data.shadecode,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Tasks (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        taskNo: 0,
        salescode: '',
        customercode: '',
        tasktype: '',
        taskdate: null,
        remarks: '',
        donedate: null,
        status: 'Pending',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        taskNo: data.taskNo,
        salescode: data.salescode,
        customercode: data.customercode,
        tasktype: data.tasktype,
        taskdate: data.taskdate,
        remarks: data.remarks,
        donedate: data.donedate,
        status: data.status,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  Orders (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        orderNo: 0,
        followup: 'No',
        salesrepresentativecode: '',
        customercode: '',
        samplingdate: null,
        dispatchdate: null,
        addressline1: '',
        addressline2: '',
        country: '',
        states: '',
        city: '',
        zipcode: '',
        status: 'Pending',
        courierNo: '',
        trackingNo: '',
        customers: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        orderNo: data.orderNo,
        followup: data.followup,
        salesrepresentativecode: data.salesrepresentativecode,
        customercode: data.customercode,
        samplingdate: data.samplingdate,
        taskdate: data.taskdate,
        dispatchdate: data.dispatchdate,
        addressline1: data.addressline1,
        addressline2: data.addressline2,
        country: data.country,
        states: data.states,
        city: data.city,
        zipcode: data.zipcode,
        status: data.status,
        courierNo: data.courierNo,
        trackingNo: data.trackingNo,
        customers: data.customers,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  },
  OrderItems (data) {
    var U = {}
    if (data === undefined) {
      U = {
        reccode: c.UUID(),
        ordercode: '',
        productcode: '',
        shadecode: '',
        quantity: '',
        units: null,
        remarks: '',
        productname: '',
        shadename: '',
        unitname: '',
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: 1,
        iud: 'I'
      }
    } else {
      U = {
        reccode: data.reccode,
        ordercode: data.ordercode,
        productcode: data.productcode,
        shadecode: data.shadecode,
        quantity: data.quantity,
        units: data.units,
        remarks: data.remarks,
        productname: data.productname,
        shadename: data.shadename,
        unitname: data.unitname,
        insertuser: c.getLocalStorage('reccode'),
        updateuser: c.getLocalStorage('reccode'),
        activeflag: data.activeflag,
        iud: 'U'
      }
    }
    return U
  }
}
