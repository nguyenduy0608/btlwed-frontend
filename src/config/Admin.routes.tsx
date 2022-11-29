import React from 'react';
import NotificationPage from '@/features/App/notification/page';
import { routerPage } from './contants.routes';
import Lazy, { PublicRoutes } from './Lazy.routes';

const HomePage = React.lazy(() => import('@/features/App/home/page'));
const ProductCategoryPage = React.lazy(() => import('@/features/App/product/page/Category'));
const ProductPage = React.lazy(() => import('@/features/App/product/page'));
const ProductDetailPage = React.lazy(() => import('@/features/App/product/page/Detail'));
const CustomerPage = React.lazy(() => import('@/features/App/customer/pages'));

const VoucherPage = React.lazy(() => import('@/features/App/voucher/page'));
const VoucherFormPage = React.lazy(() => import('@/features/App/voucher/page/form'));

const OrderPage = React.lazy(() => import('@/features/App/order/page'));
const OrderDetailPage = React.lazy(() => import('@/features/App/order/page/Detail'));
const SettingPage = React.lazy(() => import('@/features/App/settings'));

const AccountPage = React.lazy(() => import('@/features/App/account/page'));

const ReportSellPage = React.lazy(() => import('@/features/App/report/Sell'));
const ReportStallPage = React.lazy(() => import('@/features/App/report/Stall'));

const NewsPage = React.lazy(() => import('@/features/App/news/page'));
const NewsFormPage = React.lazy(() => import('@/features/App/news/page/Form'));

const ShippingPage = React.lazy(() => import('@/features/App/merchandise/pages/Shipping'));
const ImportCommodityPage = React.lazy(() => import('@/features/App/merchandise/pages/ImportCommodity'));
const ReturnCommodityPage = React.lazy(() => import('@/features/App/merchandise/pages/ReturnCommodity'));

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
        path: routerPage.productCategory,
        element: (
            <Lazy>
                <ProductCategoryPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.product,
        element: (
            <Lazy>
                <ProductPage />
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
        path: routerPage.customer,
        element: (
            <Lazy>
                <CustomerPage />
            </Lazy>
        ),
    },

    // voucher
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

    // noti
    {
        path: routerPage.notification,
        element: <NotificationPage />,
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
    // new
    {
        path: routerPage.news,
        element: (
            <Lazy>
                <NewsPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.newsForm,
        element: (
            <Lazy>
                <NewsFormPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.newsFormEdit,
        element: (
            <Lazy>
                <NewsFormPage />
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

    // account
    {
        path: routerPage.account,
        element: (
            <Lazy>
                <AccountPage />
            </Lazy>
        ),
    },

    // chat
    // {
    //     path: routerPage.chat,
    //     element: <ChatPage />,
    // },

    // setting
    {
        path: routerPage.setting,
        element: (
            <Lazy>
                <SettingPage />
            </Lazy>
        ),
    },

    ...PublicRoutes,
];

export default AdminRoutes;
