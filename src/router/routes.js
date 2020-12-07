
const routes = [
  {
    path: '/',
    name: 'frontpage',
    component: () => import('pages/FrontPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('pages/About.vue')
  },
  {
    path: '/updates',
    name: 'updates',
    component: () => import('pages/Updates.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('pages/Contact.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('pages/Registration.vue')
  },
  {
    path: '/amazecalculator',
    name: 'amazecalculator',
    component: () => import('pages/AmazeCalculator.vue')
  },
  { path: '/forgotpassword', name: 'forgotpassword', component: () => import('pages/ForgotPassword.vue') },
  { path: '/newpassword/:pitem', name: 'newpassword', component: () => import('pages/NewPassword.vue') },
  {
    path: '/menu',
    component: () => import('pages/Menu.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'contactus', name: 'contactus', component: () => import('pages/ContactUs.vue') },
      { path: 'units', name: 'units', component: () => import('pages/Masters/Units.vue') },
      { path: 'mastersdashboard', name: 'mastersdashboard', component: () => import('pages/MastersDashboard.vue') },
      { path: 'editprofile', name: 'editprofile', component: () => import('pages/EditProfile.vue') },
      { path: 'products/:pitem', name: 'products', component: () => import('pages/Products.vue') },
      { path: 'tasks/:pitem', name: 'tasks', component: () => import('pages/Tasks.vue') },
      { path: 'orders/:pitem', name: 'orders', component: () => import('pages/Orders.vue') },
      { path: 'customers/:pstatus', name: 'customers', component: () => import('pages/Masters/Customers.vue') },
      { path: 'team/:pitem', name: 'team', component: () => import('pages/Masters/Team.vue') },
      { path: 'sector/:pitem', name: 'sector', component: () => import('pages/Masters/Sector.vue') },
      { path: 'salesrepresentative/:pitem', name: 'salesrepresentative', component: () => import('pages/Masters/SalesRepresentative.vue') },
      { path: 'productgroup/:pitem', name: 'productgroup', component: () => import('pages/Masters/ProductGroup.vue') },
      { path: 'customer/:pitem', name: 'customer', component: () => import('pages/Form/Customer.vue') },
      { path: 'product-form/:pitem', name: 'product-form', component: () => import('pages/Form/Product.vue') },
      { path: 'task-form/:pitem', name: 'task-form', component: () => import('pages/Form/Task.vue') },
      { path: 'salerepresentative-form/:pitem', name: 'salerepresentative-form', component: () => import('pages/Form/SaleRepresentative.vue') },
      { path: 'Order-form/:pitem', name: 'Order-form', component: () => import('pages/Form/Order.vue') },
      { path: 'financialreports', name: 'financialreports', component: () => import('pages/FinancialReports.vue') },
      { path: 'productreports', name: 'productreports', component: () => import('pages/ProductReports.vue') },
      { path: 'customerreports', name: 'customerreports', component: () => import('pages/CustomerReports.vue') }
    ]
  }
]
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
