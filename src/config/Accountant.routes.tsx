import NotificationPage from '@/features/App/notification/page';
import React from 'react';
import { routerPage } from './contants.routes';
import Lazy, { PublicRoutes } from './Lazy.routes';

const VoucherPage = React.lazy(() => import('@/features/App/voucher/page'));
const VoucherFormPage = React.lazy(() => import('@/features/App/voucher/page/form'));

const OrderPage = React.lazy(() => import('@/features/App/order/page'));
const OrderDetailPage = React.lazy(() => import('@/features/App/order/page/Detail'));

const ReportSellPage = React.lazy(() => import('@/features/App/report/Sell'));
const ReportStallPage = React.lazy(() => import('@/features/App/report/Stall'));

const ShippingPage = React.lazy(() => import('@/features/App/merchandise/pages/Shipping'));
const ImportCommodityPage = React.lazy(() => import('@/features/App/merchandise/pages/ImportCommodity'));
const ReturnCommodityPage = React.lazy(() => import('@/features/App/merchandise/pages/ReturnCommodity'));

// todo: router đăng nhập kế toán
const AccountantRoutes = [
    // order
    {
        path: routerPage.order,
        element: (
            <Lazy>
                <OrderPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.orderDetail,
        element: (
            <Lazy>
                <OrderDetailPage />
            </Lazy>
        ),
    },
    // merchandise
    {
        path: routerPage.merchandise_importCommodity,
        element: (
            <Lazy>
                <ImportCommodityPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.merchandise_returnCommodity,
        element: (
            <Lazy>
                <ReturnCommodityPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.merchandise_shipping,
        element: (
            <Lazy>
                <ShippingPage />
            </Lazy>
        ),
    },

    {
        path: routerPage.voucher,
        element: (
            <Lazy>
                <VoucherPage />
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

    // report
    {
        path: routerPage.reportSell,
        element: (
            <Lazy>
                <ReportSellPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.reportStall,
        element: (
            <Lazy>
                <ReportStallPage />
            </Lazy>
        ),
    },

    // noti
    {
        path: routerPage.notification,
        element: <NotificationPage />,
    },
    ...PublicRoutes,
];

export default AccountantRoutes;
