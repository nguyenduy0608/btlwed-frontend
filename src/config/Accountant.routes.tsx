import EmployeePage from '@/features/App/customer/pages';
import NotificationPage from '@/features/App/notification/page';
import React from 'react';
import { routerPage } from './contants.routes';
import Lazy, { PublicRoutes } from './Lazy.routes';

const HomePage = React.lazy(() => import('@/features/App/home/page'));

const CalendarPage = React.lazy(() => import('@/features/App/employee/page'));

// todo: router đăng nhập kế toán
const AccountantRoutes = [
    // tổng quan

    {
        path: routerPage.calendar,
        element: (
            <Lazy>
                <CalendarPage />
            </Lazy>
        ),
    },
];

export default AccountantRoutes;
