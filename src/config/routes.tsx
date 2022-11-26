import React, { Suspense } from 'react';

const LoginPage = React.lazy(() => import('@/features/Auth/Login/pages'));

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

import NotFoundPage from '@/features/Notfound';
import RegisterPage from '@/features/Auth/Register';
import NotificationPage from '@/features/App/notification/page';

import ChatPage from '@/features/App/chat';
import { BarLoader } from 'react-spinners';

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

    // report
    reportSell: '/report/sell',
    reportStall: '/report/stall',

    // news
    news: '/news',
    newsForm: '/news/form',
    newsFormEdit: '/news/form/:id',

    // setting
    setting: '/setting',

    // chat
    chat: '/chat',

    // merchandise
    merchandise_importCommodity: '/merchandise/importCommodity',
    merchandise_returnCommodity: '/merchandise/returnCommodity',
    merchandise_shipping: '/merchandise/shipping',

    // auth....
    login: '/auth/login',
    register: '/auth/register',
};

// public chứa những router không cần đăng nhập hoặc web view
const PublicRoutes = [{ path: '*', element: <NotFoundPage /> }];

const Lazy = ({ children }: { children: any }) => {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <BarLoader />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

// private router khi đã đăng nhập
const PrivateRoutes = [
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
    {
        path: routerPage.chat,
        element: <ChatPage />,
    },

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
