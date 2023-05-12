import LocalStorage from '@/apis/LocalStorage';
import { routerPage } from '@/config/contants.routes';
import { PublicRoutes } from '@/config/Lazy.routes';
import { AccountantRoutes, AdminRoutes, AuthRoutes, EditorRoutes } from '@/config/routes';
import { ADMIN } from '@/contants';
import PageLayout from '@/layout';
import React from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
const switchRoute = (role: string) => {
    // 'group'
    switch (role) {
        case ADMIN.main:
            return AdminRoutes;
        case ADMIN.employee:
            return AccountantRoutes;

        default:
            return PublicRoutes;
    }
};

// config routes
const MainPage = ({ role }: { role: string }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let element = useRoutes(LocalStorage.getToken() ? switchRoute(role) : AuthRoutes);

    const [logged, setLogged] = React.useState(false);

    React.useEffect(() => {
        if (!role) return;
    }, [role]);
    React.useEffect(() => {
        // nếu đăng nhập và domain không webview và domain không public
        // if (LocalStorage.getToken() && pathname.includes('webview') && pathname.includes('public')) {

        if (LocalStorage.getToken()) {
            setLogged(true);

            if (pathname === routerPage.register || pathname === routerPage.login) {
                // return switchSidebar(role)?.[0]?.key;
                if (role === 'ROLE_EMPLOYEE') {
                    return navigate('/calendar');
                }
                if (role === 'ROLE_ADMIN') {
                    return navigate('/');
                }
            }
            // navigate(pathname);
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
    }, [logged, pathname, role]);

    return element;
};

export default PageLayout(MainPage);
