import LocalStorage from '@/apis/LocalStorage';
import { routerPage } from '@/config/contants.routes';
import { PublicRoutes } from '@/config/Lazy.routes';
import { AuthRoutes, AdminRoutes, EditorRoutes, AccountantRoutes } from '@/config/routes';
import { ADMIN } from '@/contants';
import PageLayout from '@/layout';
import React from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
const switchRoute = (role: string) => {
    // 'group'
    switch (role) {
        case ADMIN.main:
            return AdminRoutes;
        case ADMIN.news:
            return EditorRoutes;
        case ADMIN.accountant:
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
        if (logged) return;

        // nếu đăng nhập và domain không webview và domain không public
        // if (LocalStorage.getToken() && pathname.includes('webview') && pathname.includes('public')) {

        if (LocalStorage.getToken()) {
            setLogged(true);

            if (pathname === routerPage.register || pathname === routerPage.login) {
                return navigate('/');
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
    }, [logged, pathname]);

    return element;
};

export default PageLayout(MainPage);
