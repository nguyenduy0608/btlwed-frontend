// định nghĩa router
export const routerPage = {
    // public....

    // private....
    home: '/',
    //calendar
    calendar: '/calendar',
    employeeDetail: '/employee/:id',
    // product
    productCategory: '/product/category',
    product: '/product',
    productDetail: '/product/:id',

    // voucher
    voucher: '/voucher',
    voucherForm: '/voucher/form',
    voucherFormEdit: '/voucher/form/:id',
    departmentDetail: 'voucher/:id',
    employee: '/employee',

    //order
    contant: '/contant',
    orderDetail: '/order/:id',

    // notification
    notification: '/notification',

    // account
    account: '/account',

    // report
    wave: '/wave',

    // news
    news: '/news',
    newsForm: '/news/form',
    newsFormEdit: '/news/form/:id',

    // setting
    setting: '/setting',

    // chat
    // chat: '/chat',

    // merchandise
    merchandise_importCommodity: '/merchandise/importCommodity',
    merchandise_returnCommodity: '/merchandise/returnCommodity',
    merchandise_shipping: '/merchandise/shipping',

    // auth....
    login: '/auth/login',
    register: '/auth/register',
};
