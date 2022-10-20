import LoginPage from '@/features/Auth/Login/pages';
import HomePage from '@/features/App/home/page';
import NotFoundPage from '@/features/Notfound';
import RegisterPage from '@/features/Auth/Register';
import ProductCategoryPage from '@/features/App/product/page/Category';
import ProductPage from '@/features/App/product/page';
import VoucherPage from '@/features/App/voucher/page';
import VoucherFormPage from '@/features/App/voucher/page/form';
import CustomerPage from '@/features/App/customer/pages';

// định nghĩa router
export const routerPage = {
    // public....

    // private....
    home: '/',

    // product
    productCategory: '/product/category',
    product: '/product',

    // voucher
    voucher: '/voucher',
    voucherForm: '/voucher/form',

    // customer
    customer: '/customer',

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
