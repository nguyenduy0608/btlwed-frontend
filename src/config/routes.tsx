import LoginPage from '@/features/Auth/Login/pages';
import HomePage from '@/features/App/home/page';
import CustomerPage from '@/features/App/customer/pages';
import NotFoundPage from '@/features/Notfound';
import RegisterPage from '@/features/Auth/Register';

// định nghĩa router
export const routerPage = {
    // public....

    // private....
    home: '/',
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
        path: routerPage.customer,
        element: <CustomerPage />,
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
