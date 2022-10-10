export const dataSourceCategoryHaNoi = [
    {
        id: '1',
        name: 'Đinh vít',
        category: 5,
        display: 1,
        status: 'Hoạt động',
        createAt: '19/07/2020',
    },
    {
        id: '2',
        name: 'Con lăn sơn',
        category: 5,
        display: 2,
        status: 'Hoạt động',
        createAt: '19/07/2020',
    },
    {
        id: '3',
        name: 'Cờ-lê',
        category: 5,
        display: 3,
        status: 'Hoạt động',
        createAt: '19/07/2020',
    },
];

export const dataSourceOderList = [
    {
        id: '1',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duy',
        amount: 30,
        total: 2000000,
    },
    {
        id: '2',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duyyyyy',
        amount: 30,
        total: 2000000,
    },
    {
        id: '3',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duyyyyy',
        amount: 30,
        total: 2000000,
    },
];
export const dataSourceProduct = [
    {
        id: '1',
        productId: 'Pj1000',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
    {
        id: '2',
        productId: 'Pj1001',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
    {
        id: '3',
        productId: 'Pj1000',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
    {
        id: '4',
        productId: 'Pj1000',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
];


export const columsProduct = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productId',
        key: 'productId',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Giá bán(VNĐ)',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },

    {
        title: 'Tổng tồn',
        dataIndex: 'total',
        key: 'total',
    },
];
export const columsOderList = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Mã đơn',
        dataIndex: 'oderId',
        key: 'Id',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
];
export const columsCategoryHanoi = [
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục con',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Thứ tự hiển thị',
        dataIndex: 'display',
        key: 'display',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createAt',
        key: 'createAt',
    },
];