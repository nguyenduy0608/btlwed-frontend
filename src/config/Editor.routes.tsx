import React from 'react';
import NotificationPage from '@/features/App/notification/page';
import { routerPage } from './contants.routes';
import Lazy, { PublicRoutes } from './Lazy.routes';

const NewsPage = React.lazy(() => import('@/features/App/news/page'));
const NewsFormPage = React.lazy(() => import('@/features/App/news/page/Form'));

// todo: router đăng nhập biên tập viên
const EditorRoutes = [
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
    // noti
    {
        path: routerPage.notification,
        element: <NotificationPage />,
    },
    ...PublicRoutes,
];

export default EditorRoutes;
