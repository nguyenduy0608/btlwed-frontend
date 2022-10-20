import IconAntd from '@/components/IconAntd';

export const items: any = [
    {
        label: 'Tổng quan',
        key: '/',
        icon: <IconAntd icon="DashboardOutlined" />,
    },
    {
        label: 'Sản phẩm',
        key: '/product',
        icon: <IconAntd icon="MergeCellsOutlined" />,
        children: [
            {
                label: 'Danh mục',
                key: 'product/category',
                icon: <IconAntd icon="InboxOutlined" />,
            },
            {
                label: 'Sản phẩm',
                key: 'product',
                icon: <IconAntd icon="ScheduleOutlined" />,
            },
        ],
    },
    {
        label: 'Khách hàng',
        key: 'customer',
        icon: <IconAntd icon="UserOutlined" />,
    },
    {
        label: 'Mã giảm giá',
        key: 'voucher',
        icon: <IconAntd icon="BarcodeOutlined" />,
    },
    {
        label: 'Giao dịch',
        key: 'transaction',
        icon: <IconAntd icon="SwapOutlined" />,
        children: [
            {
                label: 'Đặt hàng',
                key: 'transaction/order',
                icon: <IconAntd icon="ShoppingOutlined" />,
            },
            {
                label: 'Hoá đơn',
                key: 'transaction/bill',
                icon: <IconAntd icon="ContainerOutlined" />,
            },
            {
                label: 'Vận đơn',
                key: 'transaction/billOfLading',
                icon: <IconAntd icon="FormOutlined" />,
            },
            {
                label: 'Trả hàng',
                key: 'transaction/returnOrder',
                icon: <IconAntd icon="RollbackOutlined" />,
            },
            {
                label: 'Chuyển hàng',
                key: 'transaction/shipping',
                icon: <IconAntd icon="CarOutlined" />,
            },
        ],
    },
    {
        label: 'Đối tác',
        key: 'partner',
        icon: <IconAntd icon="ApartmentOutlined" />,
        children: [
            {
                label: 'Khách hàng',
                key: 'partner/customer',
                icon: <IconAntd icon="UserOutlined" />,
            },
        ],
    },
    {
        label: 'Báo cáo',
        key: 'report',
        icon: <IconAntd icon="BarChartOutlined" />,
        children: [
            {
                label: 'Hàng hoá',
                key: 'report/merchandise',
                icon: <IconAntd icon="MergeCellsOutlined" />,
            },
            {
                label: 'Khách hàng',
                key: 'report/customer',
                icon: <IconAntd icon="UserSwitchOutlined" />,
            },
        ],
    },
];
