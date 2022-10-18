import CustomScrollbars from '@/components/CustomScrollbars';
import { TAB_SIZE } from '@/config/theme';
import ErrorBoundary from '@/features/Error/ErrorBoundary';
import useWindowSize from '@/hooks/useWindowSize';
import SideBar from '@/layout/SideBar';
import { Layout, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Topbar from './Content/Topbar';
const { Content, Footer } = Layout;
const PageLayout = (PageComponent: React.JSXElementConstructor<any>) => {
    return function WithPage({ ...props }) {
        const [isLogin, setIsLogin] = React.useState(false);

        const { width } = useWindowSize();

        const [collapsedMobile, setCollapsedMobile] = React.useState(false);

        const handleCallbackCollapseMobile = React.useCallback(() => {
            setCollapsedMobile(!collapsedMobile);
        }, [collapsedMobile]);

        React.useLayoutEffect(() => {
            if (localStorage.getItem('token')) {
                setIsLogin(true);
            }
        }, []);

        return isLogin ? (
            <Layout className="gx-app-layout">
                {/* sidebar */}
                <SideBar
                    collapsedMobile={collapsedMobile}
                    handleCallbackCollapseMobile={handleCallbackCollapseMobile}
                />
                {/* content */}
                <Layout>
                    {/* top content */}
                    {width < TAB_SIZE && <Topbar handleCallbackCollapseMobile={handleCallbackCollapseMobile} />}
                    {/* body content */}
                    <ErrorBoundary>
                        <Content className="gx-layout-content">
                            <div className="gx-main-content-wrapper" style={{ overflow: 'hidden' }}>
                                <PageComponent {...props} />
                            </div>
                            {/* footer content */}
                            {/* <Footer>
                                <div className="gx-layout-footer-content">
                                    <div className="gx-layout-footer-content">WindsSoft Frontend Team - 2022</div>
                                </div>
                            </Footer> */}
                        </Content>
                    </ErrorBoundary>
                </Layout>
            </Layout>
        ) : (
            <Layout className="gx-app-layout">
                <ContainerAuthStyled justify="center" align="middle">
                    <PageComponent {...props} />
                </ContainerAuthStyled>
            </Layout>
        );
    };
};

const ContainerAuthStyled = styled(Row)`
    min-height: 100vh;
`;

export default PageLayout;
