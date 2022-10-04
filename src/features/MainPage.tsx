import LocalStorage from '@/apis/LocalStorage';
import { AuthRoutes, PrivateRoutes, routerPage } from '@/config/routes';
import PageLayout from '@/layout';
import React from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

// config routes
const MainPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let element = useRoutes(LocalStorage.getToken() ? PrivateRoutes : AuthRoutes);

    React.useEffect(() => {
        // nếu đăng nhập và domain không webview và domain không public
        // if (LocalStorage.getToken() && pathname.includes('webview') && pathname.includes('public')) {
        if (LocalStorage.getToken()) {
            navigate(routerPage.home);
        } else {
            switch (pathname) {
                case routerPage.register:
                    navigate(routerPage.register);
                    break;
                default:
                    navigate(routerPage.login);
                    break;
            }
        }
    }, []);

    return element;
};

export default PageLayout(MainPage);
