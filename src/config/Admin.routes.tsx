import React from 'react';
import NotificationPage from '@/features/App/notification/page';
import { routerPage } from './contants.routes';
import Lazy, { PublicRoutes } from './Lazy.routes';
import EmployeePage from '@/features/App/customer/pages';

const HomePage = React.lazy(() => import('@/features/App/home/page'));
const ProductCategoryPage = React.lazy(() => import('@/features/App/product/page/Category'));
const ProductPage = React.lazy(() => import('@/features/App/product/page'));
const ProductDetailPage = React.lazy(() => import('@/features/App/product/page/Detail'));
const CustomerPage = React.lazy(() => import('@/features/App/customer/pages'));

const VoucherPage = React.lazy(() => import('@/features/App/voucher/page'));
const VoucherFormPage = React.lazy(() => import('@/features/App/voucher/page/form'));
const DepartmentPage = React.lazy(() => import('@/features/App/voucher/page'));

const OrderPage = React.lazy(() => import('@/features/App/order/page'));
const EmployeeDetail = React.lazy(() => import('@/features/App/customer/pages/EmployeeDetail'));
const DepartmentDetail = React.lazy(() => import('@/features/App/voucher/page/departmentDetail'));
const SettingPage = React.lazy(() => import('@/features/App/settings'));

const AccountPage = React.lazy(() => import('@/features/App/account/page'));
const CalendarPage = React.lazy(() => import('@/features/App/employee/page'));

const ReportStallPage = React.lazy(() => import('@/features/App/report/Stall'));

// private router khi đã đăng nhập admin
const AdminRoutes = [
    {
        path: routerPage.home,
        element: (
            <Lazy>
                <HomePage />
            </Lazy>
        ),
    },

    {
        path: routerPage.productDetail,
        element: (
            <Lazy>
                <ProductDetailPage />
            </Lazy>
        ),
    },
    // customer
    {
        path: routerPage.employee,
        element: (
            <Lazy>
                <EmployeePage />
            </Lazy>
        ),
    },

    // voucher
    {
        path: routerPage.voucher,
        element: (
            <Lazy>
                <DepartmentPage />
            </Lazy>
        ),
    },

    {
        path: routerPage.voucherForm,
        element: (
            <Lazy>
                <VoucherFormPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.voucherFormEdit,
        element: (
            <Lazy>
                <VoucherFormPage />
            </Lazy>
        ),
    },

    // order
    {
        path: routerPage.contant,
        element: (
            <Lazy>
                <OrderPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.employeeDetail,
        element: (
            <Lazy>
                <EmployeeDetail />
            </Lazy>
        ),
    },
    {
        path: routerPage.departmentDetail,
        element: (
            <Lazy>
                <DepartmentDetail />
            </Lazy>
        ),
    },
    // noti
    {
        path: routerPage.notification,
        element: <NotificationPage />,
    },

    // merchandise

    // new
    // report

    {
        path: routerPage.wave,
        element: (
            <Lazy>
                <ReportStallPage />
            </Lazy>
        ),
    },

    // account
    {
        path: routerPage.account,
        element: (
            <Lazy>
                <AccountPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.calendar,
        element: (
            <Lazy>
                <CalendarPage />
            </Lazy>
        ),
    },
];

export default AdminRoutes;
