import LoginPage from '@/features/Auth/Login/pages';
import HomePage from '@/features/App/home/page';
import NotFoundPage from '@/features/Notfound';
import RegisterPage from '@/features/Auth/Register';
import ProductCategoryPage from '@/features/App/product/page/Category';
import ProductPage from '@/features/App/product/page';

// định nghĩa router
export const routerPage = {
    // public....

    // private....
    home: '/',
    customer: '/customer',

    // product
    productCategory: '/product/category',
    product: '/product',
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
