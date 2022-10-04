import SearchBox from '@/components/SearchBox';
import { Layout, Popover } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import useWindowSize from '@/hooks/useWindowSize';
import { TAB_SIZE } from '@/config/theme';
import CustomScrollbars from '@/components/CustomScrollbars';
import UserInfo from '@/components/UserInfo';

const Topbar = ({ handleCallbackCollapseMobile }: { handleCallbackCollapseMobile: () => void }) => {
    const { width } = useWindowSize();
    const [SearchText, setSearchText] = React.useState('');
    return (
        <>
            <Layout.Header>
                <div className="gx-linebar gx-mr-3">
                    <MenuOutlined className="gx-icon-btn" onClick={handleCallbackCollapseMobile} />
                </div>
                <Link className="gx-d-block gx-d-lg-none gx-pointer" to="/">
                    <img
                        height={30}
                        alt=""
                        src="https://winds.vn/wp-content/uploads/2021/07/logoWindSoftBlendNew-e1569232144947.png"
                    />
                </Link>
                <SearchBox
                    styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setSearchText(e.target.value)}
                    value={SearchText}
                />
                <ul className="gx-header-notifications gx-ml-auto">
                    <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                        <Popover
                            overlayClassName="gx-popover-horizantal"
                            placement="bottomRight"
                            content={
                                <SearchBox
                                    styleName="gx-popover-search-bar"
                                    placeholder="Tìm kiếm..."
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={SearchText}
                                />
                            }
                            trigger="click"
                        >
                            <span className="gx-pointer gx-d-block">
                                <SearchOutlined />
                            </span>
                        </Popover>
                    </li>
                    <li className="gx-notify">
                        <Popover
                            overlayClassName="gx-popover-horizantal"
                            placement="bottomRight"
                            content={
                                <>
                                    <div className="gx-popover-header">
                                        <h3 className="gx-mb-0">Notifications</h3>
                                        <i className="gx-icon-btn icon icon-charvlet-down" />
                                    </div>
                                    <CustomScrollbars className="gx-popover-scroll">
                                        <ul className="gx-sub-popover">
                                            <li className="gx-media">
                                                <div className="gx-media-body gx-align-self-center">
                                                    <p className="gx-fs-sm gx-mb-0">title</p>
                                                    <span className="gx-meta-date">
                                                        <small>time</small>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </CustomScrollbars>
                                </>
                            }
                            trigger="click"
                        >
                            <span className="gx-pointer gx-d-block">
                                <BellOutlined />
                            </span>
                        </Popover>
                    </li>

                    {/* {width < TAB_SIZE && (
                        <>
                            <li className="gx-user-nav">
                                <UserInfo />
                            </li>
                        </>
                    )} */}
                </ul>
            </Layout.Header>
        </>
    );
};

export default Topbar;
