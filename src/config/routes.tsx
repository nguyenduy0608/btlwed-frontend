import LoginPage from '@/features/Auth/Login/pages';
import HomePage from '@/features/App/home/page';
import NotFoundPage from '@/features/Notfound';
import RegisterPage from '@/features/Auth/Register';
import ProductCategoryPage from '@/features/App/product/page/Category';
import ProductPage from '@/features/App/product/page';
import VoucherPage from '@/features/App/voucher/page';
import VoucherFormPage from '@/features/App/voucher/page/form';
import CustomerPage from '@/features/App/customer/pages';
import ProductDetailPage from '@/features/App/product/page/Detail';
import AccountPage from '@/features/App/account/page';
import AccountFormPage from '@/features/App/account/page/form';
import NotificationPage from '@/features/App/notification/page';
import OrderPage from '@/features/App/order/page';
import OrderDetailPage from '@/features/App/order/page/Detail';

// định nghĩa router
export const routerPage = {
    // public....

    // private....
    home: '/',

    // product
    productCategory: '/product/category',
    product: '/product',
    productDetail: '/product/:id',

    // voucher
    voucher: '/voucher',
    voucherForm: '/voucher/form',
    voucherFormEdit: '/voucher/form/:id',

    // customer
    customer: '/customer',

    //order
    order: '/order',
    orderDetail: '/order/:id',

    // notification
    notification: '/notification',

    // account
    account: '/account',

    // auth....
    login: '/auth/login',
    register: '/auth/register',
};

// public chứa những router không cần đăng nhập hoặc web view
const PublicRoutes = [{ path: '*', element: <NotFoundPage /> }];

// private router khi đã đăng nhập
const PrivateRoutes = [
    {
        path: routerPage.home,
        element: <HomePage />,
    },
    {
        path: routerPage.productCategory,
        element: <ProductCategoryPage />,
    },
    {
        path: routerPage.product,
        element: <ProductPage />,
    },
    {
        path: routerPage.productDetail,
        element: <ProductDetailPage />,
    },
    // customer

    {
        path: routerPage.customer,
        element: <CustomerPage />,
    },

    // voucher
    {
        path: routerPage.voucher,
        element: <VoucherPage />,
    },

    {
        path: routerPage.voucherForm,
        element: <VoucherFormPage />,
    },
    {
        path: routerPage.voucherFormEdit,
        element: <VoucherFormPage />,
    },
    {
        path: routerPage.order,
        element: <OrderPage />,
    },
    {
        path: routerPage.orderDetail,
        element: <OrderDetailPage />,
    },
    {
        path: routerPage.notification,
        element: <NotificationPage />,
    },

    {
        path: routerPage.account,
        element: <AccountPage />,
    },

    ...PublicRoutes,
];

// auth router khi chưa đăng nhập
const AuthRoutes = [
    {
        path: routerPage.login,
        element: <LoginPage />,
    },
    {
        path: routerPage.register,
        element: <RegisterPage />,
    },
    ...PublicRoutes,
];

export { PrivateRoutes, AuthRoutes };
